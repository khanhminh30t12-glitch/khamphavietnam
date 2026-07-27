'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Mock components
const BadgeCollection = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="glass-light p-4 rounded-2xl flex flex-col items-center gap-2 border border-white/10 hover:bg-white/10 transition-colors">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/20">
          🏆
        </div>
        <span className="text-sm font-bold text-center">Huy hiệu {i}</span>
        <span className="text-xs text-gray-400">Đã mở khóa</span>
      </div>
    ))}
  </div>
);

const PhotoGrid = () => {
  const photos = [
    { id: 1, name: 'Hồ Hoàn Kiếm', date: '2023-10-15', points: 50 },
    { id: 2, name: 'Văn Miếu', date: '2023-10-16', points: 60 },
  ];

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <span className="text-4xl mb-4">📸</span>
        <p>Chưa có ảnh check-in nào.</p>
        <p className="text-sm mt-2">Hãy khám phá và check-in để nhận phần thưởng!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {photos.map(photo => (
        <div key={photo.id} className="glass rounded-xl overflow-hidden border border-white/10">
          <div className="h-48 bg-slate-800 relative w-full flex items-center justify-center">
            {/* Placeholder for actual image */}
            <span className="text-4xl">📸</span>
            <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-amber-400">
              +{photo.points} 🪙
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg">{photo.name}</h3>
            <p className="text-xs text-gray-400">{photo.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function CollectionPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'badges' | 'photos'>('badges');

  return (
    <div className="min-h-screen bg-slate-900 pb-safe pb-24 md:pb-6">
      {/* Header */}
      <div className="sticky top-0 z-30 glass border-b border-white/10">
        <div className="flex items-center p-4">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full glass-light flex items-center justify-center mr-4 hover:bg-white/10 transition-colors"
          >
            ←
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Bộ Sưu Tập
          </h1>
        </div>
        
        {/* Stats Bar */}
        <div className="px-4 pb-4 flex justify-between items-center gap-4 overflow-x-auto no-scrollbar">
          <div className="flex-1 glass-light rounded-xl p-3 min-w-[120px] flex items-center gap-3 border border-white/5">
            <div className="text-2xl">📸</div>
            <div>
              <div className="text-xs text-gray-400">Check-ins</div>
              <div className="font-bold">24</div>
            </div>
          </div>
          <div className="flex-1 glass-light rounded-xl p-3 min-w-[120px] flex items-center gap-3 border border-white/5">
            <div className="text-2xl">🪙</div>
            <div>
              <div className="text-xs text-gray-400">Tổng điểm</div>
              <div className="font-bold text-amber-400">1,250</div>
            </div>
          </div>
          <div className="flex-1 glass-light rounded-xl p-3 min-w-[120px] flex items-center gap-3 border border-white/5">
            <div className="text-2xl">🐉</div>
            <div>
              <div className="text-xs text-gray-400">Cấp Rồng</div>
              <div className="font-bold text-emerald-400">Lv. 5</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex px-4 gap-2">
          <button 
            onClick={() => setActiveTab('badges')}
            className={`flex-1 py-3 text-sm font-semibold rounded-t-xl transition-colors border-b-2 ${
              activeTab === 'badges' 
                ? 'border-amber-400 text-amber-400 bg-white/5' 
                : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            🏆 Huy Hiệu
          </button>
          <button 
            onClick={() => setActiveTab('photos')}
            className={`flex-1 py-3 text-sm font-semibold rounded-t-xl transition-colors border-b-2 ${
              activeTab === 'photos' 
                ? 'border-blue-400 text-blue-400 bg-white/5' 
                : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            📸 Ảnh Check-in
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto animate-fade-in">
        {activeTab === 'badges' ? <BadgeCollection /> : <PhotoGrid />}
      </div>
    </div>
  );
}
