import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { sendPushNotification } from '../../../lib/coupleService';

const POKE_TYPES = [
  { id: 'hug',    emoji: '🫂', label: 'Ôm',        color: '#ff8c42', msg: 'đang ôm bạn! 🫂', vibrate: [50, 30, 50, 30, 100] },
  { id: 'kiss',   emoji: '💋', label: 'Hôn',       color: '#ff6b6b', msg: 'gửi bạn một nụ hôn! 💋', vibrate: [80] },
  { id: 'poke',   emoji: '👉', label: 'Chọc',      color: '#ffd93d', msg: 'chọc chọc bạn! 👉', vibrate: [20, 10, 20] },
  { id: 'wave',   emoji: '👋', label: 'Vẫy tay',   color: '#6bcb77', msg: 'vẫy tay chào bạn! 👋', vibrate: [30, 20, 30, 20, 30] },
  { id: 'heart',  emoji: '❤️', label: 'Yêu',       color: '#ff6b6b', msg: 'gửi bạn tình yêu! ❤️', vibrate: [60, 20, 60] },
  { id: 'blink',  emoji: '😉', label: 'Nháy mắt', color: '#a29bfe', msg: 'nháy mắt với bạn! 😉', vibrate: [40] },
  { id: 'miss',   emoji: '🥺', label: 'Nhớ',       color: '#4d96ff', msg: 'đang nhớ bạn! 🥺', vibrate: [100, 30, 100] },
  { id: 'morning',emoji: '☀️', label: 'Buổi sáng', color: '#ffd93d', msg: 'chúc bạn buổi sáng vui! ☀️', vibrate: [30, 20, 30] },
  { id: 'night',  emoji: '🌙', label: 'Ngủ ngon',  color: '#6c5ce7', msg: 'chúc bạn ngủ ngon! 🌙', vibrate: [100] },
];

const COOLDOWN_MS = 3000;

