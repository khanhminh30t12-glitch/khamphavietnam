'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState('Nhà Khám Phá');
  const [isEditing, setIsEditing] = useState(false);
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [demoMode, setDemoMode] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 pb-safe pb-24 md:pb-6">
      {/* Header */}
      <div className="sticky top-0 z-30 glass border-b border-white/10 p-4 flex items-center">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full glass-light flex items-center justify-center mr-4 hover:bg-white/10 transition-colors"
        >
          ←
        </button>
        <h1 className="text-2xl font-bold text-white">Hồ Sơ Cá Nhân</h1>
      </div>

      <div className="max-w-3xl mx-auto p-4 space-y-6 animate-fade-in">
        
        {/* User Info Card */}
        <div className="glass rounded-3xl p-6 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="relative z-10 flex flex-col items-center sm:flex-row sm:items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-1 shadow-lg shadow-purple-500/30">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-4xl">
                🧑‍💻
              </div>
            </div>
            
            <div className="flex-1 text-center sm:text-left w-full">
              {isEditing ? (
                <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white focus:outline-none focus:border-amber-400 w-full max-w-[200px]"
                    autoFocus
                  />
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                  >
                    ✓
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
                  <h2 className="text-2xl font-bold text-white">{username}</h2>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    ✎
                  </button>
                </div>
              )}
              
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30 mb-4">
                Người mới bắt đầu
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
                <div className="glass-light rounded-xl p-3 text-center border border-white/5">
                  <div className="text-xl mb-1">🪙</div>
                  <div className="font-bold text-amber-400">1,250</div>
                  <div className="text-[10px] text-gray-400 uppercase">Điểm</div>
                </div>
                <div className="glass-light rounded-xl p-3 text-center border border-white/5">
                  <div className="text-xl mb-1">📸</div>
                  <div className="font-bold text-white">24</div>
                  <div className="text-[10px] text-gray-400 uppercase">Check-in</div>
                </div>
                <div className="glass-light rounded-xl p-3 text-center border border-white/5">
                  <div className="text-xl mb-1">🏆</div>
                  <div className="font-bold text-white">5</div>
                  <div className="text-[10px] text-gray-400 uppercase">Huy hiệu</div>
                </div>
                <div className="glass-light rounded-xl p-3 text-center border border-white/5">
                  <div className="text-xl mb-1">🐉</div>
                  <div className="font-bold text-emerald-400">Lv.5</div>
                  <div className="text-[10px] text-gray-400 uppercase">Rồng</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dragon Pet Section */}
        <div className="glass rounded-3xl p-6 border border-white/10 text-center">
          <h3 className="text-lg font-bold mb-4 text-left flex items-center gap-2">
            <span>🐉</span> Linh vật của bạn
          </h3>
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-400/20 to-orange-600/20 rounded-full flex items-center justify-center text-6xl mb-4 shadow-[0_0_30px_rgba(245,158,11,0.2)] border border-amber-500/30 animate-bounce-gentle">
            🐉
          </div>
          <h4 className="font-bold text-amber-400 text-xl">Rồng Con Đất Việt</h4>
          <p className="text-sm text-gray-400 mt-2 mb-4">
            Đang cần thêm 500 EXP để tiến hóa lên cấp 6. Hãy tiếp tục khám phá!
          </p>
          <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5 mb-2">
            <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 w-[60%] rounded-full animate-shine" />
          </div>
          <div className="text-xs text-right text-gray-400">1500 / 2000 EXP</div>
        </div>

        {/* Settings */}
        <div className="glass rounded-3xl p-6 border border-white/10">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span>⚙️</span> Cài đặt
          </h3>
          
          <div className="space-y-2">
            {/* Language */}
            <div className="flex items-center justify-between p-4 glass-light rounded-xl hover:bg-white/10 transition-colors">
              <div>
                <div className="font-medium">Ngôn ngữ / Language</div>
                <div className="text-xs text-gray-400">Thay đổi ngôn ngữ hiển thị</div>
              </div>
              <button 
                onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
                className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 text-sm font-bold border border-blue-500/30 w-32"
              >
                {lang === 'vi' ? '🇻🇳 Tiếng Việt' : '🇬🇧 English'}
              </button>
            </div>
            
            {/* Demo Mode */}
            <div className="flex items-center justify-between p-4 glass-light rounded-xl hover:bg-white/10 transition-colors">
              <div>
                <div className="font-medium">Chế độ Demo</div>
                <div className="text-xs text-gray-400">Cho phép check-in ảo không cần GPS</div>
              </div>
              <button 
                onClick={() => setDemoMode(!demoMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${demoMode ? 'bg-amber-500' : 'bg-slate-700'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${demoMode ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            
            {/* Reset Progress */}
            <div className="flex items-center justify-between p-4 glass-light rounded-xl border border-red-500/20 hover:bg-red-500/10 transition-colors mt-4">
              <div>
                <div className="font-medium text-red-400">Xóa dữ liệu</div>
                <div className="text-xs text-gray-400">Xóa toàn bộ quá trình chơi và bộ sưu tập</div>
              </div>
              <button 
                onClick={() => {
                  if (confirm('Bạn có chắc chắn muốn xóa toàn bộ dữ liệu? Hành động này không thể hoàn tác.')) {
                    alert('Đã xóa dữ liệu!');
                  }
                }}
                className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm font-bold border border-red-500/30"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
