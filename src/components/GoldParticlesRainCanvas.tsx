'use client';

import React, { useEffect, useRef } from 'react';

export default function GoldParticlesRainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface RainParticle {
      x: number;
      y: number;
      speedY: number;
      size: number;
      opacity: number;
      color: string;
    }

    // Ultra-light 50 particles for minimal battery & CPU usage
    const particleCount = width < 768 ? 35 : 65;
    const particles: RainParticle[] = [];
    const colors = ['#fbbf24', '#f59e0b', '#fef08a', '#ffffff'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speedY: Math.random() * 1.5 + 0.6,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      // Elegant Minimalist Warm Crimson Background Gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height * 0.2,
        50,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, '#2a0a07');
      bgGrad.addColorStop(0.6, '#120403');
      bgGrad.addColorStop(1, '#070101');

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render Subtle Falling Ambient Gold Glitter
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;

        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
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
