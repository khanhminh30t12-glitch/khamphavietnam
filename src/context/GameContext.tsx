'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { UserProgress, RegionId } from '@/types';

interface GameContextType {
  progress: UserProgress;
  addPoints: (amount: number) => void;
  addExp: (amount: number) => void;
  checkIn: (landmarkId: string, photoUrl?: string, points?: number) => void;
  revealArea: (landmarkId: string) => void;
  unlockBadge: (badgeId: string) => void;
  addCustomTour: (landmarkIds: string[]) => void;
  completeTour: (tourId: string) => void;
  redeemReward: (rewardId: string, cost: number) => void;
  setDragonSkin: (region: RegionId) => void;
  getDragonLevel: () => number;
}

const defaultProgress: UserProgress = {
  points: 0,
  totalExp: 0,
  badges: [],
  checkIns: [],
  revealedAreas: [],
  customTours: [],
  completedTours: [],
  dragon: {
    level: 1,
    exp: 0,
    currentSkin: 'south',
    unlockedSkills: [],
    name: 'Rồng Sài Gòn'
  },
  redeemedRewards: []
};

export const LEVEL_THRESHOLDS = [
  0,     // Lv.1
  150,   // Lv.2
  300,   // Lv.3
  500,   // Lv.4
  750,   // Lv.5 (Sao Tập Sự)
  1050,  // Lv.6
  1400,  // Lv.7
  1800,  // Lv.8
  2250,  // Lv.9
  2750,  // Lv.10 (Sao Dẫn Đường)
  3300,  // Lv.11
  3950,  // Lv.12
  4700,  // Lv.13
  5550,  // Lv.14
  6500,  // Lv.15 (Sao Hoàng Gia)
  7600,  // Lv.16
  8850,  // Lv.17
  10250, // Lv.18
  11800, // Lv.19
  13500  // Lv.20 (Cosmic Supernova Star)
];

export const calculateLevel = (totalExp: number): number => {
  let level = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (totalExp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  return Math.min(20, level);
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('user_game_progress');
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse game progress', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('user_game_progress', JSON.stringify(progress));
    }
  }, [progress, isLoaded]);

  const updateProgress = useCallback((updater: (prev: UserProgress) => UserProgress) => {
    setProgress(prev => updater(prev));
  }, []);

  const getDragonLevel = useCallback(() => {
    return calculateLevel(progress.totalExp);
  }, [progress.totalExp]);

  const addExp = useCallback((amount: number) => {
    updateProgress(prev => {
      const newExp = prev.totalExp + amount;
      const newLevel = calculateLevel(newExp);
      return {
        ...prev,
        totalExp: newExp,
        dragon: {
          ...prev.dragon,
          exp: newExp,
          level: newLevel
        }
      };
    });
  }, [updateProgress]);

  const addPoints = useCallback((amount: number) => {
    updateProgress(prev => ({
      ...prev,
      points: prev.points + amount
    }));
  }, [updateProgress]);

  const revealArea = useCallback((landmarkId: string) => {
    updateProgress(prev => {
      if (prev.revealedAreas.includes(landmarkId)) return prev;
      return { ...prev, revealedAreas: [...prev.revealedAreas, landmarkId] };
    });
  }, [updateProgress]);

  const checkIn = useCallback((landmarkId: string, photoUrl?: string, pointsToAward = 100) => {
    updateProgress(prev => {
      const alreadyCheckedIn = prev.checkIns.some(c => c.landmarkId === landmarkId);
      if (alreadyCheckedIn) return prev;
      
      const newCheckIn = {
        landmarkId,
        timestamp: Date.now(),
        photoDataUrl: photoUrl,
        points: pointsToAward
      };
      
      const revealed = prev.revealedAreas.includes(landmarkId) 
        ? prev.revealedAreas 
        : [...prev.revealedAreas, landmarkId];
        
      const newExp = prev.totalExp + pointsToAward;
      const newLevel = calculateLevel(newExp);

      return {
        ...prev,
        points: prev.points + pointsToAward,
        totalExp: newExp,
        checkIns: [...prev.checkIns, newCheckIn],
        revealedAreas: revealed,
        dragon: {
          ...prev.dragon,
          exp: newExp,
          level: newLevel
        }
      };
    });
  }, [updateProgress]);

  const unlockBadge = useCallback((badgeId: string) => {
    updateProgress(prev => {
      if (prev.badges.includes(badgeId)) return prev;
      return { ...prev, badges: [...prev.badges, badgeId] };
    });
  }, [updateProgress]);

  const addCustomTour = useCallback((landmarkIds: string[]) => {
    updateProgress(prev => ({
      ...prev,
      customTours: [...prev.customTours, landmarkIds]
    }));
  }, [updateProgress]);

  const completeTour = useCallback((tourId: string) => {
    updateProgress(prev => {
      if (prev.completedTours.includes(tourId)) return prev;
      return { ...prev, completedTours: [...prev.completedTours, tourId] };
    });
  }, [updateProgress]);

  const redeemReward = useCallback((rewardId: string, cost: number) => {
    updateProgress(prev => {
      if (prev.points < cost) return prev;
      return {
        ...prev,
        points: prev.points - cost,
        redeemedRewards: [...prev.redeemedRewards, rewardId]
      };
    });
  }, [updateProgress]);

  const setDragonSkin = useCallback((region: RegionId) => {
    updateProgress(prev => ({
      ...prev,
      dragon: {
        ...prev.dragon,
        currentSkin: region
      }
    }));
  }, [updateProgress]);

  return (
    <GameContext.Provider value={{
      progress,
      addPoints,
      addExp,
      checkIn,
      revealArea,
      unlockBadge,
      addCustomTour,
      completeTour,
      redeemReward,
      setDragonSkin,
      getDragonLevel
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
