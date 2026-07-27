'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Map3DView from '@/components/Map3DView';
import LandmarkDetailPanel from '@/components/LandmarkDetailPanel';
import NavigationPanel from '@/components/NavigationPanel';
import DesktopSidebar from '@/components/layout/DesktopSidebar';
import MobileNav from '@/components/layout/MobileNav';
import PresetTourSelector from '@/components/layout/PresetTourSelector';
import TourProgressBar from '@/components/layout/TourProgressBar';
import SearchBar from '@/components/SearchBar';
import LoginSplashScreen from '@/components/LoginSplashScreen';
import WeatherWidget from '@/components/WeatherWidget';
import { RouteStep } from '@/utils/routing';
import { regions, tourRoutes } from '@/data/vietnamTourismData';
import { useTourManager } from '@/hooks/useTourManager';
import { useGame } from '@/context/GameContext';
import { useLanguage } from '@/context/LanguageContext';
import { Landmark, Coordinates } from '@/types';

// Dynamic imports (code-splitting) for heavy modals
const Preview3DModal = dynamic(() => import('@/components/Preview3DModal'), { ssr: false });
const CameraCheckInModal = dynamic(() => import('@/components/CameraCheckInModal'), { ssr: false });
const CustomTourBuilder = dynamic(() => import('@/components/CustomTourBuilder'), { ssr: false });
const BadgeCollection = dynamic(() => import('@/components/BadgeCollection'), { ssr: false });
const SettingsModal = dynamic(() => import('@/components/SettingsModal'), { ssr: false });
const UserProfileModal = dynamic(() => import('@/components/UserProfileModal'), { ssr: false });
const LuckyWheel = dynamic(() => import('@/components/LuckyWheel'), { ssr: false });
const PuzzleGame = dynamic(() => import('@/components/PuzzleGame'), { ssr: false });
const TravelNotesPanel = dynamic(() => import('@/components/TravelNotesPanel'), { ssr: false });
const RewardStore = dynamic(() => import('@/components/RewardStore'), { ssr: false });

import WeatherEffects, { WeatherMode } from '@/components/WeatherEffects';
import PoiFilterToolbar, { PoiCategoryFilter, RadiusFilter } from '@/components/PoiFilterToolbar';

const AIChatbotModal = dynamic(() => import('@/components/AIChatbotModal'), { ssr: false });
const StarMascot = dynamic(() => import('@/components/StarMascot'), { ssr: false });

