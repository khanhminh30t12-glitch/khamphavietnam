'use client';

import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { useLanguage } from '@/context/LanguageContext';
import { DailyMission } from '@/types';

const INITIAL_MISSIONS: DailyMission[] = [
  {
    id: 'm1',
    title: { vi: '📅 Điểm danh hàng ngày', en: '📅 Daily Login' },
    rewardSpins: 1,
    rewardPoints: 100,
    completed: false,
    icon: '📅'
  },
  {
    id: 'm2',
    title: { vi: '🗺️ Tìm kiếm 3 địa danh trên thanh Search', en: '🗺️ Search 3 landmarks' },
    rewardSpins: 1,
    rewardPoints: 50,
    completed: false,
    icon: '🔍'
  },
  {
    id: 'm3',
    title: { vi: '🍜 Xem 2 quán ăn/cà phê bán kính 10km', en: '🍜 View 2 local eateries' },
    rewardSpins: 1,
    rewardPoints: 50,
    completed: false,
    icon: '🍜'
  },
  {
    id: 'm4',
    title: { vi: '🐲 Nghe Rồng AI thuyết minh chỉ đường', en: '🐲 Listen to Dragon AI voice guide' },
    rewardSpins: 1,
    rewardPoints: 100,
    completed: false,
    icon: '🐲'
  },
  {
    id: 'm5',
    title: { vi: '📸 Bấm 3D Preview xem cận cảnh 1 di tích', en: '📸 View 3D Preview of 1 landmark' },
    rewardSpins: 1,
    rewardPoints: 50,
    completed: false,
    icon: '📸'
  }
];

