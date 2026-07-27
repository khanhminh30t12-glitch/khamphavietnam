'use client';

import React, { useEffect, useRef } from 'react';

export type DragonElementType = 'fire' | 'water' | 'electric' | 'ice';

interface Dragon3DEffectsProps {
  element: DragonElementType;
  landmarkName: string;
  onComplete: () => void;
}

export default function Dragon3DEffects({
  element,
  landmarkName,
  onComplete
}: Dragon3DEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const startTime = Date.now();
    const totalDuration = 1100; // ~1.1s total animation length

    // Screen Blast particles
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
    const particleCount = width < 768 ? 90 : 180;

    let colorPalette: string[];
    let elementTitle: string;
    let elementBadgeIcon: string;

    if (element === 'water') {
      colorPalette = ['#38bdf8', '#0284c7', '#7dd3fc', '#bae6fd', '#06b6d4', '#ffffff'];
      elementTitle = '🌊 RỒNG NƯỚC BẮN SÓNG PHỦ MÀN HÌNH';
      elementBadgeIcon = '🐉🌊';
    } else if (element === 'electric') {
      colorPalette = ['#c084fc', '#e879f9', '#fbbf24', '#f59e0b', '#ffffff', '#a855f7'];
      elementTitle = '⚡ RỒNG SÉT GIẬT TIA ĐIỆN QUANG RỰC SÁNG';
      elementBadgeIcon = '🐉⚡';
    } else if (element === 'ice') {
      colorPalette = ['#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#ffffff', '#93c5fd'];
      elementTitle = '❄️ RỒNG BĂNG ĐÓN SƯƠNG TUYẾT ĐÓNG BĂNG MÀN HÌNH';
      elementBadgeIcon = '🐉❄️';
    } else {
      // Fire
      colorPalette = ['#ef4444', '#f97316', '#fbbf24', '#dc2626', '#ffffff', '#b91c1c'];
      elementTitle = '🔥 RỒNG LỬA HÙNG THIÊNG PHUN HỎA RỰC RỠ';
      elementBadgeIcon = '🐉🔥';
    }

    // Pre-create blast particles emanating from camera impact center
    const centerX = width / 2;
    const centerY = height / 2;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 16 + 5;
      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 9 + 3,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        alpha: 1,
        decay: Math.random() * 0.025 + 0.015,
        symbol: Math.random() > 0.65 ? (element === 'fire' ? '🔥' : element === 'water' ? '💧' : element === 'electric' ? '⚡' : '❄️') : undefined
      });
    }

    const render = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= totalDuration) {
        onComplete();
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const progress = elapsed / totalDuration;

      // -------------------------------------------------------------
      // PHASE 1: FLY-DOWN ANIMATION (0ms -> 450ms)
      // 3D Dragon swoops down from top-left sky down to center land
      // -------------------------------------------------------------
      if (elapsed < 450) {
        const flyProgress = elapsed / 450; // 0 -> 1
        const dragonX = width * 0.85 - flyProgress * (width * 0.35);
        const dragonY = -100 + flyProgress * (height * 0.5 + 100);
        const scale = 0.5 + flyProgress * 1.2;

        ctx.save();
        ctx.translate(dragonX, dragonY);
        ctx.scale(scale, scale);

        // Dragon Aura Glow
        const auraGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 80);
        auraGrad.addColorStop(0, colorPalette[0]);
        auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 80, 0, Math.PI * 2);
        ctx.fill();

        // Flying Dragon Wings & Silhouette
        ctx.font = '72px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(elementBadgeIcon, 0, 0);

        ctx.restore();
      }

      // -------------------------------------------------------------
      // PHASE 2: SCREEN IMPACT BLAST (450ms -> 1100ms)
      // Direct blast into screen camera view with 4-element effects
      // -------------------------------------------------------------
      else {
        const blastProgress = (elapsed - 450) / (totalDuration - 450); // 0 -> 1

        // 1. 🔥 FIRE SCREEN GLOW
        if (element === 'fire') {
          const bgGrad = ctx.createRadialGradient(
            centerX,
            centerY,
            10,
            centerX,
            centerY,
            width * 0.8
          );
          bgGrad.addColorStop(0, `rgba(249, 115, 22, ${(1 - blastProgress) * 0.5})`);
          bgGrad.addColorStop(0.5, `rgba(220, 38, 38, ${(1 - blastProgress) * 0.3})`);
          bgGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = bgGrad;
          ctx.fillRect(0, 0, width, height);
        }

        // 2. 🌊 WATER SPLASH ON SCREEN
        else if (element === 'water') {
          ctx.save();
          ctx.fillStyle = `rgba(2, 132, 199, ${(1 - blastProgress) * 0.45})`;
          ctx.fillRect(0, 0, width, height);

          // Water Droplet Splashes on glass
          ctx.fillStyle = 'rgba(224, 242, 254, 0.7)';
          for (let i = 0; i < 15; i++) {
            const dropX = (Math.sin(i * 34) * 0.5 + 0.5) * width;
            const dropY = (Math.cos(i * 19) * 0.5 + 0.5) * height;
            const r = (1 - blastProgress) * 25 + 5;
            ctx.beginPath();
            ctx.arc(dropX, dropY, r, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }

        // 3. ⚡ LIGHTNING FLASH ACROSS SCREEN
        else if (element === 'electric') {
          ctx.save();
          ctx.fillStyle = `rgba(168, 85, 247, ${(1 - blastProgress) * 0.4})`;
          ctx.fillRect(0, 0, width, height);

          // Lightning Bolt Arcs
          ctx.strokeStyle = '#fde047';
          ctx.lineWidth = Math.max(1, (1 - blastProgress) * 8);
          ctx.beginPath();
          ctx.moveTo(centerX - 100, 0);
          ctx.lineTo(centerX - 30, centerY - 40);
          ctx.lineTo(centerX + 40, centerY + 30);
          ctx.lineTo(centerX + 120, height);
          ctx.stroke();
          ctx.restore();
        }

        // 4. ❄️ ICE FROST SCREEN OVERLAY
        else if (element === 'ice') {
          ctx.save();
          ctx.strokeStyle = 'rgba(186, 230, 253, 0.8)';
          ctx.lineWidth = (1 - blastProgress) * 30;
          ctx.strokeRect(0, 0, width, height);

          ctx.fillStyle = `rgba(147, 197, 253, ${(1 - blastProgress) * 0.35})`;
          ctx.fillRect(0, 0, width, height);
          ctx.restore();
        }

        // Render Flying Particles Towards Screen View
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.94;
          p.vy *= 0.94;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          if (p.symbol) {
            ctx.font = `${p.radius * 3.5}px sans-serif`;
            ctx.fillText(p.symbol, p.x, p.y);
          } else {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
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

      {/* 3D DRAGON FLY-DOWN IMPACT BANNER */}
      <div className="relative z-10 bg-slate-950/90 border-2 border-amber-400/80 backdrop-blur-2xl rounded-3xl px-6 py-4 shadow-2xl text-center max-w-sm mx-4 animate-bounce">
        <div className="text-4xl md:text-5xl mb-1">
          {element === 'water' ? '🐉🌊' : element === 'electric' ? '🐉⚡' : element === 'ice' ? '🐉❄️' : '🐉🔥'}
        </div>
        <div className="text-xs font-black tracking-widest text-amber-400 uppercase mb-1">
          {element === 'water'
            ? 'RỒNG NƯỚC BAY XUỐNG BẮN SÓNG PHỦ MÀN HÌNH'
            : element === 'electric'
            ? 'RỒNG SÉT LAO XUỐNG GIẬT ĐIỆN QUANG RỰC SÁNG'
            : element === 'ice'
            ? 'RỒNG BĂNG GIÁO XUỐNG ĐÓNG BĂNG MÀN HÌNH'
            : 'RỒNG LỬA TỪ TRỜI LAO XUỐNG PHUN HỎA NGUYÊN TỔ'}
        </div>
        <h3 className="text-base md:text-lg font-black text-white truncate">
          📍 {landmarkName}
        </h3>
      </div>
    </div>
  );
}
