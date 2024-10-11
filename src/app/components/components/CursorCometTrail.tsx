'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react';

interface Point {
  x: number;
  y: number;
  time: number;
}

const CursorCometTrailEffect: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const addPoint = useCallback((x: number, y: number) => {
    const now = performance.now();
    setPoints(prevPoints => [...prevPoints, { x, y, time: now }]);
  }, []);

  const animateTrail = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      setPoints(prevPoints => prevPoints.filter(point => time - point.time < 500)); // 500ms trail duration
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateTrail);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      addPoint(event.clientX, event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [addPoint, animateTrail]);

  return (
    <svg
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <defs>
        <linearGradient id="trail-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#64FFDA" stopOpacity="0" />
          <stop offset="50%" stopColor="#64FFDA" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#64FFDA" stopOpacity="1" />
        </linearGradient>
      </defs>
      {points.length > 1 && (
        <path
          d={`M ${points.map(point => `${point.x} ${point.y}`).join(' L ')}`}
          fill="none"
          stroke="url(#trail-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
};

export default CursorCometTrailEffect;