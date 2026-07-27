'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { WeatherMode } from './WeatherEffects';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeWeatherMode: WeatherMode;
  onWeatherModeChange: (mode: WeatherMode) => void;
  showPet: boolean;
  onTogglePet: () => void;
  performanceMode: 'high' | 'eco';
  onTogglePerformanceMode: (mode: 'high' | 'eco') => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  activeWeatherMode,
  onWeatherModeChange,
  showPet,
  onTogglePet,
  performanceMode,
  onTogglePerformanceMode
}: SettingsModalProps) {
  const { language, setLanguage } = useLanguage();
  const isEn = language === 'en';

  if (!isOpen) return null;

  const weatherOptions: Array<{ id: WeatherMode; labelVi: string; labelEn: string; icon: string }> = [
    { id: 'sunny', labelVi: '☀️ Nắng vàng', labelEn: '☀️ Sunny', icon: '☀️' },
    { id: 'rainy', labelVi: '🌧️ Mưa phùn', labelEn: '🌧️ Rainy', icon: '🌧️' },
    { id: 'cloudy', labelVi: '⛅ Mây phủ', labelEn: '⛅ Cloudy', icon: '⛅' },
    { id: 'windy', labelVi: '💨 Gió lộng', labelEn: '💨 Windy', icon: '💨' },
    { id: 'snowy', labelVi: '❄️ Tuyết trắng', labelEn: '❄️ Snowy', icon: '❄️' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div className="relative w-full max-w-lg bg-slate-900/95 border border-amber-400/40 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl text-white space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xl shadow-lg">
              ⚙️
            </div>
            <div>
              <h2 className="text-lg font-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                {isEn ? 'System Settings' : 'Cài Đặt Hệ Thống'}
              </h2>
              <p className="text-xs text-slate-400">
                {isEn ? 'Customize your 3D Vietnam experience' : 'Tùy chỉnh trải nghiệm khám phá Việt Nam 3D'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* 1. LANGUAGE SWITCHER */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
            🌐 {isEn ? 'Language / Ngôn ngữ' : 'Ngôn Ngữ Hiển Thị'}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setLanguage('vi')}
              className={`py-3 px-4 rounded-2xl border text-xs font-black flex items-center justify-center gap-2 transition-all ${
                !isEn
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>🇻🇳</span>
              <span>Tiếng Việt</span>
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`py-3 px-4 rounded-2xl border text-xs font-black flex items-center justify-center gap-2 transition-all ${
                isEn
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>
          </div>
        </div>

        {/* 2. 3D WEATHER MODE CUSTOMIZATION */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
            🌤️ {isEn ? '3D Panoramic Weather Mode' : 'Tùy Chỉnh Thời Tiết 3D Toàn Cảnh'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {weatherOptions.map(option => {
              const isActive = activeWeatherMode === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => onWeatherModeChange(option.id)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-extrabold shadow-md'
                      : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <span>{isEn ? option.labelEn : option.labelVi}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. STAR MASCOT CONTROLS */}
        <div className="space-y-3 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60">
          <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
            ⭐ {isEn ? 'Star Mascot Assistant' : 'Trợ Lý Linh Vật Ngôi Sao'}
          </label>
          
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-medium text-slate-300">
              {isEn ? 'Show Star Mascot on screen' : 'Hiển thị Ngôi Sao trên màn hình'}
            </span>
            <button
              onClick={onTogglePet}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                showPet ? 'bg-amber-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  showPet ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 4. PERFORMANCE MODE */}
        <div className="space-y-2 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60">
          <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
            ⚡ {isEn ? 'GPU Performance Mode' : 'Chế Độ Hiệu Năng & Pin'}
          </label>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={() => onTogglePerformanceMode('high')}
              className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                performanceMode === 'high'
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-extrabold shadow-md'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <span>⚡ {isEn ? 'High 120Hz' : 'Mượt Mà 120Hz'}</span>
              <span className="text-[10px] text-slate-400 font-normal">{isEn ? 'Max FPS & Visuals' : 'Hình ảnh tối đa'}</span>
            </button>
            <button
              onClick={() => onTogglePerformanceMode('eco')}
              className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                performanceMode === 'eco'
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-extrabold shadow-md'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <span>🔋 {isEn ? 'Eco Mode' : 'Tiết Kiệm Pin'}</span>
              <span className="text-[10px] text-slate-400 font-normal">{isEn ? 'Cool Device & Battery' : 'Máy mát & Đỡ tốn pin'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 text-center text-[11px] text-slate-500">
          Vietnam Tourism 3D v2.5.0 • Powered by Mapbox 3D & AGY AI
        </div>
      </div>
    </div>
  );
}
