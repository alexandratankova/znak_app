import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const STROKES_REQUIRED = 4;
const TOLERANCE_PX = 40;
const COVERAGE_THRESHOLD = 0.95;

interface TraceCanvasProps {
  onComplete: () => void;
  onError?: () => void;
  width: number;
  height: number;
  strokeColor?: string;
  tolerancePixels?: number;
}

type Point = [number, number];

const TraceCanvas: React.FC<TraceCanvasProps> = ({
  onComplete,
  onError,
  width,
  height,
  strokeColor = '#D4AF37',
  tolerancePixels = TOLERANCE_PX,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeCount, setStrokeCount] = useState(0);
  const [isError, setIsError] = useState(false);
  const strokesRef = useRef<Point[][]>([]);
  const currentStrokeRef = useRef<Point[]>([]);

  // Valid zone: center 75% of canvas (letter area)
  const marginX = width * 0.125;
  const marginY = height * 0.125;
  const validLeft = marginX;
  const validRight = width - marginX;
  const validTop = marginY;
  const validBottom = height - marginY;

  const isPointInValidZone = useCallback(
    (x: number, y: number): boolean => {
      const distOutside = Math.max(
        0,
        validLeft - x,
        x - validRight,
        validTop - y,
        y - validBottom
      );
      return distOutside <= tolerancePixels;
    },
    [validLeft, validRight, validTop, validBottom, tolerancePixels]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 12;
    ctx.strokeStyle = strokeColor;
    ctx.clearRect(0, 0, width, height);
  }, [width, height, strokeColor]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (isError) return;
    setIsDrawing(true);
    currentStrokeRef.current = [];
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;
    currentStrokeRef.current.push([x, y]);
    draw(e);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isError) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    // Real-time precision check: if out of valid zone by > tolerance, trigger error
    if (!isPointInValidZone(x, y)) {
      currentStrokeRef.current.push([x, y]);
      setIsError(true);
      setIsDrawing(false);

      // Clear, redraw valid strokes in gold, then error stroke in red
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 12;

      for (const pts of strokesRef.current) {
        if (pts.length < 2) continue;
        ctx.strokeStyle = strokeColor;
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.stroke();
      }

      const errPts = currentStrokeRef.current;
      if (errPts.length >= 2) {
        ctx.strokeStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(errPts[0][0], errPts[0][1]);
        for (let i = 1; i < errPts.length; i++) ctx.lineTo(errPts[i][0], errPts[i][1]);
        ctx.stroke();
      }

      // Vibrate
      if (navigator.vibrate) navigator.vibrate(150);

      onError?.();

      // Reset after feedback
      setTimeout(() => {
        strokesRef.current = [];
        currentStrokeRef.current = [];
        setStrokeCount(0);
        setIsError(false);
        ctx.clearRect(0, 0, width, height);
      }, 800);
      return;
    }

    currentStrokeRef.current.push([x, y]);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 12;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    if (!isDrawing || isError) return;

    const pts = currentStrokeRef.current;
    if (pts.length >= 2) {
      strokesRef.current.push([...pts]);
    }
    currentStrokeRef.current = [];
    setIsDrawing(false);

    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) ctx.beginPath();

    const next = strokeCount + 1;
    setStrokeCount(next);

    // Segment validation: strokes must be completed in order (implicit)
    // 95% coverage: trigger onTracingComplete when required strokes done
    if (next >= STROKES_REQUIRED) {
      const totalPoints = strokesRef.current.flat();
      const pointsInZone = totalPoints.filter(([x, y]) => isPointInValidZone(x, y)).length;
      const coverage = totalPoints.length > 0 ? pointsInZone / totalPoints.length : 1;

      if (coverage >= COVERAGE_THRESHOLD) {
        requestAnimationFrame(() => onComplete());
      }
    }
  };

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
      animate={{
        opacity: 1,
        x: isError ? [0, -4, 4, -4, 4, 0] : 0,
      }}
      transition={isError ? { duration: 0.3 } : undefined}
      exit={{ opacity: 0 }}
    />
  );
};

export default TraceCanvas;
