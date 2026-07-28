'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface AppOnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAiChat?: () => void;
}

export default function AppOnboardingTour({ isOpen, onClose }: AppOnboardingTourProps) {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [currentStep, setCurrentStep] = useState(0);
  const [isSparkling, setIsSparkling] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setIsSparkling(true);
      const timer = setTimeout(() => setIsSparkling(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const tourSteps = [
    {
      title: isEn ? '🌟 Welcome to Explore Vietnam!' : '🌟 Chào mừng đến với Khám Phá Việt Nam!',
      text: isEn
        ? "Hello! I am your AI Humanoid Star Mascot 🌟! Let me guide you step-by-step to explore the application!"
        : "Xin chào! Mình là Trợ lý Ngôi Sao AI 🌟! Hãy để mình hướng dẫn bạn từng bước khám phá ứng dụng nhé!",
      icon: '🌟'
    },
    {
      title: isEn ? '🗺️ Interactive 3D Map & Sovereignty' : '🗺️ Bản Đồ 3D & Lãnh Thổ Việt Nam',
      text: isEn
        ? "Tap on any landmark or the 🇻🇳 Hoang Sa & Truong Sa Archipelagos on the 3D map to explore rich history & national beauty."
        : "Chạm vào các danh thắng hoặc 2 Quần đảo 🇻🇳 Hoàng Sa & 🇻🇳 Trường Sa để khám phá lịch sử & vẻ đẹp đất nước.",
      icon: '🇻🇳'
    },
    {
      title: isEn ? '🍱 Restaurants, Hotels & Radius Filter' : '🍱 Quán Ăn, Khách Sạn & Lọc Bán Kính',
      text: isEn
        ? "Explore nearby eateries and hotels around any landmark with flexible radius filtering from 5km up to 30km."
        : "Nơi đây chứa danh sách Quán ăn, Khách sạn kèm bộ lọc bán kính linh hoạt từ 5km đến 30km xung quanh địa điểm.",
      icon: '🏨'
    },
    {
      title: isEn ? '🚗 Real GPS Directions to Google Maps' : '🚗 Chỉ Đường Thực Tế Ngoài Đời',
      text: isEn
        ? "Tap [🚗 Directions] inside any place details panel to launch Google Maps and navigate directly in real life!"
        : "Bấm nút [🚗 Chỉ đường] trong Bảng địa điểm để mở thẳng Google Maps dẫn đường cho bạn đến tận nơi ngoài đời thực.",
      icon: '🚗'
    },
    {
      title: isEn ? '⭐ Star Progression (Level 1 to 20)' : '⭐ Tích Điểm Thăng Cấp (Lv.1 - Lv.20)',
      text: isEn
        ? "Interact, check-in, and build tours to gain EXP and level up your Star Mascot from Level 1 up to Level 20 Supernova!"
        : "Tương tác, check-in và tạo Tour nhiều để giúp mình nhận EXP nâng cấp từ Lv.1 lên Lv.20 Tối Cao Vũ Trụ nhé!",
      icon: '🚀'
    }
  ];

  const activeStepData = tourSteps[currentStep];

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in pointer-events-auto">
      {/* SPARKLE ENTRANCE PARTICLES */}
      {isSparkling && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-96 h-96 rounded-full bg-gradient-to-r from-red-600/40 via-rose-500/40 to-amber-400/40 blur-3xl animate-ping" />
        </div>
      )}

      {/* HIGH CONTRAST BEIGE MODAL DIALOG CARD */}
      <div className="relative w-full max-w-lg bg-[#FDFBF7] border-4 border-red-600 rounded-3xl p-6 md:p-8 shadow-2xl shadow-red-950/50 text-slate-900 overflow-hidden [transform:translate3d(0,0,0)] [will-change:transform]">
        {/* HEADER BAR */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-red-600/20">
          <div className="flex items-center gap-2">
            <span className="text-2xl text-red-600 animate-spin">⭐</span>
            <span className="px-3 py-1 rounded-full bg-red-700 text-amber-300 font-mono text-xs font-black uppercase tracking-wider shadow-sm">
              {isEn ? `STEP ${currentStep + 1} / ${tourSteps.length}` : `BƯỚC ${currentStep + 1} / ${tourSteps.length}`}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-red-100 hover:bg-red-200 text-red-800 font-black text-xs transition-all cursor-pointer border border-red-300"
          >
            {isEn ? 'Bỏ qua ⏭️' : 'Bỏ qua ⏭️'}
          </button>
        </div>

        {/* MASCOT & CONTENT ROW */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
          {/* AI HUMANOID STAR MASCOT MINI AVATAR */}
          <div className="relative w-20 h-24 flex-shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-600 via-rose-500 to-amber-400 blur-xl opacity-90 animate-pulse" />
            <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-xl relative z-10 animate-bounce">
              <defs>
                <linearGradient id="starHeadGradHigh" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#991b1b" />
                </linearGradient>
              </defs>
              <path d="M 25 65 Q 10 70 15 80" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M 75 65 Q 90 50 85 40" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M 38 85 L 35 110" stroke="#991b1b" strokeWidth="7" strokeLinecap="round" />
              <path d="M 62 85 L 65 110" stroke="#991b1b" strokeWidth="7" strokeLinecap="round" />
              <rect x="32" y="55" width="36" height="32" rx="10" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
              <polygon points="50,58 45,72 55,72" fill="#fef08a" />
              <polygon points="50,5 61,28 85,30 67,46 72,70 50,57 28,70 33,46 15,30 39,28" fill="url(#starHeadGradHigh)" stroke="#7f1d1d" strokeWidth="2" />
              <circle cx="42" cy="38" r="4" fill="#0f172a" />
              <circle cx="58" cy="38" r="4" fill="#0f172a" />
              <path d="M 43 46 Q 50 54 57 46" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          {/* STEP TEXT CONTENT WITH HIGH CONTRAST GOLD & SOLID BLACK TEXT */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <h3 className="text-base md:text-lg font-black text-amber-700 bg-amber-100/90 px-3 py-1.5 rounded-xl border border-amber-300 flex items-center justify-center sm:justify-start gap-2 shadow-xs">
              <span className="text-xl">{activeStepData.icon}</span>
              <span className="drop-shadow-xs">{activeStepData.title}</span>
            </h3>
            <p className="text-sm md:text-base text-slate-950 font-bold leading-relaxed px-1">
              {activeStepData.text}
            </p>
          </div>
        </div>

        {/* STEP DOTS INDICATOR & BUTTONS */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-red-600/20">
          <div className="flex items-center gap-2">
            {tourSteps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`h-3 rounded-full transition-all cursor-pointer ${
                  idx === currentStep ? 'w-8 bg-red-700 shadow-md' : 'w-3 bg-red-200 hover:bg-red-400 border border-red-400'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-900 font-extrabold text-xs transition-all cursor-pointer border border-slate-300 shadow-xs"
              >
                {isEn ? '⇦ Quay lại' : '⇦ Quay lại'}
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-700/40 active:scale-95 transition-all cursor-pointer border border-red-400"
            >
              {currentStep < tourSteps.length - 1
                ? isEn ? 'TIẾP TỤC ➔' : 'TIẾP TỤC ➔'
                : isEn ? '✖️ ĐÃ HIỂU' : '✖️ ĐÃ HIỂU'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
