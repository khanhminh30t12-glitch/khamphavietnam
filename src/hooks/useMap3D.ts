import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Coordinates, Landmark } from '@/types';

// Use a placeholder if not set in environment
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'YOUR_MAPBOX_TOKEN';

export const useMap3D = (mapContainerRef: React.RefObject<HTMLDivElement>) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [107.0, 16.0],
      zoom: 5.2,
      pitch: 0,
      bearing: 0,
      antialias: true
    });

    mapRef.current = map;

    map.on('load', () => {
      // Add 3D terrain
      map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14
      });
      map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

      // Add 3D buildings
      const layers = map.getStyle().layers;
      if (layers) {
        const labelLayerId = layers.find(
          (layer) => layer.type === 'symbol' && layer.layout && layer.layout['text-field']
        )?.id;

        map.addLayer(
          {
            id: '3d-buildings',
            source: 'composite',
            'source-layer': 'building',
            filter: ['==', 'extrude', 'true'],
            type: 'fill-extrusion',
            minzoom: 15,
            paint: {
              'fill-extrusion-color': '#aaa',
              'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'height']
              ],
              'fill-extrusion-base': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'min_height']
              ],
              'fill-extrusion-opacity': 0.6
            }
          },
          labelLayerId
        );
      }
      
      setIsLoaded(true);
    });

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      map.remove();
      mapRef.current = null;
    };
  }, [mapContainerRef]);

  const flyToLandmark = useCallback((
    coords: Coordinates,
    options: { zoom?: number; pitch?: number; duration?: number } = {}
  ) => {
    if (!mapRef.current) return;
    mapRef.current.flyTo({
      center: [coords.lng, coords.lat],
      zoom: options.zoom ?? 17,
      pitch: options.pitch ?? 60,
      duration: options.duration ?? 2500,
      essential: true
    });
  }, []);

  const resetToVietnamView = useCallback(() => {
    if (!mapRef.current) return;
    mapRef.current.flyTo({
      center: [107.0, 16.0],
      zoom: 5.2,
      pitch: 0,
      bearing: 0,
      duration: 3000,
      essential: true
    });
  }, []);

  const clearRouteLine = useCallback(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (map.getLayer('route-line')) map.removeLayer('route-line');
    if (map.getSource('route')) map.removeSource('route');
  }, []);

  const drawRouteLine = useCallback((waypoints: Coordinates[]) => {
    if (!mapRef.current || waypoints.length < 2) return;
    const map = mapRef.current;
    
    clearRouteLine();

    const geojson: GeoJSON.Feature<GeoJSON.LineString> = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: waypoints.map(w => [w.lng, w.lat])
      }
    };

    map.addSource('route', {
      type: 'geojson',
      lineMetrics: true,
      data: geojson
    });

    map.addLayer({
      id: 'route-line',
      type: 'line',
      source: 'route',
      paint: {
        'line-color': '#FFD700',
        'line-width': 5,
        'line-dasharray': [0, 4, 3]
      }
    });

    const dashArraySequence = [
      [0, 4, 3],
      [0.5, 4, 2.5],
      [1, 4, 2],
      [1.5, 4, 1.5],
      [2, 4, 1],
      [2.5, 4, 0.5],
      [3, 4, 0],
      [0, 0, 2],
      [0, 0.5, 2.5],
      [0, 1, 3],
      [0, 1.5, 3.5],
      [0, 2, 4],
      [0, 2.5, 4.5],
      [0, 3, 5],
      [0, 3.5, 5.5]
    ];
    let step = 0;
    const animateDashArray = () => {
      if (!map.getLayer('route-line')) return;
      
      const newStep = parseInt(
        (step % dashArraySequence.length).toString()
      );
      map.setPaintProperty(
        'route-line',
        'line-dasharray',
        dashArraySequence[newStep]
      );
      step += 0.2;
      animationRef.current = requestAnimationFrame(animateDashArray);
    };

    animateDashArray();
  }, [clearRouteLine]);

  const addLandmarkMarkers = useCallback((
    landmarks: Landmark[],
    onClick: (landmark: Landmark) => void
  ) => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    // Clear existing
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    landmarks.forEach(landmark => {
      const el = document.createElement('div');
      el.className = 'landmark-marker';
      el.style.width = '24px';
      el.style.height = '24px';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
      
      // Color based on region
      switch(landmark.region) {
        case 'north': el.style.backgroundColor = '#8B0000'; break;
        case 'central': el.style.backgroundColor = '#B8860B'; break;
        case 'south': el.style.backgroundColor = '#0066CC'; break;
        case 'west': el.style.backgroundColor = '#228B22'; break;
      }

      el.addEventListener('click', () => {
        onClick(landmark);
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat([landmark.coordinates.lng, landmark.coordinates.lat])
        .addTo(map);

      markersRef.current.push(marker);
    });
  }, []);

  const cleanup = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
  }, []);

  return {
    map: mapRef.current,
    isLoaded,
    flyToLandmark,
    resetToVietnamView,
    drawRouteLine,
    clearRouteLine,
    addLandmarkMarkers,
    cleanup
  };
};
