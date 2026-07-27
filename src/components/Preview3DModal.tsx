'use client';

import React, { useState } from 'react';
import { Landmark } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

interface Preview3DModalProps {
  landmark: Landmark | null;
  isOpen: boolean;
  onClose: () => void;
  onCheckIn: () => void;
  onSpeak?: () => void;
}

export default function Preview3DModal({ landmark, isOpen, onClose, onCheckIn, onSpeak }: Preview3DModalProps) {
  const { t } = useLanguage();
  const [rotation, setRotation] = useState(0);
  const [pitch, setPitch] = useState(30);

  if (!isOpen || !landmark) return null;

  const handleRotateLeft = () => setRotation(prev => (prev - 45 + 360) % 360);
  const handleRotateRight = () => setRotation(prev => (prev + 45) % 360);
  const handlePitchUp = () => setPitch(prev => Math.min(prev + 15, 75));
  const handlePitchDown = () => setPitch(prev => Math.max(prev - 15, 0));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header Image Banner with 3D Panorama Orbit Simulation */}
        <div className="relative w-full h-72 md:h-80 overflow-hidden bg-slate-950">
          <div 
            className="w-full h-full transition-transform duration-700 ease-out origin-center"
            style={{
              transform: `scale(1.1) rotate(${rotation * 0.05}deg) perspective(1000px) rotateX(${pitch * 0.2}deg)`
            }}
          >
            <img 
              key={landmark.id}
              src={landmark.image} 
              alt={t(landmark.name)} 
              className="w-full h-full object-cover filter brightness-90 contrast-105" 
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80';
              }}
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-black/60 pointer-events-none" />

          {/* Top Control Bar */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
            <span className="px-3 py-1 rounded-full bg-amber-500/90 backdrop-blur-md text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg">
              ✨ 3D Cận Cảnh / 3D Preview
            </span>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-black/60 hover:bg-red-600 text-white backdrop-blur flex items-center justify-center transition-all border border-white/20"
            >
              ✕
            </button>
          </div>

          {/* 3D Orbit Control Buttons */}
          <div className="absolute bottom-4 right-4 flex gap-2 z-10 bg-black/60 backdrop-blur-md p-1.5 rounded-2xl border border-white/10">
            <button 
              onClick={handleRotateLeft} 
              className="p-2 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all"
              title="Xoay trái 360°"
            >
              🔄 Trái
            </button>
            <button 
              onClick={handleRotateRight} 
              className="p-2 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all"
              title="Xoay phải 360°"
            >
              ↪️ Phải
            </button>
            <button 
              onClick={handlePitchUp} 
              className="p-2 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all"
              title="Tăng góc nghiêng 3D"
            >
              🔼 Nghiêng
            </button>
            <button 
              onClick={handlePitchDown} 
              className="p-2 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all"
              title="Góc phẳng 2D"
            >
              🔽 Phẳng
            </button>
          </div>

          {/* Landmark Name Banner */}
          <div className="absolute bottom-4 left-4 right-32 z-10">
            <h2 className="text-2xl md:text-3xl font-black text-white drop-shadow-lg leading-tight">
              {t(landmark.name)}
            </h2>
            <p className="text-xs md:text-sm text-slate-300 font-medium flex items-center gap-1.5 mt-1">
              📍 <span className="uppercase font-bold text-amber-400">{landmark.region}</span> • Tọa độ GPS: {landmark.coordinates.lat.toFixed(4)}, {landmark.coordinates.lng.toFixed(4)}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-slate-300 text-sm leading-relaxed">
          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
            <h3 className="font-bold text-white text-base mb-2 flex items-center gap-2">
              📜 Lịch sử & Ý nghĩa
            </h3>
            <p>{t(landmark.history)}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
              <h4 className="font-bold text-amber-400 text-sm mb-1">🏰 Đặc điểm Kiến trúc</h4>
              <p className="text-xs">{t(landmark.architecture)}</p>
            </div>
            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
              <h4 className="font-bold text-cyan-400 text-sm mb-1">🍜 Ẩm thực Quanh Đây</h4>
              <p className="text-xs">{t(landmark.cuisine)}</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
              🎁 Thưởng: +{landmark.checkInReward || 100} Points
            </span>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onSpeak} 
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs md:text-sm flex items-center gap-2 transition-all border border-slate-700"
            >
              🔊 Audio Guide
            </button>
            <button 
              onClick={() => {
                onClose();
                onCheckIn();
              }} 
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold rounded-xl text-xs md:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
            >
              📸 Check-in Cận Cảnh
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
