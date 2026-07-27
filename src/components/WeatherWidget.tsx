'use client';

import React, { useState } from 'react';
import { getWeatherForRegion, WeatherData } from '@/utils/weather';
import { useLanguage } from '@/context/LanguageContext';

import { WeatherMode } from './WeatherEffects';

interface WeatherWidgetProps {
  currentRegion?: string;
  activeWeatherMode?: WeatherMode;
  onWeatherModeChange?: (mode: WeatherMode) => void;
}

export default function WeatherWidget({
  currentRegion = 'north',
  activeWeatherMode = 'sunny',
  onWeatherModeChange
}: WeatherWidgetProps) {
  const { t, language, setLanguage } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState(currentRegion);
  const [showForecastModal, setShowForecastModal] = useState(false);

  const weatherData: WeatherData = getWeatherForRegion(selectedRegion);

  const regionNames: Record<string, { vi: string; en: string }> = {
    north: { vi: 'Hà Nội (Miền Bắc)', en: 'Hanoi (North)' },
    central: { vi: 'Huế - Đà Nẵng (Miền Trung)', en: 'Hue - Da Nang (Central)' },
    south: { vi: 'TP.HCM (Miền Nam)', en: 'HCMC (South)' },
    west: { vi: 'Cần Thơ (Miền Tây)', en: 'Can Tho (West)' }
  };

  return (
    <>
      {/* RESPONSIVE FIXED LEFT-ALIGNED WEATHER WIDGET PILL */}
      <div className="fixed top-3 left-3 md:top-4 md:left-72 z-40 flex items-center gap-1.5 pointer-events-auto [transform:translate3d(0,0,0)] [will-change:transform]">
        <button
          onClick={() => setShowForecastModal(true)}
          className="bg-slate-900/95 hover:bg-slate-900 border border-amber-400/60 backdrop-blur-xl rounded-2xl px-2.5 py-1.5 md:px-3.5 md:py-2 shadow-2xl text-white flex items-center gap-1.5 md:gap-2.5 transition-all active:scale-95 group"
        >
          <span className="text-base md:text-xl group-hover:scale-110 transition-transform">
            {weatherData.condition.icon}
          </span>

          <div className="text-left">
            <div className="flex items-center gap-1">
              <strong className="text-amber-400 text-xs md:text-sm font-black">{weatherData.tempC}°C</strong>
              <span className="hidden md:inline text-[10px] text-slate-300 font-bold truncate max-w-[100px]">
                {language === 'en' ? weatherData.condition.en : weatherData.condition.vi}
              </span>
            </div>
            <div className="hidden md:block text-[9px] text-slate-400 font-medium">
              💧 {weatherData.humidity}% • 💨 {weatherData.windKm}km/h
            </div>
          </div>
        </button>

        {/* 3D WEATHER EFFECT QUICK TOGGLE PILLS */}
        {onWeatherModeChange && (
          <div className="hidden sm:flex bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-2xl p-1 shadow-2xl items-center gap-1">
            {[
              { id: 'sunny', icon: '☀️', title: 'Nắng / Sunny' },
              { id: 'rainy', icon: '🌧️', title: 'Mưa / Rainy' },
              { id: 'cloudy', icon: '⛅', title: 'Mây / Cloudy' },
              { id: 'snowy', icon: '❄️', title: 'Tuyết / Snowy' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => onWeatherModeChange(m.id as WeatherMode)}
                className={`w-7 h-7 rounded-xl text-xs flex items-center justify-center transition-all ${
                  activeWeatherMode === m.id
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title={m.title}
              >
                {m.icon}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* LANGUAGE SWITCHER MINI PILL UNDERNEATH WEATHER WIDGET (Desktop Only) */}
      <button
        onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
        className="hidden md:flex fixed top-[60px] left-72 z-40 bg-slate-900/90 hover:bg-slate-800 border border-amber-400/40 backdrop-blur-md rounded-full px-2.5 py-1 shadow-lg text-[10px] font-bold text-amber-400 items-center gap-1.5 active:scale-95 transition-all pointer-events-auto [transform:translate3d(0,0,0)] [will-change:transform]"
      >
        <span>{language === 'vi' ? '🇻🇳 VI' : '🇬🇧 EN'}</span>
        <span className="text-[9px] text-slate-300">
          {language === 'vi' ? '• Đổi EN 🇬🇧' : '• Đổi VI 🇻🇳'}
        </span>
      </button>

      {/* 3-DAY WEATHER FORECAST & DRAGON AI ADVICE MODAL */}
      {showForecastModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setShowForecastModal(false)}
          />

          <div className="relative bg-slate-900 border border-amber-400/50 rounded-3xl p-5 md:p-6 w-full max-w-md shadow-2xl text-white animate-slide-up">
            {/* Header */}
            <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">☀️</span>
                <div>
                  <h3 className="font-black text-base md:text-lg text-amber-400">
                    Dự Báo Thời Tiết Thời Gian Thực
                  </h3>
                  <p className="text-[11px] text-slate-400">Thời tiết du lịch & Lời khuyên Rồng AI</p>
                </div>
              </div>

              <button
                onClick={() => setShowForecastModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Region Selector Pills */}
            <div className="grid grid-cols-2 gap-1.5 mb-4">
              {Object.keys(regionNames).map(rId => (
                <button
                  key={rId}
                  onClick={() => setSelectedRegion(rId)}
                  className={`p-2 rounded-xl text-xs font-bold text-left border transition-all ${
                    selectedRegion === rId
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-black'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {t(regionNames[rId])}
                </button>
              ))}
            </div>

            {/* Current Region Main Weather Card */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 mb-4 flex items-center justify-between shadow-inner">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{weatherData.condition.icon}</span>
                <div>
                  <div className="text-2xl font-black text-white">{weatherData.tempC}°C</div>
                  <div className="text-xs font-bold text-amber-400">
                    {language === 'en' ? weatherData.condition.en : weatherData.condition.vi}
                  </div>
                </div>
              </div>

              <div className="text-right text-xs text-slate-400 space-y-1">
                <div>💧 Độ ẩm: <strong className="text-slate-200">{weatherData.humidity}%</strong></div>
                <div>💨 Sức gió: <strong className="text-slate-200">{weatherData.windKm} km/h</strong></div>
              </div>
            </div>

            {/* Dragon AI Dialogue Advice Box */}
            <div className="p-3.5 bg-amber-500/10 border border-amber-400/40 rounded-2xl mb-4 text-xs leading-relaxed text-amber-200">
              <div className="flex justify-between items-center mb-1 font-extrabold text-amber-400">
                <span>🐉 Rồng AI Tư Vấn Thời Tiết:</span>
              </div>
              <p className="pl-1 text-left whitespace-normal break-words">{t(weatherData.advice)}</p>
            </div>

            {/* 3-Day Forecast Grid */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-xs text-slate-300 uppercase tracking-wider">
                📅 Dự Báo 3 Ngày Tới:
              </h4>

              <div className="grid grid-cols-3 gap-2">
                {weatherData.forecast.map((fc, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-center"
                  >
                    <div className="text-[11px] font-bold text-slate-400 mb-1">{t(fc.day)}</div>
                    <div className="text-2xl mb-1">{fc.icon}</div>
                    <div className="text-xs font-black text-amber-400">{fc.tempC}°C</div>
                    <div className="text-[10px] text-slate-300 truncate">{t(fc.condition)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
