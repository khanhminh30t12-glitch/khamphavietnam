'use client';

import React from 'react';

export type PoiCategoryFilter = 'all' | 'food' | 'cafe' | 'hotel' | 'landmark';
export type RadiusFilter = 0 | 5 | 10 | 20 | 30; // 0 means All

interface PoiFilterToolbarProps {
  activeCategory: PoiCategoryFilter;
  onCategoryChange: (category: PoiCategoryFilter) => void;
  activeRadius: RadiusFilter;
  onRadiusChange: (radius: RadiusFilter) => void;
}

export default function PoiFilterToolbar({
  activeCategory,
  onCategoryChange,
  activeRadius,
  onRadiusChange
}: PoiFilterToolbarProps) {
  const categories: Array<{ id: PoiCategoryFilter; labelVi: string; labelEn: string; icon: string; color: string }> = [
    { id: 'all', labelVi: 'Tất cả POIs', labelEn: 'All POIs', icon: '🌐', color: 'bg-amber-500 text-slate-950 font-black' },
    { id: 'food', labelVi: 'Quán Ăn', labelEn: 'Food', icon: '🍜', color: 'bg-red-500 text-white font-black' },
    { id: 'cafe', labelVi: 'Quán Nước', labelEn: 'Cafes', icon: '☕', color: 'bg-amber-600 text-white font-black' },
    { id: 'hotel', labelVi: 'Khách Sạn', labelEn: 'Hotels', icon: '🏨', color: 'bg-indigo-600 text-white font-black' },
    { id: 'landmark', labelVi: 'Di Tích', labelEn: 'Heritage', icon: '🏛️', color: 'bg-emerald-600 text-white font-black' },
  ];

  const radii: Array<{ value: RadiusFilter; label: string }> = [
    { value: 0, label: 'All Bán kính' },
    { value: 5, label: '≤ 5km' },
    { value: 10, label: '≤ 10km' },
    { value: 20, label: '≤ 20km' },
    { value: 30, label: '≤ 30km' }
  ];

  return (
    <div className="fixed top-16 right-3 md:top-4 md:right-28 z-40 flex flex-col md:flex-row items-end md:items-center gap-1.5 pointer-events-auto [transform:translate3d(0,0,0)] [will-change:transform]">
      {/* Category Toggles */}
      <div className="flex items-center gap-1 bg-slate-900/95 border border-slate-800 backdrop-blur-2xl rounded-2xl p-1.5 shadow-2xl overflow-x-auto no-scrollbar max-w-[calc(100vw-1.5rem)]">
        {categories.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all whitespace-nowrap active:scale-95 cursor-pointer ${
                isActive
                  ? `${cat.color} shadow-lg scale-105`
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80 font-bold'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.labelVi}</span>
            </button>
          );
        })}
      </div>

      {/* Radius Filter Bar (5km, 10km, 20km, 30km) */}
      <div className="flex items-center gap-1 bg-slate-900/95 border border-amber-400/40 backdrop-blur-2xl rounded-2xl p-1 shadow-2xl overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-black text-amber-400 px-2 uppercase tracking-wider">
          📏 Bán kính:
        </span>
        {radii.map(r => {
          const isActive = activeRadius === r.value;
          return (
            <button
              key={r.value}
              onClick={() => onRadiusChange(r.value)}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-extrabold transition-all whitespace-nowrap active:scale-95 cursor-pointer ${
                isActive
                  ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                  : 'text-slate-400 hover:text-amber-300 hover:bg-slate-800'
              }`}
            >
              {r.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
