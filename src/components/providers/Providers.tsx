'use client';

import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { GameProvider } from '@/context/GameContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <GameProvider>
          {children}
        </GameProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
