'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { RegionId } from '@/types';

interface ThemeColors {
  primary: string;
  secondary: string;
  gradient: string;
}

interface ThemeContextType {
  currentRegion: RegionId;
  setCurrentRegion: (region: RegionId) => void;
  theme: ThemeColors;
}

const regionThemes: Record<RegionId, ThemeColors> = {
  north: { primary: '#8B0000', secondary: '#DAA520', gradient: 'from-red-900 to-yellow-700' },
  central: { primary: '#B8860B', secondary: '#FFD700', gradient: 'from-yellow-700 to-amber-400' },
  south: { primary: '#0066CC', secondary: '#00CED1', gradient: 'from-blue-600 to-cyan-400' },
  west: { primary: '#228B22', secondary: '#90EE90', gradient: 'from-green-700 to-green-300' }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRegion, setCurrentRegion] = useState<RegionId>('south');

  const theme = regionThemes[currentRegion];

  return (
    <ThemeContext.Provider value={{ currentRegion, setCurrentRegion, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
