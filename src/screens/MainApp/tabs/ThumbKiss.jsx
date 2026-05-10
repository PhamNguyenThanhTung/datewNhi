import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../../../lib/supabaseClient';

const SYNC_THRESHOLD = 60; // Khoảng cách (px) để tính là chạm nhau
const VIBRATION_MS = [50, 30, 100];

const s = {
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: '#0d0d0d',
    padding: '20px 16px',
    overflow: 'hidden',
    userSelect: 'none',
  },
  card: {
    flex: 1,
    background: '#16161a',
    borderRadius: 24,
    border: '1px solid rgba(255,255,255,0.06)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column',
    padding: '32px 20px 20px',
    position: 'relative',
  },
  titleBox: {
    textAlign: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 800,
    color: '#fff',
    marginBottom: 8,
  },
  sub: {
    fontSize: 13,
    color: '#888',
  },
  touchZone: {
    flex: 1,
    position: 'relative',
    background: '#111',
    borderRadius: 20,
    border: '1px solid rgba(255,255,255,0.08)',
    overflow: 'hidden',
    touchAction: 'none', // Chặn cuộn trang khi vuốt
  },
  centerGuide: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#555',
    fontSize: 13,
    fontWeight: 600,
    pointerEvents: 'none',
    zIndex: 1,
  },
  myDot: (pos, kissing) => ({
    position: 'absolute',
    left: pos ? pos.x : 60,
    top: pos ? pos.y : '50%',
    transform: 'translate(-50%, -50%)',
    width: kissing ? 100 : 70,
    height: kissing ? 100 : 70,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,107,157,0.7) 0%, rgba(255,107,157,0.1) 100%)',
    border: '2px solid rgba(255,107,157,0.4)',
    boxShadow: kissing ? '0 0 40px rgba(255,107,157,0.6)' : '0 0 20px rgba(255,107,157,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: kissing ? 40 : 28,
    pointerEvents: 'none',
    zIndex: 3,
    transition: pos ? 'width 0.2s, height 0.2s, box-shadow 0.2s' : 'all 0.5s ease',
    opacity: pos ? 1 : 0.6,
  }),
  partnerDot: (pos, kissing) => ({
    position: 'absolute',
    left: pos ? pos.x : 'calc(100% - 60px)',
    top: pos ? pos.y : '50%',
    transform: 'translate(-50%, -50%)',
    width: kissing ? 100 : 70,
    height: kissing ? 100 : 70,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(77,150,255,0.7) 0%, rgba(77,150,255,0.1) 100%)',
    border: '2px solid rgba(77,150,255,0.4)',
    boxShadow: kissing ? '0 0 40px rgba(77,150,255,0.6)' : '0 0 20px rgba(77,150,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: kissing ? 40 : 28,
    pointerEvents: 'none',
    zIndex: 3,
    transition: pos ? 'width 0.2s, height 0.2s, box-shadow 0.2s' : 'all 0.5s ease',
    opacity: pos ? 1 : 0.6,
  }),
  footerText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    lineHeight: 1.6,
    margin: '24px 0',
  },
  statusBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: 14,
    border: '1px solid rgba(255,255,255,0.05)',
  },
};

// Hiệu ứng hạt (Particles) khi 2 chấm chạm nhau
function HeartParticle({ x, y }) {
  const rot = (Math.random() - 0.5) * 60;
  const style = {
    position: 'absolute',
    left: x,
    top: y,
    transform: `translate(-50%, -50%) rotate(${rot}deg)`,
    fontSize: Math.random() > 0.5 ? 24 : 16,
    animation: `heartFloat ${0.8 + Math.random() * 0.6}s ease-out forwards`,
    animationDelay: `${Math.random() * 0.2}s`,
    pointerEvents: 'none',
    zIndex: 5,
  };
  return <div style={style}>{'💕💖💗💓'[Math.floor(Math.random() * 4)]}</div>;
}

