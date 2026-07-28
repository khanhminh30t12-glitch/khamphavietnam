'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import StarryBackgroundCanvas from './StarryBackgroundCanvas';

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
    <div className="fixed inset-0 z-50 flex flex-col md:flex-row items-center justify-center bg-[#F7F4EC] text-slate-900 overflow-y-auto p-4 gap-6">
      {/* SHIMMERING RED STARS ON BEIGE BACKGROUND CANVAS */}
      <StarryBackgroundCanvas />

      {/* TOP RIGHT LANGUAGE SWITCHER BUTTON */}
      <button
        onClick={() => setLanguage(isEn ? 'vi' : 'en')}
        className="absolute top-6 right-6 z-50 px-4 py-2 rounded-2xl bg-[#EFEAD8]/90 border border-red-500/40 backdrop-blur-xl shadow-xl text-xs font-black text-red-700 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all pointer-events-auto cursor-pointer"
      >
        <span>{isEn ? '🇬🇧 English' : '🇻🇳 Tiếng Việt'}</span>
        <span className="px-2 py-0.5 rounded-full bg-red-600/10 text-red-700 text-[10px] font-black border border-red-500/30">
          {tr('switch_lang_btn')}
        </span>
      </button>

      {/* BEFORE-LOGIN PHASE 1: AI HUMANOID STAR MASCOT WELCOME & STEP 1 GUIDANCE BUBBLE */}
      <div className="relative z-20 w-full max-w-sm bg-[#FDFBF7] border-4 border-red-600 rounded-3xl p-5 shadow-2xl shadow-red-950/40 text-slate-900 animate-slide-up [transform:translate3d(0,0,0)] [will-change:transform]">
        <div className="flex items-center gap-3 mb-3 pb-3 border-b-2 border-red-600/20">
          {/* AI HUMANOID STAR MASCOT MINI AVATAR */}
          <div className="relative w-16 h-20 flex-shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-600 via-rose-500 to-amber-400 blur-xl opacity-90 animate-pulse" />
            <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-xl relative z-10 animate-bounce">
              <defs>
                <linearGradient id="starHeadLoginGrad" x1="0%" y1="0%" x2="100%" y2="100%">
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
              <polygon points="50,5 61,28 85,30 67,46 72,70 50,57 28,70 33,46 15,30 39,28" fill="url(#starHeadLoginGrad)" stroke="#7f1d1d" strokeWidth="2" />
              <circle cx="42" cy="38" r="4" fill="#0f172a" />
              <circle cx="58" cy="38" r="4" fill="#0f172a" />
              <path d="M 43 46 Q 50 54 57 46" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-red-700 text-amber-300 font-mono text-[10px] font-black uppercase tracking-wider shadow-xs">
              {isEn ? 'PHASE 1: BEFORE LOGIN' : 'GIAI ĐOẠN 1: TRƯỚC ĐĂNG NHẬP'}
            </span>
            <h3 className="text-sm font-black text-amber-800 mt-1">
              {isEn ? '🌟 AI Star Mascot Welcome!' : '🌟 Trợ Lý Ngôi Sao AI Chào Đón!'}
            </h3>
          </div>
        </div>

        <div className="space-y-2 text-xs md:text-sm font-extrabold text-slate-950 leading-relaxed">
          <p className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900">
            {isEn
              ? 'Hello! I am AI Star Mascot 🌟. Welcome to Explore Vietnam application!'
              : 'Xin chào! Mình là Trợ lý Ngôi Sao AI 🌟. Chào mừng bạn đến với ứng dụng Khám Phá Việt Nam!'}
          </p>
          <p className="p-2.5 rounded-xl bg-red-50 border border-red-300 text-red-900">
            {isEn
              ? 'Step 1: Please log into your account to start your journey, earn EXP points and explore right away!'
              : 'Bước 1: Hãy đăng nhập tài khoản để bắt đầu hành trình tích điểm và khám phá ngay nhé!'}
          </p>
        </div>
      </div>

      {/* BEIGE ELEGANT GLASSMORPHISM LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md bg-[#FDFBF7] border-4 border-red-600 rounded-3xl p-6 md:p-8 shadow-2xl shadow-red-950/50 text-center [transform:translate3d(0,0,0)] [will-change:transform]">
        {/* BRAND ICON BADGE */}
        <div className="relative w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 blur-xl opacity-60 animate-pulse" />
          <div className="relative w-full h-full rounded-full bg-[#EFEAD8] border-2 border-red-600 flex items-center justify-center text-4xl shadow-xl">
            🇻🇳
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-red-700 via-rose-600 to-red-800 bg-clip-text text-transparent mb-1 drop-shadow-sm">
          {tr('app_title')}
        </h1>
        <p className="text-xs text-red-900 font-extrabold mb-6 leading-relaxed">
          {tr('app_subtitle')}
        </p>

        {/* LOGIN FORM */}
        {!isLoading ? (
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-black text-red-900 mb-1.5">
                {tr('username_label')}
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="1"
                className="w-full px-4 py-3 bg-white border-2 border-red-300 rounded-xl text-sm text-slate-950 font-black focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-500/20 transition-all font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-black text-red-900 mb-1.5">
                {tr('password_label')}
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="1"
                className="w-full px-4 py-3 bg-white border-2 border-red-300 rounded-xl text-sm text-slate-950 font-black focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-500/20 transition-all font-mono"
                required
              />
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-100 border border-red-400 text-red-800 text-xs font-black animate-shake">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-red-700/40 active:scale-98 transition-all cursor-pointer border border-red-400"
            >
              {tr('login_btn')}
            </button>
          </form>
        ) : (
          <div className="py-6 space-y-4">
            <div className="w-full bg-[#EFEAD8] rounded-full h-3.5 overflow-hidden border-2 border-red-400 p-0.5">
              <div
                className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 h-full rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-xs text-red-800 font-black animate-pulse">
              {isEn ? 'Loading Vietnam 3D Map Environment...' : 'Đang tải môi trường Bản đồ 3D Việt Nam...'} ({loadingProgress}%)
            </p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t-2 border-red-600/20 flex items-center justify-between text-xs text-red-950 font-black">
          <span>{isEn ? 'Demo User: 1' : 'Tài khoản demo: 1'}</span>
          <span>{isEn ? 'Password: 1' : 'Mật khẩu: 1'}</span>
        </div>
      </div>
    </div>
  );
}
