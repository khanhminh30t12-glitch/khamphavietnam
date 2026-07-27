import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

interface DesktopSidebarProps {
  currentMode: string;
  onModeChange: (mode: string) => void;
  onCheckInClick: () => void;
  onNavigate: (path: string) => void;
  onRestartTutorial?: () => void;
}

export default function DesktopSidebar({
  currentMode,
  onModeChange,
  onCheckInClick,
  onNavigate,
  onRestartTutorial,
}: DesktopSidebarProps) {
  const pathname = usePathname();
  const { language, setLanguage, tr } = useLanguage();
  const [isExploreExpanded, setIsExploreExpanded] = useState(true);

  const navItems = [
    { name: 'Trang chủ / Home', icon: '🏠', path: '/' },
    { name: 'Bộ sưu tập / Collection', icon: '🏆', path: '/collection' },
    { name: 'Đổi Quà / Rewards', icon: '🎁', path: '/rewards' },
    { name: 'Cá nhân / Profile', icon: '👤', path: '/profile' },
  ];

  return (
    <div className="hidden md:flex flex-col fixed top-0 left-0 h-screen w-64 glass z-40 border-r border-white/10 shadow-2xl overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-sm flex items-center gap-2">
          <span className="text-2xl">🐉</span> Khám Phá VN
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-4 space-y-2">
        <button
          onClick={() => onNavigate('/')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
            pathname === '/' 
              ? 'bg-white/10 border-l-4 border-amber-400 text-white' 
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
                  currentMode === 'free' ? 'bg-blue-500/20 text-blue-400 font-semibold' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                <span>🌍</span> Tự Do / Free
              </button>
              <button
                onClick={() => onModeChange('custom')}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-xs ${
                  currentMode === 'custom' ? 'bg-purple-500/20 text-purple-400 font-semibold' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                <span>🛤️</span> Tự Thiết Kế / Custom
              </button>
              <button
                onClick={() => onModeChange('preset')}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-xs ${
                  currentMode === 'preset' ? 'bg-green-500/20 text-green-400 font-semibold' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
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
                ? 'bg-white/10 border-l-4 border-amber-400 text-white'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium text-sm text-left">{item.name}</span>
          </button>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/10 mt-auto bg-slate-900/50">
        <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-red-500/10 border border-amber-500/20">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xl shadow-inner border border-white/5">
            🐉
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-amber-400">Rồng Con Lvl.5</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 w-[60%] rounded-full animate-shine" />
            </div>
          </div>
        </div>

        {/* Tutorial Restart & Language Switcher */}
        <div className="space-y-2">
          {onRestartTutorial && (
            <button
              onClick={onRestartTutorial}
              className="w-full py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <span>❓</span>
              <span>{language === 'en' ? 'Restart Tutorial' : 'Hướng dẫn lại'}</span>
            </button>
          )}

          <button
            onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-between text-xs font-bold transition-all shadow-md active:scale-95"
          >
            <span className="flex items-center gap-2">
              <span>{language === 'vi' ? '🇻🇳' : '🇬🇧'}</span>
              <span className="text-white">{language === 'vi' ? 'Tiếng Việt' : 'English'}</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-black border border-amber-500/30">
              {language === 'vi' ? 'Đổi sang EN 🇬🇧' : 'Switch to VI 🇻🇳'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
