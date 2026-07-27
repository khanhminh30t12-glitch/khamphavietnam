'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import { useLanguage } from '@/context/LanguageContext';

const MOCK_BADGES = [
  { id: 'b1', name: 'Nhà thám hiểm tập sự', desc: 'Khám phá điểm đến đầu tiên', tier: 'bronze', icon: '🎒', earned: true, date: '20/07/2026' },
  { id: 'b2', name: 'Chuyên gia ẩm thực', desc: 'Check-in tại 5 nhà hàng', tier: 'silver', icon: '🍜', earned: true, date: '21/07/2026' },
  { id: 'b3', name: 'Sử gia', desc: 'Đọc chi tiết lịch sử 10 di tích', tier: 'gold', icon: '📜', earned: false },
  { id: 'b4', name: 'Dấu chân xuyên Việt', desc: 'Check-in đủ 3 miền', tier: 'diamond', icon: '🗺️', earned: false },
];

export default function BadgeCollection() {
  const { progress } = useGame();
  const { t } = useLanguage();

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'border-[#CD7F32] shadow-[#CD7F32]/20';
      case 'silver': return 'border-[#C0C0C0] shadow-[#C0C0C0]/20';
      case 'gold': return 'border-[#FFD700] shadow-[#FFD700]/30';
      case 'diamond': return 'border-[#B9F2FF] shadow-[#B9F2FF]/40 bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900';
      default: return 'border-slate-200';
    }
  };

  const earnedCount = MOCK_BADGES.filter(b => b.earned).length;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      {/* Stats Summary */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-around items-center gap-6">
        <div className="text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Huy hiệu sở hữu</p>
          <p className="text-3xl font-black text-primary-600 dark:text-primary-400">{earnedCount}/{MOCK_BADGES.length}</p>
        </div>
        <div className="w-px h-12 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
        <div className="text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Tổng điểm</p>
          <p className="text-3xl font-black text-amber-500">{progress.points || 1250}</p>
        </div>
        <div className="w-px h-12 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
        <div className="text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Đã Check-in</p>
          <p className="text-3xl font-black text-emerald-500">{progress.checkIns?.length || 5}</p>
        </div>
      </div>

      {/* Grid */}
      <div>
        <h2 className="text-xl font-bold mb-4 dark:text-white flex items-center gap-2">
          🏆 Bộ sưu tập huy hiệu
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {MOCK_BADGES.map(badge => (
            <div 
              key={badge.id}
              className={`relative bg-white dark:bg-slate-800 p-5 rounded-2xl border-2 transition-transform hover:-translate-y-1 ${badge.earned ? getTierColor(badge.tier) : 'border-slate-200 dark:border-slate-700 opacity-70'} overflow-hidden shadow-md`}
            >
              {/* Locked Overlay */}
              {!badge.earned && (
                <div className="absolute inset-0 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-[1px] flex items-center justify-center z-10">
                  <span className="text-3xl drop-shadow-md">🔒</span>
                </div>
              )}

              <div className="flex flex-col items-center text-center space-y-3">
                <div className={`text-5xl ${badge.earned ? '' : 'grayscale opacity-50'}`}>
                  {badge.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1" title={badge.name}>
                    {badge.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 min-h-[32px]">
                    {badge.desc}
                  </p>
                </div>
                {badge.earned && (
                  <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full w-full">
                    Đạt được: {badge.date}
                  </div>
                )}
              </div>
              
              {/* Shine effect on earned diamond/gold */}
              {badge.earned && (badge.tier === 'diamond' || badge.tier === 'gold') && (
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
