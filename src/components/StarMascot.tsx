'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';
import { LEVEL_THRESHOLDS } from '@/context/GameContext';
import { Landmark } from '@/types';
import UserGuideModal from './UserGuideModal';

interface StarMascotProps {
  selectedLandmark?: Landmark | null;
  onOpenAiChat?: () => void;
  onOpenTour?: () => void;
}

export default function StarMascot({ onOpenAiChat, onOpenTour }: StarMascotProps) {
  const { language } = useLanguage();
  const { progress } = useGame();
  const isEn = language === 'en';

  const [isOpenGuideModal, setIsOpenGuideModal] = useState(false);
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
    if (lvl <= 5) return isEn ? 'Apprentice AI Star' : 'Ngôi Sao AI Tập Sự';
    if (lvl <= 10) return isEn ? 'Navigator AI Star' : 'Ngôi Sao AI Dẫn Đường';
    if (lvl <= 15) return isEn ? 'Royal AI Star' : 'Ngôi Sao AI Hoàng Gia';
    return isEn ? 'Cosmic Supernova AI' : 'AI Tối Cao Vũ Trụ';
  };

  const handleStarClick = () => {
    setIsSparkling(true);
    setIsOpenGuideModal(true);
    setTimeout(() => setIsSparkling(false), 800);
  };

  return (
    <>
      {/* INTERACTIVE USER GUIDE MODAL WITH 4 TABS */}
      <UserGuideModal
        isOpen={isOpenGuideModal}
        onClose={() => setIsOpenGuideModal(false)}
        onRestartTour={onOpenTour}
      />

      {/* AI HUMANOID STAR MASCOT CHARACTER WITH RED GLOW & BEIGE BADGE */}
      <div className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-40 flex flex-col items-start pointer-events-auto">
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={handleStarClick}
            onTouchEnd={e => {
              e.preventDefault();
              handleStarClick();
            }}
            className={`group relative flex items-center justify-center p-1 rounded-full transition-all duration-300 cursor-pointer ${
              isSparkling ? 'scale-125 rotate-6' : 'hover:scale-110 active:scale-95'
            }`}
            title={`AI Humanoid Star Mascot Lv.${level} - ${getStageTitle(level)}`}
          >
            {/* RED GLOW SPARKLE AURA */}
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 blur-xl group-hover:opacity-100 animate-pulse ${
                level >= 16 ? 'opacity-100 scale-125' : level >= 11 ? 'opacity-90' : 'opacity-70'
              }`}
            />

            {/* HUMANOID STAR SVG CHARACTER */}
            <div className="relative w-16 h-20 md:w-20 md:h-24 flex items-center justify-center animate-bounce">
              {level >= 16 && (
                <div className="absolute -inset-5 flex items-center justify-between pointer-events-none opacity-90 animate-pulse">
                  <span className="text-3xl text-red-500">🪽</span>
                  <span className="text-3xl text-red-500 scale-x-[-1]">🪽</span>
                </div>
              )}

              <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-2xl">
                <defs>
                  <linearGradient id="starHeadRedGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="40%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#991b1b" />
                  </linearGradient>
                </defs>

                {/* Arms */}
                <path d="M 22 65 Q 8 72 12 85" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" fill="none" />
                <path d="M 78 65 Q 92 48 88 38" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" fill="none" />

                {/* Legs in Travel Shoes */}
                <path d="M 38 85 L 34 112" stroke="#991b1b" strokeWidth="7" strokeLinecap="round" />
                <path d="M 62 85 L 66 112" stroke="#991b1b" strokeWidth="7" strokeLinecap="round" />
                <rect x="26" y="108" width="16" height="8" rx="4" fill="#7f1d1d" />
                <rect x="58" y="108" width="16" height="8" rx="4" fill="#7f1d1d" />

                {/* Humanoid Travel Outfit Body */}
                <rect x="30" y="55" width="40" height="34" rx="12" fill="#dc2626" stroke="#991b1b" strokeWidth="2.5" />
                <polygon points="50,58 44,74 56,74" fill="#fef08a" />

                {/* Red Star Head */}
                <polygon
                  points="50,4 62,26 86,28 68,44 73,68 50,55 27,68 32,44 14,28 38,26"
                  fill="url(#starHeadRedGoldGrad)"
                  stroke="#7f1d1d"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />

                {level >= 11 && (
                  <polygon points="36,18 42,6 50,14 58,6 64,18" fill="#e63946" stroke="#7f1d1d" strokeWidth="1.5" />
                )}

                {/* Eyes & Cute Face */}
                <circle cx="41" cy="36" r="4.5" fill="#0f172a" />
                <circle cx="59" cy="36" r="4.5" fill="#0f172a" />
                <circle cx="39.5" cy="34.5" r="1.8" fill="#ffffff" />
                <circle cx="57.5" cy="34.5" r="1.8" fill="#ffffff" />
                <circle cx="33" cy="43" r="3.5" fill="#ef4444" opacity="0.7" />
                <circle cx="67" cy="43" r="3.5" fill="#ef4444" opacity="0.7" />

                {/* Smile */}
                <path d="M 42 44 Q 50 52 58 44" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
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
    </>
  );
}
