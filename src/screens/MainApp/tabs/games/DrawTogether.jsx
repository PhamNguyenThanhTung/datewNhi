import { useRef, useState, useCallback, useEffect } from 'react';
import CanvasCore from '../../../../components/canvas/CanvasCore';
import { supabase } from '../../../../lib/supabaseClient';

const COLORS = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff9ef5', '#ffffff', '#ff8c42', '#a29bfe'];
const BRUSH_SIZES = [2, 4, 8, 16];

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: '#0d0d0d',
    position: 'relative',
    userSelect: 'none',
  },
  header: {
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(255,255,255,0.03)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    flexShrink: 0,
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  onlineDot: (isPartnerOnline) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: isPartnerOnline ? '#6bcb77' : '#555',
    boxShadow: isPartnerOnline ? '0 0 6px #6bcb77' : 'none',
    transition: 'all 0.3s',
  }),
  partnerStatus: {
    fontSize: 11,
    color: '#888',
  },
  canvasContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    background: '#1a1a1a',
  },
  toolbar: {
    padding: '10px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: 'rgba(255,255,255,0.03)',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    flexShrink: 0,
    overflowX: 'auto',
  },
  colorBtn: (c, isActive) => ({
    width: isActive ? 28 : 22,
    height: isActive ? 28 : 22,
    borderRadius: '50%',
    background: c,
    border: isActive ? '2px solid #fff' : '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.15s',
    flexShrink: 0,
    boxShadow: isActive ? `0 0 8px ${c}` : 'none',
  }),
  sizeBtn: (s, isActive) => ({
    width: 36,
    height: 36,
    borderRadius: 8,
    background: isActive ? 'rgba(255,107,107,0.2)' : 'rgba(255,255,255,0.05)',
    border: isActive ? '1px solid rgba(255,107,107,0.5)' : '1px solid rgba(255,255,255,0.1)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'all 0.15s',
  }),
  sizeDot: (s) => ({
    width: Math.min(s * 2, 20),
    height: Math.min(s * 2, 20),
    borderRadius: '50%',
    background: '#ff6b6b',
  }),
  toolBtn: (isActive) => ({
    width: 36,
    height: 36,
    borderRadius: 8,
    background: isActive ? 'rgba(255,107,107,0.2)' : 'rgba(255,255,255,0.05)',
    border: isActive ? '1px solid rgba(255,107,107,0.5)' : '1px solid rgba(255,255,255,0.1)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    transition: 'all 0.15s',
    flexShrink: 0,
  }),
  divider: {
    width: 1,
    height: 28,
    background: 'rgba(255,255,255,0.1)',
    flexShrink: 0,
  },
  clearBtn: {
    marginLeft: 'auto',
    padding: '6px 14px',
    borderRadius: 8,
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#888',
    fontSize: 12,
    cursor: 'pointer',
    flexShrink: 0,
  },
  saveBtn: {
    padding: '6px 14px',
    borderRadius: 8,
    background: 'linear-gradient(135deg, #ff6b6b, #ff8c42)',
    border: 'none',
    color: '#fff',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    flexShrink: 0,
  },
  remoteTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: '4px 10px',
    borderRadius: 20,
    background: 'rgba(107,203,119,0.15)',
    border: '1px solid rgba(107,203,119,0.3)',
    color: '#6bcb77',
    fontSize: 11,
    fontWeight: 600,
    opacity: 0,
    transition: 'opacity 0.3s',
  },
  savedToast: {
    position: 'absolute',
    top: 12,
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '8px 18px',
    borderRadius: 20,
    background: 'rgba(107,203,119,0.9)',
    color: '#fff',
    fontSize: 13,
    fontWeight: 600,
    pointerEvents: 'none',
    animation: 'fadeInOut 2s ease forwards',
  },
};

