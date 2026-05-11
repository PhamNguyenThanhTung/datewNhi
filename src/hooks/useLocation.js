import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  startWatchingPosition,
  stopWatchingPosition,
  uploadLocation,
  createLocationChannel,
  calculateDistance,
  sendMapInteraction,
} from '../lib/locationService';

const UPLOAD_INTERVAL_MS = 15000; // Gửi vị trí lên Supabase mỗi 15s

export default function useLocation({ userId, roomId, enabled = true }) {
  const [myLocation, setMyLocation]         = useState(null);  // { lat, lng, accuracy }
  const [partnerLocation, setPartnerLocation] = useState(null);
  const [partnerPresence, setPartnerPresence] = useState(null); // { status, lastUpdated, ... }
  const [myStatus, setMyStatus]             = useState('active');
  const [distance, setDistance]             = useState(null);
  const [permissionState, setPermissionState] = useState('unknown'); // unknown | granted | denied
  const [isTracking, setIsTracking]         = useState(false);
  const [incomingAction, setIncomingAction] = useState(null); // map_action từ partner

  const watchIdRef    = useRef(null);
  const channelRef    = useRef(null);
  const uploadTimer   = useRef(null);
  const lastLocationRef = useRef(null);

  // ─── Upload throttled ────────────────────────────────────────────────────
  const scheduleUpload = useCallback((coords, status) => {
    clearTimeout(uploadTimer.current);
    uploadTimer.current = setTimeout(() => {
      if (roomId && userId) {
        uploadLocation({ userId, roomId, ...coords, status });
      }
    }, 2000);
  }, [userId, roomId]);

  // ─── Start tracking ──────────────────────────────────────────────────────
  const startTracking = useCallback(() => {
    if (watchIdRef.current !== null) return;

    const id = startWatchingPosition(
      (coords) => {
        setMyLocation(coords);
        setIsTracking(true);
        setPermissionState('granted');
        lastLocationRef.current = coords;

        // Presence: broadcast position to partner
        channelRef.current?.track({
          userId,
          lat: coords.lat,
          lng: coords.lng,
          accuracy: coords.accuracy,
          status: myStatus,
          lastUpdated: new Date().toISOString(),
        });

        scheduleUpload(coords, myStatus);
      },
      (err) => {
        console.error('Geolocation error:', err);
        if (err.code === 1) setPermissionState('denied');
        setIsTracking(false);
      }
    );
    watchIdRef.current = id;
  }, [userId, myStatus, scheduleUpload]);

  const stopTracking = useCallback(() => {
    stopWatchingPosition(watchIdRef.current);
    watchIdRef.current = null;
    setIsTracking(false);
  }, []);

  // ─── Update status (re-track to broadcast new status) ────────────────────
  const updateStatus = useCallback((newStatus) => {
    setMyStatus(newStatus);
    if (lastLocationRef.current) {
      channelRef.current?.track({
        userId,
        lat: lastLocationRef.current.lat,
        lng: lastLocationRef.current.lng,
        accuracy: lastLocationRef.current.accuracy,
        status: newStatus,
        lastUpdated: new Date().toISOString(),
      });
      scheduleUpload(lastLocationRef.current, newStatus);
    }
  }, [userId, scheduleUpload]);

  // ─── Send map action ─────────────────────────────────────────────────────
  const sendAction = useCallback((type, payload = {}) => {
    sendMapInteraction(channelRef.current, type, { fromUserId: userId, ...payload });
  }, [userId]);

  // ─── Supabase Presence + Broadcast channel ───────────────────────────────
  useEffect(() => {
    if (!roomId || !userId || !enabled) return;

    const channel = createLocationChannel(roomId, userId);
    channelRef.current = channel;

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        // Tìm partner
        const others = Object.entries(state)
          .filter(([key]) => key !== userId)
          .flatMap(([, presences]) => presences);

        if (others.length > 0) {
          const partner = others[0];
          setPartnerLocation({ lat: partner.lat, lng: partner.lng, accuracy: partner.accuracy });
          setPartnerPresence({
            status: partner.status || 'active',
            lastUpdated: partner.lastUpdated,
          });
        }
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        if (leftPresences.some(p => p.userId !== userId)) {
          setPartnerPresence(prev => ({ ...prev, online: false }));
        }
      })
      .on('broadcast', { event: 'map_action' }, ({ payload }) => {
        if (payload.fromUserId !== userId) {
          setIncomingAction(payload);
          // Auto-clear sau 8s
          setTimeout(() => setIncomingAction(null), 8000);
        }
      })
      .subscribe();

    // Load last known position từ DB khi mở app
    supabase
      .from('locations')
      .select('*')
      .eq('room_id', roomId)
      .neq('user_id', userId)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setPartnerLocation({ lat: data.lat, lng: data.lng, accuracy: data.accuracy });
          setPartnerPresence({ status: data.status, lastUpdated: data.last_updated, online: false });
        }
      });

    return () => {
      supabase.removeChannel(channel);
      clearTimeout(uploadTimer.current);
    };
  }, [roomId, userId, enabled]);

  // ─── Calculate distance ──────────────────────────────────────────────────
  useEffect(() => {
    if (myLocation && partnerLocation) {
      const d = calculateDistance(myLocation.lat, myLocation.lng, partnerLocation.lat, partnerLocation.lng);
      setDistance(Math.round(d));
    } else {
      setDistance(null);
    }
  }, [myLocation, partnerLocation]);

  // ─── Auto-start & stop on visibility change ──────────────────────────────
  useEffect(() => {
    if (!enabled) return;

    const handleVisibility = () => {
      if (document.hidden) {
        // Gửi lần cuối khi app vào background
        if (lastLocationRef.current && roomId && userId) {
          uploadLocation({ userId, roomId, ...lastLocationRef.current, status: myStatus });
        }
      } else {
        // Quay lại foreground: resume tracking
        startTracking();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [enabled, startTracking, myStatus, userId, roomId]);

  // ─── Cleanup ─────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => stopTracking();
  }, [stopTracking]);

  return {
    myLocation,
    partnerLocation,
    partnerPresence,
    myStatus,
    distance,
    permissionState,
    isTracking,
    incomingAction,
    startTracking,
    stopTracking,
    updateStatus,
    sendAction,
    clearIncomingAction: () => setIncomingAction(null),
  };
}
