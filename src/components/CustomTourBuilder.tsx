'use client';

import React, { useState, useMemo } from 'react';
import { Landmark } from '@/types';
import { regions } from '@/data/vietnamTourismData';
import { useTourManager } from '@/hooks/useTourManager';
import { useLanguage } from '@/context/LanguageContext';

interface CustomTourBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onTourCreated: (landmarks: Landmark[]) => void;
}

export default function CustomTourBuilder({ isOpen, onClose, onTourCreated }: CustomTourBuilderProps) {
  const { buildCustomTour, toggleCustomLandmark } = useTourManager();
  const { t, tr, language } = useLanguage();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Sort regions South to North (west, south, central, north)
  const sortedRegions = useMemo(() => {
    const regionOrder: Record<string, number> = {
      west: 1,
      south: 2,
      central: 3,
      north: 4
    };
    return [...regions].sort((a, b) => (regionOrder[a.id] || 99) - (regionOrder[b.id] || 99));
  }, []);

  if (!isOpen) return null;

  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
    toggleCustomLandmark(id);
  };

  const handleStartRouting = () => {
    if (selectedIds.size === 0) return;
    const optimized = buildCustomTour();
    onTourCreated(optimized);
    onClose();

    // Audio muted as requested
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />

      {/* Modal Box with Flex Column & Guaranteed Visible Footer */}
      <div className="relative w-full max-w-2xl h-[85vh] max-h-[750px] bg-slate-900 border border-slate-800 shadow-2xl rounded-3xl flex flex-col overflow-hidden text-white animate-slide-up">
        
        {/* 1. FIXED HEADER */}
        <div className="p-5 bg-slate-900 border-b border-slate-800 flex justify-between items-center shrink-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl shadow-lg shrink-0">
              🗺️
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black text-amber-400 leading-tight">
                {tr('custom_tour_title')}
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                {tr('custom_tour_sub')} ({selectedIds.size} {tr('spots_selected')})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-400 hover:text-white flex items-center justify-center transition-all border border-slate-700"
          >
            ✕
          </button>
        </div>

        {/* 2. SCROLLABLE BODY (South to North Regions) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-5 no-scrollbar">
          {sortedRegions.map(region => (
            <div
              key={region.id}
              className="bg-slate-950/90 rounded-2xl border border-slate-800/90 overflow-hidden shadow-lg"
            >
              <div className="bg-slate-800/80 p-3 font-extrabold text-xs md:text-sm text-slate-200 flex justify-between items-center border-b border-slate-700/60">
                <span className="flex items-center gap-2">
                  <span className="text-amber-400">📍</span>
                  <span>{t(region.name)}</span>
                </span>
                <span className="text-[10px] bg-slate-900 text-amber-400 px-2.5 py-1 rounded-full font-bold border border-amber-400/30">
                  {region.landmarks.length} địa danh
                </span>
              </div>

              <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {region.landmarks.map(landmark => {
                  const isSelected = selectedIds.has(landmark.id);
                  return (
                    <label
                      key={landmark.id}
                      className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all border ${
                        isSelected
                          ? 'border-amber-400 bg-amber-500/10 shadow-md'
                          : 'border-slate-800/60 hover:bg-slate-800/40'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelection(landmark.id)}
                        className="w-4 h-4 text-amber-500 rounded focus:ring-amber-400 accent-amber-500"
                      />
                      <div className="w-11 h-11 bg-slate-900 rounded-lg shrink-0 overflow-hidden border border-slate-800">
                        {landmark.image && (
                          <img
                            src={landmark.image}
                            alt={t(landmark.name)}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80';
                            }}
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-white text-xs md:text-sm truncate">
                          {t(landmark.name)}
                        </h4>
                        <span className="text-[10px] font-bold text-amber-400/90 uppercase">
                          {landmark.region}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 3. STICKY / FIXED FOOTER (100% Guaranteed Visible Button) */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0 z-20 flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xl">
          <div className="text-xs text-slate-400 font-semibold text-center md:text-left">
            {selectedIds.size === 0 ? (
              <span className="text-amber-400">⚠️ {tr('select_at_least_2')}</span>
            ) : (
              <span>
                Đã chọn <strong className="text-amber-400 font-bold">{selectedIds.size} điểm</strong> cho chuyến đi
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => {
                const allLandmarksList = regions.flatMap(r => r.landmarks);
                const selectedLandmarksList = allLandmarksList.filter(l => selectedIds.has(l.id));
                if (selectedLandmarksList.length > 0) {
                  const first = selectedLandmarksList[0];
                  import('@/utils/navigation').then(({ openExternalMapDirections }) => {
                    openExternalMapDirections(first.coordinates.lat, first.coordinates.lng);
                  });
                }
              }}
              disabled={selectedIds.size === 0}
              className={`px-4 py-3.5 rounded-2xl font-black text-xs shadow-lg transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
                selectedIds.size > 0
                  ? 'bg-slate-900 border border-cyan-400/50 text-cyan-400 hover:bg-slate-800'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
              title="Mở ứng dụng Google Maps hoặc Apple Maps trên điện thoại để dẫn đường ngoài đời"
            >
              <span>🗺️ Maps</span>
            </button>

            <button
              onClick={handleStartRouting}
              disabled={selectedIds.size === 0}
              className={`w-full md:w-auto px-6 py-3.5 rounded-2xl font-black text-xs md:text-sm shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 ${
                selectedIds.size > 0
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:brightness-110 text-slate-950 shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <span>🚗</span>
              <span>{tr('route_selected_spots')}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
