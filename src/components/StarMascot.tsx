'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Landmark } from '@/types';

interface StarMascotProps {
  selectedLandmark?: Landmark | null;
  onOpenAiChat?: () => void;
}

export default function StarMascot({ selectedLandmark, onOpenAiChat }: StarMascotProps) {
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
      {/* INTELLIGENT TRAVEL GUIDE DIALOGUE POPUP */}
      {isOpenGuide && (
        <div className="mb-3 max-w-xs md:max-w-sm bg-slate-950/90 border border-amber-400/50 backdrop-blur-2xl p-4 rounded-3xl shadow-2xl shadow-amber-500/20 animate-slide-up text-slate-100 relative [transform:translate3d(0,0,0)] [will-change:transform]">
          {/* Close speech bubble button */}
          <button
            onClick={() => setIsOpenGuide(false)}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs"
          >
            ✕
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-amber-400 text-base animate-spin">⭐</span>
            <h4 className="font-extrabold text-xs md:text-sm text-amber-300">
              {isEn ? 'Star Mascot Travel Advisor' : 'Ngôi Sao Hướng Dẫn Du Lịch'}
            </h4>
          </div>

          <p className="text-xs leading-relaxed text-slate-200 mb-3 font-medium">
            {selectedLandmark
              ? isEn
                ? `You are exploring ${selectedLandmark.name.en}! Click the tabs in the detail panel to view history, 30km eateries & hotels!`
                : `Bạn đang khám phá ${selectedLandmark.name.vi}! Hãy xem các tab Lịch sử, Thời tiết & Quán ăn 30km ở Bảng chi tiết nhé!`
              : isEn
                ? 'Welcome to Vietnam! Click any landmark on the 3D map or ask AI for travel tips!'
                : 'Chào mừng bạn đến với Việt Nam! Hãy chọn địa danh trên Bản đồ 3D hoặc nhờ Trợ Lý AI gợi ý lịch trình nhé!'}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                setIsOpenGuide(false);
                if (onOpenAiChat) onOpenAiChat();
              }}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-[11px] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {isEn ? 'Ask AI Assistant 🤖' : 'Hỏi Trợ Lý AI 🤖'}
            </button>
            <span className="text-[10px] text-amber-400/80 font-bold">⭐ 120Hz Shimmer</span>
          </div>
        </div>
      )}

      {/* CUTE SHIMMERING STAR CHARACTER MASCOT BUTTON */}
      <button
        onClick={handleStarClick}
        className={`group relative flex items-center justify-center p-2 rounded-full transition-all duration-300 cursor-pointer ${
          isSparkling ? 'scale-125' : 'hover:scale-110 active:scale-95'
        }`}
        title={isEn ? 'Tap Star Mascot for Travel Advice' : 'Chạm Ngôi Sao Nhận Gợi Ý Du Lịch'}
      >
        {/* GOLDEN GLOW SPARKLE AURA */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-300 via-amber-400 to-orange-500 blur-xl opacity-75 group-hover:opacity-100 animate-pulse" />

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
