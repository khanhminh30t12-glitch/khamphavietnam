'use client';

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Landmark, Coordinates } from '@/types';
import { regions } from '@/data/vietnamTourismData';
import { calculateHaversineDistance } from '@/utils/geoDistance';
import { PoiCategoryFilter, RadiusFilter } from './PoiFilterToolbar';

interface Map3DViewProps {
  onLandmarkSelect: (landmark: Landmark) => void;
  selectedLandmark: Landmark | null;
  routeWaypoints: Coordinates[];
  navigateToCoords: Coordinates | null;
  activeTour?: import('@/types').TourRoute | null;
  isSimulatingTour?: boolean;
  onToggleSimulateTour?: () => void;
  activePoiCategory?: PoiCategoryFilter;
  activeRadius?: RadiusFilter;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
const allLandmarks: Landmark[] = regions.flatMap(r => r.landmarks);

import { addVietnamTerritoryLayers } from '@/utils/vietnamMaskLayer';

// Vietnam Bounds coordinates (Southwest, Northeast) - encompasses full Vietnam & sea islands (Hoang Sa & Truong Sa)
const VIETNAM_BOUNDS: mapboxgl.LngLatBoundsLike = [
  [100.5, 6.5],   // SW: Gulf of Thailand / South of Truong Sa
  [114.8, 24.5]  // NE: North of Vietnam / East of Hoang Sa
];

export function Map3DViewComponent({
  onLandmarkSelect,
  selectedLandmark,
  routeWaypoints,
  navigateToCoords,
  activeTour,
  isSimulatingTour,
  onToggleSimulateTour,
  activePoiCategory = 'all',
  activeRadius = 0
}: Map3DViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const poiMarkersRef = useRef<mapboxgl.Marker[]>([]);
  const stoppingMarkersRef = useRef<mapboxgl.Marker[]>([]);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [currentStyle, setCurrentStyle] = useState<'outdoors' | 'satellite' | 'streets'>('outdoors');
  const [showPoiMarkers, setShowPoiMarkers] = useState(true);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    const initialMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12', // Natural Outdoors Theme with Rivers & Greenery
      center: [109.0, 15.2], // Center showing full S-curve Vietnam mainland & Hoang Sa / Truong Sa
      zoom: 5.2,
      minZoom: 4.8,
      maxZoom: 18,
      maxBounds: VIETNAM_BOUNDS,
      pitch: 35,
      bearing: 0,
      dragPan: true,
      scrollZoom: true,
      touchZoomRotate: true,
      doubleClickZoom: true,
      dragRotate: true,
      trackResize: true,
      antialias: false, // Turn off antialiasing for maximum 120Hz render performance
      powerPreference: 'high-performance',
      refreshExpiredTiles: false,
      maxTileCacheSize: 80, // Optimized tile cache size for light RAM
      fadeDuration: 0, // Disable tile fade-in animation for zero-lag zooming
      preserveDrawingBuffer: false
    } as any);

    // Add Navigation control (Zoom + Pitch/Rotate compass)
    initialMap.addControl(
      new mapboxgl.NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: true
      }),
      'bottom-right'
    );

    initialMap.on('load', () => {
      // Add Native Geographic Map Text Labels for Hoang Sa & Truong Sa
      addVietnamTerritoryLayers(initialMap);

      // 3D Terrain setup
      if (!initialMap.getSource('mapbox-dem')) {
        initialMap.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14
        });
      }
      initialMap.setTerrain({ source: 'mapbox-dem', exaggeration: 1.2 });

      setLoading(false);
      renderLandmarkMarkers(initialMap);
      renderPoiMarkers(initialMap, showPoiMarkers);
    });

    mapRef.current = initialMap;

    return () => {
      markersRef.current.forEach(m => m.remove());
      poiMarkersRef.current.forEach(m => m.remove());
      if (popupRef.current) popupRef.current.remove();
      initialMap.remove();
    };
  }, []);

  // Handle POI Visibility Toggle
  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      renderPoiMarkers(map, showPoiMarkers);
    }
  }, [showPoiMarkers]);

  // Switch Map Style
  const handleStyleChange = (styleType: 'outdoors' | 'satellite' | 'streets') => {
    const map = mapRef.current;
    if (!map) return;

    setCurrentStyle(styleType);
    const styleUrls = {
      outdoors: 'mapbox://styles/mapbox/outdoors-v12',
      satellite: 'mapbox://styles/mapbox/satellite-streets-v12',
      streets: 'mapbox://styles/mapbox/streets-v12'
    };

    map.setStyle(styleUrls[styleType]);
    map.once('style.load', () => {
      if (!map.getSource('mapbox-dem')) {
        map.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14
        });
      }
      map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.2 });
      renderLandmarkMarkers(map);
      renderPoiMarkers(map, showPoiMarkers);
    });
  };

  // Add HTML Markers to Mapbox Map for Landmarks
  const renderLandmarkMarkers = (mapInstance: mapboxgl.Map) => {
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    const regionColors: Record<string, string> = {
      north: '#8B0000',
      central: '#B8860B',
      south: '#0066CC',
      west: '#228B22'
    };

    allLandmarks.forEach(landmark => {
      const el = document.createElement('div');
      el.className = 'custom-mapbox-marker';
      el.style.width = '38px';
      el.style.height = '38px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = regionColors[landmark.region] || '#0066CC';
      el.style.border = '3px solid white';
      el.style.boxShadow = `0 0 15px ${regionColors[landmark.region]}80, 0 4px 14px rgba(0,0,0,0.5)`;
      el.style.cursor = 'pointer';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.fontSize = '18px';
      el.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
      el.innerHTML = '📍';

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.35)';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1.0)';
      });
      el.addEventListener('click', () => {
        if (mapRef.current) {
          mapRef.current.easeTo({
            center: [landmark.coordinates.lng, landmark.coordinates.lat],
            zoom: 14.5,
            pitch: 50,
            bearing: -20,
            duration: 1000
          });
        }
        onLandmarkSelect(landmark);
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([landmark.coordinates.lng, landmark.coordinates.lat])
        .addTo(mapInstance);

      markersRef.current.push(marker);
    });
  };

  // Render Direct POI Markers on Map with Viewport Culling & Zoom Filter
  const renderPoiMarkers = (mapInstance: mapboxgl.Map, visible: boolean) => {
    poiMarkersRef.current.forEach(m => m.remove());
    poiMarkersRef.current = [];

    if (!visible) return;

    const zoom = mapInstance.getZoom();
    const bounds = mapInstance.getBounds();

    const mapCenter = mapInstance.getCenter();
    const refLat = selectedLandmark ? selectedLandmark.coordinates.lat : mapCenter.lat;
    const refLng = selectedLandmark ? selectedLandmark.coordinates.lng : mapCenter.lng;

    regions.forEach(region => {
      // Cafes ☕
      if (activePoiCategory === 'all' || activePoiCategory === 'cafe') {
        region.cafes.forEach(cafe => {
          if (activeRadius > 0) {
            const dist = calculateHaversineDistance(refLat, refLng, cafe.coordinates.lat, cafe.coordinates.lng);
            if (dist > activeRadius) return;
          }
        const el = document.createElement('div');
        el.style.width = '28px';
        el.style.height = '28px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = '#d97706';
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.4)';
        el.style.cursor = 'pointer';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.fontSize = '14px';
        el.innerHTML = '☕';

        el.addEventListener('click', (e) => {
          e.stopPropagation();
          showPoiPopup(mapInstance, cafe.coordinates, {
            name: cafe.name,
            type: 'Quán Cà Phê',
            rating: cafe.rating,
            priceRange: cafe.priceRange,
            priceText: cafe.priceText,
            image: cafe.image,
            description: cafe.description.vi
          });
        });

            const marker = new mapboxgl.Marker({ element: el })
              .setLngLat([cafe.coordinates.lng, cafe.coordinates.lat])
              .addTo(mapInstance);
            poiMarkersRef.current.push(marker);
          });
        }

      // Restaurants 🍜
      if (activePoiCategory === 'all' || activePoiCategory === 'food') {
        region.restaurants.forEach(restaurant => {
          if (activeRadius > 0) {
            const dist = calculateHaversineDistance(refLat, refLng, restaurant.coordinates.lat, restaurant.coordinates.lng);
            if (dist > activeRadius) return;
          }
          const el = document.createElement('div');
          el.style.width = '28px';
          el.style.height = '28px';
          el.style.borderRadius = '50%';
          el.style.backgroundColor = '#ea580c';
          el.style.border = '2px solid white';
          el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.4)';
          el.style.cursor = 'pointer';
          el.style.display = 'flex';
          el.style.alignItems = 'center';
          el.style.justifyContent = 'center';
          el.style.fontSize = '14px';
          el.innerHTML = '🍜';

          el.addEventListener('click', (e) => {
            e.stopPropagation();
            showPoiPopup(mapInstance, restaurant.coordinates, {
              name: restaurant.name,
              type: 'Quán Ăn / Đặc Sản',
              rating: restaurant.rating,
              priceRange: restaurant.priceRange,
              priceText: restaurant.priceText,
              image: restaurant.image,
              description: restaurant.description.vi
            });
          });

          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat([restaurant.coordinates.lng, restaurant.coordinates.lat])
            .addTo(mapInstance);
          poiMarkersRef.current.push(marker);
        });
      }

      // Hotels 🏨
      if (activePoiCategory === 'all' || activePoiCategory === 'hotel') {
        region.hotels.forEach(hotel => {
          if (activeRadius > 0) {
            const dist = calculateHaversineDistance(refLat, refLng, hotel.coordinates.lat, hotel.coordinates.lng);
            if (dist > activeRadius) return;
          }
        const el = document.createElement('div');
        el.style.width = '28px';
        el.style.height = '28px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = '#4f46e5';
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.4)';
        el.style.cursor = 'pointer';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.fontSize = '14px';
        el.innerHTML = '🏨';

        el.addEventListener('click', (e) => {
          e.stopPropagation();
          showPoiPopup(mapInstance, hotel.coordinates, {
            name: hotel.name,
            type: 'Khách Sạn / Resort',
            rating: hotel.rating,
            priceRange: hotel.priceRange,
            priceText: hotel.priceText,
            image: hotel.image,
            description: hotel.description.vi
          });
        });

          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat([hotel.coordinates.lng, hotel.coordinates.lat])
            .addTo(mapInstance);
          poiMarkersRef.current.push(marker);
        });
      }

      // Parks 🌳
      if (region.parks) {
        region.parks.forEach(park => {
          const el = document.createElement('div');
          el.className = 'touch-active';
          el.style.width = '30px';
          el.style.height = '30px';
          el.style.borderRadius = '50%';
          el.style.backgroundColor = '#16a34a';
          el.style.border = '2px solid white';
          el.style.boxShadow = '0 0 10px rgba(22, 163, 74, 0.6)';
          el.style.cursor = 'pointer';
          el.style.display = 'flex';
          el.style.alignItems = 'center';
          el.style.justifyContent = 'center';
          el.style.fontSize = '15px';
          el.innerHTML = '🌳';

          el.addEventListener('click', (e) => {
            e.stopPropagation();

            const amenitiesHtml = park.amenities.map(a => `<span style="background: #1e293b; color: #38bdf8; padding: 2px 5px; border-radius: 4px; font-size: 9px; display: inline-block; margin-bottom: 2px;">${a}</span>`).join(' ');

            const html = `
              <div style="width: 230px; font-family: sans-serif; border-radius: 12px; overflow: hidden; background: #0f172a; color: white;">
                <img src="${park.image}" alt="${park.name}" style="width: 100%; height: 110px; object-fit: cover;" />
                <div style="padding: 10px;">
                  <div style="font-size: 10px; text-transform: uppercase; color: #4ade80; font-weight: bold; margin-bottom: 2px;">🌳 Công Viên Cây Xanh</div>
                  <div style="font-size: 13px; font-weight: bold; line-height: 1.2; margin-bottom: 4px; color: #ffffff;">${park.name}</div>
                  <div style="font-size: 11px; color: #cbd5e1; margin-bottom: 6px; line-height: 1.3;">${park.description.vi}</div>
                  <div style="display: flex; flex-wrap: wrap; gap: 3px; margin-bottom: 6px;">${amenitiesHtml}</div>
                  <div style="font-size: 10px; font-weight: bold; color: #f59e0b; border-top: 1px solid #334155; padding-top: 6px;">
                    🎫 ${park.entryFee || 'Miễn phí'} • 🐉 Voice AI
                  </div>
                </div>
              </div>
            `;

            if (popupRef.current) popupRef.current.remove();
            popupRef.current = new mapboxgl.Popup({ offset: 15, closeButton: true })
              .setLngLat([park.coordinates.lng, park.coordinates.lat])
              .setHTML(html)
              .addTo(mapInstance);

            if (typeof window !== 'undefined' && window.speechSynthesis) {
              window.speechSynthesis.cancel();
              const utterance = new SpeechSynthesisUtterance(
                `Rồng AI gợi ý: Nếu thấy mệt, bạn có thể ghé ${park.name} ngay đây để ngồi nghỉ chân hóng mát hoàn toàn miễn phí nhé!`
              );
              utterance.lang = 'vi-VN';
              window.speechSynthesis.speak(utterance);
            }
          });

          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat([park.coordinates.lng, park.coordinates.lat])
            .addTo(mapInstance);
          poiMarkersRef.current.push(marker);
        });
      }
    });
  };

  // Show Interactive Popup Card for Map POIs
  const showPoiPopup = (
    mapInstance: mapboxgl.Map,
    coords: Coordinates,
    data: {
      name: string;
      type: string;
      rating: number;
      priceRange: '$' | '$$' | '$$$';
      priceText: string;
      image: string;
      description: string;
    }
  ) => {
    if (popupRef.current) popupRef.current.remove();

    const priceLabel =
      data.priceRange === '$'
        ? '💵 Bình dân ($)'
        : data.priceRange === '$$'
        ? '💳 Tầm trung ($$)'
        : '👑 Cao cấp ($$$)';

    const priceColor =
      data.priceRange === '$' ? '#10b981' : data.priceRange === '$$' ? '#06b6d4' : '#a855f7';

    const html = `
      <div style="width: 220px; font-family: sans-serif; border-radius: 12px; overflow: hidden; background: #0f172a; color: white;">
        <img src="${data.image}" alt="${data.name}" style="width: 100%; height: 110px; object-fit: cover;" />
        <div style="padding: 10px;">
          <div style="font-size: 10px; text-transform: uppercase; color: #fbbf24; font-weight: bold; margin-bottom: 2px;">${data.type}</div>
          <div style="font-size: 13px; font-weight: bold; line-height: 1.2; margin-bottom: 4px;">${data.name}</div>
          <div style="font-size: 11px; color: #f59e0b; font-weight: bold; margin-bottom: 6px;">⭐ ${data.rating}</div>
          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 10px; border-top: 1px solid #334155; padding-top: 6px;">
            <span style="background: ${priceColor}20; color: ${priceColor}; padding: 2px 6px; border-radius: 4px; font-weight: bold;">${priceLabel}</span>
            <span style="color: #cbd5e1; font-weight: 600;">${data.priceText}</span>
          </div>
          <button id="poi-direct-nav-btn" style="margin-top: 8px; width: 100%; padding: 7px 0; background: linear-gradient(to right, #ea580c, #f59e0b); color: #020617; font-weight: 900; border-radius: 8px; border: none; font-size: 11px; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
            🚗 Google/Apple Maps Dẫn Đường
          </button>
        </div>
      </div>
    `;

    popupRef.current = new mapboxgl.Popup({ offset: 15, closeButton: true })
      .setLngLat([coords.lng, coords.lat])
      .setHTML(html)
      .addTo(mapInstance);

    setTimeout(() => {
      const btn = document.getElementById('poi-direct-nav-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          import('@/utils/navigation').then(({ openExternalMapDirections }) => {
            openExternalMapDirections(coords.lat, coords.lng);
          });
        });
      }
    }, 100);
  };

  // Draw 3D Snap-to-Road Route Line & Render Stopping Points (🛑 ☕ 🍜 📸)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear previous stopping markers
    stoppingMarkersRef.current.forEach(m => m.remove());
    stoppingMarkersRef.current = [];

    const sourceId = 'route-source';
    const glowLayerId = 'route-glow-layer';
    const coreLayerId = 'route-core-layer';

    if (routeWaypoints.length < 2) {
      if (map.getLayer(coreLayerId)) map.removeLayer(coreLayerId);
      if (map.getLayer(glowLayerId)) map.removeLayer(glowLayerId);
      if (map.getSource(sourceId)) map.removeSource(sourceId);
      return;
    }

    let isCancelled = false;

    // Render stopping points if activeTour has them
    if (activeTour && activeTour.stoppingPoints) {
      activeTour.stoppingPoints.forEach(sp => {
        const el = document.createElement('div');
        el.className = 'stopping-point-marker touch-active';
        el.style.width = '34px';
        el.style.height = '34px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = '#0f172a';
        el.style.border = '2px solid #f59e0b';
        el.style.boxShadow = '0 0 12px rgba(245, 158, 11, 0.6)';
        el.style.cursor = 'pointer';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.fontSize = '16px';
        el.innerHTML = sp.icon || '🛑';

        el.addEventListener('click', (e) => {
          e.stopPropagation();

          const html = `
            <div style="width: 230px; font-family: sans-serif; border-radius: 12px; overflow: hidden; background: #0f172a; color: white;">
              ${sp.image ? `<img src="${sp.image}" alt="${sp.name.vi}" style="width: 100%; height: 110px; object-fit: cover;" />` : ''}
              <div style="padding: 10px;">
                <div style="font-size: 10px; text-transform: uppercase; color: #10b981; font-weight: bold; margin-bottom: 2px;">🛑 Điểm Dừng Chân Gợi Ý</div>
                <div style="font-size: 13px; font-weight: bold; line-height: 1.2; margin-bottom: 4px; color: #f59e0b;">${sp.name.vi}</div>
                <div style="font-size: 11px; color: #cbd5e1; margin-bottom: 6px; line-height: 1.3;">${sp.reasonToStop.vi}</div>
                <div style="font-size: 10px; font-weight: bold; color: #38bdf8; border-top: 1px solid #334155; padding-top: 6px; display: flex; items-center; justify-between;">
                  <span>⏱️ Nghỉ đề xuất: ${sp.recommendedRestMinutes} phút</span>
                  <span>🐉 Voice AI</span>
                </div>
              </div>
            </div>
          `;

          if (popupRef.current) popupRef.current.remove();
          popupRef.current = new mapboxgl.Popup({ offset: 15, closeButton: true })
            .setLngLat([sp.coordinates.lng, sp.coordinates.lat])
            .setHTML(html)
            .addTo(map);

          // Rồng AI Voice speech
          if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(
              `Rồng AI tư vấn: Điểm dừng chân ${sp.name.vi}. ${sp.reasonToStop.vi}. Bạn nên dừng nghỉ khoảng ${sp.recommendedRestMinutes} phút nhé!`
            );
            utterance.lang = 'vi-VN';
            window.speechSynthesis.speak(utterance);
          }
        });

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([sp.coordinates.lng, sp.coordinates.lat])
          .addTo(map);
        stoppingMarkersRef.current.push(marker);
      });
    }

    // Snap-to-Road routing for Tour waypoints
    import('@/utils/routing').then(({ fetchRealRoadRoute }) => {
      const routePromises: Promise<any>[] = [];
      for (let i = 0; i < routeWaypoints.length - 1; i++) {
        routePromises.push(fetchRealRoadRoute(routeWaypoints[i], routeWaypoints[i + 1], MAPBOX_TOKEN));
      }

      Promise.all(routePromises).then(results => {
        if (isCancelled || !mapRef.current) return;

        const allCoords: [number, number][] = [];
        results.forEach(r => {
          allCoords.push(...r.coordinates);
        });

        const geojsonData: GeoJSON.Feature<GeoJSON.LineString> = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: allCoords.length > 0 ? allCoords : routeWaypoints.map(w => [w.lng, w.lat])
          }
        };

        const currentMap = mapRef.current;
        if (currentMap.getSource(sourceId)) {
          (currentMap.getSource(sourceId) as mapboxgl.GeoJSONSource).setData(geojsonData);
        } else {
          currentMap.addSource(sourceId, { type: 'geojson', data: geojsonData });

          currentMap.addLayer({
            id: glowLayerId,
            type: 'line',
            source: sourceId,
            layout: { 'line-join': 'round', 'line-cap': 'round' },
            paint: {
              'line-color': '#10b981',
              'line-width': 10,
              'line-blur': 4,
              'line-opacity': 0.7
            }
          });

          currentMap.addLayer({
            id: coreLayerId,
            type: 'line',
            source: sourceId,
            layout: { 'line-join': 'round', 'line-cap': 'round' },
            paint: {
              'line-color': '#ffffff',
              'line-width': 4,
              'line-dasharray': [0, 3, 3]
            }
          });
        }

        // Fit bounds for tour
        const bounds = new mapboxgl.LngLatBounds();
        const coordsToExtend: [number, number][] = allCoords.length > 0
          ? allCoords
          : routeWaypoints.map(w => [w.lng, w.lat]);
        coordsToExtend.forEach(c => bounds.extend(c as [number, number]));
        currentMap.fitBounds(bounds, { padding: 80, pitch: 40, duration: 2000 });
      });
    });

    return () => {
      isCancelled = true;
    };
  }, [routeWaypoints, activeTour]);

  // Draw Dynamic POI Navigation Route (Landmark → POI) with Snap-to-Road 3D Glow Line
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedLandmark || !navigateToCoords) return;

    let isCancelled = false;

    const poiSourceId = 'poi-nav-source';
    const glowLayerId = 'poi-nav-glow-layer';
    const coreLayerId = 'poi-nav-core-layer';

    import('@/utils/routing').then(({ fetchRealRoadRoute }) => {
      fetchRealRoadRoute(selectedLandmark.coordinates, navigateToCoords, MAPBOX_TOKEN).then((routeResult) => {
        if (isCancelled || !mapRef.current) return;

        const currentMap = mapRef.current;

        const geojsonData: GeoJSON.Feature<GeoJSON.LineString> = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: routeResult.coordinates
          }
        };

        if (currentMap.getSource(poiSourceId)) {
          (currentMap.getSource(poiSourceId) as mapboxgl.GeoJSONSource).setData(geojsonData);
        } else {
          currentMap.addSource(poiSourceId, { type: 'geojson', data: geojsonData });

          // 1. Glow Layer (Outer neon aura)
          currentMap.addLayer({
            id: glowLayerId,
            type: 'line',
            source: poiSourceId,
            layout: { 'line-join': 'round', 'line-cap': 'round' },
            paint: {
              'line-color': '#00f2fe',
              'line-width': 12,
              'line-blur': 4,
              'line-opacity': 0.75
            }
          });

          // 2. Core Animated Polyline
          currentMap.addLayer({
            id: coreLayerId,
            type: 'line',
            source: poiSourceId,
            layout: { 'line-join': 'round', 'line-cap': 'round' },
            paint: {
              'line-color': '#ffffff',
              'line-width': 4,
              'line-dasharray': [0, 2, 2]
            }
          });
        }

        // Fit map bounds to show full road route (responsive padding for mobile)
        const bounds = new mapboxgl.LngLatBounds();
        routeResult.coordinates.forEach(coord => bounds.extend(coord));
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        currentMap.fitBounds(bounds, {
          padding: isMobile
            ? { top: 60, bottom: 220, left: 20, right: 20 }
            : { top: 90, bottom: 90, left: 90, right: 460 },
          pitch: 45,
          duration: 1800,
          maxZoom: 16.5
        });
      });
    });

    return () => {
      isCancelled = true;
      if (map.getLayer(coreLayerId)) map.removeLayer(coreLayerId);
      if (map.getLayer(glowLayerId)) map.removeLayer(glowLayerId);
      if (map.getSource(poiSourceId)) map.removeSource(poiSourceId);
    };
  }, [navigateToCoords, selectedLandmark]);

  // FlyTo Landmark
  useEffect(() => {
    const map = mapRef.current;
    if (map && selectedLandmark && !navigateToCoords) {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      map.flyTo({
        center: [selectedLandmark.coordinates.lng, selectedLandmark.coordinates.lat],
        zoom: isMobile ? 14.5 : 15.5,
        pitch: 55,
        bearing: 35,
        duration: 2000,
        essential: true
      });
    }
  }, [selectedLandmark, navigateToCoords]);

  const handleResetView = () => {
    const map = mapRef.current;
    if (map) {
      map.flyTo({
        center: [106.8, 16.2],
        zoom: 6,
        pitch: 35,
        bearing: 0,
        duration: 2000
      });
    }
  };

  return (
    <div className="relative w-full h-full md:rounded-xl overflow-hidden shadow-lg">
      <div ref={mapContainer} className="w-full h-full" />
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm z-20">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin"></div>
            <p className="text-white font-medium text-base">Đang tải bản đồ tự nhiên / Loading map...</p>
          </div>
        </div>
      )}

      {/* Map Style Selector & Floating Controls Top Right */}
      <div className="absolute top-16 right-3 md:top-4 md:right-4 flex flex-col items-end gap-1.5 md:gap-2 z-10">
        <div className="flex bg-slate-900/90 backdrop-blur-md rounded-2xl p-1 border border-slate-700 shadow-xl overflow-x-auto no-scrollbar max-w-[calc(100vw-1.5rem)]">
          <button
            onClick={() => handleStyleChange('outdoors')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentStyle === 'outdoors' ? 'bg-emerald-600 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            🌿 Tự nhiên
          </button>
          <button
            onClick={() => handleStyleChange('satellite')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentStyle === 'satellite' ? 'bg-indigo-600 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            🛰️ Vệ tinh
          </button>
          <button
            onClick={() => handleStyleChange('streets')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentStyle === 'streets' ? 'bg-amber-600 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            🗺️ Đường phố
          </button>
        </div>

        {/* POI Markers Toggle Button */}
        <button
          onClick={() => setShowPoiMarkers(!showPoiMarkers)}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold shadow-lg backdrop-blur border transition-all flex items-center justify-center gap-1.5 ${
            showPoiMarkers
              ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold shadow-emerald-500/20'
              : 'bg-slate-900/90 text-slate-400 border-slate-700 hover:text-white'
          }`}
          title="Bật/Tắt hiển thị Quán ăn, Cà phê & Khách sạn trực tiếp trên bản đồ"
        >
          <span>{showPoiMarkers ? '👁️ POI Map: Hiện' : '🙈 POI Map: Ẩn'}</span>
        </button>

        <button
          onClick={handleResetView}
          className="self-end p-3 bg-slate-900/90 hover:bg-slate-800 backdrop-blur text-white rounded-xl shadow-lg border border-slate-700 transition-all flex items-center justify-center"
          title="Về toàn cảnh Việt Nam"
        >
          <span className="text-base">📍 Toàn cảnh</span>
        </button>
      </div>
    </div>
  );
}

export default React.memo(Map3DViewComponent);
