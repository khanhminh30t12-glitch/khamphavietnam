import { useState, useEffect, useCallback } from 'react';
import { Coordinates, Landmark } from '@/types';
import { regions } from '@/data/vietnamTourismData';

const allLandmarks: Landmark[] = regions.flatMap(r => r.landmarks);

// Haversine formula
const calculateDistance = (a: Coordinates, b: Coordinates): number => {
  const R = 6371e3; // Earth radius in meters
  const rad = Math.PI / 180;
  const lat1 = a.lat * rad;
  const lat2 = b.lat * rad;
  const deltaLat = (b.lat - a.lat) * rad;
  const deltaLon = (b.lng - a.lng) * rad;

  const a_val = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
                Math.cos(lat1) * Math.cos(lat2) *
                Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a_val), Math.sqrt(1-a_val));

  return R * c;
};

export const useGPSCheckIn = () => {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [isWatching, setIsWatching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [nearbyLandmark, setNearbyLandmark] = useState<Landmark | null>(null);

  useEffect(() => {
    let watchId: number;

    if (isWatching && navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(loc);
          setError(null);
        },
        (err) => {
          setError(err.message);
          setIsWatching(false);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000
        }
      );
    }

    return () => {
      if (watchId && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [isWatching]);

  const findNearbyLandmark = useCallback((maxDistance: number = 100): Landmark | null => {
    if (!userLocation) return null;
    let closest: Landmark | null = null;
    let minD = Infinity;
    
    for (const landmark of allLandmarks) {
      const d = calculateDistance(userLocation, landmark.coordinates);
      if (d < minD && d <= maxDistance) {
        minD = d;
        closest = landmark;
      }
    }
    return closest;
  }, [userLocation]);

  // Update nearby landmark whenever location changes
  useEffect(() => {
    if (userLocation) {
      const nearby = findNearbyLandmark(100);
      setNearbyLandmark(nearby);
    } else {
      setNearbyLandmark(null);
    }
  }, [userLocation, findNearbyLandmark]);

  const requestPermission = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }
    setIsWatching(true);
  }, []);

  const isNearLandmark = useCallback((landmarkId: string, maxDistance: number = 100): boolean => {
    if (!userLocation) return false;
    const landmark = allLandmarks.find(l => l.id === landmarkId);
    if (!landmark) return false;
    return calculateDistance(userLocation, landmark.coordinates) <= maxDistance;
  }, [userLocation]);

  const enableDemoMode = useCallback(() => {
    const randomLandmark = allLandmarks[Math.floor(Math.random() * allLandmarks.length)];
    if (randomLandmark) {
      setUserLocation({
        lat: randomLandmark.coordinates.lat + 0.0001,
        lng: randomLandmark.coordinates.lng + 0.0001
      });
      setIsWatching(false);
    }
  }, []);

  return {
    userLocation,
    nearbyLandmark,
    isWatching,
    error,
    calculateDistance,
    isNearLandmark,
    enableDemoMode,
    requestPermission
  };
};
