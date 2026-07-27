'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

import { Landmark } from '@/types';

interface StarMascotProps {
  selectedLandmark?: Landmark | null;
  onOpenAiChat?: () => void;
}

export default function StarMascot({ onOpenAiChat }: StarMascotProps) {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [isOpenGuide, setIsOpenGuide] = useState(false);
  const [isSparkling, setIsSparkling] = useState(false);

  const handleStarClick = () => {
    setIsSparkling(true);
    setIsOpenGuide(prev => !prev);
    setTimeout(() => setIsSparkling(false), 800);
  };

  return (
    <div className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-40 flex flex-col items-start pointer-events-auto">
      {/* INSTANT TOUR GUIDE SPEECH BUBBLE POPUP */}
      {isOpenGuide && (
        <div className="mb-3 max-w-xs md:max-w-sm bg-slate-950/95 border-2 border-amber-400/60 backdrop-blur-2xl p-4 rounded-3xl shadow-2xl shadow-amber-500/25 animate-slide-up text-slate-100 relative [transform:translate3d(0,0,0)] [will-change:transform]">
          {/* Header */}
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-amber-400/20">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-lg animate-spin">⭐</span>
              <h4 className="font-black text-xs md:text-sm text-amber-300">
                {isEn ? 'Star Mascot Guide' : 'Ngôi Sao Hướng Dẫn'}
              </h4>
            </div>
            <button
              onClick={() => setIsOpenGuide(false)}
              className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs font-bold"
            >
              ✕
            </button>
          </div>

          {/* User Requested Speech Content */}
          <p className="text-xs leading-relaxed text-slate-100 mb-4 font-medium">
            {isEn
              ? 'Hello! I am Star Mascot Guide 🌟. Tap any landmark on the Vietnam 3D map to view details, filter Eateries / Hotels within 5km - 30km, and tap [🚗 Directions] to open Google Maps!'
              : 'Xin chào! Mình là Ngôi Sao Hướng Dẫn 🌟. Bạn hãy chạm vào các danh thắng trên bản đồ Việt Nam để xem thông tin, lọc Quán ăn / Khách sạn theo bán kính (5km - 30km) và bấm [🚗 Chỉ đường] để mở Google Maps nhé!'}
          </p>

          {/* Action Footer */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                setIsOpenGuide(false);
                if (onOpenAiChat) onOpenAiChat();
              }}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold text-[11px] hover:bg-amber-500/30 transition-all cursor-pointer"
            >
              {isEn ? 'Ask AI Chatbot 🤖' : 'Hỏi AI Chatbot 🤖'}
            </button>

            <button
              onClick={() => setIsOpenGuide(false)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-[11px] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {isEn ? '✖️ Got it' : '✖️ Đã hiểu'}
            </button>
          </div>
        </div>
      )}

      {/* CUTE SHIMMERING STAR CHARACTER MASCOT BUTTON */}
      <button
        onClick={handleStarClick}
        onTouchEnd={e => {
          e.preventDefault();
          handleStarClick();
        }}
        className={`group relative flex items-center justify-center p-2 rounded-full transition-all duration-300 cursor-pointer ${
          isSparkling ? 'scale-125 rotate-12' : 'hover:scale-110 active:scale-95'
        }`}
        title={isEn ? 'Tap Star Mascot for Guide' : 'Chạm Ngôi Sao Nhận Hướng Dẫn'}
      >
        {/* GOLDEN GLOW SPARKLE AURA */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-300 via-amber-400 to-orange-500 blur-xl opacity-80 group-hover:opacity-100 animate-pulse" />

        {/* STAR SVG CHARACTER */}
        <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center animate-bounce">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="starGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff08a" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>

            {/* Star Body */}
            <polygon
              points="50,5 63,35 95,38 71,60 78,92 50,75 22,92 29,60 5,38 37,35"
              fill="url(#starGoldGrad)"
              stroke="#b45309"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Cute Big Eyes */}
            <circle cx="40" cy="45" r="5" fill="#0f172a" />
            <circle cx="60" cy="45" r="5" fill="#0f172a" />
            {/* Eye Highlights */}
            <circle cx="38.5" cy="43.5" r="2" fill="#ffffff" />
            <circle cx="58.5" cy="43.5" r="2" fill="#ffffff" />

            {/* Rosy Cheeks */}
            <circle cx="32" cy="53" r="4" fill="#f43f5e" opacity="0.6" />
            <circle cx="68" cy="53" r="4" fill="#f43f5e" opacity="0.6" />

            {/* Friendly Smile */}
            <path
              d="M 40 56 Q 50 65 60 56"
              fill="none"
              stroke="#0f172a"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>

          {/* SPARKLE PARTICLES */}
          <span className="absolute -top-1 -right-1 text-xs text-yellow-200 animate-ping">✨</span>
          <span className="absolute -bottom-1 -left-1 text-xs text-amber-300 animate-pulse">🌟</span>
        </div>
      </button>
    </div>
  );
}
