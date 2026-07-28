'use client';

import React from 'react';

interface SpotlightOverlayProps {
  currentStep: number; // 0 = Map (Step 2), 1 = Radius/Places (Step 3), 2 = Directions & Level Badge (Step 4), 3 = Mechanism
  isVisible: boolean;
}

export default function SpotlightOverlay({ currentStep, isVisible }: SpotlightOverlayProps) {
  if (!isVisible) return null;

  // Define spotlight cutout positions for each step
  const getSpotlightStyles = () => {
    switch (currentStep) {
      case 0:
        // Step 2: Highlight Map Center (Vietnam Mainland & Islands)
        return {
          top: '15%',
          left: '10%',
          width: '80%',
          height: '70%',
          borderRadius: '2rem'
        };
      case 1:
        // Step 3: Highlight Top Search Bar & POI Filter Toolbar
        return {
          top: '12px',
          left: '12px',
          width: 'calc(100% - 24px)',
          height: '110px',
          borderRadius: '1.5rem'
        };
      case 2:
        // Step 4: Highlight Bottom Star Mascot Badge & Bottom Right Navigation FAB
        return {
          bottom: '12px',
          left: '12px',
          width: '280px',
          height: '100px',
          borderRadius: '2rem'
        };
      default:
        // Step 5 Mechanism: Center spotlight
        return {
          top: '25%',
          left: '25%',
          width: '50%',
          height: '50%',
          borderRadius: '2rem'
        };
    }
  };

  const spot = getSpotlightStyles();

  return (
    <div className="fixed inset-0 z-45 pointer-events-none transition-all duration-500 ease-in-out">
      {/* DARK BLUR BACKDROP WITH CUTOUT */}
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-all duration-500" />

      {/* HIGHLIGHTED SPOTLIGHT CUTOUT AREA WITH GLOWING RING */}
      <div
        className="absolute border-4 border-amber-400 shadow-[0_0_50px_rgba(239,68,68,0.8)] transition-all duration-500 ease-in-out animate-pulse pointer-events-none"
        style={{
          ...spot,
          boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.75), 0 0 40px rgba(239, 68, 68, 0.9)'
        }}
      >
        <div className="absolute -top-3 left-4 px-3 py-0.5 rounded-full bg-red-700 text-amber-300 font-mono text-[10px] font-black uppercase tracking-wider shadow-lg border border-amber-400">
          🎯 TIÊU ĐIỂM HƯỚNG DẪN
        </div>
      </div>
    </div>
  );
}
