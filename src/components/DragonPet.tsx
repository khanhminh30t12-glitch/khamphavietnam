'use client';

import React, { useState, useEffect } from 'react';
import { usePetState } from '@/hooks/usePetState';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

const TIPS = [
  {
    vi: 'Chào mừng bạn đến với Khám Phá Việt Nam 3D! Bạn muốn rồng đồng hành đến địa danh nào?',
    en: 'Welcome to Discover Vietnam 3D! Where would you like to travel today?'
  },
  {
    vi: 'Đừng quên bấm Check-in AR để tích điểm nhận huy hiệu di sản và đổi voucher nhé!',
    en: 'Don\'t forget to click AR Check-in to earn points for heritage badges and vouchers!'
  },
  {
    vi: 'Bạn có thể mở tính năng "Tự Thiết Kế Tour" để chọn lộ trình du lịch từ Miền Tây ra Bắc đấy!',
    en: 'You can open "Custom Tour" to design your travel itinerary from South to North!'
  },
  {
    vi: 'Trải nghiệm Vòng Quay 120Hz và Game Ghép Hình 7 Kỳ Quan Thế Giới ở Cửa Hàng Đổi Quà nhé!',
    en: 'Experience the 120Hz Lucky Wheel and 7 Wonders Puzzle in the Rewards Store!'
  }
];

export default function DragonPet() {
  const { level } = usePetState();
  const { language, tr, t } = useLanguage();

  // Hidden by default when idle so it only shows when user taps mascot!
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [currentTipIdx, setCurrentTipIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  const currentTipObj = TIPS[currentTipIdx];
  const targetText = t(currentTipObj);

  // Typewriter effect
  useEffect(() => {
    if (!isDialogueOpen) return;
    setDisplayedText('');
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < targetText.length) {
        setDisplayedText(prev => prev + targetText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 35);

    return () => clearInterval(typingInterval);
  }, [targetText, isDialogueOpen]);

  const handleNextTip = () => {
    setCurrentTipIdx(prev => (prev + 1) % TIPS.length);
  };

  return (
    <div className="fixed bottom-6 left-4 md:bottom-8 md:left-72 z-40 flex flex-col items-start transition-all duration-300 pointer-events-auto [transform:translate3d(0,0,0)] [will-change:transform]">
      
      {/* DIALOGUE BOX - ONLY SHOWN WHEN USER CLICKS/TAPS DRAGON MASCOT */}
      {isDialogueOpen && (
        <div className="relative bg-slate-900/95 text-white p-4 rounded-3xl rounded-bl-none shadow-2xl mb-3 max-w-[320px] md:max-w-[380px] w-auto border-2 border-amber-400/80 backdrop-blur-2xl animate-slide-up z-50">
          
          {/* Header Badge */}
          <div className="flex items-center justify-between gap-2 mb-2 border-b border-slate-800 pb-1.5">
            <div className="flex items-center gap-1.5 text-amber-400 font-black text-xs">
              <span className="text-sm">🐉</span>
              <span>{tr('dragon_name')}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleNextTip}
                className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[10px] font-bold transition-all active:scale-95"
              >
                {tr('next')}
              </button>

              {/* Close Button */}
              <button
                onClick={() => setIsDialogueOpen(false)}
                className="w-6 h-6 rounded-full bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 text-xs font-black flex items-center justify-center transition-all active:scale-95"
                title="Đóng khung thoại"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Typewriter Text Box with Safe Left Padding */}
          <div className="w-full px-4 py-2 text-left text-xs md:text-sm font-semibold text-slate-100 whitespace-normal break-words leading-relaxed overflow-y-auto max-h-[130px] no-scrollbar">
            {displayedText}
          </div>

          {/* Bottom Controls */}
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex justify-between items-center text-[10px] text-slate-400 font-medium">
            <span>Level {level} • Rồng AI</span>
            <span className="text-amber-400 font-bold">Tap Avatar to Chat</span>
          </div>
        </div>
      )}

      {/* CHIBI DRAGON AVATAR - IDLE MASCOT MODE */}
      <div className="relative flex items-center">
        <button
          onClick={() => setIsDialogueOpen(prev => !prev)}
          className="relative group focus:outline-none flex items-center gap-2"
          title="Chạm vào Rồng AI để xem hướng dẫn & trò chuyện"
        >
          {/* Glowing Aura */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />

          {/* Mascot Circle */}
          <div className="relative w-14 h-14 md:w-18 md:h-18 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center text-3xl md:text-4xl shadow-2xl group-hover:scale-110 active:scale-95 transition-transform">
            🐉
            <span className="absolute -top-1 -right-1 px-2 py-0.5 bg-amber-500 text-slate-950 font-black text-[9px] rounded-full border border-slate-950 shadow">
              Lv.{level}
            </span>
          </div>

          {/* Tap Prompt Badge */}
          {!isDialogueOpen && (
            <div className="hidden sm:flex items-center gap-1 bg-slate-900/90 border border-amber-400/50 backdrop-blur-md rounded-full px-3 py-1 shadow-lg text-[11px] font-extrabold text-amber-400 animate-bounce">
              <span>💬 Tap Rồng AI</span>
            </div>
          )}
        </button>
      </div>

    </div>
  );
}
