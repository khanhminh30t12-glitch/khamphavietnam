import { useState, useCallback } from 'react';
import { ExplorationMode, TourRoute, Landmark, Coordinates } from '@/types';
import { regions, tourRoutes } from '@/data/vietnamTourismData';

const allLandmarks: Landmark[] = regions.flatMap(r => r.landmarks);

// Helper to calculate distance for custom tour sorting
const getDistance = (c1: Coordinates, c2: Coordinates) => {
  const dx = c1.lng - c2.lng;
  const dy = c1.lat - c2.lat;
  return Math.sqrt(dx * dx + dy * dy);
};

export const useTourManager = () => {
  const [mode, setModeState] = useState<ExplorationMode>('free_roam');
  const [activeTour, setActiveTour] = useState<TourRoute | null>(null);
  const [currentStopIndex, setCurrentStopIndex] = useState<number>(0);
  const [customSelectedIds, setCustomSelectedIds] = useState<string[]>([]);

  const setMode = useCallback((newMode: ExplorationMode) => {
    setModeState(newMode);
    if (newMode !== 'preset_tour' && newMode !== 'custom_tour') {
      setActiveTour(null);
      setCurrentStopIndex(0);
    }
  }, []);

  const startPresetTour = useCallback((tourId: string) => {
    const tour = tourRoutes.find(t => t.id === tourId);
    if (tour) {
      setActiveTour(tour);
      setCurrentStopIndex(0);
      setModeState('preset_tour');
    }
  }, []);

  const startTour = useCallback((tour: TourRoute) => {
    setActiveTour(tour);
    setCurrentStopIndex(0);
    setModeState('preset_tour');
  }, []);

  const nextStop = useCallback((): Landmark | undefined => {
    if (!activeTour) return undefined;
    if (currentStopIndex < activeTour.stops.length - 1) {
      const newIndex = currentStopIndex + 1;
      setCurrentStopIndex(newIndex);
      const stop = activeTour.stops[newIndex];
      return allLandmarks.find(l => l.id === stop.landmarkId);
    }
    return undefined;
  }, [activeTour, currentStopIndex]);

  const prevStop = useCallback((): Landmark | undefined => {
    if (!activeTour) return undefined;
    if (currentStopIndex > 0) {
      const newIndex = currentStopIndex - 1;
      setCurrentStopIndex(newIndex);
      const stop = activeTour.stops[newIndex];
      return allLandmarks.find(l => l.id === stop.landmarkId);
    }
    return undefined;
  }, [activeTour, currentStopIndex]);

  const getCurrentStop = useCallback((): Landmark | null => {
    if (!activeTour) return null;
    const stop = activeTour.stops[currentStopIndex];
    if (!stop) return null;
    return allLandmarks.find(l => l.id === stop.landmarkId) || null;
  }, [activeTour, currentStopIndex]);

  const toggleCustomLandmark = useCallback((landmarkId: string) => {
    setCustomSelectedIds(prev => {
      if (prev.includes(landmarkId)) {
        return prev.filter(id => id !== landmarkId);
      } else {
        return [...prev, landmarkId];
      }
    });
  }, []);

  const isLandmarkSelected = useCallback((landmarkId: string) => {
    return customSelectedIds.includes(landmarkId);
  }, [customSelectedIds]);

  const buildCustomTour = useCallback((): Landmark[] => {
    if (customSelectedIds.length === 0) return [];
    
    const selectedLandmarks = customSelectedIds
      .map(id => allLandmarks.find(l => l.id === id))
      .filter((l): l is Landmark => !!l);
      
    if (selectedLandmarks.length === 0) return [];

    // Nearest neighbor algorithm starting from the southernmost point (smallest lat)
    const sorted: Landmark[] = [];
    const remaining = [...selectedLandmarks];
    
    let current = remaining.reduce((prev, curr) => 
      curr.coordinates.lat < prev.coordinates.lat ? curr : prev
    );
    
    sorted.push(current);
    remaining.splice(remaining.indexOf(current), 1);
    
    while (remaining.length > 0) {
      let nearest = remaining[0];
      let minDistance = getDistance(current.coordinates, nearest.coordinates);
      
      for (let i = 1; i < remaining.length; i++) {
        const candidate = remaining[i];
        const dist = getDistance(current.coordinates, candidate.coordinates);
        if (dist < minDistance) {
          nearest = candidate;
          minDistance = dist;
        }
      }
      
      sorted.push(nearest);
      current = nearest;
      remaining.splice(remaining.indexOf(nearest), 1);
    }
    
    const customTourObj: TourRoute = {
      id: `custom-${Date.now()}`,
      name: { vi: 'Hành trình tùy chỉnh', en: 'Custom Tour' },
      description: { vi: 'Hành trình do bạn tự thiết kế', en: 'Your custom designed journey' },
      emoji: '🗺️',
      stops: sorted.map((l, index) => ({
        landmarkId: l.id,
        day: index + 1,
        duration: '1 day',
        transport: { vi: 'Xe máy / Ô tô', en: 'Motorbike / Car' }
      })),
      totalDays: sorted.length,
      rewards: {
        exp: 300,
        points: 150,
        badge: 'badge_gold_custom'
      }
    };
    
    setActiveTour(customTourObj);
    setCurrentStopIndex(0);
    setModeState('custom_tour');
    
    return sorted;
  }, [customSelectedIds]);

  const getTourProgress = useCallback(() => {
    if (!activeTour) return { current: 0, total: 0, percentage: 0 };
    const total = activeTour.stops.length;
    const current = currentStopIndex + 1;
    return {
      current,
      total,
      percentage: total > 0 ? (current / total) * 100 : 0
    };
  }, [activeTour, currentStopIndex]);

  return {
    mode,
    activeTour,
    currentStopIndex,
    customSelectedIds,
    setMode,
    startPresetTour,
    startTour,
    nextStop,
    prevStop,
    getCurrentStop,
    toggleCustomLandmark,
    buildCustomTour,
    isLandmarkSelected,
    getTourProgress
  };
};
