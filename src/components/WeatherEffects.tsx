'use client';

import React, { useEffect, useRef } from 'react';

export type WeatherMode = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'snowy';

interface WeatherEffectsProps {
  mode: WeatherMode;
}

export default function WeatherEffects({ mode }: WeatherEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle structures for different weather modes
    const raindrops: Array<{ x: number; y: number; length: number; speed: number; opacity: number }> = [];
    const snowflakes: Array<{ x: number; y: number; radius: number; speedX: number; speedY: number; opacity: number }> = [];
    const clouds: Array<{ x: number; y: number; radius: number; speed: number; opacity: number }> = [];
    const windStreaks: Array<{ x: number; y: number; length: number; speed: number; opacity: number }> = [];

    // Initialize particles based on current mode
    const initParticles = () => {
      raindrops.length = 0;
      snowflakes.length = 0;
      clouds.length = 0;
      windStreaks.length = 0;

      if (mode === 'rainy') {
        const count = width < 768 ? 60 : 120;
        for (let i = 0; i < count; i++) {
          raindrops.push({
            x: Math.random() * width,
            y: Math.random() * height,
            length: Math.random() * 20 + 10,
            speed: Math.random() * 12 + 10,
            opacity: Math.random() * 0.5 + 0.3
          });
        }
      } else if (mode === 'snowy') {
        const count = width < 768 ? 40 : 80;
        for (let i = 0; i < count; i++) {
          snowflakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 1.5,
            speedY: Math.random() * 1.5 + 1,
            opacity: Math.random() * 0.8 + 0.2
          });
        }
      } else if (mode === 'cloudy') {
        const count = width < 768 ? 4 : 8;
        for (let i = 0; i < count; i++) {
          clouds.push({
            x: Math.random() * width,
            y: Math.random() * (height * 0.4),
            radius: Math.random() * 80 + 60,
            speed: Math.random() * 0.4 + 0.2,
            opacity: Math.random() * 0.25 + 0.15
          });
        }
      } else if (mode === 'windy') {
        const count = width < 768 ? 30 : 60;
        for (let i = 0; i < count; i++) {
          windStreaks.push({
            x: Math.random() * width,
            y: Math.random() * height,
            length: Math.random() * 60 + 30,
            speed: Math.random() * 8 + 6,
            opacity: Math.random() * 0.4 + 0.2
          });
        }
      }
    };

    initParticles();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. ☀️ SUNNY MODE: Golden Sunbeams & Lens Flare
      if (mode === 'sunny') {
        const gradient = ctx.createRadialGradient(
          width * 0.8,
          height * 0.1,
          10,
          width * 0.8,
          height * 0.1,
          width * 0.6
        );
        gradient.addColorStop(0, 'rgba(251, 191, 36, 0.35)');
        gradient.addColorStop(0.3, 'rgba(245, 158, 11, 0.15)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Sunbeams
        ctx.save();
        ctx.strokeStyle = 'rgba(254, 240, 138, 0.08)';
        ctx.lineWidth = 40;
        for (let i = -5; i < 15; i++) {
          ctx.beginPath();
          ctx.moveTo(width * 0.8, 0);
          ctx.lineTo(i * 120, height);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 2. 🌧️ RAINY MODE: Diagonal Raindrops
      else if (mode === 'rainy') {
        ctx.strokeStyle = 'rgba(186, 230, 253, 0.6)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let i = 0; i < raindrops.length; i++) {
          const drop = raindrops[i];
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x - 3, drop.y + drop.length);

          drop.x -= 1;
          drop.y += drop.speed;

          if (drop.y > height) {
            drop.y = -20;
            drop.x = Math.random() * width;
          }
        }
        ctx.stroke();
      }

      // 3. ⛅ CLOUDY MODE: Dynamic Soft Clouds
      else if (mode === 'cloudy') {
        for (let i = 0; i < clouds.length; i++) {
          const cloud = clouds[i];
          cloud.x += cloud.speed;
          if (cloud.x - cloud.radius > width) {
            cloud.x = -cloud.radius;
          }

          const grad = ctx.createRadialGradient(
            cloud.x,
            cloud.y,
            10,
            cloud.x,
            cloud.y,
            cloud.radius
          );
          grad.addColorStop(0, `rgba(241, 245, 249, ${cloud.opacity})`);
          grad.addColorStop(0.6, `rgba(203, 213, 225, ${cloud.opacity * 0.6})`);
          grad.addColorStop(1, 'rgba(203, 213, 225, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. 💨 WINDY MODE: Wind Breeze Streaks
      else if (mode === 'windy') {
        ctx.strokeStyle = 'rgba(226, 232, 240, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i < windStreaks.length; i++) {
          const streak = windStreaks[i];
          ctx.moveTo(streak.x, streak.y);
          ctx.lineTo(streak.x + streak.length, streak.y + streak.length * 0.1);

          streak.x += streak.speed;
          streak.y += streak.speed * 0.1;

          if (streak.x > width) {
            streak.x = -streak.length;
            streak.y = Math.random() * height;
          }
        }
        ctx.stroke();
      }

      // 5. ❄️ SNOWY MODE: Falling Snowflakes
      else if (mode === 'snowy') {
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < snowflakes.length; i++) {
          const flake = snowflakes[i];
          flake.x += flake.speedX;
          flake.y += flake.speedY;

          if (flake.y > height) {
            flake.y = -10;
            flake.x = Math.random() * width;
          }

          ctx.save();
          ctx.globalAlpha = flake.opacity;
          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-20 pointer-events-none transition-all duration-700 [transform:translate3d(0,0,0)] [will-change:transform]"
    />
  );
}
