'use client';

import React from 'react';
import { Landmark } from '@/types';

interface FogOverlayProps {
  revealedAreas: string[];
  allLandmarks: Landmark[];
  mapBounds?: any;
}

const REGIONS = [
  { id: 'north', name: 'Miền Bắc', bounds: 'top-0 left-0 right-0 h-[30%]' },
  { id: 'central', name: 'Miền Trung', bounds: 'top-[30%] left-0 right-0 h-[35%]' },
  { id: 'south', name: 'Miền Nam', bounds: 'top-[65%] left-0 right-0 h-[20%]' },
  { id: 'west', name: 'Miền Tây', bounds: 'bottom-0 left-0 right-0 h-[15%]' },
];

export default function FogOverlay({ revealedAreas, allLandmarks }: FogOverlayProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      {REGIONS.map((region) => {
        const isRevealed = allLandmarks
          .filter(lm => lm.region === region.id)
          .some(lm => revealedAreas.includes(lm.id));
        
        if (isRevealed) return null;

        return (
          <div
            key={region.id}
            className={`pointer-events-none absolute ${region.bounds} transition-all duration-1000 ease-in-out`}
            style={{
              background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.45) 100%)',
            }}
          />
        );
      })}
    </div>
  );
}