const s = {
  wrap: { display: 'flex', flexDirection: 'column', height: '100%', background: '#0d0d0d', overflow: 'hidden' },
  header: { padding: '20px 20px 8px', textAlign: 'center', flexShrink: 0 },
  headerTitle: { fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 4 },
  headerSub: { fontSize: 13, color: '#888' },
  inboxSection: { margin: '0 16px 12px', flexShrink: 0 },
  inboxLabel: { fontSize: 11, color: '#666', fontWeight: 700, letterSpacing: 1, marginBottom: 8, textTransform: 'uppercase' },
  inboxCard: (visible) => ({
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 14,
    padding: visible ? '14px 16px' : '0 16px',
    overflow: 'hidden',
    maxHeight: visible ? 200 : 0,
    transition: 'max-height 0.3s ease, padding 0.3s ease',
  }),
  notifList: { display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 150, overflowY: 'auto' },
  notifItem: { display: 'flex', alignItems: 'center', gap: 10, animation: 'slideIn 0.3s ease' },
  notifEmoji: (color) => ({ fontSize: 22, width: 40, height: 40, borderRadius: 12, background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }),
  notifText: { flex: 1 },
  notifMsg: { fontSize: 14, color: '#fff', lineHeight: 1.4 },
  notifTime: { fontSize: 11, color: '#666' },
  emptyInbox: { textAlign: 'center', padding: '12px 0', color: '#555', fontSize: 13 },
  grid: { flex: 1, padding: '0 16px 16px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, alignContent: 'start', overflowY: 'auto' },
  pokeBtn: (color, cooldown) => ({
    aspectRatio: '1',
    borderRadius: 16,
    background: cooldown ? 'rgba(255,255,255,0.03)' : `${color}15`,
    border: `1px solid ${cooldown ? 'rgba(255,255,255,0.06)' : `${color}40`}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    cursor: cooldown ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s',
    position: 'relative',
    overflow: 'hidden',
    opacity: cooldown ? 0.4 : 1,
    transform: 'scale(1)',
    WebkitTapHighlightColor: 'transparent',
  }),
  pokeEmoji: { fontSize: 28, lineHeight: 1 },
  pokeLabel: { fontSize: 11, color: '#bbb', fontWeight: 600 },
  cooldownOverlay: { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 16 },
  cooldownText: { fontSize: 14, fontWeight: 700, color: '#fff' },
  incomingOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.85)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    gap: 12,
    animation: 'fadeIn 0.2s ease',
  },
  incomingEmoji: { fontSize: 80, animation: 'pulse 0.5s ease infinite alternate' },
  incomingText: { fontSize: 18, color: '#fff', textAlign: 'center', fontWeight: 600, maxWidth: 260 },
  dismissBtn: { marginTop: 8, padding: '12px 28px', borderRadius: 12, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 14, cursor: 'pointer' },
};

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
}

export default function Pokes({ roomId, userId, partnerName, partnerId, myName }) {
  const [notifications, setNotifications] = useState([]);
  const [cooldowns, setCooldowns] = useState({});
  const [incoming, setIncoming] = useState(null);
  const channelRef = useRef(null);
  const dismissTimerRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;
    const channel = supabase.channel(`pokes:${roomId}`, {
      config: { broadcast: { self: false } },
    });

    channel
      .on('broadcast', { event: 'poke' }, ({ payload }) => {
        if (payload.fromId === userId) return;
        const poke = POKE_TYPES.find(p => p.id === payload.pokeId);
        if (!poke) return;
        // Vibrate
        if (navigator.vibrate) navigator.vibrate(poke.vibrate || [50]);
        // Show incoming overlay
        setIncoming({ poke, from: payload.fromName || partnerName, ts: Date.now() });
        clearTimeout(dismissTimerRef.current);
        dismissTimerRef.current = setTimeout(() => setIncoming(null), 4000);
        // Add to inbox
        setNotifications(n => [{
          id: Date.now(),
          pokeId: poke.id,
          emoji: poke.emoji,
          color: poke.color,
          msg: `${payload.fromName || partnerName} ${poke.msg}`,
          ts: Date.now(),
        }, ...n].slice(0, 20));
      })
      .subscribe();

    channelRef.current = channel;
    return () => {
      clearTimeout(dismissTimerRef.current);
      supabase.removeChannel(channel);
    };
  }, [roomId, userId, partnerName]);

  const sendPoke = (poke) => {
    if (cooldowns[poke.id]) return;
    
    // Gửi realtime vào trong app
    channelRef.current?.send({
      type: 'broadcast',
      event: 'poke',
      payload: { fromId: userId, fromName: myName || 'Bạn', pokeId: poke.id },
    });
    
    // Bắn thông báo đẩy ra ngoài màn hình khóa của Nhi
    if (partnerId) {
      sendPushNotification(partnerId, `${myName} vừa ${poke.label.toLowerCase()} bạn: ${poke.msg}`);
    }

    // Cooldown 3 giây (đã fix lại cho mượt)
    setCooldowns(c => ({ ...c, [poke.id]: true }));
    setTimeout(() => {
      setCooldowns(c => ({ ...c, [poke.id]: false }));
    }, COOLDOWN_MS);
  };

  return (
    <div style={s.wrap}>
      <style>{`
        @keyframes slideIn { from { opacity:0; transform:translateX(-10px) } to { opacity:1; transform:none } }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes pulse { from { transform:scale(1) } to { transform:scale(1.15) } }
      `}</style>

      <div style={s.header}>
        <div style={s.headerTitle}>👉 Pokes</div>
        <div style={s.headerSub}>Gửi tín hiệu ngọt ngào tới người ấy~</div>
      </div>

      <div style={s.inboxSection}>
        <div style={s.inboxLabel}>📬 Nhận được ({notifications.length})</div>
        <div style={s.inboxCard(notifications.length > 0)}>
          {notifications.length === 0 ? (
            <div style={s.emptyInbox}>Chưa có gì... Chờ người ấy thôi~ 🌸</div>
          ) : (
            <div style={s.notifList}>
              {notifications.map(n => (
                <div key={n.id} style={s.notifItem}>
                  <div style={s.notifEmoji(n.color)}>{n.emoji}</div>
                  <div style={s.notifText}>
                    <div style={s.notifMsg}>{n.msg}</div>
                    <div style={s.notifTime}>{formatTime(n.ts)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={s.grid}>
        {POKE_TYPES.map(poke => {
          const cd = cooldowns[poke.id];
          return (
            <button
              key={poke.id}
              style={s.pokeBtn(poke.color, cd)}
              onClick={() => sendPoke(poke)}
              onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.93)'; }}
              onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <div style={s.pokeEmoji}>{poke.emoji}</div>
              <div style={s.pokeLabel}>{poke.label}</div>
              {cd && (
                <div style={s.cooldownOverlay}>
                  <div style={s.cooldownText}>✓</div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Incoming overlay */}
      {incoming && (
        <div style={s.incomingOverlay} onClick={() => setIncoming(null)}>
          <div style={s.incomingEmoji}>{incoming.poke.emoji}</div>
          <div style={s.incomingText}>
            {incoming.from} {incoming.poke.msg}
          </div>
          <button style={s.dismissBtn} onClick={() => setIncoming(null)}>OK~ 💕</button>
        </div>
      )}
    </div>
  );
}