export default function ThumbKiss({ roomId, userId, partnerName }) {
  const [myPos, setMyPos] = useState(null);
  const [partnerPos, setPartnerPos] = useState(null);
  const [isPressed, setIsPressed] = useState(false);
  const [isKissing, setIsKissing] = useState(false);
  const [partnerOnline, setPartnerOnline] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [kissCount, setKissCount] = useState(0);
  
  const channelRef = useRef(null);
  const kissTimerRef = useRef(null);
  const areaRef = useRef(null); // Ref cho khung vẽ

  // 1. Khởi tạo Supabase Realtime
  useEffect(() => {
    if (!roomId) return;
    const channel = supabase.channel(`thumbkiss:${roomId}`, {
      config: { broadcast: { self: false } },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const others = Object.values(state).flat().filter(p => p.userId !== userId);
        setPartnerOnline(others.length > 0);
      })
      .on('broadcast', { event: 'pos' }, ({ payload }) => {
        if (payload.userId !== userId) setPartnerPos(payload.pos);
      })
      .on('broadcast', { event: 'lift' }, ({ payload }) => {
        if (payload.userId !== userId) setPartnerPos(null);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ userId, joinedAt: Date.now() });
        }
      });

    channelRef.current = channel;
    return () => supabase.removeChannel(channel);
  }, [roomId, userId]);

  // 2. Logic tính toán khoảng cách chạm (Kiss)
  useEffect(() => {
    if (!myPos || !partnerPos) {
      setIsKissing(false);
      return;
    }
    const dist = Math.hypot(myPos.x - partnerPos.x, myPos.y - partnerPos.y);
    const kissing = dist < SYNC_THRESHOLD;

    if (kissing && !isKissing) {
      setIsKissing(true);
      setKissCount(c => c + 1);
      
      // Rung điện thoại
      if (navigator.vibrate) navigator.vibrate(VIBRATION_MS);
      
      // Bắn tim
      const newHearts = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: myPos.x + (Math.random() - 0.5) * 60,
        y: myPos.y + (Math.random() - 0.5) * 60,
      }));
      setHearts(h => [...h, ...newHearts]);
      
      clearTimeout(kissTimerRef.current);
      kissTimerRef.current = setTimeout(() => setHearts([]), 1500);
    } else if (!kissing) {
      setIsKissing(false);
    }
  }, [myPos, partnerPos, isKissing]);

  // 3. Hàm xử lý tọa độ chuột / cảm ứng
  const startInteraction = useCallback((clientX, clientY) => {
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pos = { x: clientX - rect.left, y: clientY - rect.top };
    setMyPos(pos);
    setIsPressed(true);
    channelRef.current?.send({ type: 'broadcast', event: 'pos', payload: { userId, pos } });
  }, [userId]);

  const moveInteraction = useCallback((clientX, clientY) => {
    if (!isPressed) return;
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pos = { x: clientX - rect.left, y: clientY - rect.top };
    setMyPos(pos);
    channelRef.current?.send({ type: 'broadcast', event: 'pos', payload: { userId, pos } });
  }, [userId, isPressed]);

  const endInteraction = useCallback(() => {
    setMyPos(null);
    setIsPressed(false);
    setIsKissing(false);
    channelRef.current?.send({ type: 'broadcast', event: 'lift', payload: { userId } });
  }, [userId]);

  return (
    <div style={s.wrap}>
      <style>{`
        @keyframes heartFloat {
          0% { opacity: 1; margin-top: 0; scale: 1; }
          100% { opacity: 0; margin-top: -80px; scale: 0.5; }
        }
      `}</style>

      <div style={s.card}>
        <div style={s.titleBox}>
          <div style={s.title}>Chạm vào màn hình~</div>
          <div style={s.sub}>Di ngón tay tới cùng điểm để gửi nụ hôn 💋</div>
        </div>

        {/* Khung tương tác vuốt chạm */}
        <div
          ref={areaRef}
          style={s.touchZone}
          onTouchStart={e => { e.preventDefault(); startInteraction(e.touches[0].clientX, e.touches[0].clientY); }}
          onTouchMove={e => { e.preventDefault(); moveInteraction(e.touches[0].clientX, e.touches[0].clientY); }}
          onTouchEnd={endInteraction}
          onMouseDown={e => startInteraction(e.clientX, e.clientY)}
          onMouseMove={e => moveInteraction(e.clientX, e.clientY)}
          onMouseUp={endInteraction}
          onMouseLeave={endInteraction}
        >
          {/* Chữ chìm ở giữa khung */}
          <div style={s.centerGuide}>Kéo lại gần nhau~</div>

          {/* Cục tròn của Tùng (Màu Đỏ/Hồng) */}
          <div style={s.myDot(myPos, isKissing)}>
            {isKissing ? '💋' : '💖'}
          </div>

          {/* Cục tròn của Nhi (Màu Xanh) */}
          <div style={s.partnerDot(partnerPos, isKissing)}>
            {isKissing ? '💋' : '💙'}
          </div>

          {/* Hạt tim bay lên khi chạm nhau */}
          {hearts.map(h => <HeartParticle key={h.id} x={h.x} y={h.y} />)}
        </div>

        <div style={s.footerText}>
          Khi hai ngón tay chạm nhau<br />
          điện thoại sẽ rung và hiện tim 💕
        </div>

        {/* Thanh trạng thái phía dưới cùng */}
        <div style={s.statusBar}>
          <div style={{ fontSize: 12, color: '#888', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: partnerOnline ? '#6bcb77' : '#555',
              boxShadow: partnerOnline ? '0 0 6px #6bcb77' : 'none'
            }} />
            {partnerOnline ? `${partnerName || 'Người ấy'} đang online` : 'Chờ người ấy...'}
          </div>
          <div style={{ fontSize: 12, color: '#ff6b6b', fontWeight: 700 }}>
            💕 {kissCount} nụ hôn
          </div>
        </div>
      </div>
    </div>
  );
}