export default function Home() {
  const router = useRouter();
  const { progress, checkIn, revealArea } = useGame();
  const { t, tr, language } = useLanguage();
  const tourManager = useTourManager();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [weatherMode, setWeatherMode] = useState<WeatherMode>('sunny');
  const [poiCategory, setPoiCategory] = useState<PoiCategoryFilter>('all');
  const [activeRadius, setActiveRadius] = useState<RadiusFilter>(0);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showUserProfileModal, setShowUserProfileModal] = useState(false);
  const [showLuckyWheel, setShowLuckyWheel] = useState(false);
  const [showPuzzleGame, setShowPuzzleGame] = useState(false);
  const [showAIChatbot, setShowAIChatbot] = useState(false);
  const [performanceMode, setPerformanceMode] = useState<'high' | 'eco'>('high');
  const [showPet, setShowPet] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const logged = sessionStorage.getItem('is_logged_in');
      if (logged === 'true') {
        setIsLoggedIn(true);
        const completed = localStorage.getItem('hasCompletedTutorial');
        if (completed !== 'true') {
          setShowOnboarding(true);
        }
      }
    }
  }, []);

  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [showLandmarkPanel, setShowLandmarkPanel] = useState(false);
  const [showPreview3D, setShowPreview3D] = useState(false);
  const [showNavigationPanel, setShowNavigationPanel] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showTourBuilder, setShowTourBuilder] = useState(false);
  const [showPresetTours, setShowPresetTours] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [showTravelNotes, setShowTravelNotes] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [navigateToCoords, setNavigateToCoords] = useState<Coordinates | null>(null);

  const allLandmarks = useMemo(() => {
    return regions.flatMap(region => region.landmarks);
  }, []);

  const activeTourStops = useMemo((): Landmark[] => {
    if (!tourManager.activeTour) return [];
    return tourManager.activeTour.stops
      .map(stop => allLandmarks.find(l => l.id === stop.landmarkId))
      .filter((l): l is Landmark => l !== undefined);
  }, [tourManager.activeTour, allLandmarks]);

  const routeWaypoints = useMemo((): Coordinates[] => {
    return activeTourStops.map(s => s.coordinates);
  }, [activeTourStops]);

  const handleLandmarkSelect = (landmark: Landmark) => {
    setSelectedLandmark(landmark);
    setShowPreview3D(true);
    setShowLandmarkPanel(true);
  };

  const handleModeChange = (mode: string) => {
    if (mode === 'preset') {
      setShowPresetTours(true);
    } else if (mode === 'custom') {
      setShowTourBuilder(true);
    } else {
      tourManager.setMode('free_roam');
      setShowNavigationPanel(false);
    }
  };

  const handleSelectTour = (tourId: string) => {
    setShowPresetTours(false);
    tourManager.startPresetTour(tourId);
    setShowNavigationPanel(true);

    const tour = tourRoutes.find(t => t.id === tourId);
    if (tour) {
      const tourLandmarks = tour.stops
        .map(stop => allLandmarks.find(l => l.id === stop.landmarkId))
        .filter((l): l is Landmark => Boolean(l));

      if (tourLandmarks.length > 0) {
        setSelectedLandmark(tourLandmarks[0]);
      }
    }
  };

  const handleSearchSelectLandmark = (landmark: Landmark) => {
    handleLandmarkSelect(landmark);
  };

  const handleSearchSelectPOI = async (name: string, coords: Coordinates, landmarkRef: Landmark) => {
    setSelectedLandmark(landmarkRef);
    setShowLandmarkPanel(true);
    setNavigateToCoords(coords);
  };

  const handleSearchSelectTour = (tour: import('@/types').TourRoute) => {
    tourManager.startTour(tour);
    setShowNavigationPanel(true);

    const tourLandmarks = tour.stops
      .map(stop => allLandmarks.find(l => l.id === stop.landmarkId))
      .filter((l): l is Landmark => Boolean(l));

    if (tourLandmarks.length > 0) {
      setSelectedLandmark(tourLandmarks[0]);
    }
  };

  const handleCheckInComplete = (photoUrl: string) => {
    if (selectedLandmark) {
      checkIn(selectedLandmark.id, photoUrl, selectedLandmark.checkInReward);
      revealArea(selectedLandmark.id);
    }
    setShowCamera(false);
  };

  const handleTourCreated = (customLandmarks: Landmark[]) => {
    setShowTourBuilder(false);
    if (!customLandmarks || customLandmarks.length === 0) return;

    const customRoute: import('@/types').TourRoute = {
      id: 'custom_tour_' + Date.now(),
      name: {
        vi: `Lộ Trình Tự Thiết Kế (${customLandmarks.length} Điểm)`,
        en: `Custom Itinerary (${customLandmarks.length} Spots)`
      },
      description: {
        vi: 'Lộ trình tối ưu do Rồng AI lập theo các điểm bạn chọn.',
        en: 'Optimized itinerary created by Dragon AI based on your selection.'
      },
      emoji: '🗺️',
      stops: customLandmarks.map((l, idx) => ({
        landmarkId: l.id,
        day: Math.floor(idx / 2) + 1,
        duration: '2-3h',
        transport: { vi: 'Xe máy / Ô tô', en: 'Motorbike / Car' }
      })),
      totalDays: Math.ceil(customLandmarks.length / 2),
      rewards: {
        exp: 100,
        points: 200,
        badge: 'badge_custom_explorer'
      }
    };

    tourManager.startTour(customRoute);
    setShowNavigationPanel(true);

    if (customLandmarks.length > 0) {
      setSelectedLandmark(customLandmarks[0]);
      setNavigateToCoords(customLandmarks[0].coordinates);
    }
  };

  const handleNavigate = (path: string) => {
    if (path === '/collection') {
      setShowBadges(true);
    } else if (path === '/rewards') {
      setShowRewards(true);
    } else {
      router.push(path);
    }
  };

  const currentTourStop = tourManager.activeTour
    ? allLandmarks.find(l => l.id === tourManager.activeTour?.stops[tourManager.currentStopIndex]?.landmarkId)
    : null;

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    const completed = localStorage.getItem('hasCompletedTutorial');
    if (completed !== 'true') {
      setShowOnboarding(true);
    }
  };

  if (!isLoggedIn) {
    return <LoginSplashScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <main className="relative w-full h-screen overflow-hidden bg-slate-900">

      {/* 3D Dynamic Weather Effects Canvas (Rain, Sunbeams, Clouds, Snow) */}
      <WeatherEffects mode={weatherMode} />

      {/* Desktop Sidebar */}
      <DesktopSidebar
        currentMode={tourManager.mode}
        onModeChange={handleModeChange}
        onCheckInClick={() => setShowCamera(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <div className="md:ml-64 relative w-full h-full md:w-[calc(100%-16rem)]">
        {/* Floating Global Search Bar */}
        <div className="absolute top-3 left-28 right-3 md:top-4 md:left-4 md:right-[18rem] z-40 pointer-events-auto">
          <SearchBar
            onSelectLandmark={handleSearchSelectLandmark}
            onSelectPOI={handleSearchSelectPOI}
            onSelectTour={handleSearchSelectTour}
            currentLandmark={selectedLandmark}
          />
        </div>

        {/* TOP RIGHT MANAGEMENT ACTION ICONS: [👤 Hồ Sơ Du Khách] & [⚙️ Cài Đặt Hệ Thống] */}
        <div className="fixed top-3 right-3 md:top-4 md:right-4 z-50 flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setShowUserProfileModal(true)}
            className="w-10 h-10 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-amber-400/50 backdrop-blur-xl shadow-xl text-amber-300 flex items-center justify-center text-lg active:scale-95 transition-all cursor-pointer"
            title="Hồ Sơ Du Khách & Tích Điểm Đổi Quà"
          >
            👤
          </button>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="w-10 h-10 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-amber-400/50 backdrop-blur-xl shadow-xl text-amber-300 flex items-center justify-center text-lg active:scale-95 transition-all cursor-pointer"
            title="Cài Đặt Hệ Thống & Trợ Lý Rồng AI"
          >
            ⚙️
          </button>
        </div>

        {/* 3D Map */}
        <Map3DView
          onLandmarkSelect={handleLandmarkSelect}
          selectedLandmark={selectedLandmark}
          routeWaypoints={routeWaypoints}
          navigateToCoords={navigateToCoords}
          activeTour={tourManager.activeTour}
          activePoiCategory={poiCategory}
          activeRadius={activeRadius}
        />

        {/* SMART SHIMMERING STAR MASCOT */}
        <StarMascot
          selectedLandmark={selectedLandmark}
          onOpenAiChat={() => setShowAIChatbot(true)}
        />

        {/* FLOATING ACTION BUTTON (FAB) FOR AI TRAVEL CHATBOT AT BOTTOM RIGHT */}
        <button
          onClick={() => setShowAIChatbot(true)}
          className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 border-2 border-amber-300/60 shadow-2xl px-4 py-2.5 rounded-full flex items-center gap-2 backdrop-blur-xl transition-all hover:scale-105 active:scale-95 font-black text-xs md:text-sm cursor-pointer pointer-events-auto"
          title="Mở Trợ Lý AI Du Lịch 24/7"
        >
          <span className="text-lg md:text-xl animate-bounce">🤖</span>
          <span>Trợ Lý AI</span>
        </button>

        {/* Floating Route Guidance Button (When active tour exists) */}
        {tourManager.activeTour && !showNavigationPanel && (
          <div className="absolute top-4 left-4 z-10">
            <button
              onClick={() => setShowNavigationPanel(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-black rounded-2xl text-xs md:text-sm shadow-2xl backdrop-blur flex items-center gap-2 border border-emerald-400/50 transition-all animate-bounce"
            >
              <span>🧭</span>
              <span>Xem Hướng Dẫn Di Chuyển</span>
            </button>
          </div>
        )}

        {/* Tour Progress Bar */}
        {tourManager.activeTour && (
          <TourProgressBar
            tourName={t(tourManager.activeTour.name)}
            currentStopIndex={tourManager.currentStopIndex}
            totalStops={tourManager.activeTour.stops.length}
            currentLandmarkName={currentTourStop ? t(currentTourStop.name) : ''}
            onNext={() => {
              const lm = tourManager.nextStop();
              if (lm) handleLandmarkSelect(lm);
            }}
            onPrev={() => {
              const lm = tourManager.prevStop();
              if (lm) handleLandmarkSelect(lm);
            }}
            onExit={() => {
              tourManager.setMode('free_roam');
              setShowNavigationPanel(false);
            }}
          />
        )}

        {/* Navigation Steps Panel */}
        {showNavigationPanel && activeTourStops.length >= 2 && (
          <NavigationPanel
            stops={activeTourStops}
            isOpen={showNavigationPanel}
            onClose={() => setShowNavigationPanel(false)}
          />
        )}

        {/* Landmark Detail Panel */}
        {showLandmarkPanel && selectedLandmark && (
          <LandmarkDetailPanel
            key={selectedLandmark.id}
            landmark={selectedLandmark}
            isOpen={showLandmarkPanel}
            onClose={() => {
              setShowLandmarkPanel(false);
              setSelectedLandmark(null);
              setNavigateToCoords(null);
            }}
            onCheckIn={() => setShowCamera(true)}
            onNavigateToPlace={(coords) => setNavigateToCoords(coords)}
            onStartTour={handleSelectTour}
          />
        )}
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        onCheckInClick={() => setShowCamera(true)}
        onTourClick={() => setShowPresetTours(true)}
        onRewardsClick={() => setShowRewards(true)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {/* ===== MODALS ===== */}

      {/* 3D Preview / Panorama Modal */}
      {showPreview3D && selectedLandmark && (
        <Preview3DModal
          key={selectedLandmark.id}
          landmark={selectedLandmark}
          isOpen={showPreview3D}
          onClose={() => setShowPreview3D(false)}
          onCheckIn={() => setShowCamera(true)}
        />
      )}

      {/* Preset Tour Selector */}
      <PresetTourSelector
        isOpen={showPresetTours}
        onClose={() => setShowPresetTours(false)}
        onSelectTour={handleSelectTour}
      />

      {/* Custom Tour Builder */}
      {showTourBuilder && (
        <CustomTourBuilder
          isOpen={showTourBuilder}
          onClose={() => setShowTourBuilder(false)}
          onTourCreated={handleTourCreated}
        />
      )}

      {/* Camera Check-in */}
      {showCamera && selectedLandmark && (
        <CameraCheckInModal
          isOpen={showCamera}
          onClose={() => setShowCamera(false)}
          landmark={selectedLandmark}
          onCheckInComplete={handleCheckInComplete}
        />
      )}

      {/* Badge Collection Modal */}
      {showBadges && (
        <div className="fixed inset-0 z-50 bg-slate-900/95 overflow-y-auto p-4 md:p-8 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">🏆 Bộ Sưu Tập Huy Hiệu</h2>
              <button
                onClick={() => setShowBadges(false)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            </div>
            <BadgeCollection />
          </div>
        </div>
      )}

      {/* Reward Store Modal */}
      {showRewards && (
        <div className="fixed inset-0 z-50 bg-slate-900/95 overflow-y-auto p-4 md:p-8 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">🎁 Cửa Hàng Đổi Quà</h2>
              <button
                onClick={() => setShowRewards(false)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            </div>
            <RewardStore />
          </div>
        </div>
      )}

      {/* SYSTEM SETTINGS MODAL (⚙️) */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        activeWeatherMode={weatherMode}
        onWeatherModeChange={setWeatherMode}
        showPet={showPet}
        onTogglePet={() => setShowPet(!showPet)}
        performanceMode={performanceMode}
        onTogglePerformanceMode={setPerformanceMode}
      />

      {/* USER PROFILE MODAL (👤) */}
      <UserProfileModal
        isOpen={showUserProfileModal}
        onClose={() => setShowUserProfileModal(false)}
        onOpenRewardStore={() => setShowRewards(true)}
        onOpenLuckyWheel={() => setShowLuckyWheel(true)}
        onOpenPuzzleGame={() => setShowPuzzleGame(true)}
        onOpenBadgeCollection={() => setShowBadges(true)}
      />

      {/* 3D LUCKY WHEEL MODAL */}
      {showLuckyWheel && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full">
            <button
              onClick={() => setShowLuckyWheel(false)}
              className="absolute -top-10 right-0 text-white font-bold text-lg"
            >
              ✕ Đóng
            </button>
            <LuckyWheel />
          </div>
        </div>
      )}

      {/* 7 WONDERS PUZZLE GAME MODAL */}
      {showPuzzleGame && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-xl w-full">
            <button
              onClick={() => setShowPuzzleGame(false)}
              className="absolute -top-10 right-0 text-white font-bold text-lg"
            >
              ✕ Đóng
            </button>
            <PuzzleGame />
          </div>
        </div>
      )}

      {/* AI TRAVEL CHATBOT MODAL */}
      {showAIChatbot && (
        <AIChatbotModal
          isOpen={showAIChatbot}
          onClose={() => setShowAIChatbot(false)}
        />
      )}
    </main>
  );
}
