import { Coordinates } from '@/types';

export interface RouteStep {
  instruction: string;
  distanceKm: number;
  durationMins: number;
}

export interface RouteResult {
  coordinates: [number, number][]; // [lng, lat][]
  distanceKm: number;
  durationMins: number;
  steps: RouteStep[];
}

/**
 * Fetch real road geometry and turn-by-turn directions using Mapbox Directions or OSRM API.
 * Falls back to straight line if offline/failed.
 */
export async function fetchRealRoadRoute(
  start: Coordinates,
  end: Coordinates,
  mapboxToken?: string
): Promise<RouteResult> {
  const startLngLat = `${start.lng},${start.lat}`;
  const endLngLat = `${end.lng},${end.lat}`;

  // 1. Try Mapbox Directions API if token provided
  if (mapboxToken) {
    try {
      const mapboxUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${startLngLat};${endLngLat}?geometries=geojson&steps=true&overview=full&language=vi&access_token=${mapboxToken}`;
      const res = await fetch(mapboxUrl);
      if (res.ok) {
        const data = await res.json();
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          const coords = route.geometry.coordinates as [number, number][];
          const distKm = route.distance / 1000;
          const durMins = Math.round(route.duration / 60);

          const steps: RouteStep[] = [];
          if (route.legs && route.legs[0] && route.legs[0].steps) {
            route.legs[0].steps.forEach((s: any) => {
              steps.push({
                instruction: s.maneuver.instruction || `Di chuyển trên ${s.name || 'tuyến đường'}`,
                distanceKm: Number((s.distance / 1000).toFixed(2)),
                durationMins: Math.round(s.duration / 60)
              });
            });
          }

          return {
            coordinates: coords,
            distanceKm: Number(distKm.toFixed(1)),
            durationMins: Math.max(1, durMins),
            steps
          };
        }
      }
    } catch (e) {
      console.warn('Mapbox directions failed, trying OSRM fallback...', e);
    }
  }

  // 2. Try OSRM free directions API as fallback
  try {
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${startLngLat};${endLngLat}?overview=full&geometries=geojson&steps=true`;
    const res = await fetch(osrmUrl);
    if (res.ok) {
      const data = await res.json();
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const coords = route.geometry.coordinates as [number, number][];
        const distKm = route.distance / 1000;
        const durMins = Math.round(route.duration / 60);

        const steps: RouteStep[] = [];
        if (route.legs && route.legs[0] && route.legs[0].steps) {
          route.legs[0].steps.forEach((s: any) => {
            let nameStr = s.name ? `đường ${s.name}` : 'tuyến đường';
            let maneuverType = s.maneuver.type || 'continue';
            let instructionVi = '';

            if (maneuverType === 'turn') {
              const modifier = s.maneuver.modifier;
              instructionVi = `Rẽ ${modifier === 'right' || modifier === 'slight right' ? 'phải' : 'trái'} vào ${nameStr}`;
            } else if (maneuverType === 'depart') {
              instructionVi = `Bắt đầu di chuyển từ điểm xuất phát theo ${nameStr}`;
            } else if (maneuverType === 'arrive') {
              instructionVi = `Bạn đã đến điểm dừng mục tiêu trên ${nameStr}`;
            } else {
              instructionVi = `Đi thẳng khoảng ${(s.distance / 1000).toFixed(1)}km trên ${nameStr}`;
            }

            steps.push({
              instruction: instructionVi,
              distanceKm: Number((s.distance / 1000).toFixed(2)),
              durationMins: Math.round(s.duration / 60)
            });
          });
        }

        return {
          coordinates: coords,
          distanceKm: Number(distKm.toFixed(1)),
          durationMins: Math.max(1, durMins),
          steps
        };
      }
    }
  } catch (e) {
    console.warn('OSRM directions failed, using straight-line fallback...', e);
  }

  // 3. Fallback: Straight line between points
  const dLat = end.lat - start.lat;
  const dLng = end.lng - start.lng;
  const directDistKm = Math.sqrt(dLat * dLat + dLng * dLng) * 111;
  const estMins = Math.round((directDistKm / 40) * 60);

  return {
    coordinates: [
      [start.lng, start.lat],
      [end.lng, end.lat]
    ],
    distanceKm: Number(directDistKm.toFixed(1)),
    durationMins: Math.max(1, estMins),
    steps: [
      {
        instruction: `Bắt đầu xuất phát theo hướng tuyến đường chính`,
        distanceKm: Number((directDistKm * 0.5).toFixed(1)),
        durationMins: Math.round(estMins * 0.5)
      },
      {
        instruction: `Đi tiếp khoảng ${(directDistKm * 0.5).toFixed(1)}km để tới đích`,
        distanceKm: Number((directDistKm * 0.5).toFixed(1)),
        durationMins: Math.round(estMins * 0.5)
      }
    ]
  };
}