export default function LuckyWheel() {
  const { addPoints, addExp } = useGame();
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  const [spinsCount, setSpinsCount] = useState(3);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wheelResult, setWheelResult] = useState<string | null>(null);
  const [missions, setMissions] = useState<DailyMission[]>(INITIAL_MISSIONS);

  const wheelRewards = [
    { label: '+50 Điểm', line1: '+50', line2: 'Điểm ⭐', points: 50, spins: 0, color: '#10b981' },
    { label: '+100 Điểm', line1: '+100', line2: 'Điểm ⭐', points: 100, spins: 0, color: '#06b6d4' },
    { label: 'Voucher 20%', line1: 'Voucher', line2: '20% 🎟️', points: 120, spins: 0, color: '#f59e0b' },
    { label: 'Móc Khoá Rồng', line1: 'Móc Khoá', line2: 'Rồng 🔑', points: 250, spins: 0, color: '#ec4899' },
    { label: '+2 Lượt Quay', line1: '+2 Lượt', line2: 'Quay 🔄', points: 0, spins: 2, color: '#8b5cf6' },
    { label: 'Chúc May Mắn', line1: 'May Mắn', line2: 'Lần Sau 🍀', points: 20, spins: 0, color: '#475569' }
  ];

  const numSectors = wheelRewards.length;
  const sectorAngle = 360 / numSectors;

  const handleSpinWheel = () => {
    if (isSpinning || spinsCount <= 0) return;
    setIsSpinning(true);
    setSpinsCount(prev => prev - 1);
    setWheelResult(null);

    const randomIndex = Math.floor(Math.random() * numSectors);
    const prize = wheelRewards[randomIndex];
    const prizeAngle = sectorAngle * randomIndex;
    const totalRotation = wheelRotation + 1800 + (360 - prizeAngle);

    setWheelRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      if (prize.spins > 0) {
        setSpinsCount(prev => prev + prize.spins);
        setWheelResult(`🎉 Bạn đã trúng: ${prize.label}!`);
      } else {
        addPoints(prize.points);
        addExp(30);
        setWheelResult(`🎉 Bạn đã trúng: ${prize.label}! (+${prize.points} Điểm)`);
      }
    }, 4500);
  };

  const handleClaimMission = (missionId: string) => {
    setMissions(prev =>
      prev.map(m => {
        if (m.id === missionId && !m.completed) {
          setSpinsCount(s => s + m.rewardSpins);
          addPoints(m.rewardPoints);
          return { ...m, completed: true };
        }
        return m;
      })
    );
  };

  // Helper to draw SVG Arc Sector Path
  const getSectorPath = (index: number, total: number, radius: number) => {
    const startAngle = (index * 360) / total - 90;
    const endAngle = ((index + 1) * 360) / total - 90;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = 150 + radius * Math.cos(startRad);
    const y1 = 150 + radius * Math.sin(startRad);
    const x2 = 150 + radius * Math.cos(endRad);
    const y2 = 150 + radius * Math.sin(endRad);

    return `M 150 150 L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 items-start">
      {/* LEFT: 120Hz LUCKY WHEEL */}
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-black rounded-full border border-amber-500/30">
            120Hz Animation
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-black text-amber-400 mb-1 flex items-center gap-2">
          <span>🎡</span> {isEn ? '3D Lucky Wheel' : 'Vòng Quay May Mắn 3D'}
        </h3>
        <p className="text-xs text-slate-400 mb-4 max-w-sm">
          {isEn ? 'Spin to win bonus points, vouchers & golden souvenirs!' : 'Quay bánh xe để trúng Điểm Thưởng, Voucher & Móc khóa Rồng AI mạ vàng!'}
        </p>

        {/* Spins Counter Badge */}
        <div className="mb-4 px-5 py-2 bg-slate-950 rounded-2xl border border-amber-400/50 flex items-center gap-2 shadow-lg">
          <span className="text-xs text-slate-400 font-medium">{isEn ? 'Spins left:' : 'Số lượt quay còn lại:'}</span>
          <strong className="text-lg font-black text-amber-400 animate-pulse">{spinsCount} {isEn ? 'Spins' : 'Lượt'}</strong>
        </div>

        {/* Wheel Graphic Container */}
        <div className="relative w-64 h-64 md:w-72 md:h-72 my-2 flex items-center justify-center">
          {/* Dragon AI Pointer Needle */}
          <div className="absolute -top-3 z-20 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-amber-400 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />

          {/* SVG Wheel Circle Canvas */}
          <div
            className="w-full h-full rounded-full border-4 border-amber-400 shadow-2xl overflow-hidden relative transition-transform duration-[4500ms] cubic-bezier(0.15, 0.99, 0.24, 1)"
            style={{
              transform: `rotate(${wheelRotation}deg)`,
              willChange: 'transform'
            }}
          >
            <svg viewBox="0 0 300 300" className="w-full h-full">
              {wheelRewards.map((reward, i) => {
                const midAngle = (i + 0.5) * sectorAngle - 90;
                const rad = (midAngle * Math.PI) / 180;
                const textDist = 95;
                const tx = 150 + textDist * Math.cos(rad);
                const ty = 150 + textDist * Math.sin(rad);

                return (
                  <g key={i}>
                    {/* Arc Slice Sector */}
                    <path
                      d={getSectorPath(i, numSectors, 148)}
                      fill={reward.color}
                      stroke="#0f172a"
                      strokeWidth="2"
                    />

                    {/* Perfectly Rotated Unicode Vietnamese Text */}
                    <g transform={`translate(${tx}, ${ty}) rotate(${midAngle + 90})`}>
                      <text
                        x="0"
                        y="-6"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="11"
                        fontWeight="900"
                        fontFamily="'Inter', 'Roboto', 'Montserrat', system-ui, sans-serif"
                        style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.8))' }}
                      >
                        {reward.line1}
                      </text>
                      <text
                        x="0"
                        y="8"
                        textAnchor="middle"
                        fill="#fef08a"
                        fontSize="10"
                        fontWeight="800"
                        fontFamily="'Inter', 'Roboto', 'Montserrat', system-ui, sans-serif"
                        style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.8))' }}
                      >
                        {reward.line2}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Center Spin Button */}
          <button
            onClick={handleSpinWheel}
            disabled={isSpinning || spinsCount <= 0}
            className="absolute w-16 h-16 rounded-full bg-slate-950 border-4 border-amber-400 shadow-2xl flex items-center justify-center text-xs font-black text-amber-400 hover:scale-105 active:scale-95 transition-all z-10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSpinning ? '...' : spinsCount > 0 ? 'QUAY!' : 'HẾT LƯỢT'}
          </button>
        </div>

        {wheelResult && (
          <div className="mt-4 p-3 bg-amber-500/20 border border-amber-400/50 rounded-2xl text-amber-300 font-extrabold text-xs md:text-sm animate-bounce">
            {wheelResult}
          </div>
        )}
      </div>

      {/* RIGHT: DAILY MISSIONS SYSTEM */}
      <div className="w-full lg:w-96 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📋</span>
            <div>
              <h4 className="font-black text-base text-amber-400">{isEn ? 'Daily Missions' : 'Nhiệm Vụ Hàng Ngày'}</h4>
              <p className="text-[11px] text-slate-400">{isEn ? 'Complete tasks for free spins' : 'Làm nhiệm vụ tích thêm lượt quay miễn phí'}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {missions.map(m => (
            <div
              key={m.id}
              className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-center justify-between gap-3 hover:border-amber-500/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl shrink-0">{m.icon}</span>
                <div>
                  <h5 className="font-extrabold text-xs text-white leading-snug">{t(m.title)}</h5>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                    <span className="text-amber-400 font-bold">+{m.rewardSpins} {isEn ? 'Spin' : 'Lượt Quay'}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-bold">+{m.rewardPoints} Points</span>
                  </div>
                </div>
              </div>

              {m.completed ? (
                <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-500 text-[10px] font-extrabold shrink-0">
                  {isEn ? 'Claimed ✅' : 'Đã Nhận ✅'}
                </span>
              ) : (
                <button
                  onClick={() => handleClaimMission(m.id)}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-[11px] shrink-0 shadow-lg active:scale-95 transition-transform cursor-pointer"
                >
                  {isEn ? 'Claim +1 Spin' : 'Nhận +1 Spin'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
