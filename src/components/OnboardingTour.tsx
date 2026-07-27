'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFeature?: (feature: string) => void;
}

export default function OnboardingTour({ isOpen, onClose, onSelectFeature }: OnboardingTourProps) {
  const { language, tr } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);

  if (!isOpen) return null;

  const isEn = language === 'en';

  const steps = [
    {
      step: 1,
      title: isEn ? '👋 Welcome to Vietnam 3D!' : '👋 Chào mừng bạn đến với Việt Nam 3D!',
      message: isEn
        ? 'Welcome to 3D Vietnam Tourism! To help you get the best experience, I will quickly introduce each feature to you!'
        : 'Xin chào! Rồng AI chào mừng bạn đến với ứng dụng Du Lịch 3D Việt Nam! Để giúp bạn có trải nghiệm tốt nhất, mình sẽ giới thiệu nhanh từng tính năng nhé!',
      highlightArea: 'center',
      positionClass: 'bottom-24 left-1/2 -translate-x-1/2'
    },
    {
      step: 2,
      title: isEn ? '☀️ Real-Time Weather Widget' : '☀️ Widget Dự Báo Thời Tiết',
      message: isEn
        ? 'On the left side is the Real-time Weather Widget, helping you check current weather conditions at your destination.'
        : 'Bên góc trái này là Widget Dự Báo Thời Tiết Real-time, giúp bạn dễ dàng cập nhật tình hình thời tiết tại địa danh muốn ghé thăm.',
      highlightArea: 'top-left',
      positionClass: 'top-32 left-8 md:left-72'
    },
    {
      step: 3,
      title: isEn ? '🗺️ Custom Tour Builder' : '🗺️ Tự Thiết Kế Tour Du Lịch',
      message: isEn
        ? 'Here, you can select destinations from South to North for Dragon AI to generate 3D snap-to-road navigation routes.'
        : 'Tại đây, bạn có thể tự do chọn các địa danh từ Nam ra Bắc để Rồng AI tạo lộ trình chỉ đường 3D bám sát mặt đường thực tế.',
      highlightArea: 'sidebar-custom',
      positionClass: 'top-40 left-8 md:left-72'
    },
    {
      step: 4,
      title: isEn ? '📝 Travel Notes & Checklist' : '📝 Sổ Tay Ghi Chú Du Lịch',
      message: isEn
        ? 'At the bottom right is your Travel Notes, where you can keep your packing checklist and trip reminders.'
        : 'Góc dưới này là Sổ Tay Ghi Chú Du Lịch, nơi bạn lưu lại checklist hành lý và ghi nhớ riêng cho chuyến đi.',
      highlightArea: 'bottom-right',
      positionClass: 'bottom-24 right-8'
    },
    {
      step: 5,
      title: isEn ? '🎁 Rewards Store & Mini-Games' : '🎁 Cửa Hàng Đổi Quà & Games',
      message: isEn
        ? 'You can also earn points for souvenirs, food/cafe discount vouchers, and play the 7 Wonders Puzzle Game!'
        : 'Bạn còn có thể tích điểm nhận Quà lưu niệm, Voucher giảm giá quán ăn/cà phê và chơi Game ghép hình 7 Kỳ quan nữa đấy!',
      highlightArea: 'sidebar-rewards',
      positionClass: 'top-52 left-8 md:left-72'
    },
    {
      step: 6,
      title: isEn ? '🚀 Ready to Explore!' : '🚀 Sẵn Sàng Khám Phá!',
      message: isEn
        ? "You are all set! Let's start exploring Vietnam now!"
        : 'Bây giờ bạn đã sẵn sàng rồi! Hãy bắt đầu hành trình khám phá Việt Nam ngay thôi nào!',
      highlightArea: 'center',
      positionClass: 'bottom-24 left-1/2 -translate-x-1/2'
    }
  ];

  const currentStepData = steps[currentStep - 1];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      if (typeof window !== 'undefined') {
        localStorage.setItem('hasCompletedTutorial', 'true');
      }
      onClose();
    }
  };

  const handleSkip = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasCompletedTutorial', 'true');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9990] pointer-events-auto overflow-hidden">
      {/* SPOTLIGHT BACKDROP OVERLAY */}
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm transition-all duration-500" />

      {/* HIGHLIGHT SPOTLIGHT PULSE GLOW FOR ACTIVE STEP */}
      {currentStepData.highlightArea === 'top-left' && (
        <div className="absolute top-14 left-4 md:top-4 md:left-72 w-52 h-16 rounded-2xl border-2 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.8)] animate-pulse pointer-events-none" />
      )}
      {currentStepData.highlightArea === 'bottom-right' && (
        <div className="absolute bottom-6 right-6 w-48 h-14 rounded-full border-2 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.8)] animate-pulse pointer-events-none" />
      )}
      {currentStepData.highlightArea === 'sidebar-custom' && (
        <div className="absolute top-36 left-4 w-56 h-12 rounded-xl border-2 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.8)] animate-pulse pointer-events-none hidden md:block" />
      )}
      {currentStepData.highlightArea === 'sidebar-rewards' && (
        <div className="absolute top-60 left-4 w-56 h-12 rounded-xl border-2 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.8)] animate-pulse pointer-events-none hidden md:block" />
      )}

      {/* ONBOARDING DIALOGUE BOX WITH CHIBI DRAGON */}
      <div
        className={`fixed z-[9995] w-[90%] max-w-md bg-slate-900/95 border-2 border-amber-400/80 rounded-3xl p-5 md:p-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 animate-slide-up ${currentStepData.positionClass}`}
      >
        {/* DRAGON MASCOT HEADER */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center text-2xl shadow-lg shrink-0">
              🐉
            </div>
            <div>
              <h3 className="text-sm font-black text-amber-400 leading-tight">
                {currentStepData.title}
              </h3>
              <span className="text-[10px] text-slate-400 font-bold">
                {isEn ? `Step ${currentStep} of ${steps.length}` : `Bước ${currentStep} / ${steps.length}`}
              </span>
            </div>
          </div>

          <button
            onClick={handleSkip}
            className="text-[11px] font-bold text-slate-400 hover:text-white px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-full border border-slate-700 transition-all active:scale-95"
          >
            {tr('skip')}
          </button>
        </div>

        {/* DIALOGUE MESSAGE BOX */}
        <div className="w-full px-2 py-1 text-left text-xs md:text-sm font-semibold text-slate-100 whitespace-normal break-words leading-relaxed mb-5">
          {currentStepData.message}
        </div>

        {/* PROGRESS STEP INDICATOR & ACTION BUTTON */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <div className="flex items-center gap-1.5">
            {steps.map(s => (
              <div
                key={s.step}
                className={`h-2 rounded-full transition-all ${
                  s.step === currentStep
                    ? 'w-6 bg-amber-400'
                    : s.step < currentStep
                    ? 'w-2 bg-emerald-400'
                    : 'w-2 bg-slate-800'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:brightness-110 text-slate-950 font-black text-xs md:text-sm rounded-xl shadow-xl shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <span>{currentStep === steps.length ? (isEn ? '🚀 Start Exploring!' : '🚀 Bắt Đầu Khám Phá!') : (isEn ? 'Next ➔' : 'Tiếp tục ➔')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
