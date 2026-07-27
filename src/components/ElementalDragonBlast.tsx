'use client';

import React, { useEffect, useRef } from 'react';

interface ElementalDragonBlastProps {
  element: 'fire' | 'water' | 'electric';
  landmarkName: string;
  onComplete: () => void;
}

export default function ElementalDragonBlast({
  element,
  landmarkName,
  onComplete
}: ElementalDragonBlastProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const centerX = width / 2;
    const centerY = height / 2;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      decay: number;
      symbol?: string;
    }

    const particles: Particle[] = [];
    const startTime = Date.now();
    const durationMs = 900; // ~0.9s blast animation duration

    // Particle color palettes & symbols
    let colors: string[];
    let dragonIcon: string;
    let titleText: string;

    if (element === 'water') {
      colors = ['#38bdf8', '#0284c7', '#7dd3fc', '#bae6fd', '#06b6d4', '#ffffff'];
      dragonIcon = '🐉🌊';
      titleText = 'RỒNG NƯỚC BẤT PHÁP PHUN SÓNG NGỌC';
    } else if (element === 'electric') {
      colors = ['#c084fc', '#e879f9', '#fbbf24', '#f59e0b', '#ffffff', '#a855f7'];
      dragonIcon = '🐉⚡';
      titleText = 'RỒNG ĐIỆN QUANG PHÓNG TIA SÉT HOÀNG GIA';
    } else {
      // Fire (default)
      colors = ['#ef4444', '#f97316', '#fbbf24', '#dc2626', '#ffffff', '#b91c1c'];
      dragonIcon = '🐉🔥';
      titleText = 'RỒNG LỬA HÙNG THIÊNG PHUN HỎA NGUYÊN TỔ';
    }

    // Spawn initial explosive blast particles
    const particleCount = width < 768 ? 70 : 140;
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 14 + 4;
      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 8 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.02 + 0.02,
        symbol: Math.random() > 0.6 ? (element === 'fire' ? '🔥' : element === 'water' ? '💧' : '⚡') : undefined
      });
    }

    const render = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= durationMs) {
        onComplete();
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Flash background aura
      const progress = elapsed / durationMs;
      const auraAlpha = (1 - progress) * 0.35;
      const mainColor = element === 'water' ? '#0284c7' : element === 'electric' ? '#9333ea' : '#ea580c';

      ctx.save();
      ctx.fillStyle = mainColor;
      ctx.globalAlpha = auraAlpha;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // Shockwave Ring
      const ringRadius = progress * (width * 0.4);
      ctx.save();
      ctx.strokeStyle = colors[0];
      ctx.lineWidth = Math.max(1, 10 * (1 - progress));
      ctx.globalAlpha = 1 - progress;
      ctx.beginPath();
      ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Render Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95; // Drag friction
        p.vy *= 0.95;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        if (p.symbol) {
          ctx.font = `${p.radius * 3}px sans-serif`;
          ctx.fillText(p.symbol, p.x, p.y);
        } else {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [element, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col items-center justify-center animate-fade-in [transform:translate3d(0,0,0)] [will-change:transform]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* 3D ELEMENTAL BLAST BANNER */}
      <div className="relative z-10 bg-slate-950/90 border-2 border-amber-400/80 backdrop-blur-2xl rounded-3xl px-6 py-4 shadow-2xl text-center max-w-sm mx-4 animate-bounce">
        <div className="text-4xl md:text-5xl mb-1">
          {element === 'water' ? '🐉🌊' : element === 'electric' ? '🐉⚡' : '🐉🔥'}
        </div>
        <div className="text-xs font-black tracking-widest text-amber-400 uppercase mb-1">
          {element === 'water' ? 'RỒNG NƯỚC PHUN SÓNG NGỌC' : element === 'electric' ? 'RỒNG ĐIỆN PHÓNG THIÊN LẠÔ' : 'RỒNG LỬA PHUN HỎA NGUYÊN TỔ'}
        </div>
        <h3 className="text-base md:text-lg font-black text-white truncate">
          📍 {landmarkName}
        </h3>
      </div>
    </div>
  );
}
