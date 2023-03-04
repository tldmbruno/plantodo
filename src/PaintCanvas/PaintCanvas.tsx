import { useEffect, useRef } from 'react';

export default function CanvasElement() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext('2d');

      if (ctx) {
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);
      }
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('mousedown', startDrawing);
        canvas.removeEventListener('mousemove', draw);
        canvas.removeEventListener('mouseup', stopDrawing);
        canvas.removeEventListener('mouseout', stopDrawing);
      }
    };
  }, []);

  function startDrawing(e: MouseEvent) {
    isDrawing.current = true;
    [lastX.current, lastY.current] = [e.offsetX, e.offsetY];
  }

  function draw(e: MouseEvent) {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (ctx && canvas) {
			ctx.lineWidth = 4;
			ctx.strokeStyle = '#2a7';
			ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(lastX.current, lastY.current);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      [lastX.current, lastY.current] = [e.offsetX, e.offsetY];
    }
  }

  function stopDrawing() {
    isDrawing.current = false;
  }

  return <canvas ref={canvasRef} width='900' height='380'/>;
}
