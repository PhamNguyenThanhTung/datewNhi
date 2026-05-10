import { useRef, useState, useEffect, useCallback } from 'react';
import CanvasCore from '../../../../components/canvas/CanvasCore';
import { supabase } from '../../../../lib/supabaseClient';

const WORD_LISTS = {
  'Tình yêu': ['nụ hôn', 'ôm nhau', 'hẹn hò', 'nhẫn cưới', 'bó hoa', 'tim đỏ', 'nến lãng mạn', 'bữa ăn tối'],
  'Hoạt động': ['cắm trại', 'nấu ăn', 'đọc sách', 'đi bộ', 'xem phim', 'chụp ảnh', 'nhảy múa', 'du lịch'],
  'Đồ vật': ['chiếc ô', 'gấu bông', 'nhật ký', 'vé máy bay', 'ly cà phê', 'đàn guitar', 'máy ảnh', 'xe đạp'],
};

const COLORS = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff9ef5', '#ff8c42', '#ffffff'];
const BRUSH_SIZES = [2, 4, 8];
const ROUND_TIME = 60;

const s = {
  wrap: { display: 'flex', flexDirection: 'column', height: '100%', background: '#0d0d0d', userSelect: 'none' },
  header: { padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 },
  scoreBoard: { display: 'flex', gap: 16 },
  scoreItem: { textAlign: 'center' },
  scoreName: { fontSize: 11, color: '#888', marginBottom: 2 },
  scoreNum: { fontSize: 18, fontWeight: 700, color: '#ff6b6b' },
  timerBar: (pct) => ({ height: 3, background: `linear-gradient(90deg, ${pct > 30 ? '#6bcb77' : '#ff6b6b'} ${pct}%, rgba(255,255,255,0.1) ${pct}%)`, transition: 'all 1s linear', flexShrink: 0 }),
  roleTag: (isDrawer) => ({ display: 'inline-block', padding: '4px 12px', borderRadius: 20, background: isDrawer ? 'rgba(255,107,107,0.2)' : 'rgba(77,150,255,0.2)', border: `1px solid ${isDrawer ? 'rgba(255,107,107,0.5)' : 'rgba(77,150,255,0.5)'}`, color: isDrawer ? '#ff6b6b' : '#4d96ff', fontSize: 12, fontWeight: 600 }),
  wordDisplay: { textAlign: 'center', padding: '8px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 },
  word: { fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: 2 },
  wordHidden: { fontSize: 24, color: '#555', letterSpacing: 6 },
  canvas: { flex: 1, position: 'relative', overflow: 'hidden', background: '#1a1a1a' },
  toolbar: { padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 },
  colorBtn: (c, active) => ({ width: active ? 26 : 20, height: active ? 26 : 20, borderRadius: '50%', background: c, border: active ? '2px solid #fff' : '2px solid transparent', cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0 }),
  guessSection: { padding: '10px 16px', display: 'flex', gap: 8, background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 },
  guessInput: { flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 14px', color: '#fff', fontSize: 15, outline: 'none' },
  guessBtn: { padding: '10px 18px', borderRadius: 10, background: 'linear-gradient(135deg, #4d96ff, #a29bfe)', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 14 },
  overlay: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(13,13,13,0.92)', zIndex: 10, gap: 16, padding: 24 },
  overlayTitle: { fontSize: 28, fontWeight: 800, color: '#fff', textAlign: 'center' },
  overlaySubtitle: { fontSize: 15, color: '#888', textAlign: 'center' },
  startBtn: { padding: '14px 32px', borderRadius: 14, background: 'linear-gradient(135deg, #ff6b6b, #ff8c42)', border: 'none', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer' },
  guessLog: { maxHeight: 60, overflow: 'auto', padding: '4px 16px', flexShrink: 0 },
  guessEntry: (correct) => ({ fontSize: 12, color: correct ? '#6bcb77' : '#888', marginBottom: 2 }),
  categoryBtns: { display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  categoryBtn: { padding: '8px 16px', borderRadius: 20, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', cursor: 'pointer', fontSize: 13 },
};

function getRandomWord(category) {
  const list = WORD_LISTS[category] || WORD_LISTS['Tình yêu'];
  return list[Math.floor(Math.random() * list.length)];
}

function maskWord(word) {
  return word.split('').map(c => c === ' ' ? '  ' : '_ ').join('');
}

export default function DrawAndGuess({ roomId, userId, myName, partnerName }) {
  const canvasRef = useRef(null);
  const channelRef = useRef(null);
  const timerRef = useRef(null);

  const [phase, setPhase] = useState('lobby'); // lobby | picking | drawing | result
  const [isDrawer, setIsDrawer] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [category, setCategory] = useState('Tình yêu');
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [guessText, setGuessText] = useState('');
  const [guessLog, setGuessLog] = useState([]);
  const [myScore, setMyScore] = useState(0);
  const [partnerScore, setPartnerScore] = useState(0);
  const [color, setColor] = useState(COLORS[0]);
  const [brushSize, setBrushSize] = useState(BRUSH_SIZES[1]);
  const [tool, setTool] = useState('pen');
  const [resultMsg, setResultMsg] = useState('');

  useEffect(() => {
    if (!roomId) return;
    const channel = supabase.channel(`dag:${roomId}`, { config: { broadcast: { self: false } } });

    channel
      .on('broadcast', { event: 'stroke' }, ({ payload }) => canvasRef.current?.drawRemoteStroke(payload))
      .on('broadcast', { event: 'clear' }, () => canvasRef.current?.clearCanvas())
      .on('broadcast', { event: 'game_start' }, ({ payload }) => {
        setPhase('drawing');
        setIsDrawer(false);
        setCurrentWord('');
        setTimeLeft(ROUND_TIME);
        startTimer();
        setGuessLog([]);
      })
      .on('broadcast', { event: 'guess' }, ({ payload }) => {
        const correct = payload.text.toLowerCase().trim() === currentWord.toLowerCase().trim();
        if (correct) {
          setPartnerScore(s => s + Math.ceil(timeLeft * 10 / ROUND_TIME));
          setMyScore(s => s + Math.ceil(timeLeft * 5 / ROUND_TIME)); // drawer cũng được điểm
          endRound(true, `🎉 ${partnerName} đoán đúng: "${currentWord}"!`);
        } else {
          setGuessLog(l => [...l, { text: payload.text, correct: false }]);
        }
      })
      .on('broadcast', { event: 'round_end' }, ({ payload }) => {
        clearInterval(timerRef.current);
        setPhase('result');
        setResultMsg(payload.msg);
        setCurrentWord(payload.word || '');
      })
      .subscribe();

    channelRef.current = channel;
    return () => {
      clearInterval(timerRef.current);
      supabase.removeChannel(channel);
    };
  }, [roomId, currentWord, timeLeft]);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    let t = ROUND_TIME;
    timerRef.current = setInterval(() => {
      t--;
      setTimeLeft(t);
      if (t <= 0) {
        clearInterval(timerRef.current);
        endRound(false, `⏰ Hết giờ! Đáp án: "${currentWord}"`);
      }
    }, 1000);
  }, [currentWord]);

  const endRound = (correct, msg) => {
    clearInterval(timerRef.current);
    setPhase('result');
    setResultMsg(msg);
    channelRef.current?.send({ type: 'broadcast', event: 'round_end', payload: { msg, word: currentWord } });
  };

  const startRound = (cat) => {
    const word = getRandomWord(cat);
    setCurrentWord(word);
    setIsDrawer(true);
    setPhase('drawing');
    setTimeLeft(ROUND_TIME);
    setGuessLog([]);
    canvasRef.current?.clearCanvas();
    channelRef.current?.send({ type: 'broadcast', event: 'game_start', payload: { category: cat } });
    startTimer();
  };

  const sendGuess = () => {
    if (!guessText.trim()) return;
    const text = guessText.trim();
    setGuessText('');
    const correct = text.toLowerCase() === currentWord.toLowerCase();
    setGuessLog(l => [...l, { text, correct }]);
    if (correct) {
      setMyScore(s => s + Math.ceil(timeLeft * 10 / ROUND_TIME));
      setPartnerScore(s => s + Math.ceil(timeLeft * 5 / ROUND_TIME));
      endRound(true, `🎉 Bạn đoán đúng: "${currentWord}"!`);
    }
    channelRef.current?.send({ type: 'broadcast', event: 'guess', payload: { text } });
  };

  const handleStroke = useCallback((data) => {
    channelRef.current?.send({ type: 'broadcast', event: 'stroke', payload: data });
  }, []);

  return (
    <div style={s.wrap}>
      <div style={s.header}>
        <div style={s.scoreBoard}>
          <div style={s.scoreItem}><div style={s.scoreName}>{myName || 'Bạn'}</div><div style={s.scoreNum}>{myScore}</div></div>
          <div style={{ color: '#555', fontSize: 18, alignSelf: 'center' }}>–</div>
          <div style={s.scoreItem}><div style={s.scoreName}>{partnerName || 'Người ấy'}</div><div style={s.scoreNum}>{partnerScore}</div></div>
        </div>
        {phase === 'drawing' && (
          <div style={s.roleTag(isDrawer)}>{isDrawer ? '✏️ Bạn đang vẽ' : '🔍 Bạn đang đoán'}</div>
        )}
        {phase === 'drawing' && (
          <div style={{ color: timeLeft <= 10 ? '#ff6b6b' : '#fff', fontWeight: 700, fontSize: 18 }}>{timeLeft}s</div>
        )}
      </div>

      {phase === 'drawing' && (
        <div style={s.timerBar((timeLeft / ROUND_TIME) * 100)} />
      )}

      {phase === 'drawing' && (
        <div style={s.wordDisplay}>
          {isDrawer
            ? <div style={s.word}>{currentWord.toUpperCase()}</div>
            : <div style={s.wordHidden}>{maskWord(currentWord)}</div>
          }
        </div>
      )}

      <div style={s.canvas}>
        <CanvasCore
          ref={canvasRef}
          width="100%" height="100%"
          color={color} brushSize={brushSize} tool={tool}
          onStroke={isDrawer ? handleStroke : undefined}
          disabled={!isDrawer || phase !== 'drawing'}
          style={{ background: '#1a1a1a' }}
        />

        {phase === 'lobby' && (
          <div style={s.overlay}>
            <div style={s.overlayTitle}>🎨 Vẽ & Đoán</div>
            <div style={s.overlaySubtitle}>Chọn chủ đề và bắt đầu vẽ!</div>
            <div style={s.categoryBtns}>
              {Object.keys(WORD_LISTS).map(cat => (
                <button key={cat} style={{ ...s.categoryBtn, ...(category === cat ? { background: 'rgba(255,107,107,0.2)', borderColor: 'rgba(255,107,107,0.5)' } : {}) }}
                  onClick={() => setCategory(cat)}>{cat}</button>
              ))}
            </div>
            <button style={s.startBtn} onClick={() => startRound(category)}>
              Tôi vẽ trước! ✏️
            </button>
          </div>
        )}

        {phase === 'result' && (
          <div style={s.overlay}>
            <div style={s.overlayTitle}>{resultMsg}</div>
            <div style={{ display: 'flex', gap: 24, margin: '8px 0' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#888', fontSize: 12 }}>{myName}</div>
                <div style={{ color: '#ff6b6b', fontSize: 28, fontWeight: 800 }}>{myScore}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#888', fontSize: 12 }}>{partnerName}</div>
                <div style={{ color: '#4d96ff', fontSize: 28, fontWeight: 800 }}>{partnerScore}</div>
              </div>
            </div>
            <button style={s.startBtn} onClick={() => { setPhase('lobby'); canvasRef.current?.clearCanvas(); }}>
              Chơi lại 🔄
            </button>
          </div>
        )}
      </div>

      {phase === 'drawing' && (
        <div style={s.guessLog}>
          {guessLog.slice(-3).map((g, i) => (
            <div key={i} style={s.guessEntry(g.correct)}>
              {g.correct ? '✅' : '❌'} {g.text}
            </div>
          ))}
        </div>
      )}

      {phase === 'drawing' && isDrawer && (
        <div style={s.toolbar}>
          {COLORS.map(c => (
            <button key={c} style={s.colorBtn(c, color === c && tool === 'pen')}
              onClick={() => { setColor(c); setTool('pen'); }} />
          ))}
          <div style={{ flex: 1 }} />
          {BRUSH_SIZES.map(bs => (
            <button key={bs} style={{ padding: '4px 10px', borderRadius: 8, background: brushSize === bs ? 'rgba(255,107,107,0.2)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
              onClick={() => setBrushSize(bs)}>
              <div style={{ width: bs * 3, height: bs * 3, borderRadius: '50%', background: '#ff6b6b', margin: 'auto' }} />
            </button>
          ))}
          <button style={{ padding: '4px 10px', borderRadius: 8, background: tool === 'eraser' ? 'rgba(255,107,107,0.2)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
            onClick={() => setTool(t => t === 'eraser' ? 'pen' : 'eraser')}>🧹</button>
          <button style={{ padding: '4px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#888', cursor: 'pointer', fontSize: 12 }}
            onClick={() => { canvasRef.current?.clearCanvas(); channelRef.current?.send({ type: 'broadcast', event: 'clear', payload: {} }); }}>Xóa</button>
        </div>
      )}

      {phase === 'drawing' && !isDrawer && (
        <div style={s.guessSection}>
          <input
            style={s.guessInput}
            value={guessText}
            onChange={e => setGuessText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendGuess()}
            placeholder="Nhập đáp án..."
            autoComplete="off"
          />
          <button style={s.guessBtn} onClick={sendGuess}>Đoán!</button>
        </div>
      )}
    </div>
  );
}