export default function DrawTogether({ roomId, userId, partnerName }) {
  const canvasRef = useRef(null);
  const channelRef = useRef(null);
  const remoteTagRef = useRef(null);
  const remoteTimerRef = useRef(null);

  const [color, setColor] = useState(COLORS[0]);
  const [brushSize, setBrushSize] = useState(BRUSH_SIZES[1]);
  const [tool, setTool] = useState('pen');
  const [isPartnerOnline, setIsPartnerOnline] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    if (!roomId) return;

    const channel = supabase.channel(`draw:${roomId}`, {
      config: { broadcast: { self: false } },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const others = Object.values(state).flat().filter(p => p.userId !== userId);
        setIsPartnerOnline(others.length > 0);
      })
      .on('broadcast', { event: 'stroke' }, ({ payload }) => {
        canvasRef.current?.drawRemoteStroke(payload);
        // Flash remote indicator
        if (remoteTagRef.current) {
          remoteTagRef.current.style.opacity = '1';
          clearTimeout(remoteTimerRef.current);
          remoteTimerRef.current = setTimeout(() => {
            if (remoteTagRef.current) remoteTagRef.current.style.opacity = '0';
          }, 800);
        }
      })
      .on('broadcast', { event: 'clear' }, () => {
        canvasRef.current?.clearCanvas();
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ userId, joinedAt: Date.now() });
        }
      });

    channelRef.current = channel;
    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, userId]);

  const handleStroke = useCallback((strokeData) => {
    channelRef.current?.send({
      type: 'broadcast',
      event: 'stroke',
      payload: strokeData,
    });
  }, []);

  const handleClear = () => {
    canvasRef.current?.clearCanvas();
    channelRef.current?.send({ type: 'broadcast', event: 'clear', payload: {} });
  };

  const handleSave = async () => {
    const dataUrl = canvasRef.current?.exportImage();
    if (!dataUrl || !roomId) return;

    try {
      const blob = await fetch(dataUrl).then(r => r.blob());
      const fileName = `draw-${Date.now()}.png`;
      const { error } = await supabase.storage.from('memories').upload(
        `${roomId}/${fileName}`, blob,
        { contentType: 'image/png' }
      );
      if (!error) {
        await supabase.from('memories').insert({
          room_id: roomId,
          image_path: `${roomId}/${fileName}`,
          caption: '🎨 Cùng nhau vẽ',
        });
        setSavedToast(true);
        setTimeout(() => setSavedToast(false), 2000);
      }
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  return (
    <div style={styles.wrapper}>
      <style>{`@keyframes fadeInOut { 0%{opacity:0;transform:translate(-50%,-4px)} 15%{opacity:1;transform:translate(-50%,0)} 80%{opacity:1} 100%{opacity:0} }`}</style>

      <div style={styles.header}>
        <div style={styles.title}>
          🎨 Vẽ Chung Live
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={styles.onlineDot(isPartnerOnline)} />
          <span style={styles.partnerStatus}>
            {isPartnerOnline ? `${partnerName || 'Người yêu'} đang online` : 'Chờ người ấy...'}
          </span>
        </div>
      </div>

      <div style={styles.canvasContainer}>
        <CanvasCore
          ref={canvasRef}
          width="100%"
          height="100%"
          color={color}
          brushSize={brushSize}
          tool={tool}
          onStroke={handleStroke}
          style={{ background: '#1a1a1a' }}
        />
        <div ref={remoteTagRef} style={styles.remoteTag}>
          ✏️ {partnerName || 'Người ấy'} đang vẽ
        </div>
        {savedToast && <div style={styles.savedToast}>✅ Đã lưu vào Album!</div>}
      </div>

      <div style={styles.toolbar}>
        {COLORS.map(c => (
          <button key={c} style={styles.colorBtn(c, color === c && tool === 'pen')}
            onClick={() => { setColor(c); setTool('pen'); }} />
        ))}
        <div style={styles.divider} />
        {BRUSH_SIZES.map(s => (
          <button key={s} style={styles.sizeBtn(s, brushSize === s)}
            onClick={() => setBrushSize(s)}>
            <div style={styles.sizeDot(s)} />
          </button>
        ))}
        <div style={styles.divider} />
        <button style={styles.toolBtn(tool === 'eraser')} onClick={() => setTool(tool === 'eraser' ? 'pen' : 'eraser')}>
          {tool === 'eraser' ? '✏️' : '🧹'}
        </button>
        <button style={styles.clearBtn} onClick={handleClear}>Xóa hết</button>
        <button style={styles.saveBtn} onClick={handleSave}>💾 Lưu</button>
      </div>
    </div>
  );
}
