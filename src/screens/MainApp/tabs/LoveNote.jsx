import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { sendPushNotification } from '../../../lib/coupleService';

const MAX_CHARS = 200;

const s = {
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: '#0d0d0d',
    padding: '16px',
    gap: 16,
  },
  header: {
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 800,
    color: '#fff',
    marginBottom: 4,
  },
  headerSub: {
    fontSize: 13,
    color: '#888',
  },
  noteArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  noteCard: (side) => ({
    flex: 1,
    background: side === 'mine' ? 'rgba(255,107,107,0.08)' : 'rgba(77,150,255,0.08)',
    border: `1px solid ${side === 'mine' ? 'rgba(255,107,107,0.2)' : 'rgba(77,150,255,0.2)'}`,
    borderRadius: 16,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    transition: 'border-color 0.3s',
  }),
  noteLabel: (side) => ({
    fontSize: 11,
    fontWeight: 700,
    color: side === 'mine' ? '#ff6b6b' : '#4d96ff',
    textTransform: 'uppercase',
    letterSpacing: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  typingDots: {
    display: 'flex',
    gap: 3,
    alignItems: 'center',
  },
  dot: (delay) => ({
    width: 4,
    height: 4,
    borderRadius: '50%',
    background: '#4d96ff',
    animation: 'bounce 1.2s ease infinite',
    animationDelay: delay,
  }),
  textarea: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#fff',
    fontSize: 16,
    resize: 'none',
    fontFamily: 'inherit',
    lineHeight: 1.6,
    letterSpacing: 0.3,
  },
  remoteText: {
    flex: 1,
    color: '#e0e0e0',
    fontSize: 16,
    lineHeight: 1.6,
    letterSpacing: 0.3,
    minHeight: 60,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  cursor: {
    display: 'inline-block',
    width: 2,
    height: '1em',
    background: '#4d96ff',
    verticalAlign: 'text-bottom',
    animation: 'blink 1s step-end infinite',
    marginLeft: 1,
  },
  charCount: {
    fontSize: 11,
    color: '#555',
    alignSelf: 'flex-end',
  },
  sendBtn: {
    width: '100%',
    padding: '14px',
    borderRadius: 14,
    background: 'linear-gradient(135deg, #ff6b6b, #ff8c42)',
    border: 'none',
    color: '#fff',
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: 0.5,
    flexShrink: 0,
    transition: 'opacity 0.2s, transform 0.1s',
  },
  emptyHint: {
    color: '#444',
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 1.6,
  },
  sentToast: {
    position: 'fixed',
    bottom: 90,
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px 20px',
    borderRadius: 20,
    background: 'rgba(255,107,107,0.9)',
    color: '#fff',
    fontSize: 13,
    fontWeight: 600,
    pointerEvents: 'none',
    animation: 'slideUp 2.5s ease forwards',
    zIndex: 100,
  },
};

export default function LoveNote({ roomId, userId, myName, partnerName, partnerId }) {
  const [myText, setMyText] = useState('');
  const [partnerText, setPartnerText] = useState('');
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const channelRef = useRef(null);
  const typingTimerRef = useRef(null);
  const partnerTimerRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;
    const channel = supabase.channel(`lovenote:${roomId}`, {
      config: { broadcast: { self: false } },
    });

    channel
      .on('broadcast', { event: 'typing' }, ({ payload }) => {
        if (payload.userId !== userId) {
          setPartnerText(payload.text || '');
          setIsPartnerTyping(true);
          clearTimeout(partnerTimerRef.current);
          partnerTimerRef.current = setTimeout(() => setIsPartnerTyping(false), 2000);
        }
      })
      .on('broadcast', { event: 'send_note' }, ({ payload }) => {
        if (payload.userId !== userId) {
          setPartnerText(payload.text || '');
          setIsPartnerTyping(false);
        }
      })
      .subscribe();

    channelRef.current = channel;
    return () => {
      clearTimeout(typingTimerRef.current);
      clearTimeout(partnerTimerRef.current);
      supabase.removeChannel(channel);
    };
  }, [roomId, userId]);

  const handleChange = (e) => {
    const val = e.target.value.slice(0, MAX_CHARS);
    setMyText(val);

    // Broadcast typing realtime
    clearTimeout(typingTimerRef.current);
    channelRef.current?.send({
      type: 'broadcast',
      event: 'typing',
      payload: { userId, text: val },
    });
  };

  const handleSend = async () => {
    if (!myText.trim()) return;

    channelRef.current?.send({
      type: 'broadcast',
      event: 'send_note',
      payload: { userId, text: myText },
    });

    // Lưu vào DB – bỏ .maybeSingle()
    const { error: insertError } = await supabase.from('answers').insert({
      room_id: roomId,
      user_id: userId,
      date_key: `love_${Date.now()}`,
      question_vi: '💌 Love Note',
      question_en: 'Love Note',
      answer_text: myText,
    });
    if (insertError) {
      console.error('❌ Lưu Love Note thất bại:', insertError.message);
    }

    // Gửi push notification cho partner
    if (partnerId) {
      sendPushNotification(
        partnerId,
        `${myName} vừa gửi một Love Note: “${myText.slice(0, 80)}${myText.length > 80 ? '…' : ''}”`
      );
    }

    setMyText('');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <div style={s.wrap}>
      <style>{`
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes slideUp { 0%{opacity:0;transform:translate(-50%,10px)} 15%{opacity:1;transform:translate(-50%,0)} 80%{opacity:1} 100%{opacity:0} }
      `}</style>

      <div style={s.header}>
        <div style={s.headerTitle}>💌 Love Note</div>
        <div style={s.headerSub}>Gõ gì là người ấy thấy ngay~</div>
      </div>

      <div style={s.noteArea}>
        {/* Phần của người ấy */}
        <div style={s.noteCard('partner')}>
          <div style={s.noteLabel('partner')}>
            <span>💙 {partnerName || 'Người ấy'}</span>
            {isPartnerTyping && (
              <div style={s.typingDots}>
                <div style={s.dot('0s')} />
                <div style={s.dot('0.2s')} />
                <div style={s.dot('0.4s')} />
              </div>
            )}
          </div>
          <div style={s.remoteText}>
            {partnerText
              ? <>{partnerText}{isPartnerTyping && <span style={s.cursor} />}</>
              : <span style={s.emptyHint}>Chờ {partnerName || 'người ấy'} nhắn...</span>
            }
          </div>
        </div>

        {/* Phần của mình */}
        <div style={s.noteCard('mine')}>
          <div style={s.noteLabel('mine')}>
            <span>❤️ {myName || 'Bạn'}</span>
            <span style={s.charCount}>{myText.length}/{MAX_CHARS}</span>
          </div>
          <textarea
            style={s.textarea}
            value={myText}
            onChange={handleChange}
            placeholder="Nhắn gì đó thật ngọt nhé... 🍬"
            rows={4}
          />
        </div>
      </div>

      <button
        style={{ ...s.sendBtn, opacity: myText.trim() ? 1 : 0.4 }}
        onClick={handleSend}
      >
        💌 Gửi Love Note
      </button>

      {showToast && <div style={s.sentToast}>💌 Đã gửi tới người ấy!</div>}
    </div>
  );
}