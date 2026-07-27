'use client';

import React, { useState } from 'react';
import { RouteStep } from '@/utils/routing';
import { useLanguage } from '@/context/LanguageContext';

interface DragonGuideProps {
  isOpen: boolean;
  onClose: () => void;
  originName: string;
  destinationName: string;
  distanceKm: number;
  steps: RouteStep[];
}

export default function DragonGuide({
  isOpen,
  onClose,
  originName,
  destinationName,
  distanceKm,
  steps
}: DragonGuideProps) {
  const { language } = useLanguage();
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!isOpen) return null;

  // Time estimates
  const motorbikeMins = Math.round(distanceKm * 2);
  const carMins = Math.round(distanceKm * 2.5);
  const walkingMins = Math.round(distanceKm * 12);
  const busMins = Math.round(distanceKm * 3.5);

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'en' ? 'en-US' : 'vi-VN';
      utterance.rate = 1.0;
      utterance.pitch = 1.1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSpeakSummary = () => {
    const summaryMsg =
      language === 'en'
        ? `Dragon AI Guide: The route from ${originName} to ${destinationName} is ${distanceKm} km. ` +
          `Estimated motorcycling takes about ${motorbikeMins} mins, driving ${carMins} mins, bus ${busMins} mins, or walking ${walkingMins} mins. ` +
          (steps.length > 0 ? `Step 1: ${steps[0].instruction}` : '')
        : `Rồng AI Hướng Dẫn: Tuyến đường từ ${originName} tới ${destinationName} dài ${distanceKm} km. ` +
          `Ước tính đi xe máy mất khoảng ${motorbikeMins} phút, đi ô tô ${carMins} phút, xe bus ${busMins} phút, hoặc đi bộ ${walkingMins} phút. ` +
          (steps.length > 0 ? `Chặng 1: ${steps[0].instruction}` : '');

    speakText(summaryMsg);
  };

  const handleSpeakCurrentStep = (idx: number) => {
    setCurrentStepIdx(idx);
    const step = steps[idx];
    if (step) {
      const stepText =
        language === 'en'
          ? `Step ${idx + 1}: ${step.instruction}, approx ${step.distanceKm} km.`
          : `Chặng ${idx + 1}: ${step.instruction}, khoảng ${step.distanceKm} km.`;
      speakText(stepText);
    }
  };

  const handleStopVoice = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="fixed top-12 left-2 right-2 md:top-20 md:left-auto md:right-8 md:w-96 max-w-full z-50 bg-slate-900/95 backdrop-blur-xl border border-amber-500/40 rounded-3xl p-3.5 md:p-4 text-white shadow-2xl animate-fade-in">
      {/* Header with Dragon Avatar & Close Button */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-xl shadow-lg shadow-amber-500/20 animate-pulse shrink-0">
            🐉
          </div>
          <div>
            <h3 className="font-black text-amber-400 text-xs md:text-sm flex items-center gap-1">
              Rồng AI Chỉ Đường 3D
            </h3>
            <p className="text-[10px] md:text-[11px] text-slate-400 font-medium">Bám sát đường bộ thực tế</p>
          </div>
        </div>
        <button
          onClick={() => {
            handleStopVoice();
            onClose();
          }}
          className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 active:scale-95 text-slate-400 hover:text-white flex items-center justify-center transition-all border border-slate-700"
        >
          ✕
        </button>
      </div>

      {/* Origin -> Destination Banner */}
      <div className="bg-slate-950/80 rounded-2xl p-2.5 border border-slate-800 mb-2.5 space-y-1 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="text-emerald-400 font-bold shrink-0">🟢 Từ:</span>
          <span className="font-semibold text-white truncate">{originName}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <span className="text-red-400 font-bold shrink-0">🔴 Đến:</span>
          <span className="font-semibold text-white truncate">{destinationName}</span>
        </div>
        <div className="text-amber-400 font-extrabold pt-1 text-[11px] flex justify-between items-center border-t border-slate-800/80">
          <span>📏 Khoảng cách thực tế: {distanceKm} km</span>
        </div>
      </div>

      {/* Transport Duration Summary Badges */}
      <div className="grid grid-cols-4 gap-1.5 mb-2.5">
        <div className="bg-slate-800/90 rounded-xl p-1.5 text-center border border-slate-700/60">
          <div className="text-sm mb-0.5">🛵</div>
          <div className="text-[10px] font-bold text-amber-400">{motorbikeMins} ph</div>
          <div className="text-[9px] text-slate-400">Xe máy</div>
        </div>
        <div className="bg-slate-800/90 rounded-xl p-1.5 text-center border border-slate-700/60">
          <div className="text-sm mb-0.5">🚗</div>
          <div className="text-[10px] font-bold text-cyan-400">{carMins} ph</div>
          <div className="text-[9px] text-slate-400">Ô tô</div>
        </div>
        <div className="bg-slate-800/90 rounded-xl p-1.5 text-center border border-slate-700/60">
          <div className="text-sm mb-0.5">🚌</div>
          <div className="text-[10px] font-bold text-indigo-400">{busMins} ph</div>
          <div className="text-[9px] text-slate-400">Xe Bus</div>
        </div>
        <div className="bg-slate-800/90 rounded-xl p-1.5 text-center border border-slate-700/60">
          <div className="text-sm mb-0.5">🚶</div>
          <div className="text-[10px] font-bold text-emerald-400">{walkingMins} ph</div>
          <div className="text-[9px] text-slate-400">Đi bộ</div>
        </div>
      </div>

      {/* Step-by-Step Turn List */}
      <div className="space-y-1.5 max-h-48 md:max-h-56 overflow-y-auto touch-scroll no-scrollbar pr-1">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
          📍 Hướng dẫn theo từng chặng ({steps.length} chặng):
        </div>
        {steps.length === 0 ? (
          <p className="text-xs text-slate-500 py-2">Đang tải chi tiết ngã rẽ...</p>
        ) : (
          steps.map((step, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentStepIdx(idx)}
              className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                currentStepIdx === idx
                  ? 'bg-amber-500/10 border-amber-400 text-amber-300 font-bold'
                  : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-950 text-amber-400 text-[10px] font-extrabold flex items-center justify-center shrink-0 border border-amber-500/30">
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0 px-1">
                <p className="leading-relaxed whitespace-normal break-words text-left">{step.instruction}</p>
                <span className="text-[10px] text-slate-400 mt-0.5 inline-block">
                  📏 {step.distanceKm} km
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
