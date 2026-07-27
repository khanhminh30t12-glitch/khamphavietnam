'use client';

import React, { useEffect, useRef } from 'react';

export default function DragonPhoenixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particles for golden sparkles & flame trails
    interface GoldenParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      decay: number;
      color: string;
    }

    const sparkles: GoldenParticle[] = [];
    const trailParticles: GoldenParticle[] = [];
    const sparkleColors = ['#fbbf24', '#f59e0b', '#fef08a', '#ffffff', '#f97316'];

    // Spawn ambient background golden sparkles
    const sparkleCount = width < 768 ? 50 : 100;
    for (let i = 0; i < sparkleCount; i++) {
      sparkles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -Math.random() * 1.2 - 0.3,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.8 + 0.2,
        decay: 0,
        color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)]
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let angle = 0;

    const render = () => {
      angle += 0.015;

      // Deep Crimson & Gold Gradient Background
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      bgGrad.addColorStop(0, '#7f1d1d'); // Rich Imperial Red
      bgGrad.addColorStop(0.5, '#450a0a');
      bgGrad.addColorStop(1, '#0f172a'); // Deep Slate

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render Ambient Golden Sparkles
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;

        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // -----------------------------------------------------------------
      // 1. 🐉 GOLDEN DRAGON (RỒNG VÀNG KIM) FLYING AROUND LEFT SIDE
      // -----------------------------------------------------------------
      const rx = width / 2 + Math.cos(angle) * (width < 768 ? 140 : 280) - (width < 768 ? 60 : 120);
      const ry = height / 2 + Math.sin(angle * 1.5) * (height < 700 ? 120 : 220);

      // Emit Dragon Trail Particles
      for (let i = 0; i < 2; i++) {
        trailParticles.push({
          x: rx + (Math.random() - 0.5) * 20,
          y: ry + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * 2 + 1,
          size: Math.random() * 4 + 2,
          alpha: 1,
          decay: Math.random() * 0.03 + 0.02,
          color: '#fbbf24'
        });
      }

      // Render Dragon Aura Glow
      ctx.save();
      const dragonGrad = ctx.createRadialGradient(rx, ry, 5, rx, ry, 90);
      dragonGrad.addColorStop(0, 'rgba(251, 191, 36, 0.9)');
      dragonGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.4)');
      dragonGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = dragonGrad;
      ctx.beginPath();
      ctx.arc(rx, ry, 90, 0, Math.PI * 2);
      ctx.fill();

      // Render Golden Dragon Mascot Icon & Wings Effect
      ctx.font = width < 768 ? '48px sans-serif' : '72px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 25;
      ctx.fillText('🐉', rx, ry);
      ctx.restore();

      // -----------------------------------------------------------------
      // 2. 🦅 GOLDEN PHOENIX (PHƯỢNG HOÀNG VÀNG) FLYING AROUND RIGHT SIDE
      // -----------------------------------------------------------------
      const px = width / 2 - Math.cos(angle) * (width < 768 ? 140 : 280) + (width < 768 ? 60 : 120);
      const py = height / 2 - Math.sin(angle * 1.5) * (height < 700 ? 120 : 220);

      // Emit Phoenix Trail Particles
      for (let i = 0; i < 2; i++) {
        trailParticles.push({
          x: px + (Math.random() - 0.5) * 20,
          y: py + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * 2 + 1,
          size: Math.random() * 4 + 2,
          alpha: 1,
          decay: Math.random() * 0.03 + 0.02,
          color: '#f97316'
        });
      }

      // Render Phoenix Aura Glow
      ctx.save();
      const phoenixGrad = ctx.createRadialGradient(px, py, 5, px, py, 90);
      phoenixGrad.addColorStop(0, 'rgba(249, 115, 22, 0.9)');
      phoenixGrad.addColorStop(0.5, 'rgba(234, 88, 12, 0.4)');
      phoenixGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = phoenixGrad;
      ctx.beginPath();
      ctx.arc(px, py, 90, 0, Math.PI * 2);
      ctx.fill();

      // Render Golden Phoenix Mascot Icon
      ctx.font = width < 768 ? '48px sans-serif' : '72px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = '#f97316';
      ctx.shadowBlur = 25;
      ctx.fillText('🦅', px, py);
      ctx.restore();

      // Render Trail Particles
      for (let i = trailParticles.length - 1; i >= 0; i--) {
        const tp = trailParticles[i];
        tp.x += tp.vx;
        tp.y += tp.vy;
        tp.alpha -= tp.decay;

        if (tp.alpha <= 0) {
          trailParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, tp.alpha);
        ctx.fillStyle = tp.color;
        ctx.beginPath();
        ctx.arc(tp.x, tp.y, tp.size, 0, Math.PI * 2);
        ctx.fill();
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
