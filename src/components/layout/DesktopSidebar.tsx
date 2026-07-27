'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useGame, LEVEL_THRESHOLDS } from '@/context/GameContext';

interface DesktopSidebarProps {
  currentMode: string;
  onModeChange: (mode: string) => void;
  onCheckInClick: () => void;
  onNavigate: (path: string) => void;
}

export default function DesktopSidebar({
  currentMode,
  onModeChange,
  onCheckInClick,
  onNavigate,
}: DesktopSidebarProps) {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const { progress } = useGame();
  const [isExploreExpanded, setIsExploreExpanded] = useState(true);

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

  const navItems = [
    { name: 'Trang chủ / Home', icon: '🏠', path: '/' },
    { name: 'Bộ sưu tập / Collection', icon: '🏆', path: '/collection' },
    { name: 'Đổi Quà / Rewards', icon: '🎁', path: '/rewards' },
    { name: 'Cá nhân / Profile', icon: '👤', path: '/profile' },
  ];

  return (
    <div className="hidden md:flex flex-col fixed top-0 left-0 h-screen w-64 glass z-40 border-r border-white/10 shadow-2xl overflow-y-auto no-scrollbar bg-slate-950/90 backdrop-blur-2xl">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent drop-shadow-sm flex items-center gap-2">
          <span className="text-2xl animate-spin">⭐</span> Khám Phá VN
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-4 space-y-2">
        <button
          onClick={() => onNavigate('/')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
            pathname === '/'
              ? 'bg-amber-500/20 border-l-4 border-amber-400 text-amber-300 font-bold'
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <span className="text-xl">🏠</span>
          <span className="font-medium text-sm text-left">Trang chủ / Home</span>
        </button>

        {/* Explore Modes Submenu */}
        <div className="space-y-1">
          <button
            onClick={() => setIsExploreExpanded(!isExploreExpanded)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 text-gray-400 hover:bg-white/5 hover:text-white"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🗺️</span>
              <span className="font-medium text-sm text-left">Khám phá / Explore</span>
            </div>
            <span className={`text-xs transition-transform duration-300 ${isExploreExpanded ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {isExploreExpanded && (
            <div className="pl-12 pr-4 py-2 space-y-2 animate-slide-down origin-top">
              <button
                onClick={() => onModeChange('free')}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-xs ${
                  currentMode === 'free' ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-400/30' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <span>🌍</span> Tự Do / Free
              </button>
              <button
                onClick={() => onModeChange('custom')}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-xs ${
                  currentMode === 'custom' ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-400/30' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <span>🛤️</span> Tự Thiết Kế / Custom
              </button>
              <button
                onClick={() => onModeChange('preset')}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-xs ${
                  currentMode === 'preset' ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-400/30' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <span>🎯</span> Tour Gợi Ý / Preset
              </button>
            </div>
          )}
        </div>

        <button
          onClick={onCheckInClick}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-gray-400 hover:bg-white/5 hover:text-amber-400 group"
        >
          <span className="text-xl group-hover:scale-110 transition-transform">📸</span>
          <span className="font-medium text-sm text-left">Camera Check-in</span>
        </button>

        {navItems.slice(1).map((item) => (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              pathname === item.path
                ? 'bg-amber-500/20 border-l-4 border-amber-400 text-amber-300 font-bold'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium text-sm text-left">{item.name}</span>
          </button>
        ))}
      </div>

      {/* Bottom Star Mascot Widget */}
      <div className="p-4 border-t border-white/10 mt-auto bg-slate-900/80">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 shadow-lg">
          <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-xl shadow-inner border border-amber-400/40 animate-bounce">
            ⭐
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-black text-amber-300 font-mono">⭐ Ngôi Sao Lv.{level}</span>
            </div>
            <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-amber-400/30">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${expPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-medium">
          <button
            onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
            className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold border border-amber-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{language === 'en' ? '🇬🇧 English' : '🇻🇳 Tiếng Việt'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
