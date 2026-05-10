import { useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';

const CanvasCore = forwardRef(({
  width = '100%',
  height = '100%',
  color = '#ff6b6b',
  brushSize = 4,
  tool = 'pen', // 'pen' | 'eraser'
  onStroke, // callback khi user vẽ: ({ points, color, brushSize, tool })
  disabled = false,
  style = {},
}, ref) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const currentStroke = useRef([]);
  const lastPoint = useRef(null);
  const ctx = useRef(null);

  useImperativeHandle(ref, () => ({
    // Vẽ stroke từ remote user
    drawRemoteStroke: ({ points, color: c, brushSize: bs, tool: t }) => {
      if (!ctx.current || points.length < 2) return;
      const context = ctx.current;
      context.save();
      context.globalCompositeOperation = t === 'eraser' ? 'destination-out' : 'source-over';
      context.strokeStyle = c;
      context.lineWidth = bs;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        const mid = {
          x: (points[i - 1].x + points[i].x) / 2,
          y: (points[i - 1].y + points[i].y) / 2,
        };
        context.quadraticCurveTo(points[i - 1].x, points[i - 1].y, mid.x, mid.y);
      }
      context.stroke();
      context.restore();
    },

    // Xóa toàn bộ canvas
    clearCanvas: () => {
      if (!ctx.current || !canvasRef.current) return;
      ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    },

    // Export canvas thành base64
    exportImage: () => {
      if (!canvasRef.current) return null;
      return canvasRef.current.toDataURL('image/png');
    },

    getCanvas: () => canvasRef.current,
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    ctx.current = context;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // Giữ lại nội dung khi resize
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      context.scale(window.devicePixelRatio, window.devicePixelRatio);
      context.putImageData(imageData, 0, 0);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  const getPoint = useCallback((e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  }, []);

  const startDrawing = useCallback((e) => {
    if (disabled) return;
    e.preventDefault();
    isDrawing.current = true;
    const point = getPoint(e, canvasRef.current);
    currentStroke.current = [point];
    lastPoint.current = point;

    const context = ctx.current;
    context.save();
    context.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
    context.strokeStyle = color;
    context.lineWidth = tool === 'eraser' ? brushSize * 4 : brushSize;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.beginPath();
    context.moveTo(point.x, point.y);
  }, [disabled, color, brushSize, tool, getPoint]);

  const draw = useCallback((e) => {
    if (!isDrawing.current || disabled) return;
    e.preventDefault();
    const point = getPoint(e, canvasRef.current);
    currentStroke.current.push(point);

    const context = ctx.current;
    if (lastPoint.current) {
      const mid = {
        x: (lastPoint.current.x + point.x) / 2,
        y: (lastPoint.current.y + point.y) / 2,
      };
      context.quadraticCurveTo(lastPoint.current.x, lastPoint.current.y, mid.x, mid.y);
      context.stroke();
    }
    lastPoint.current = point;
  }, [disabled, getPoint]);

  const stopDrawing = useCallback(() => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    ctx.current?.restore();

    if (currentStroke.current.length > 1 && onStroke) {
      onStroke({
        points: currentStroke.current,
        color,
        brushSize: tool === 'eraser' ? brushSize * 4 : brushSize,
        tool,
      });
    }
    currentStroke.current = [];
    lastPoint.current = null;
  }, [color, brushSize, tool, onStroke]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width,
        height,
        display: 'block',
        touchAction: 'none',
        cursor: tool === 'eraser' ? 'cell' : 'crosshair',
        ...style,
      }}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
    />
  );
});

CanvasCore.displayName = 'CanvasCore';
export default CanvasCore;
