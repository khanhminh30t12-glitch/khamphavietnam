'use client';

import React, { useState, useEffect } from 'react';
import { Landmark } from '@/types';
import { regions } from '@/data/vietnamTourismData';
import { getWeatherForRegion } from '@/utils/weather';
import { useLanguage } from '@/context/LanguageContext';

interface LandmarkDetailPanelProps {
  landmark: Landmark | null;
  isOpen: boolean;
  onClose: () => void;
  onCheckIn?: () => void;
  onNavigateToPlace?: (coords: { lng: number; lat: number }) => void;
  onStartDragonGuide?: (originName: string, destName: string, targetCoords: { lng: number; lat: number }, distKm: number) => void;
  onStartTour?: (tourId: string) => void;
}

type TabType = 'history' | 'weather' | 'route' | 'places';
type CategoryType = 'all' | 'cafe' | 'food' | 'hotel';
type PriceFilterType = 'all' | '$' | '$$' | '$$$';
type RadiusFilterType = 'all' | '3' | '10' | '20' | '30';

export default function LandmarkDetailPanel({
  landmark,
  isOpen,
  onClose,
  onCheckIn,
  onNavigateToPlace,
  onStartDragonGuide,
  onStartTour
}: LandmarkDetailPanelProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('history');
  const [categoryFilter, setCategoryFilter] = useState<CategoryType>('all');
  const [priceFilter, setPriceFilter] = useState<PriceFilterType>('all');
  const [radiusFilter, setRadiusFilter] = useState<RadiusFilterType>('all');
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveTab('history');
      setCategoryFilter('all');
      setPriceFilter('all');
      setRadiusFilter('all');
      setIsMobileExpanded(false);
    }
  }, [isOpen]);

  // Haversine formula: compute distance in km between two lat/lng points
  function calcDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  if (!isOpen || !landmark) return null;

  // Find region data & weather for the landmark
  const regionData = regions.find(r => r.id === landmark.region);
  const localWeather = getWeatherForRegion(landmark.region);

  // Filter cafes, restaurants, hotels
  const allCafes = regionData?.cafes || [];
  const allFoods = regionData?.restaurants || [];
  const allHotels = regionData?.hotels || [];

  let filteredPlaces: Array<{
    id: string;
    type: 'cafe' | 'food' | 'hotel';
    name: string;
    rating: number;
    priceRange: '$' | '$$' | '$$$';
    priceText: string;
    description: string;
    image: string;
    distanceKm: number;
    coordinates: { lng: number; lat: number };
  }> = [];

  if (regionData) {
    if (categoryFilter === 'all' || categoryFilter === 'cafe') {
      allCafes.forEach(c => {
        const dist = calcDistanceKm(
          landmark.coordinates.lat, landmark.coordinates.lng,
          c.coordinates.lat, c.coordinates.lng
        );
        filteredPlaces.push({
          id: c.id,
          type: 'cafe',
          name: c.name,
          rating: c.rating,
          priceRange: c.priceRange,
          priceText: c.priceText,
          description: t(c.description),
          image: c.image,
          distanceKm: dist,
          coordinates: c.coordinates,
        });
      });
    }

    if (categoryFilter === 'all' || categoryFilter === 'food') {
      allFoods.forEach(f => {
        const dist = calcDistanceKm(
          landmark.coordinates.lat, landmark.coordinates.lng,
          f.coordinates.lat, f.coordinates.lng
        );
        filteredPlaces.push({
          id: f.id,
          type: 'food',
          name: f.name,
          rating: f.rating,
          priceRange: f.priceRange,
          priceText: f.priceText,
          description: t(f.description),
          image: f.image,
          distanceKm: dist,
          coordinates: f.coordinates,
        });
      });
    }

    if (categoryFilter === 'all' || categoryFilter === 'hotel') {
      allHotels.forEach(h => {
        const dist = calcDistanceKm(
          landmark.coordinates.lat, landmark.coordinates.lng,
          h.coordinates.lat, h.coordinates.lng
        );
        filteredPlaces.push({
          id: h.id,
          type: 'hotel',
          name: h.name,
          rating: h.rating,
          priceRange: h.priceRange,
          priceText: h.priceText,
          description: t(h.description),
          image: h.image,
          distanceKm: dist,
          coordinates: h.coordinates,
        });
      });
    }

    if (priceFilter !== 'all') {
      filteredPlaces = filteredPlaces.filter(p => p.priceRange === priceFilter);
    }

    if (radiusFilter !== 'all') {
      const maxKm = Number(radiusFilter);
      filteredPlaces = filteredPlaces.filter(p => p.distanceKm <= maxKm);
    }

    filteredPlaces.sort((a, b) => a.distanceKm - b.distanceKm);
  }

  const handleDragEnd = () => {
    setIsMobileExpanded(!isMobileExpanded);
  };

  const panelClasses = "fixed z-50 bg-slate-900/95 backdrop-blur-2xl text-white shadow-2xl transition-all duration-300 ease-in-out flex flex-col " +
    "md:top-0 md:right-0 md:h-screen md:w-[440px] md:translate-x-0 " +
    `bottom-0 left-0 right-0 rounded-t-3xl md:rounded-none ${isMobileExpanded ? 'h-[80vh]' : 'h-[55vh]'} border-t border-amber-400/30`;

  const radiusOptions: { value: RadiusFilterType; label: string }[] = [
    { value: 'all', label: 'Tất cả' },
    { value: '3', label: '≤ 3KM' },
    { value: '10', label: '≤ 10KM' },
    { value: '20', label: '≤ 20KM' },
    { value: '30', label: '≤ 30KM' },
  ];

  return (
    <>
      {/* Backdrop (Mobile only) */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
        onClick={onClose}
      />

      <div className={panelClasses}>
        {/* Mobile Drag Handle */}
        <div 
          className="w-full h-8 flex items-center justify-center md:hidden cursor-pointer shrink-0"
          onClick={handleDragEnd}
        >
          <div className="w-12 h-1.5 bg-slate-700 rounded-full" />
        </div>

        {/* Header Image Banner */}
        <div className="relative w-full h-[180px] md:h-[210px] shrink-0 bg-slate-800 overflow-hidden">
          {landmark.image ? (
            <img 
              key={landmark.id} 
              src={landmark.image} 
              alt={t(landmark.name)} 
              className="w-full h-full object-cover filter brightness-95" 
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/60 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors backdrop-blur border border-white/20 cursor-pointer z-10"
          >
            ✕
          </button>
          
          <div className="absolute bottom-3 left-4 right-4">
            <span className="inline-block px-2.5 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-black rounded mb-1 uppercase tracking-wider">
              📍 Vùng {landmark.region}
            </span>
            <h2 className="text-xl md:text-2xl font-black text-white drop-shadow-md leading-tight">{t(landmark.name)}</h2>
          </div>
        </div>

        {/* 4 MAIN TABS NAVIGATION */}
        <div className="flex border-b border-slate-800 bg-slate-950 shrink-0 text-center">
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2.5 text-xs font-black transition-all ${activeTab === 'history' ? 'border-b-2 border-amber-400 text-amber-400 bg-slate-900' : 'text-slate-400 hover:text-white'}`}
          >
            📜 Lịch Sử
          </button>
          <button
            onClick={() => setActiveTab('weather')}
            className={`flex-1 py-2.5 text-xs font-black transition-all ${activeTab === 'weather' ? 'border-b-2 border-amber-400 text-amber-400 bg-slate-900' : 'text-slate-400 hover:text-white'}`}
          >
            🌤️ Thời Tiết
          </button>
          <button
            onClick={() => setActiveTab('route')}
            className={`flex-1 py-2.5 text-xs font-black transition-all ${activeTab === 'route' ? 'border-b-2 border-amber-400 text-amber-400 bg-slate-900' : 'text-slate-400 hover:text-white'}`}
          >
            🗺️ Lộ Trình
          </button>
          <button
            onClick={() => setActiveTab('places')}
            className={`flex-1 py-2.5 text-xs font-black transition-all ${activeTab === 'places' ? 'border-b-2 border-amber-400 text-amber-400 bg-slate-900' : 'text-slate-400 hover:text-white'}`}
          >
            🍜 Quán & Khách Sạn
          </button>
        </div>

        {/* CONTENT BODY */}
        <div className="flex-1 overflow-y-auto touch-scroll p-4 md:p-5 space-y-4 leading-relaxed text-xs md:text-sm text-slate-300">
          {/* TAB 1: HISTORY & ARCHITECTURE */}
          {activeTab === 'history' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
                <h3 className="text-sm font-bold text-amber-400 mb-2">📜 Di tích & Lịch sử hình thành</h3>
                <p>{t(landmark.history)}</p>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
                <h3 className="text-sm font-bold text-emerald-400 mb-2">🏰 Đặc điểm Kiến trúc</h3>
                <p>{t(landmark.architecture)}</p>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
                <h3 className="text-sm font-bold text-cyan-400 mb-2">🍜 Ẩm thực đặc sản địa phương</h3>
                <p>{t(landmark.cuisine)}</p>
              </div>
            </div>
          )}

          {/* TAB 2: LOCAL REAL-TIME WEATHER */}
          {activeTab === 'weather' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/40 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">Thời tiết hiện tại</div>
                  <div className="text-3xl font-black text-white mt-1 flex items-center gap-2">
                    <span>{localWeather.condition.icon}</span>
                    <span>{localWeather.tempC}°C</span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium mt-0.5">
                    {localWeather.condition.vi}
                  </div>
                </div>

                <div className="text-right text-xs text-slate-300 space-y-1">
                  <div>💧 Độ ẩm: <strong className="text-amber-400">{localWeather.humidity}%</strong></div>
                  <div>💨 Sức gió: <strong className="text-amber-400">{localWeather.windKm} km/h</strong></div>
                  <div>☀️ Chỉ số UV: <strong className="text-emerald-400">Thấp (2/10)</strong></div>
                </div>
              </div>

              <div className="p-4 bg-slate-800/80 border border-slate-700/80 rounded-2xl space-y-2">
                <h4 className="font-bold text-amber-400 text-xs flex items-center gap-1.5">
                  <span>🐲</span> Lời khuyên Trợ Lý Rồng AI:
                </h4>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "Thời tiết tại {t(landmark.name)} hôm nay rất đẹp và thuận lợi cho các hoạt động chụp ảnh Check-in ngoài trời. Hãy mang theo ô che nắng nhẹ và máy ảnh để lưu giữ khoảnh khắc tuyệt vời nhé!"
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: ROUTE & TOUR ITINERARY */}
          {activeTab === 'route' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 bg-slate-800/80 border border-slate-700/80 rounded-2xl">
                <h4 className="font-bold text-amber-400 text-sm mb-1">🗺️ Lộ Trình Tham Quan Điển Hình</h4>
                <p className="text-xs text-slate-400 mb-3">
                  Tuyến đường đề xuất di chuyển thuận tiện ghé thăm {t(landmark.name)} và các điểm lân cận.
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-[10px]">1</span>
                    <span className="font-bold text-white">Xuất phát từ Trung tâm Thành phố</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-[10px]">2</span>
                    <span className="font-bold text-amber-300">Tham quan di tích {t(landmark.name)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-[10px]">3</span>
                    <span className="font-bold text-white">Thưởng thức ẩm thực quán ăn đặc sản lân cận</span>
                  </div>
                </div>

                {onStartTour && (
                  <button
                    onClick={() => {
                      onClose();
                      onStartTour('tour-hanoi-heritage');
                    }}
                    className="w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-xl shadow-lg transition-all text-xs flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                  >
                    <span>🚀 Kích Hoạt Tour Lộ Trình Này</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: SURROUNDING PLACES & HOTELS WITH RADIUS FILTER */}
          {activeTab === 'places' && (
            <div className="space-y-4 animate-fade-in">
              {/* Sub-Category Filters */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800 overflow-x-auto no-scrollbar touch-scroll">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 cursor-pointer ${categoryFilter === 'all' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setCategoryFilter('cafe')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 cursor-pointer ${categoryFilter === 'cafe' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  ☕ Cà phê
                </button>
                <button
                  onClick={() => setCategoryFilter('food')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 cursor-pointer ${categoryFilter === 'food' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  🍜 Quán ăn
                </button>
                <button
                  onClick={() => setCategoryFilter('hotel')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 cursor-pointer ${categoryFilter === 'hotel' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  🏨 Khách sạn
                </button>
              </div>

              {/* Distance Radius Filters */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-2xl border border-amber-400/40 overflow-x-auto no-scrollbar touch-scroll">
                <span className="text-[11px] font-bold text-amber-400 px-2 shrink-0">📍 Bán kính:</span>
                {radiusOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setRadiusFilter(opt.value)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 cursor-pointer ${
                      radiusFilter === opt.value
                        ? 'bg-amber-400 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Places Cards List */}
              <div className="space-y-3 pt-2">
                {filteredPlaces.length === 0 ? (
                  <p className="text-center text-slate-500 py-6 text-xs">Không tìm thấy địa điểm phù hợp bán kính đã chọn</p>
                ) : (
                  filteredPlaces.map((place) => (
                    <div
                      key={place.id}
                      className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/80 hover:border-amber-500/50 transition-all flex gap-3 overflow-hidden"
                    >
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-20 h-20 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="font-bold text-white text-xs truncate">{place.name}</span>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="text-emerald-400 text-[10px] font-bold">📍 cách {place.distanceKm.toFixed(1)} km</span>
                              <span className="text-amber-400 text-xs font-bold">⭐ {place.rating}</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-2">{place.description}</p>
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            place.priceRange === '$' ? 'bg-emerald-500/20 text-emerald-300' :
                            place.priceRange === '$$' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-purple-500/20 text-purple-300'
                          }`}>
                            {place.priceRange === '$' ? '💵 Bình dân $' : place.priceRange === '$$' ? '💳 Tầm trung $$' : '👑 Cao cấp $$$'}
                          </span>
                          <span className="text-[10px] text-slate-300 font-semibold">{place.priceText}</span>
                        </div>
                        {/* Native Maps Direct Navigation Button */}
                        <button
                          onClick={() => {
                            onClose();
                            import('@/utils/navigation').then(({ openExternalMapDirections }) => {
                              openExternalMapDirections(
                                place.coordinates.lat,
                                place.coordinates.lng,
                                landmark.coordinates.lat,
                                landmark.coordinates.lng
                              );
                            });
                          }}
                          className="mt-1.5 w-full py-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:brightness-110 text-slate-950 text-[11px] font-black rounded-lg transition-all flex items-center justify-center gap-1 shadow-md active:scale-95 cursor-pointer"
                        >
                          🚗 Chỉ Đường Google / Apple Maps
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER ACTIONS */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0">
          <div className="flex flex-col gap-2">
            <button 
              onClick={onCheckIn} 
              className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs md:text-sm active:scale-95 cursor-pointer"
            >
              📸 <span>Check-in nhận điểm thưởng (+{landmark.checkInReward || 100} Points)</span>
            </button>

            {/* EXTERNAL NATIVE MAPS DIRECT NAVIGATION BUTTON */}
            <button 
              onClick={() => {
                onClose();
                import('@/utils/navigation').then(({ openExternalMapDirections }) => {
                  openExternalMapDirections(landmark.coordinates.lat, landmark.coordinates.lng);
                });
              }} 
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 border border-cyan-400/50 text-cyan-400 font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs active:scale-95 cursor-pointer"
            >
              🗺️ <span>Mở Google Maps / Apple Maps Dẫn Đường</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
