'use client';

import React, { useEffect, useState } from 'react';

interface TourProgressBarProps {
  tourName: string;
  currentStopIndex: number;
  totalStops: number;
  currentLandmarkName: string;
  onNext: () => void;
  onPrev: () => void;
  onExit: () => void;
}

export default function TourProgressBar({
  tourName,
  currentStopIndex,
  totalStops,
  currentLandmarkName,
  onNext,
  onPrev,
  onExit
}: TourProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Calculate progress percentage
    const newProgress = totalStops > 1 ? (currentStopIndex / (totalStops - 1)) * 100 : 100;
    setProgress(newProgress);
  }, [currentStopIndex, totalStops]);

  return (
    <div className="fixed top-4 left-0 right-0 z-40 px-4 md:left-64 md:px-8 pointer-events-none animate-slide-down">
      <div className="max-w-3xl mx-auto glass rounded-2xl shadow-2xl overflow-hidden border border-white/20 pointer-events-auto">
        
        {/* Main Content Area */}
        <div className="p-4 flex flex-col sm:flex-row items-center gap-4">
          
          {/* Info Section */}
          <div className="flex-1 w-full">
            <div className="flex justify-between items-end mb-2">
              <div>
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                  Đang diễn ra / Active Tour
                </h3>
                <h2 className="text-lg font-bold text-white truncate max-w-[200px] sm:max-w-[300px]">
                  {tourName}
                </h2>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400">Điểm đến hiện tại</span>
                <p className="text-sm font-semibold text-blue-300 truncate max-w-[150px]">
                  📍 {currentLandmarkName}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-300 bg-emerald-900/50 border border-emerald-500/30">
                    Tiến độ
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-emerald-300">
                    {currentStopIndex + 1} / {totalStops}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2.5 mb-1 text-xs flex rounded-full bg-slate-800 border border-white/10 shadow-inner">
                <div 
                  style={{ width: `${progress}%` }} 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000 ease-out relative"
                >
                  <div className="absolute inset-0 bg-white/20 animate-shine" />
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-4">
            <div className="flex items-center gap-2">
              <button
                onClick={onPrev}
                disabled={currentStopIndex === 0}
                className="w-10 h-10 rounded-full glass-light flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                aria-label="Previous Stop"
              >
                <span className="text-lg">⬅️</span>
              </button>
              <button
                onClick={onNext}
                disabled={currentStopIndex === totalStops - 1}
                className="w-10 h-10 rounded-full glass-light flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                aria-label="Next Stop"
              >
                <span className="text-lg">➡️</span>
              </button>
            </div>
            
            <button
              onClick={onExit}
              className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/40 border border-red-500/30 transition-colors text-sm font-semibold flex items-center gap-2"
            >
              <span>Thoát</span>
              <span className="hidden sm:inline">/ Exit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
