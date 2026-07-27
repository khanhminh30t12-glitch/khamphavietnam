import { useState, useCallback, useMemo, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { useLanguage } from '@/context/LanguageContext';
import { BilingualText } from '@/types';
import { dragonSkills } from '@/data/vietnamTourismData';

const LEVEL_THRESHOLDS = [0, 200, 400, 600, 800, 1100, 1400, 1700, 2000, 2500, 4000, 7000];

export const usePetState = () => {
  const { progress, addExp: feedExpContext } = useGame();
  const { language } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const level = progress.dragon.level;
  
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0;
  const nextThreshold = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  
  const expToNextLevel = nextThreshold - progress.dragon.exp;
  const expProgress = useMemo(() => {
    if (level >= LEVEL_THRESHOLDS.length) return 100;
    const range = nextThreshold - currentThreshold;
    const earned = progress.dragon.exp - currentThreshold;
    return Math.max(0, Math.min(100, (earned / range) * 100));
  }, [level, nextThreshold, currentThreshold, progress.dragon.exp]);

  const availableSkills = useMemo(() => {
    return dragonSkills.filter(skill => skill.unlockLevel <= level);
  }, [level]);

  const currentSkinName = useMemo(() => {
    const skinMap: Record<string, string> = {
      north: language === 'vi' ? 'Rồng Thăng Long' : 'Thang Long Dragon',
      central: language === 'vi' ? 'Rồng Hoàng Gia' : 'Royal Dragon',
      south: language === 'vi' ? 'Rồng Phương Nam' : 'Southern Dragon',
      west: language === 'vi' ? 'Rồng Cửu Long' : 'Mekong Dragon'
    };
    return skinMap[progress.dragon.currentSkin] || skinMap['south'];
  }, [progress.dragon.currentSkin, language]);

  const feedExp = useCallback((amount: number) => {
    feedExpContext(amount);
  }, [feedExpContext]);

  const speak = useCallback((text: BilingualText) => {
    // Completely mute all Web Speech API / TTS audio streams as requested
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Ensure voices are loaded
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    level,
    expToNextLevel,
    expProgress,
    availableSkills,
    currentSkinName,
    isSpeaking,
    feedExp,
    speak,
    stopSpeaking
  };
};
