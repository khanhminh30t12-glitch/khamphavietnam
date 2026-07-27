'use client';

import React, { useState, useEffect, useRef } from 'react';
import { wondersData, WonderItem } from '@/data/wondersData';
import { useGame } from '@/context/GameContext';
import { useLanguage } from '@/context/LanguageContext';

export default function PuzzleGame() {
  const { addPoints, addExp } = useGame();
  const { t } = useLanguage();

  const [selectedWonder, setSelectedWonder] = useState<WonderItem>(wondersData[0]);
  const [gridSize, setGridSize] = useState<number>(3); // 3x3, 4x4, 5x5
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize or reset puzzle grid
  const initializeGrid = (size: number, shuffle = true) => {
    const totalTiles = size * size;
    let initialTiles = Array.from({ length: totalTiles }, (_, i) => (i === totalTiles - 1 ? 0 : i + 1));

    if (shuffle) {
      // Fisher-Yates shuffle
      for (let i = initialTiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [initialTiles[i], initialTiles[j]] = [initialTiles[j], initialTiles[i]];
      }
    }

    setTiles(initialTiles);
    setMoves(0);
    setSeconds(0);
    setIsSolved(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    initializeGrid(gridSize, true);
  }, [selectedWonder, gridSize]);

  // Timer effect
  useEffect(() => {
    if (isPlaying && !isSolved) {
      timerRef.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isSolved]);

  const speakCelebration = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Handle tile click
  const handleTileClick = (index: number) => {
    if (isSolved || !isPlaying) return;

    const zeroIndex = tiles.indexOf(0);
    const rowCurrent = Math.floor(index / gridSize);
    const colCurrent = index % gridSize;
    const rowZero = Math.floor(zeroIndex / gridSize);
    const colZero = zeroIndex % gridSize;

    const isAdjacent =
      (Math.abs(rowCurrent - rowZero) === 1 && colCurrent === colZero) ||
      (Math.abs(colCurrent - colZero) === 1 && rowCurrent === rowZero);

    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[zeroIndex]] = [newTiles[zeroIndex], newTiles[index]];
      setTiles(newTiles);
      setMoves(m => m + 1);

      // Check win condition
      const totalTiles = gridSize * gridSize;
      const isWin = newTiles.every((val, i) => (i === totalTiles - 1 ? val === 0 : val === i + 1));
      if (isWin) {
        setIsSolved(true);
        setIsPlaying(false);
        addPoints(100);
        addExp(50);
        speakCelebration(
          `Chúc mừng bạn đã hoàn thiện bức tranh ${selectedWonder.name.vi}! ${selectedWonder.funFact.vi}`
        );
      }
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* 1. SELECT WONDER CAROUSEL */}
      <div className="w-full mb-6">
        <div className="text-center mb-3">
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-black rounded-full border border-indigo-500/30">
            7 Kỳ Quan Thế Giới
          </span>
          <h3 className="text-xl md:text-2xl font-black text-amber-400 mt-1">
            Chọn Kỳ Quan Để Ghép Hình 3D
          </h3>
        </div>

        {/* 7 Wonders Cards Horizontal Scroll */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar p-2">
          {wondersData.map(wonder => {
            const isSelected = wonder.id === selectedWonder.id;
            return (
              <button
                key={wonder.id}
                onClick={() => setSelectedWonder(wonder)}
                className={`flex-none w-36 md:w-44 rounded-2xl overflow-hidden border-2 transition-all p-2 bg-slate-900 text-left group ${
                  isSelected
                    ? 'border-amber-400 shadow-xl shadow-amber-500/20 scale-105'
                    : 'border-slate-800 opacity-70 hover:opacity-100 hover:border-slate-700'
                }`}
              >
                <div className="h-20 md:h-24 w-full rounded-xl overflow-hidden mb-2 bg-slate-950">
                  <img
                    src={wonder.image}
                    alt={wonder.name.vi}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </div>
                <div className="text-xs font-black text-white truncate flex items-center gap-1">
                  <span>{wonder.emoji}</span>
                  <span className="truncate">{wonder.name.vi}</span>
                </div>
                <div className="text-[10px] text-slate-400">{wonder.location.vi}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. PUZZLE CONTROLS & DIFFICULTY */}
      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-4 md:p-6 shadow-2xl flex flex-col items-center">
        {/* Difficulty Level Buttons */}
        <div className="flex items-center justify-between w-full max-w-md mb-4 flex-wrap gap-2">
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setGridSize(3)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                gridSize === 3 ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              Dễ (3x3)
            </button>
            <button
              onClick={() => setGridSize(4)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                gridSize === 4 ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              Vừa (4x4)
            </button>
            <button
              onClick={() => setGridSize(5)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                gridSize === 5 ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              Khó (5x5)
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
            <span>⏱️ {formatTime(seconds)}</span>
            <span>👣 {moves} bước</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setShowPreviewModal(true)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-bold shadow-md active:scale-95 transition-all flex items-center gap-1.5"
          >
            <span>👁️ Xem Ảnh Mẫu</span>
          </button>

          <button
            onClick={() => initializeGrid(gridSize, true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-md active:scale-95 transition-all flex items-center gap-1.5"
          >
            <span>🔀 Xáo Trộn Lại</span>
          </button>
        </div>

        {/* 3. PUZZLE GRID (120Hz GPU Accelerated CSS Grid) */}
        <div
          className="relative bg-slate-950 rounded-2xl border-2 border-amber-400/50 p-2 shadow-2xl overflow-hidden"
          style={{
            width: 'min(85vw, 380px)',
            height: 'min(85vw, 380px)'
          }}
        >
          <div
            className="w-full h-full grid gap-1 relative"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`
            }}
          >
            {tiles.map((val, idx) => {
              if (val === 0) {
                return (
                  <div
                    key={idx}
                    className="bg-slate-900/40 rounded-lg border border-dashed border-slate-800"
                  />
                );
              }

              // Calculate background image position offset for 3D puzzle tile
              const correctRow = Math.floor((val - 1) / gridSize);
              const correctCol = (val - 1) % gridSize;
              const bgPosX = (correctCol / (gridSize - 1)) * 100;
              const bgPosY = (correctRow / (gridSize - 1)) * 100;

              return (
                <button
                  key={idx}
                  onClick={() => handleTileClick(idx)}
                  className="relative rounded-lg shadow-lg border border-white/20 overflow-hidden active:scale-95 transition-transform duration-200 group"
                  style={{
                    backgroundImage: `url(${selectedWonder.image})`,
                    backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                    backgroundPosition: `${bgPosX}% ${bgPosY}%`,
                    willChange: 'transform'
                  }}
                >
                  {/* Number Overlay Badge */}
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-slate-950/80 backdrop-blur rounded text-[10px] font-black text-amber-300 pointer-events-none">
                    {val}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* WIN BANNER */}
        {isSolved && (
          <div className="mt-6 p-4 bg-emerald-500/20 border border-emerald-400 rounded-3xl text-center max-w-md animate-bounce shadow-2xl">
            <span className="text-3xl mb-1 block">🎉</span>
            <h4 className="text-lg font-black text-emerald-300">
              Xuất Sắc! Bạn Đã Ghép Hoàn Thành {selectedWonder.name.vi}!
            </h4>
            <p className="text-xs text-slate-300 mt-1 mb-2 leading-relaxed">
              💡 {selectedWonder.funFact.vi}
            </p>
            <div className="inline-block px-4 py-1.5 bg-amber-500 text-slate-950 font-black rounded-xl text-xs">
              +100 Points & +50 EXP
            </div>
          </div>
        )}
      </div>

      {/* PREVIEW IMAGE MODAL OVERLAY */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowPreviewModal(false)} />
          <div className="relative bg-slate-900 border border-amber-400/50 rounded-3xl p-5 w-full max-w-md shadow-2xl text-center animate-slide-up text-white">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-extrabold text-sm text-amber-400 flex items-center gap-1.5">
                <span>👁️</span> Ảnh Mẫu: {selectedWonder.name.vi}
              </h4>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-700 shadow-xl mb-3">
              <img
                src={selectedWonder.image}
                alt={selectedWonder.name.vi}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>

            <p className="text-xs text-slate-400 italic leading-relaxed">
              "{selectedWonder.funFact.vi}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
