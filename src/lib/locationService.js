import { supabase } from './supabaseClient';

// ─── Haversine distance (meters) ────────────────────────────────────────────
export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function formatDistance(meters) {
  if (meters === null || meters === undefined) return null;
  if (meters < 50) return 'Ngay bên nhau 💕';
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

export function isTogether(meters) {
  return meters !== null && meters < 100;
}

// ─── Status options ──────────────────────────────────────────────────────────
export const STATUS_OPTIONS = [
  { id: 'active',  emoji: '🟢', label: 'Đang hoạt động' },
  { id: 'home',    emoji: '🏠', label: 'Ở nhà' },
  { id: 'out',     emoji: '🚶', label: 'Đang ra ngoài' },
  { id: 'busy',    emoji: '⚡', label: 'Đang bận' },
  { id: 'miss',    emoji: '🥺', label: 'Đang nhớ' },
  { id: 'sleep',   emoji: '😴', label: 'Đang ngủ' },
];

export function getStatus(id) {
  return STATUS_OPTIONS.find(s => s.id === id) || STATUS_OPTIONS[0];
}

// ─── Geolocation watching ────────────────────────────────────────────────────
export function startWatchingPosition(onSuccess, onError) {
  if (!navigator.geolocation) {
    onError(new Error('Thiết bị không hỗ trợ GPS'));
    return null;
  }
  const id = navigator.geolocation.watchPosition(
    pos => onSuccess({
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
      accuracy: pos.coords.accuracy,
    }),
    err => onError(err),
    {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 15000,
    }
  );
  return id;
}

export function stopWatchingPosition(watchId) {
  if (watchId !== null) navigator.geolocation.clearWatch(watchId);
}

export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error('Không hỗ trợ GPS'));
    navigator.geolocation.getCurrentPosition(
      pos => resolve({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
      }),
      reject,
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}

// ─── Supabase upsert location ────────────────────────────────────────────────
export async function uploadLocation({ userId, roomId, lat, lng, accuracy, status }) {
  const { error } = await supabase.from('locations').upsert(
    { user_id: userId, room_id: roomId, lat, lng, accuracy, status, last_updated: new Date().toISOString() },
    { onConflict: 'user_id' }
  );
  if (error) console.error('Upload location error:', error);
}

// ─── Supabase Realtime: Presence-based live location ─────────────────────────
export function createLocationChannel(roomId, userId) {
  return supabase.channel(`location:${roomId}`, {
    config: { presence: { key: userId } },
  });
}

// Broadcast a map interaction (meeting point, on-my-way, etc.)
export function sendMapInteraction(channel, type, payload) {
  channel.send({
    type: 'broadcast',
    event: 'map_action',
    payload: { type, ...payload, sentAt: Date.now() },
  });
}

// ─── SQL migration (run in Supabase SQL editor) ───────────────────────────────
export const MIGRATION_SQL = `
-- Bảng lưu vị trí cuối cùng của mỗi user
CREATE TABLE IF NOT EXISTS locations (
  user_id       UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  room_id       UUID REFERENCES couple_rooms(id) ON DELETE CASCADE,
  lat           DOUBLE PRECISION NOT NULL,
  lng           DOUBLE PRECISION NOT NULL,
  accuracy      DOUBLE PRECISION,
  status        TEXT DEFAULT 'active',
  last_updated  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Đọc vị trí trong cùng phòng" ON locations
  FOR SELECT USING (
    room_id IN (
      SELECT id FROM couple_rooms
      WHERE user1_id = auth.uid() OR user2_id = auth.uid()
    )
  );

CREATE POLICY "Chỉ tự update vị trí của mình" ON locations
  FOR ALL USING (user_id = auth.uid());

-- Bảng điểm hẹn (meeting points)  
CREATE TABLE IF NOT EXISTS meeting_points (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id    UUID REFERENCES couple_rooms(id) ON DELETE CASCADE,
  created_by UUID REFERENCES profiles(id),
  lat        DOUBLE PRECISION NOT NULL,
  lng        DOUBLE PRECISION NOT NULL,
  label      TEXT DEFAULT 'Điểm hẹn',
  emoji      TEXT DEFAULT '📍',
  is_active  BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE meeting_points ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Couple xem meeting points" ON meeting_points
  FOR ALL USING (
    room_id IN (
      SELECT id FROM couple_rooms
      WHERE user1_id = auth.uid() OR user2_id = auth.uid()
    )
  );
`;
