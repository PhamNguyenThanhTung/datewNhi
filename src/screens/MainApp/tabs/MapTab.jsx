import { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useLocation from '../../../hooks/useLocation';
import {
  formatDistance,
  isTogether,
  STATUS_OPTIONS,
  getStatus,
} from '../../../lib/locationService';

// ─── Fix leaflet default icon bug in Vite ───────────────────────────────────
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ─── Custom avatar marker ────────────────────────────────────────────────────
function createAvatarIcon({ avatarUrl, name, color, isPartner, statusEmoji }) {
  const initials = name ? name.charAt(0).toUpperCase() : '?';
  const html = `
    <div style="position:relative;width:56px;height:64px;">
      <div style="
        position:absolute;bottom:0;left:50%;transform:translateX(-50%);
        width:0;height:0;
        border-left:8px solid transparent;
        border-right:8px solid transparent;
        border-top:10px solid ${color};
      "></div>
      <div style="
        width:52px;height:52px;border-radius:50%;
        border:3px solid ${color};
        overflow:hidden;background:#1a1a1a;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 0 0 2px #0d0d0d, 0 0 16px ${color}88;
        position:relative;
      ">
        ${avatarUrl
          ? `<img src="${avatarUrl}" style="width:100%;height:100%;object-fit:cover;" />`
          : `<span style="color:${color};font-size:20px;font-weight:800;">${initials}</span>`
        }
      </div>
      ${statusEmoji ? `
        <div style="
          position:absolute;top:-4px;right:-4px;
          width:20px;height:20px;border-radius:50%;
          background:#111;border:2px solid #333;
          display:flex;align-items:center;justify-content:center;
          font-size:11px;
        ">${statusEmoji}</div>
      ` : ''}
    </div>
  `;
  return L.divIcon({
    html,
    className: '',
    iconSize: [56, 64],
    iconAnchor: [28, 64],
    popupAnchor: [0, -68],
  });
}

// ─── Animated pulse ring ─────────────────────────────────────────────────────
function PulseMarker({ position, color }) {
  return (
    <Circle
      center={position}
      radius={80}
      pathOptions={{ color, fillColor: color, fillOpacity: 0.08, weight: 1, opacity: 0.3 }}
    />
  );
}

// ─── Auto-fit map to both locations ─────────────────────────────────────────
function MapController({ myLocation, partnerLocation, flyTo }) {
  const map = useMap();

  useEffect(() => {
    if (flyTo) {
      map.flyTo([flyTo.lat, flyTo.lng], 16, { animate: true, duration: 1.2 });
    }
  }, [flyTo, map]);

  const fitBoth = useCallback(() => {
    if (myLocation && partnerLocation) {
      const bounds = L.latLngBounds(
        [myLocation.lat, myLocation.lng],
        [partnerLocation.lat, partnerLocation.lng]
      );
      map.fitBounds(bounds, { padding: [80, 80], animate: true, duration: 1 });
    } else if (myLocation) {
      map.flyTo([myLocation.lat, myLocation.lng], 15, { animate: true, duration: 1 });
    }
  }, [map, myLocation, partnerLocation]);

  useEffect(() => {
    if (myLocation && !partnerLocation) {
      map.flyTo([myLocation.lat, myLocation.lng], 15, { animate: true, duration: 1.5 });
    }
  }, []);

  return null;
}

// ─── Map click handler (for meeting point) ───────────────────────────────────
function MapClickHandler({ onMapClick }) {
  useMapEvents({ click: (e) => onMapClick(e.latlng) });
  return null;
}

// ─── Meeting point marker ─────────────────────────────────────────────────────
function createMeetingIcon() {
  return L.divIcon({
    html: `<div style="font-size:28px;filter:drop-shadow(0 2px 8px rgba(255,107,107,0.8));">📍</div>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const s = {
  wrap: { position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#111' },

  // Permission screen
  permWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#0d0d0d', padding: 32, gap: 20, textAlign: 'center' },
  permEmoji: { fontSize: 64 },
  permTitle: { fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1.3 },
  permSub: { fontSize: 14, color: '#888', lineHeight: 1.7, maxWidth: 280 },
  permBtn: { padding: '14px 36px', borderRadius: 16, background: 'linear-gradient(135deg, #ff6b6b, #ff8c42)', border: 'none', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 8 },
  permDenied: { padding: '12px 20px', borderRadius: 12, background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', color: '#ff6b6b', fontSize: 13, lineHeight: 1.5, maxWidth: 300 },

  // Top overlay
  topBar: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, pointerEvents: 'none' },
  distanceBadge: (together) => ({
    flex: 1,
    textAlign: 'center',
    padding: '8px 16px',
    borderRadius: 20,
    background: together ? 'rgba(107,203,119,0.2)' : 'rgba(0,0,0,0.75)',
    backdropFilter: 'blur(12px)',
    border: `1px solid ${together ? 'rgba(107,203,119,0.4)' : 'rgba(255,255,255,0.12)'}`,
    color: together ? '#6bcb77' : '#fff',
    fontSize: 14,
    fontWeight: 700,
    transition: 'all 0.5s ease',
    letterSpacing: 0.3,
    pointerEvents: 'auto',
  }),
  mapBtn: { width: 36, height: 36, borderRadius: 10, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, pointerEvents: 'auto' },

  // Quick action row (above bottom sheet)
  quickRow: { position: 'absolute', bottom: 230, left: 0, right: 0, zIndex: 1000, display: 'flex', justifyContent: 'center', gap: 10, padding: '0 16px', pointerEvents: 'none' },
  quickBtn: (color) => ({
    padding: '10px 18px',
    borderRadius: 24,
    background: `${color}20`,
    backdropFilter: 'blur(12px)',
    border: `1px solid ${color}50`,
    color,
    fontSize: 13,
    fontWeight: 700,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    pointerEvents: 'auto',
    transition: 'all 0.15s',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  }),

  // Bottom sheet
  sheet: (open) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1001,
    background: '#141414',
    borderTop: '1px solid #2a2a2a',
    borderRadius: '20px 20px 0 0',
    padding: '0 16px 24px',
    transform: open ? 'translateY(0)' : 'translateY(100%)',
    transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
  }),
  sheetHandle: { width: 36, height: 4, borderRadius: 2, background: '#333', margin: '10px auto 12px', cursor: 'pointer' },
  partnerRow: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 },
  partnerAvatar: (color) => ({ width: 48, height: 48, borderRadius: '50%', border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, background: '#1a1a1a', overflow: 'hidden', flexShrink: 0 }),
  partnerName: { fontSize: 16, fontWeight: 700, color: '#fff' },
  partnerMeta: { fontSize: 12, color: '#888', marginTop: 2 },
  statusRow: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 },
  statusChip: (active) => ({ padding: '6px 12px', borderRadius: 20, background: active ? 'rgba(255,107,107,0.2)' : 'rgba(255,255,255,0.05)', border: `1px solid ${active ? 'rgba(255,107,107,0.5)' : 'rgba(255,255,255,0.08)'}`, color: active ? '#ff6b6b' : '#aaa', fontSize: 12, cursor: 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 4 }),
  actionGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 },
  actionBtn: (color) => ({ padding: '10px 4px', borderRadius: 12, background: `${color}12`, border: `1px solid ${color}30`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', transition: 'all 0.15s' }),
  actionIcon: { fontSize: 22 },
  actionLabel: { fontSize: 10, color: '#888', fontWeight: 600, textAlign: 'center' },
  sectionLabel: { fontSize: 11, color: '#555', fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8 },

  // Incoming action toast
  incomingToast: { position: 'absolute', top: 56, left: 12, right: 12, zIndex: 1002, padding: '12px 16px', borderRadius: 14, background: 'rgba(20,20,20,0.95)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 12, animation: 'slideDown 0.3s ease' },
  toastEmoji: { fontSize: 28, flexShrink: 0 },
  toastText: { flex: 1 },
  toastTitle: { color: '#fff', fontSize: 14, fontWeight: 700 },
  toastSub: { color: '#888', fontSize: 12, marginTop: 2 },
  toastClose: { color: '#555', fontSize: 20, cursor: 'pointer', flexShrink: 0 },

  // Together overlay
  togetherBadge: { position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 999, pointerEvents: 'none' },
};

// ─── Action definitions ───────────────────────────────────────────────────────
const MAP_ACTIONS = [
  { id: 'on_my_way',    emoji: '💨',  label: 'Đang đến', color: '#6bcb77',  toastTitle: 'Đang trên đường đến bạn!', toastSub: 'Chờ xíu nhé~ 💕' },
  { id: 'come_here',    emoji: '📣',  label: 'Ra đây', color: '#ffd93d',    toastTitle: 'Bạn ơi, ra đây với mình!', toastSub: 'Xem bản đồ để thấy mình ở đâu~' },
  { id: 'miss_you',     emoji: '🥺',  label: 'Nhớ lắm', color: '#ff6b6b',  toastTitle: 'Người ấy đang nhớ bạn!', toastSub: 'Thương bạn lắm à~ 🥺' },
  { id: 'wait_for_me',  emoji: '⏳',  label: 'Đợi nhé', color: '#4d96ff',  toastTitle: 'Đợi mình một chút nhé!', toastSub: 'Sắp đến rồi~' },
  { id: 'where_are_you',emoji: '📡', label: 'Bạn đâu?', color: '#ff9ef5', toastTitle: 'Bạn đang ở đâu vậy?', toastSub: 'Người ấy đang tìm bạn!' },
  { id: 'date_tonight', emoji: '🕯️', label: 'Hẹn tối nay', color: '#ff8c42', toastTitle: 'Hẹn tối nay nhé!', toastSub: 'Người ấy muốn hẹn gặp bạn 🕯️' },
  { id: 'kiss',         emoji: '💋',  label: 'Gửi hôn', color: '#ff6b6b',  toastTitle: 'Người ấy gửi cho bạn nụ hôn!', toastSub: '💋' },
  { id: 'heart',        emoji: '❤️',  label: 'Yêu bạn', color: '#ff6b6b',  toastTitle: 'Người ấy yêu bạn lắm!', toastSub: '❤️ ❤️ ❤️' },
];

const PARTNER_COLOR = '#4d96ff';
const MY_COLOR      = '#ff6b6b';

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MapTab({ roomId, userId, myProfile, partnerProfile }) {
  const {
    myLocation, partnerLocation, partnerPresence, myStatus,
    distance, permissionState, isTracking, incomingAction,
    startTracking, updateStatus, sendAction, clearIncomingAction,
  } = useLocation({ userId, roomId, enabled: true });

  const [sheetOpen, setSheetOpen]         = useState(false);
  const [meetingPoint, setMeetingPoint]   = useState(null);
  const [placingPin, setPlacingPin]       = useState(false);
  const [flyTo, setFlyTo]                 = useState(null);
  const [actionCooldown, setActionCooldown] = useState({});

  const together = isTogether(distance);

  // ─── Send action with cooldown ─────────────────────────────────────────
  const handleSendAction = (action) => {
    if (actionCooldown[action.id]) return;
    sendAction(action.id, { actionMeta: action });
    if (navigator.vibrate) navigator.vibrate([30]);
    setActionCooldown(c => ({ ...c, [action.id]: true }));
    setTimeout(() => setActionCooldown(c => ({ ...c, [action.id]: false })), 4000);
  };

  // ─── Meeting point ──────────────────────────────────────────────────────
  const handleMapClick = (latlng) => {
    if (!placingPin) return;
    setMeetingPoint({ lat: latlng.lat, lng: latlng.lng });
    setPlacingPin(false);
    sendAction('meeting_point', { lat: latlng.lat, lng: latlng.lng });
  };

  // ─── Handle incoming action ─────────────────────────────────────────────
  const actionDef = incomingAction
    ? MAP_ACTIONS.find(a => a.id === incomingAction.type)
    : null;

  // ─── Incoming meeting point ─────────────────────────────────────────────
  useEffect(() => {
    if (incomingAction?.type === 'meeting_point') {
      setMeetingPoint({ lat: incomingAction.lat, lng: incomingAction.lng });
      setFlyTo({ lat: incomingAction.lat, lng: incomingAction.lng });
    }
  }, [incomingAction]);

  // ─── Permission screen ──────────────────────────────────────────────────
  if (permissionState === 'denied') {
    return (
      <div style={s.permWrap}>
        <div style={s.permEmoji}>🗺️</div>
        <div style={s.permTitle}>Bản đồ Tình yêu</div>
        <div style={s.permDenied}>
          Bạn đã từ chối quyền truy cập vị trí. Vào <strong>Cài đặt trình duyệt</strong> → <strong>Quyền truy cập</strong> → bật lại Vị trí cho trang này.
        </div>
      </div>
    );
  }

  if (!isTracking && permissionState !== 'granted') {
    return (
      <div style={s.permWrap}>
        <div style={s.permEmoji}>🗺️</div>
        <div style={s.permTitle}>Bản đồ Tình yêu</div>
        <div style={s.permSub}>
          Chia sẻ vị trí để xem người ấy đang ở đâu trên bản đồ và nhận những tương tác lãng mạn từ họ 💕
        </div>
        <button style={s.permBtn} onClick={startTracking}>
          📍 Bật Chia sẻ Vị trí
        </button>
        <div style={{ fontSize: 12, color: '#555', marginTop: 8 }}>
          Vị trí chỉ chia sẻ với người ấy thôi nhé~
        </div>
      </div>
    );
  }

  const center = myLocation
    ? [myLocation.lat, myLocation.lng]
    : [10.8231, 106.6297]; // Mặc định: Hồ Chí Minh

  const myStatusObj      = getStatus(myStatus);
  const partnerStatusObj = partnerPresence ? getStatus(partnerPresence.status) : null;

  return (
    <div style={s.wrap}>
      <style>{`
        @keyframes slideDown { from { opacity:0; transform:translateY(-10px) } to { opacity:1; transform:none } }
        @keyframes heartPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
        .leaflet-container { background: #1a1a1a; }
        .leaflet-control-attribution { display: none; }
        .leaflet-control-zoom { border: none !important; }
        .leaflet-control-zoom a { background: rgba(0,0,0,0.75) !important; color: #fff !important; border: 1px solid rgba(255,255,255,0.12) !important; backdrop-filter: blur(12px); }
      `}</style>

      {/* ── Map ── */}
      <MapContainer
        center={center}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; CartoDB"
          maxZoom={19}
        />

        <MapController myLocation={myLocation} partnerLocation={partnerLocation} flyTo={flyTo} />
        <MapClickHandler onMapClick={handleMapClick} />

        {/* My location */}
        {myLocation && (
          <>
            <PulseMarker position={[myLocation.lat, myLocation.lng]} color={MY_COLOR} />
            <Marker
              position={[myLocation.lat, myLocation.lng]}
              icon={createAvatarIcon({
                avatarUrl: myProfile?.avatar_url,
                name: myProfile?.display_name || 'Tôi',
                color: MY_COLOR,
                statusEmoji: myStatusObj.emoji,
              })}
            >
              <Popup><b>{myProfile?.display_name || 'Bạn'}</b><br />{myStatusObj.emoji} {myStatusObj.label}</Popup>
            </Marker>
          </>
        )}

        {/* Partner location */}
        {partnerLocation && (
          <>
            <PulseMarker position={[partnerLocation.lat, partnerLocation.lng]} color={PARTNER_COLOR} />
            <Marker
              position={[partnerLocation.lat, partnerLocation.lng]}
              icon={createAvatarIcon({
                avatarUrl: partnerProfile?.avatar_url,
                name: partnerProfile?.display_name || '❤',
                color: PARTNER_COLOR,
                statusEmoji: partnerStatusObj?.emoji,
              })}
              eventHandlers={{ click: () => setSheetOpen(true) }}
            >
              <Popup>
                <b>{partnerProfile?.display_name || 'Người ấy'}</b><br />
                {partnerStatusObj?.emoji} {partnerStatusObj?.label}<br />
                {distance !== null && <span>Cách bạn {formatDistance(distance)}</span>}
              </Popup>
            </Marker>
          </>
        )}

        {/* Meeting point */}
        {meetingPoint && (
          <Marker
            position={[meetingPoint.lat, meetingPoint.lng]}
            icon={createMeetingIcon()}
          >
            <Popup>📍 Điểm hẹn</Popup>
          </Marker>
        )}
      </MapContainer>

      {/* ── Top bar ── */}
      <div style={s.topBar}>
        <button
          style={s.mapBtn}
          title="Xem cả hai"
          onClick={() => {
            setFlyTo(null);
            setTimeout(() => setFlyTo(myLocation || partnerLocation), 50);
          }}
        >
          🗺️
        </button>
        <div style={s.distanceBadge(together)}>
          {!isTracking
            ? '📍 Đang xác định vị trí...'
            : !partnerLocation
              ? `Chờ ${partnerProfile?.display_name || 'người ấy'} bật vị trí...`
              : together
                ? '💕 Đang ở bên nhau!'
                : `📍 Cách nhau ${formatDistance(distance)}`
          }
        </div>
        <button
          style={{ ...s.mapBtn, color: placingPin ? '#ff6b6b' : '#fff', borderColor: placingPin ? 'rgba(255,107,107,0.5)' : 'rgba(255,255,255,0.12)' }}
          title="Đặt điểm hẹn"
          onClick={() => setPlacingPin(p => !p)}
        >
          {placingPin ? '❌' : '📍'}
        </button>
      </div>

      {placingPin && (
        <div style={{ position: 'absolute', top: 56, left: 0, right: 0, zIndex: 1001, textAlign: 'center', pointerEvents: 'none' }}>
          <div style={{ display: 'inline-block', padding: '8px 20px', borderRadius: 20, background: 'rgba(255,107,107,0.9)', color: '#fff', fontSize: 13, fontWeight: 600 }}>
            Tap vào bản đồ để đặt điểm hẹn 📍
          </div>
        </div>
      )}

      {/* ── Quick actions (above sheet) ── */}
      {!sheetOpen && (
        <div style={s.quickRow}>
          <button style={s.quickBtn('#6bcb77')} onClick={() => handleSendAction(MAP_ACTIONS[0])}>
            💨 Đang đến
          </button>
          <button style={s.quickBtn('#ffd93d')} onClick={() => handleSendAction(MAP_ACTIONS[4])}>
            📡 Bạn đâu?
          </button>
          <button style={{ ...s.mapBtn, position: 'relative', pointerEvents: 'auto', background: 'rgba(255,107,107,0.15)', borderColor: 'rgba(255,107,107,0.4)' }}
            onClick={() => setSheetOpen(true)}>
            💕
          </button>
        </div>
      )}

      {/* ── Incoming action toast ── */}
      {incomingAction && actionDef && incomingAction.type !== 'meeting_point' && (
        <div style={s.incomingToast}>
          <div style={s.toastEmoji}>{actionDef.emoji}</div>
          <div style={s.toastText}>
            <div style={s.toastTitle}>{actionDef.toastTitle}</div>
            <div style={s.toastSub}>{actionDef.toastSub}</div>
          </div>
          <div style={s.toastClose} onClick={clearIncomingAction}>×</div>
        </div>
      )}

      {/* ── Bottom sheet ── */}
      <div style={s.sheet(sheetOpen)}>
        <div style={s.sheetHandle} onClick={() => setSheetOpen(false)} />

        {/* Partner info */}
        <div style={s.partnerRow}>
          <div style={s.partnerAvatar(PARTNER_COLOR)}>
            {partnerProfile?.avatar_url
              ? <img src={partnerProfile.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : (partnerProfile?.display_name?.charAt(0) || '❤')
            }
          </div>
          <div>
            <div style={s.partnerName}>{partnerProfile?.display_name || 'Người ấy'}</div>
            <div style={s.partnerMeta}>
              {partnerPresence
                ? `${partnerStatusObj?.emoji} ${partnerStatusObj?.label}`
                : 'Chưa chia sẻ vị trí'
              }
              {partnerPresence?.lastUpdated && (
                <> · {new Date(partnerPresence.lastUpdated).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</>
              )}
            </div>
          </div>
          {partnerLocation && (
            <button
              style={{ marginLeft: 'auto', padding: '6px 12px', borderRadius: 10, background: 'rgba(77,150,255,0.15)', border: '1px solid rgba(77,150,255,0.3)', color: '#4d96ff', fontSize: 12, cursor: 'pointer' }}
              onClick={() => { setFlyTo(partnerLocation); setSheetOpen(false); }}
            >
              Xem vị trí
            </button>
          )}
        </div>

        {/* My status picker */}
        <div style={s.sectionLabel}>Trạng thái của bạn</div>
        <div style={s.statusRow}>
          {STATUS_OPTIONS.map(st => (
            <button key={st.id} style={s.statusChip(myStatus === st.id)}
              onClick={() => updateStatus(st.id)}>
              {st.emoji} {st.label}
            </button>
          ))}
        </div>

        {/* Map actions */}
        <div style={s.sectionLabel}>Gửi cho người ấy</div>
        <div style={s.actionGrid}>
          {MAP_ACTIONS.map(action => (
            <button
              key={action.id}
              style={{ ...s.actionBtn(action.color), opacity: actionCooldown[action.id] ? 0.4 : 1 }}
              onClick={() => handleSendAction(action)}
            >
              <div style={s.actionIcon}>{action.emoji}</div>
              <div style={s.actionLabel}>{action.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Together overlay */}
      {together && !sheetOpen && (
        <div style={s.togetherBadge}>
          <div style={{ fontSize: 48, animation: 'heartPulse 1.5s ease infinite' }}>💕</div>
        </div>
      )}
    </div>
  );
}
