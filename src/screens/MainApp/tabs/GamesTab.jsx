import { useState } from 'react';
import DrawTogether from './games/DrawTogether';
import DrawAndGuess from './games/DrawAndGuess';
import LoveNote from './LoveNote';
import ThumbKiss from './ThumbKiss';
import Pokes from './Pokes';
import { sendPushNotification } from '../../../lib/coupleService';

const FEATURES = [
  {
    id: 'draw_together',
    emoji: '🖌️',
    label: 'Vẽ Chung',
    desc: 'Cùng vẽ trên một tờ giấy',
    color: '#ff8c42',
    tag: 'LIVE',
  },
  {
    id: 'draw_guess',
    emoji: '🎨',
    label: 'Vẽ & Đoán',
    desc: 'Vẽ để người ấy đoán',
    color: '#a29bfe',
    tag: 'GAME',
  },
  {
    id: 'love_note',
    emoji: '💌',
    label: 'Love Note',
    desc: 'Gõ chữ hiện sang máy người ấy',
    color: '#ff6b6b',
    tag: 'REALTIME',
  },
  {
    id: 'thumb_kiss',
    emoji: '👆',
    label: 'Thumb Kiss',
    desc: 'Chạm cùng điểm để gửi nụ hôn',
    color: '#6bcb77',
    tag: 'TOUCH',
  },
  {
    id: 'pokes',
    emoji: '👉',
    label: 'Pokes',
    desc: 'Gửi tín hiệu nhanh cho nhau',
    color: '#ffd93d',
    tag: 'INSTANT',
  },
];

const s = {
  wrap: { display: 'flex', flexDirection: 'column', height: '100%', background: '#0d0d0d', overflow: 'hidden' },
  
  // Hub
  hubWrap: { flex: 1, overflow: 'auto' },
  hubHeader: { padding: '28px 20px 16px', textAlign: 'center' },
  hubTitle: { fontSize: 26, fontWeight: 900, color: '#fff', marginBottom: 6, letterSpacing: -0.5 },
  hubSub: { fontSize: 14, color: '#888', lineHeight: 1.5 },
  hubGrid: { padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 10 },
  featureCard: (color) => ({
    background: `${color}10`,
    border: `1px solid ${color}30`,
    borderRadius: 18,
    padding: '16px 18px',
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    cursor: 'pointer',
    transition: 'all 0.2s',
    WebkitTapHighlightColor: 'transparent',
    position: 'relative',
    overflow: 'hidden',
  }),
  featureEmoji: { fontSize: 32, flexShrink: 0, lineHeight: 1 },
  featureInfo: { flex: 1 },
  featureLabel: { fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 2 },
  featureDesc: { fontSize: 13, color: '#888', lineHeight: 1.4 },
  featureTag: (color) => ({
    padding: '3px 8px',
    borderRadius: 6,
    background: `${color}25`,
    color,
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 0.5,
    flexShrink: 0,
  }),
  featureArrow: { color: '#555', fontSize: 18, flexShrink: 0 },

  // Back header (Giữ nguyên của Tùng)
  backBar: {
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: 'rgba(255,255,255,0.03)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    flexShrink: 0,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    flexShrink: 0,
  },
  backTitle: { color: '#fff', fontWeight: 700, fontSize: 16 },
  featureContent: { flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' },
  inviteBtn: { background: 'linear-gradient(135deg, #ff6b9d, #a78bfa)', border: 'none', borderRadius: 99, padding: '8px 16px', color: '#fff', fontSize: 12, fontWeight: 800, cursor: 'pointer', marginTop: 12, boxShadow: '0 4px 12px rgba(255,107,157,0.3)' }
};

export default function GamesTab({ roomId, userId, myName, partnerName, partnerId, partnerJoined }) {
  const [activeFeature, setActiveFeature] = useState(null);
  const activeF = FEATURES.find(f => f.id === activeFeature);

const handleInvite = () => {
  if (partnerId) {
    sendPushNotification(partnerId, `${myName} đang đợi ${partnerName} ở Góc Vui nè! Vào chơi thôi! 🎮✨`);
    alert(`Đã rung chuông gọi ${partnerName} thành công!`);
  } else {
    alert(`Người ấy (${partnerName}) chưa tham gia phòng nên không thể gọi được đâu!`);
  }
};

  // ✅ Hiển thị Game với CSS chuẩn của Tùng
  if (activeFeature) {
    return (
      <div style={s.wrap}>
        <div style={s.backBar}>
          <button style={s.backBtn} onClick={() => setActiveFeature(null)}>←</button>
          <div style={s.backTitle}>{activeF?.emoji} {activeF?.label}</div>
        </div>
        
        <div style={s.featureContent}>
          {activeFeature === 'draw_together' && <DrawTogether roomId={roomId} userId={userId} partnerName={partnerName} />}
          {activeFeature === 'draw_guess' && <DrawAndGuess roomId={roomId} userId={userId} partnerName={partnerName} />}
          {activeFeature === 'love_note' && <LoveNote roomId={roomId} userId={userId} myName={myName} partnerName={partnerName} />}
          {activeFeature === 'thumb_kiss' && <ThumbKiss roomId={roomId} userId={userId} partnerName={partnerName} />}
          
          {/* TRUYỀN partnerId VÀ myName XUỐNG POKES */}
          {activeFeature === 'pokes' && (
            <Pokes roomId={roomId} userId={userId} partnerName={partnerName} partnerId={partnerId} myName={myName} />
          )}
        </div>
      </div>
    );
  }

  // ✅ Hiển thị Menu chính
  return (
    <div style={s.wrap}>
      <div style={s.hubWrap}>
        <div style={s.hubHeader}>
          <div style={s.hubTitle}>🎮 Góc Vui</div>
          <div style={s.hubSub}>Kết nối với {partnerName} theo những cách thú vị~</div>
          
          {/* NÚT RUNG CHUÔNG GỌI NGƯỜI ẤY */}
          <button style={s.inviteBtn} onClick={handleInvite}>
            🔔 Gọi {partnerName} vào chơi
          </button>
        </div>
        
        <div style={s.hubGrid}>
          {FEATURES.map(f => (
            <div 
              key={f.id} 
              style={s.featureCard(f.color)} 
              onClick={() => setActiveFeature(f.id)}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.01)'; e.currentTarget.style.borderColor = `${f.color}60`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = `${f.color}30`; }}
            >
              <div style={s.featureEmoji}>{f.emoji}</div>
              <div style={s.featureInfo}>
                <div style={s.featureLabel}>{f.label}</div>
                <div style={s.featureDesc}>{f.desc}</div>
              </div>
              <div style={s.featureTag(f.color)}>{f.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}