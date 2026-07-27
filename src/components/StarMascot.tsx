'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';
import { LEVEL_THRESHOLDS } from '@/context/GameContext';
import { Landmark } from '@/types';

interface StarMascotProps {
  selectedLandmark?: Landmark | null;
  onOpenAiChat?: () => void;
}

export default function StarMascot({ onOpenAiChat }: StarMascotProps) {
  const { language } = useLanguage();
  const { progress } = useGame();
  const isEn = language === 'en';

  const [isOpenGuide, setIsOpenGuide] = useState(false);
  const [isSparkling, setIsSparkling] = useState(false);

  // EXP & Level Calculation (Lv.1 to Lv.20)
  const totalExp = progress?.totalExp || 0;
  let level = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (totalExp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  level = Math.min(20, level);

  const currentLevelMinExp = LEVEL_THRESHOLDS[level - 1] || 0;
  const nextLevelMinExp = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[19] + 2000;
  const expInLevel = totalExp - currentLevelMinExp;
  const expToNextLevel = nextLevelMinExp - currentLevelMinExp;
  const expPercent = Math.min(100, Math.max(0, (expInLevel / expToNextLevel) * 100));

  const getStageTitle = (lvl: number) => {
    if (lvl <= 5) return isEn ? 'Apprentice Star' : 'Sao Tập Sự';
    if (lvl <= 10) return isEn ? 'Navigator Star' : 'Sao Dẫn Đường';
    if (lvl <= 15) return isEn ? 'Royal Star' : 'Sao Hoàng Gia';
    return isEn ? 'Cosmic Supernova' : 'Tối Cao Vũ Trụ';
  };

  const handleStarClick = () => {
    setIsSparkling(true);
    setIsOpenGuide(prev => !prev);
    setTimeout(() => setIsSparkling(false), 800);
  };

  return (
    <div className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-40 flex flex-col items-start pointer-events-auto">
      {/* BEIGE & RED THEMED SPEECH BUBBLE POPUP */}
      {isOpenGuide && (
        <div className="mb-3 max-w-xs md:max-w-sm bg-[#F5F2EB]/95 border-2 border-red-500/60 backdrop-blur-2xl p-4 rounded-3xl shadow-2xl shadow-red-500/20 text-slate-900 relative [transform:translate3d(0,0,0)] [will-change:transform]">
          {/* Header */}
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-red-500/20">
            <div className="flex items-center gap-2">
              <span className="text-red-600 text-lg animate-spin">⭐</span>
              <div>
                <h4 className="font-black text-xs md:text-sm text-red-700 flex items-center gap-1.5">
                  <span>Ngôi Sao Hướng Dẫn</span>
                  <span className="px-2 py-0.5 rounded-full bg-red-600/10 text-red-700 text-[10px] border border-red-500/30 font-mono font-bold">
                    Lv.{level}
                  </span>
                </h4>
                <p className="text-[10px] text-red-900/80 font-bold">{getStageTitle(level)}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpenGuide(false)}
              className="w-6 h-6 rounded-full bg-[#E8E2D5] text-slate-600 hover:text-slate-900 flex items-center justify-center text-xs font-bold"
            >
              ✕
            </button>
          </div>

          {/* User Requested Speech Content */}
          <p className="text-xs leading-relaxed text-slate-800 mb-3 font-semibold">
            {isEn
              ? `Hello! I am Star Mascot Guide at Level ${level}! Tap any landmark on the Vietnam 3D map to view details, filter Eateries / Hotels within 5km - 30km, and tap [🚗 Directions] to open Google Maps!`
              : `Xin chào! Mình là Ngôi Sao Hướng Dẫn đang ở Cấp độ Lv.${level}! Bạn hãy chạm vào các danh thắng trên bản đồ Việt Nam để xem thông tin, lọc Quán ăn / Khách sạn theo bán kính (5km - 30km) và bấm [🚗 Chỉ đường] để mở Google Maps nhé!`}
          </p>

          {/* EXP Progress Bar */}
          <div className="mb-3 bg-[#E8E2D5]/90 p-2.5 rounded-2xl border border-red-500/30 space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold">
              <span className="text-red-700">Tiến Trình Cấp Độ (Lv.{level}/20)</span>
              <span className="text-slate-700">{totalExp} / {nextLevelMinExp} EXP</span>
            </div>
            <div className="w-full bg-[#D8D2C5] h-2 rounded-full overflow-hidden border border-red-500/30 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 rounded-full transition-all duration-500"
                style={{ width: `${expPercent}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-red-500/20">
            <button
              onClick={() => {
                setIsOpenGuide(false);
                if (onOpenAiChat) onOpenAiChat();
              }}
              className="px-3 py-1.5 rounded-xl bg-red-600/10 border border-red-500/30 text-red-700 font-bold text-[11px] hover:bg-red-600/20 transition-all cursor-pointer"
            >
              {isEn ? 'Ask AI Chatbot 🤖' : 'Hỏi AI Chatbot 🤖'}
            </button>

            <button
              onClick={() => setIsOpenGuide(false)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-black text-[11px] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {isEn ? '✖️ Got it' : '✖️ Đã hiểu'}
            </button>
          </div>
        </div>
      )}

      {/* STAR MASCOT CHARACTER WITH RED GLOW & BEIGE BADGE */}
      <div className="flex flex-col items-center gap-1.5">
        <button
          onClick={handleStarClick}
          onTouchEnd={e => {
            e.preventDefault();
            handleStarClick();
          }}
          className={`group relative flex items-center justify-center p-2 rounded-full transition-all duration-300 cursor-pointer ${
            isSparkling ? 'scale-125 rotate-12' : 'hover:scale-110 active:scale-95'
          }`}
          title={`Star Mascot Lv.${level} - ${getStageTitle(level)}`}
        >
          {/* RED GLOW SPARKLE AURA */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 blur-xl group-hover:opacity-100 animate-pulse ${
              level >= 16 ? 'opacity-100 scale-125' : level >= 11 ? 'opacity-90' : 'opacity-70'
            }`}
          />

          {/* STAR SVG CHARACTER */}
          <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center animate-bounce">
            {level >= 16 && (
              <div className="absolute -inset-4 flex items-center justify-between pointer-events-none opacity-90 animate-pulse">
                <span className="text-2xl text-red-500">🪽</span>
                <span className="text-2xl text-red-500 scale-x-[-1]">🪽</span>
              </div>
            )}

            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
              <defs>
                <linearGradient id="starRedGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff08a" />
                  <stop offset="40%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#e63946" />
                </linearGradient>
              </defs>

              {/* Star Body */}
              <polygon
                points="50,5 63,35 95,38 71,60 78,92 50,75 22,92 29,60 5,38 37,35"
                fill="url(#starRedGoldGrad)"
                stroke="#991b1b"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {level >= 11 && (
                <polygon
                  points="36,20 42,8 50,16 58,8 64,20"
                  fill="#e63946"
                  stroke="#7f1d1d"
                  strokeWidth="1.5"
                />
              )}

              {level >= 6 && level <= 10 ? (
                <g>
                  <rect x="30" y="40" width="18" height="10" rx="3" fill="#0f172a" stroke="#e63946" strokeWidth="1" />
                  <rect x="52" y="40" width="18" height="10" rx="3" fill="#0f172a" stroke="#e63946" strokeWidth="1" />
                  <line x1="48" y1="44" x2="52" y2="44" stroke="#e63946" strokeWidth="2" />
                </g>
              ) : (
                <g>
                  <circle cx="40" cy="45" r="5" fill="#0f172a" />
                  <circle cx="60" cy="45" r="5" fill="#0f172a" />
                  <circle cx="38.5" cy="43.5" r="2" fill="#ffffff" />
                  <circle cx="58.5" cy="43.5" r="2" fill="#ffffff" />
                </g>
              )}

              <circle cx="32" cy="53" r="4" fill="#dc2626" opacity="0.6" />
              <circle cx="68" cy="53" r="4" fill="#dc2626" opacity="0.6" />

              <path
                d="M 40 56 Q 50 65 60 56"
                fill="none"
                stroke="#0f172a"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>

            <span className="absolute -top-1 -right-1 text-xs text-red-500 animate-ping">✨</span>
            <span className="absolute -bottom-1 -left-1 text-xs text-rose-500 animate-pulse">🌟</span>
          </div>
        </button>

        {/* BEIGE & RED LEVEL BADGE */}
        <div className="bg-[#F5F2EB]/95 border border-red-500/50 backdrop-blur-xl px-3 py-1 rounded-full shadow-lg flex items-center gap-2">
          <span className="text-[11px] font-black text-red-700 font-mono">
            ⭐ Lv.{level}
          </span>
          <div className="w-12 bg-[#E5DFC9] h-1.5 rounded-full overflow-hidden border border-red-500/30">
            <div
              className="h-full bg-gradient-to-r from-red-600 to-rose-600 rounded-full transition-all duration-300"
              style={{ width: `${expPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
