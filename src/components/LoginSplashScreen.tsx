'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import GoldParticlesRainCanvas from './GoldParticlesRainCanvas';

interface LoginSplashScreenProps {
  onLoginSuccess: () => void;
}

export default function LoginSplashScreen({ onLoginSuccess }: LoginSplashScreenProps) {
  const { language, setLanguage, tr } = useLanguage();

  const [username, setUsername] = useState('1');
  const [password, setPassword] = useState('1');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const isEn = language === 'en';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (username.trim() === '1' && password.trim() === '1') {
      setIsLoading(true);
      setLoadingProgress(60);

      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              sessionStorage.setItem('is_logged_in', 'true');
              onLoginSuccess();
            }, 300);
            return 100;
          }
          return prev + 15;
        });
      }, 150);
    } else {
      setErrorMsg(isEn ? 'Invalid credentials! Use demo login 1 / 1.' : 'Tài khoản hoặc mật khẩu không chính xác! Thử dùng 1 / 1.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0e0302] text-white overflow-hidden p-4">
      {/* 3D GOLDEN METEOR & GLITTER RAIN CANVAS BACKGROUND */}
      <GoldParticlesRainCanvas />

      {/* TOP RIGHT LANGUAGE SWITCHER BUTTON */}
      <button
        onClick={() => setLanguage(isEn ? 'vi' : 'en')}
        className="absolute top-6 right-6 z-50 px-4 py-2 rounded-2xl bg-[#1a0806]/90 border border-amber-400/50 backdrop-blur-xl shadow-2xl text-xs font-black text-amber-400 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all pointer-events-auto"
      >
        <span>{isEn ? '🇬🇧 English' : '🇻🇳 Tiếng Việt'}</span>
        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-black border border-amber-500/30">
          {tr('switch_lang_btn')}
        </span>
      </button>

      {/* LUXURY GLASSMORPHISM FORM CARD FLOATING ON GOLDEN RAIN */}
      <div className="relative z-10 w-full max-w-md bg-[#120504]/85 border border-amber-400/35 backdrop-blur-2xl rounded-3xl p-6 md:p-8 shadow-2xl shadow-amber-500/15 animate-slide-up text-center [transform:translate3d(0,0,0)] [will-change:transform]">
        
        {/* BRAND ICON BADGE */}
        <div className="relative w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-red-600 blur-xl opacity-80 animate-pulse" />
          <div className="relative w-full h-full rounded-full bg-[#1c0806] border-2 border-amber-400 flex items-center justify-center text-4xl shadow-2xl">
            🇻🇳
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent mb-1 drop-shadow">
          {tr('app_title')}
        </h1>
        <p className="text-xs text-amber-200/90 mb-6 font-medium leading-relaxed">
          {tr('app_subtitle')}
        </p>

        {/* LOGIN FORM */}
        {!isLoading ? (
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-amber-200/90 mb-1.5">
                {tr('username_label')}
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="1"
                className="w-full px-4 py-3 bg-[#1e0907]/90 border border-amber-400/30 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors font-mono font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-200/90 mb-1.5">
                {tr('password_label')}
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="1"
                className="w-full px-4 py-3 bg-[#1e0907]/90 border border-amber-400/30 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors font-mono font-bold"
                required
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-500/20 border border-rose-400/40 rounded-xl text-rose-300 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-red-700 via-orange-600 to-amber-500 hover:brightness-110 text-slate-950 font-black rounded-xl text-sm shadow-xl shadow-amber-500/25 transition-all transform active:scale-95 flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              <span>🚀</span>
              <span>{tr('login_button')}</span>
            </button>

            <div className="text-[11px] text-amber-300/80 text-center mt-3 font-medium">
              {tr('trial_account_hint')}
            </div>
          </form>
        ) : (
          /* PRELOADER ANIMATION */
          <div className="py-6 space-y-4">
            <div className="w-full bg-[#1e0907] h-3.5 rounded-full overflow-hidden p-0.5 border border-amber-400/40">
              <div
                className="bg-gradient-to-r from-red-700 via-orange-600 to-amber-400 h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-xs font-bold text-amber-300">
              <span className="text-amber-400">{tr('preload_status')}</span>
              <span>{loadingProgress}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
