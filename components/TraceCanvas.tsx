import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TraceCanvasProps {
  onComplete: () => void;
  width: number;
  height: number;
  strokeColor?: string;
}

const STROKES_REQUIRED = 4; // Tratti minimi per completare – dà tempo di ricalcare la lettera

const TraceCanvas: React.FC<TraceCanvasProps> = ({ 
  onComplete, 
  width, 
  height, 
  strokeColor = "#D4AF37" 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeCount, setStrokeCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 12;
    ctx.strokeStyle = strokeColor;
    
    // Clear on resize/init
    ctx.clearRect(0, 0, width, height);
  }, [width, height, strokeColor]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      ctxRef.current?.beginPath();
      setStrokeCount(prev => {
        const next = prev + 1;
        if (next >= STROKES_REQUIRED) {
          setTimeout(onComplete, 800);
        }
        return next;
      });
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = (e as React.MouseEvent).clientX - rect.left;
      y = (e as React.MouseEvent).clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  // Helper ref to keep context state clean
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  return (
    <motion.canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 z-30 touch-none cursor-crosshair"
      onMouseDown={startDrawing}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      onMouseMove={draw}
      onTouchStart={startDrawing}
      onTouchEnd={stopDrawing}
      onTouchMove={draw}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  );
};

export default TraceCanvas;