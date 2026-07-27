'use client';

import React from 'react';
import { Landmark, TravelStep } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { openExternalMapDirections } from '@/utils/navigation';

interface NavigationPanelProps {
  stops: Landmark[];
  isOpen: boolean;
  onClose: () => void;
  onSpeakRoute?: (text: { vi: string; en: string }) => void;
}

// Calculate Haversine distance in KM between 2 coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of Earth in KM
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export default function NavigationPanel({ stops, isOpen, onClose, onSpeakRoute }: NavigationPanelProps) {
  const { t } = useLanguage();

  if (!isOpen || stops.length < 2) return null;

  // Build Travel Steps between consecutive stops
  const travelSteps: TravelStep[] = [];
  let totalDistance = 0;
  let totalDurationMinutes = 0;

  for (let i = 0; i < stops.length - 1; i++) {
    const from = stops[i];
    const to = stops[i + 1];
    const distanceKm = calculateDistance(
      from.coordinates.lat,
      from.coordinates.lng,
      to.coordinates.lat,
      to.coordinates.lng
    );

    totalDistance += distanceKm;

    let transport: 'motorbike' | 'car' | 'bus' | 'train' | 'flight' = 'car';
    let transportName = { vi: 'Ô tô / Taxi', en: 'Car / Taxi' };
    let durationMins = Math.round((distanceKm / 45) * 60);

    if (distanceKm < 15) {
      transport = 'motorbike';
      transportName = { vi: 'Xe máy / Xe ôm', en: 'Motorbike / Scooter' };
      durationMins = Math.round((distanceKm / 30) * 60);
    } else if (distanceKm > 250) {
      transport = 'flight';
      transportName = { vi: 'Máy bay thương mại', en: 'Commercial Flight' };
      durationMins = Math.round(90 + (distanceKm / 800) * 60);
    } else if (distanceKm > 100) {
      transport = 'train';
      transportName = { vi: 'Tàu hỏa / Xe khách đường dài', en: 'Train / Express Bus' };
      durationMins = Math.round((distanceKm / 60) * 60);
    }

    totalDurationMinutes += durationMins;

    travelSteps.push({
      fromLandmark: from,
      toLandmark: to,
      distanceKm,
      durationMinutes: durationMins,
      recommendedTransport: transport,
      transportName,
      notes: {
        vi: `Di chuyển từ ${from.name.vi} đến ${to.name.vi} với khoảng cách ~${distanceKm}km. Gợi ý phương tiện: ${transportName.vi}.`,
        en: `Travel from ${from.name.en} to ${to.name.en} (~${distanceKm}km). Suggested mode: ${transportName.en}.`
      }
    });
  }

  const transportIcons: Record<string, string> = {
    motorbike: '🛵',
    car: '🚗',
    bus: '🚌',
    train: '🚆',
    flight: '✈️'
  };

  const handleOpenExternalMapsFullRoute = () => {
    const origin = stops[0];
    const destination = stops[stops.length - 1];

    // Automatically close web navigation panel to restore map view
    onClose();

    // Trigger Native Google Maps / Apple Maps deep link
    openExternalMapDirections(
      destination.coordinates.lat,
      destination.coordinates.lng,
      origin.coordinates.lat,
      origin.coordinates.lng
    );
  };

  const handleOpenLegExternalMap = (step: TravelStep) => {
    onClose();
    openExternalMapDirections(
      step.toLandmark.coordinates.lat,
      step.toLandmark.coordinates.lng,
      step.fromLandmark.coordinates.lat,
      step.fromLandmark.coordinates.lng
    );
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 md:left-72 right-4 md:right-auto z-40 max-w-lg bg-slate-900/95 backdrop-blur-xl border border-emerald-500/40 rounded-3xl p-5 shadow-2xl animate-fade-in text-white pointer-events-auto [transform:translate3d(0,0,0)] [will-change:transform]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xl">🗺️</span>
          <div>
            <h3 className="font-extrabold text-base text-emerald-400">Lộ Trình & Hướng Dẫn Di Chuyển</h3>
            <p className="text-xs text-slate-400">
              Tổng {stops.length} điểm dừng • {totalDistance} km • ~{Math.floor(totalDurationMinutes / 60)}h{totalDurationMinutes % 60}m
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 text-sm"
        >
          ✕
        </button>
      </div>

      {/* Main Action Buttons */}
      <div className="my-3 flex flex-col gap-2">
        {/* PROMINENT EXTERNAL MAPS NATIVE NAVIGATION BUTTON */}
        <button
          onClick={handleOpenExternalMapsFullRoute}
          className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:brightness-110 text-slate-950 font-black rounded-2xl text-xs md:text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
        >
          <span className="text-lg">🗺️</span>
          <span>Mở Google Maps / Dẫn Đường Ngoài Đời Thực</span>
        </button>
      </div>

      {/* Travel Steps List */}
      <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
        {travelSteps.map((step, idx) => (
          <div
            key={idx}
            onClick={() => handleOpenLegExternalMap(step)}
            className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/70 hover:border-emerald-500/70 transition-all cursor-pointer group"
            title="Bấm để mở bản đồ dẫn đường cho chặng này ngoài đời"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                Chặng {idx + 1}
              </span>
              <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
                <span>{transportIcons[step.recommendedTransport]}</span>
                <span>{t(step.transportName)}</span>
              </span>
            </div>

            <div className="text-xs font-bold text-slate-100 flex items-center gap-2 group-hover:text-amber-300 transition-colors">
              <span>📍 {t(step.fromLandmark.name)}</span>
              <span className="text-slate-500">➔</span>
              <span>📍 {t(step.toLandmark.name)}</span>
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
              <span>Khoảng cách: <strong className="text-emerald-400 font-bold">{step.distanceKm} km</strong></span>
              <span className="text-amber-400 font-bold group-hover:underline">🗺️ Mở Maps Chặng Này</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
