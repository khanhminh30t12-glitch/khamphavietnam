'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';

interface MobileNavProps {
  onCheckInClick: () => void;
  onTourClick: () => void;
  onRewardsClick?: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function MobileNav({
  onCheckInClick,
  onTourClick,
  onRewardsClick,
  activeTab,
  onTabChange,
}: MobileNavProps) {
  const pathname = usePathname();
  const { progress } = useGame();

  const getIsActive = (path: string, tabId: string) => {
    if (pathname === path && activeTab === tabId) return true;
    if (pathname === '/' && activeTab === tabId) return true;
    return false;
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass pb-safe border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl">
      <div className="flex justify-around items-center h-16 px-1">
        <Link
          href="/"
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center w-14 h-full transition-colors ${
            getIsActive('/', 'home') ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="text-lg mb-0.5">🏠</span>
          <span className="text-[9px] font-medium">Trang chủ</span>
        </Link>

        <button
          onClick={() => {
            onTabChange('tour');
            onTourClick();
          }}
          className={`flex flex-col items-center justify-center w-14 h-full transition-colors ${
            activeTab === 'tour' ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="text-lg mb-0.5">🗺️</span>
          <span className="text-[9px] font-medium">Tour</span>
        </button>

        {/* Floating Check-in AR Button */}
        <div className="relative -mt-5">
          <button
            onClick={onCheckInClick}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 shadow-[0_0_15px_rgba(245,158,11,0.6)] border-4 border-slate-950 transform transition-transform active:scale-95 hover:scale-105"
            title="Check-in AR"
          >
            <span className="text-2xl">📸</span>
          </button>
        </div>

        {/* Mobile Redeem Store Button */}
        <button
          onClick={() => {
            onTabChange('rewards');
            if (onRewardsClick) onRewardsClick();
          }}
          className={`flex flex-col items-center justify-center w-14 h-full transition-colors relative ${
            activeTab === 'rewards' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="text-lg mb-0.5">🎁</span>
          <span className="text-[9px] font-extrabold text-amber-400 truncate">
            ⭐{progress.points}p
          </span>
        </button>

        <Link
          href="/collection"
          onClick={() => onTabChange('collection')}
          className={`flex flex-col items-center justify-center w-14 h-full transition-colors ${
            getIsActive('/collection', 'collection') ? 'text-yellow-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="text-lg mb-0.5">🏆</span>
          <span className="text-[9px] font-medium">Di sản</span>
        </Link>
      </div>
    </div>
  );
}
