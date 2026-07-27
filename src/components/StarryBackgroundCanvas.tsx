'use client';

import React, { useEffect, useRef } from 'react';

export default function StarryBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Star {
      x: number;
      y: number;
      size: number;
      maxOpacity: number;
      opacity: number;
      pulseSpeed: number;
      color: string;
      hasFlare: boolean;
    }

    const starCount = width < 768 ? 120 : 250;
    const stars: Star[] = [];
    const colors = ['#fef08a', '#fbbf24', '#f59e0b', '#ffffff', '#e0e7ff'];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.8,
        maxOpacity: Math.random() * 0.7 + 0.3,
        opacity: Math.random(),
        pulseSpeed: Math.random() * 0.02 + 0.005,
        color: colors[Math.floor(Math.random() * colors.length)],
        hasFlare: Math.random() > 0.8
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      // Deep Royal Midnight Starry Background Gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height * 0.3,
        50,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, '#1a0927');
      bgGrad.addColorStop(0.5, '#0b0312');
      bgGrad.addColorStop(1, '#040107');

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render Shimmering Golden Stars
      const time = Date.now();
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Opacity Pulse Shimmering Effect
        const shimmer = Math.sin(time * s.pulseSpeed + i) * 0.4 + 0.6;
        const currentOpacity = s.maxOpacity * shimmer;

        ctx.save();
        ctx.globalAlpha = currentOpacity;
        ctx.fillStyle = s.color;

        // Draw Core Star Point
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw 4-Point Lens Flare Sparkle for brighter stars
        if (s.hasFlare && currentOpacity > 0.6) {
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 0.8;
          const flareLen = s.size * 3.5 * shimmer;

          // Horizontal Flare Line
          ctx.beginPath();
          ctx.moveTo(s.x - flareLen, s.y);
          ctx.lineTo(s.x + flareLen, s.y);
          ctx.stroke();

          // Vertical Flare Line
          ctx.beginPath();
          ctx.moveTo(s.x, s.y - flareLen);
          ctx.lineTo(s.x, s.y + flareLen);
          ctx.stroke();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none transition-all [transform:translate3d(0,0,0)] [will-change:transform]"
    />
  );
}
