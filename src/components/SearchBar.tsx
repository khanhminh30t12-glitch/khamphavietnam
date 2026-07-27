'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Landmark, TourRoute, Coordinates } from '@/types';
import { regions, tourRoutes } from '@/data/vietnamTourismData';
import { useLanguage } from '@/context/LanguageContext';

export function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

// Haversine formula
function calcDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export type SearchCategoryTab = 'all' | 'landmark' | 'tour' | 'food_cafe' | 'hotel';

export interface SearchResultItem {
  id: string;
  category: 'landmark' | 'tour' | 'food' | 'cafe' | 'hotel';
  title: string;
  description: string;
  region: string;
  regionName: string;
  image?: string;
  priceRange?: '$' | '$$' | '$$$';
  coordinates?: Coordinates;
  distanceKm?: number;
  landmarkObj?: Landmark;
  tourObj?: TourRoute;
}

interface SearchBarProps {
  onSelectLandmark: (landmark: Landmark) => void;
  onSelectPOI: (name: string, coords: Coordinates, landmarkRef: Landmark) => void;
  onSelectTour: (tour: TourRoute) => void;
  currentLandmark: Landmark | null;
}

export default function SearchBar({
  onSelectLandmark,
  onSelectPOI,
  onSelectTour,
  currentLandmark
}: SearchBarProps) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SearchCategoryTab>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Index all search items once
  const allSearchableItems: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];

    // 1. Landmarks
    regions.forEach((region) => {
      region.landmarks.forEach((lm) => {
        let dist: number | undefined;
        if (currentLandmark) {
          dist = calcDistanceKm(
            currentLandmark.coordinates.lat,
            currentLandmark.coordinates.lng,
            lm.coordinates.lat,
            lm.coordinates.lng
          );
        }
        items.push({
          id: lm.id,
          category: 'landmark',
          title: t(lm.name),
          description: t(lm.history).substring(0, 100) + '...',
          region: lm.region,
          regionName: region.name.vi,
          image: lm.image,
          coordinates: lm.coordinates,
          distanceKm: dist,
          landmarkObj: lm
        });
      });

      // 2. Cafes
      region.cafes.forEach((cafe) => {
        let dist: number | undefined;
        if (currentLandmark) {
          dist = calcDistanceKm(
            currentLandmark.coordinates.lat,
            currentLandmark.coordinates.lng,
            cafe.coordinates.lat,
            cafe.coordinates.lng
          );
        }
        // find nearest landmark as parent reference
        const parentLandmark = region.landmarks[0];
        items.push({
          id: cafe.id,
          category: 'cafe',
          title: cafe.name,
          description: t(cafe.description),
          region: cafe.region,
          regionName: region.name.vi,
          image: cafe.image,
          priceRange: cafe.priceRange,
          coordinates: cafe.coordinates,
          distanceKm: dist,
          landmarkObj: parentLandmark
        });
      });

      // 3. Restaurants (Food)
      region.restaurants.forEach((food) => {
        let dist: number | undefined;
        if (currentLandmark) {
          dist = calcDistanceKm(
            currentLandmark.coordinates.lat,
            currentLandmark.coordinates.lng,
            food.coordinates.lat,
            food.coordinates.lng
          );
        }
        const parentLandmark = region.landmarks[0];
        items.push({
          id: food.id,
          category: 'food',
          title: food.name,
          description: `${t(food.specialty)} - ${t(food.description)}`,
          region: food.region,
          regionName: region.name.vi,
          image: food.image,
          priceRange: food.priceRange,
          coordinates: food.coordinates,
          distanceKm: dist,
          landmarkObj: parentLandmark
        });
      });

      // 4. Hotels
      region.hotels.forEach((hotel) => {
        let dist: number | undefined;
        if (currentLandmark) {
          dist = calcDistanceKm(
            currentLandmark.coordinates.lat,
            currentLandmark.coordinates.lng,
            hotel.coordinates.lat,
            hotel.coordinates.lng
          );
        }
        const parentLandmark = region.landmarks[0];
        items.push({
          id: hotel.id,
          category: 'hotel',
          title: hotel.name,
          description: t(hotel.description),
          region: hotel.region,
          regionName: region.name.vi,
          image: hotel.image,
          priceRange: hotel.priceRange,
          coordinates: hotel.coordinates,
          distanceKm: dist,
          landmarkObj: parentLandmark
        });
      });
    });

    // 5. Tour Routes
    tourRoutes.forEach((tour) => {
      items.push({
        id: tour.id,
        category: 'tour',
        title: `${tour.emoji} ${t(tour.name)}`,
        description: `${t(tour.description)} (${tour.totalDays} ngày - ${tour.stops.length} điểm dừng)`,
        region: 'all',
        regionName: 'Xuyên Việt',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
        tourObj: tour
      });
    });

    return items;
  }, [currentLandmark, t]);

  // Filter items live
  const searchResults = useMemo(() => {
    const rawQuery = removeVietnameseTones(query.trim());
    if (!rawQuery) {
      return [];
    }

    return allSearchableItems.filter((item) => {
      // Check category tab
      if (activeCategory === 'landmark' && item.category !== 'landmark') return false;
      if (activeCategory === 'tour' && item.category !== 'tour') return false;
      if (activeCategory === 'food_cafe' && item.category !== 'food' && item.category !== 'cafe') return false;
      if (activeCategory === 'hotel' && item.category !== 'hotel') return false;

      // Check text match
      const titleMatch = removeVietnameseTones(item.title).includes(rawQuery);
      const descMatch = removeVietnameseTones(item.description).includes(rawQuery);
      const regionMatch = removeVietnameseTones(item.regionName).includes(rawQuery);

      return titleMatch || descMatch || regionMatch;
    });
  }, [query, activeCategory, allSearchableItems]);

  const handleSelectItem = (item: SearchResultItem) => {
    setIsOpen(false);
    setQuery('');

    if (item.category === 'landmark' && item.landmarkObj) {
      onSelectLandmark(item.landmarkObj);
    } else if (item.category === 'tour' && item.tourObj) {
      onSelectTour(item.tourObj);
    } else if ((item.category === 'cafe' || item.category === 'food' || item.category === 'hotel') && item.coordinates && item.landmarkObj) {
      onSelectPOI(item.title, item.coordinates, item.landmarkObj);
    }
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'landmark':
        return <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">🏛️ Địa Danh</span>;
      case 'tour':
        return <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">📜 Tour Du Lịch</span>;
      case 'food':
        return <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 text-[10px] font-bold border border-orange-500/30">🍜 Quán Ăn</span>;
      case 'cafe':
        return <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">☕ Cà Phê</span>;
      case 'hotel':
        return <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30">🏨 Khách Sạn</span>;
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-lg mx-auto z-40">
      {/* Input Box Container */}
      <div className="relative flex items-center bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl transition-all duration-200 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/30">
        <span className="pl-3.5 text-slate-400 text-base pointer-events-none">🔍</span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Tìm địa danh, quán ăn, khách sạn, tour du lịch... (Ctrl + K)"
          className="w-full py-2.5 pl-2.5 pr-16 bg-transparent text-white text-xs md:text-sm placeholder-slate-400 outline-none"
        />
        {query ? (
          <button
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 text-xs transition-colors"
            title="Xóa tìm kiếm"
          >
            ❌
          </button>
        ) : (
          <span className="absolute right-3 hidden md:inline-block px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-400 font-mono">
            Ctrl+K
          </span>
        )}
      </div>

      {/* Live Auto-complete Dropdown Results */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-2xl border border-slate-700/90 rounded-3xl shadow-2xl overflow-hidden max-h-[75vh] md:max-h-[60vh] flex flex-col animate-fade-in z-50">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-2 bg-slate-950/90 border-b border-slate-800 overflow-x-auto no-scrollbar touch-scroll shrink-0">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 ${
                activeCategory === 'all' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tất cả ({searchResults.length})
            </button>
            <button
              onClick={() => setActiveCategory('landmark')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 ${
                activeCategory === 'landmark' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              🏛️ Địa Danh
            </button>
            <button
              onClick={() => setActiveCategory('tour')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 ${
                activeCategory === 'tour' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              📜 Tour Du Lịch
            </button>
            <button
              onClick={() => setActiveCategory('food_cafe')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 ${
                activeCategory === 'food_cafe' ? 'bg-orange-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              🍜 Ẩm Thực / Cafe
            </button>
            <button
              onClick={() => setActiveCategory('hotel')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 ${
                activeCategory === 'hotel' ? 'bg-purple-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              🏨 Khách Sạn
            </button>
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto touch-scroll p-2 space-y-1.5 no-scrollbar">
            {searchResults.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs">
                <span className="text-2xl block mb-2">🔍</span>
                Không tìm thấy kết quả phù hợp cho &quot;{query}&quot;. Thử từ khóa khác xem sao nhé!
              </div>
            ) : (
              searchResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className="p-2.5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-amber-400/50 transition-all cursor-pointer flex items-center gap-3 group active:scale-[0.99]"
                >
                  {/* Thumbnail Image */}
                  {item.image ? (
                    <img
                      key={item.id}
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-700 group-hover:border-amber-400/80 transition-colors"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-xl shrink-0">
                      📍
                    </div>
                  )}

                  {/* Info Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap mb-1">
                      {getCategoryBadge(item.category)}
                      <span className="text-[10px] text-slate-400 font-medium">📍 {item.regionName}</span>
                      {item.distanceKm !== undefined && (
                        <span className="text-[10px] text-emerald-400 font-bold">
                          • cách {item.distanceKm.toFixed(1)} km
                        </span>
                      )}
                      {item.priceRange && (
                        <span className="text-[10px] text-amber-300 font-bold">
                          • {item.priceRange}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs md:text-sm font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  </div>

                  <span className="text-slate-500 group-hover:text-amber-400 transition-colors text-sm pr-1">
                    ➔
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
