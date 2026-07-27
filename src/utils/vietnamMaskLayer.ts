import mapboxgl from 'mapbox-gl';
import { vietnamIslandsGeoJSON } from '@/data/vietnamGeoJSON';

/**
 * Adds official Geographic Map Text Labels for Hoang Sa & Truong Sa archipelagos
 * and configures ocean background layers.
 */
export function addVietnamTerritoryLayers(map: mapboxgl.Map) {
  if (!map) return;

  // Add GeoJSON Source for Island Labels
  if (!map.getSource('vietnam-islands-src')) {
    map.addSource('vietnam-islands-src', {
      type: 'geojson',
      data: vietnamIslandsGeoJSON
    });
  }

  // 1. Formal Geographic Map Text Labels Layer for Hoang Sa & Truong Sa
  if (!map.getLayer('vietnam-islands-labels')) {
    map.addLayer({
      id: 'vietnam-islands-labels',
      type: 'symbol',
      source: 'vietnam-islands-src',
      layout: {
        'text-field': ['get', 'nameVi'],
        'text-font': ['Roboto Bold', 'Open Sans Bold', 'Arial Unicode MS Bold'],
        'text-size': 13,
        'text-transform': 'uppercase',
        'text-letter-spacing': 0.08,
        'text-offset': [0, 0],
        'text-anchor': 'center',
        'text-allow-overlap': true,
        'text-ignore-placement': true
      },
      paint: {
        'text-color': '#fef08a', // Warm Gold Label Color
        'text-halo-color': '#0f172a',
        'text-halo-width': 2.5,
        'text-halo-blur': 1
      }
    });
  }
}
