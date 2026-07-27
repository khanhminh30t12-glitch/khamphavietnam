'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRewardStore: () => void;
  onOpenLuckyWheel: () => void;
  onOpenPuzzleGame: () => void;
  onOpenBadgeCollection: () => void;
}

export default function UserProfileModal({
  isOpen,
  onClose,
  onOpenRewardStore,
  onOpenLuckyWheel,
  onOpenPuzzleGame,
  onOpenBadgeCollection
}: UserProfileModalProps) {
  const { language } = useLanguage();
  const { progress } = useGame();
  const isEn = language === 'en';

  const [activeTab, setActiveTab] = useState<'profile' | 'games' | 'log'>('profile');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div className="relative w-full max-w-lg bg-slate-900/95 border border-amber-400/40 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl text-white space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 p-0.5 shadow-lg">
              <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-2xl">
                👤
              </div>
            </div>
            <div>
              <h2 className="text-lg font-black text-white">
                {isEn ? 'Tourist Profile' : 'Hồ Sơ Du Khách'}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-amber-400 font-bold">⭐ {progress.points} Points</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  {isEn ? 'VIP Traveler' : 'Cấp Độc Hành 5 ★'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/60">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'profile'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            👤 {isEn ? 'Overview' : 'Tổng Quan'}
          </button>
          <button
            onClick={() => setActiveTab('games')}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'games'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🎡 {isEn ? 'Mini-Games' : 'Trò Chơi'}
          </button>
          <button
            onClick={() => setActiveTab('log')}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'log'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🗺️ {isEn ? 'Check-ins' : 'Nhật Ký'}
          </button>
        </div>

        {/* TAB 1: OVERVIEW & REDEEM STORE ENTRY */}
        {activeTab === 'profile' && (
          <div className="space-y-4 animate-fade-in">
            {/* Account Card */}
            <div className="p-4 bg-gradient-to-r from-slate-800 to-slate-800/60 rounded-2xl border border-slate-700 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                  {isEn ? 'Logged Account' : 'Tài Khoản Đăng Nhập'}
                </p>
                <p className="text-base font-black text-amber-300 font-mono">User: 1</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-slate-400 font-bold">{isEn ? 'Check-ins' : 'Địa Điểm Đã Ghé'}</p>
                <p className="text-lg font-black text-emerald-400">{progress.checkIns.length} / 20</p>
              </div>
            </div>

            {/* Quick Redeem Store Banner */}
            <div className="p-4 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 border border-amber-400/50 rounded-2xl flex items-center justify-between shadow-lg">
              <div>
                <h4 className="text-sm font-black text-amber-300 flex items-center gap-1.5">
                  <span>🎁</span>
                  <span>{isEn ? 'Travel Voucher Store' : 'Kho Đổi Quà & Voucher'}</span>
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  {isEn ? `You have ${progress.points} points to redeem souvenirs` : `Bạn đang có ${progress.points} điểm để đổi Voucher quà tặng`}
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenRewardStore();
                }}
                className="py-2.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all active:scale-95 whitespace-nowrap"
              >
                {isEn ? 'Redeem Now' : '🎁 Đổi Quà Ngay'}
              </button>
            </div>

            {/* Badges Collection Entry */}
            <button
              onClick={() => {
                onClose();
                onOpenBadgeCollection();
              }}
              className="w-full p-4 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-2xl flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏆</span>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                    {isEn ? 'Heritage Badges Collection' : 'Bộ Sưu Tập Huy Chương Du Lịch'}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {isEn ? `${progress.badges.length} Badges Unlocked` : `Đã mở khóa ${progress.badges.length} huy chương danh thắng`}
                  </p>
                </div>
              </div>
              <span className="text-slate-400 text-sm">➔</span>
            </button>
          </div>
        )}

        {/* TAB 2: MINI-GAMES */}
        {activeTab === 'games' && (
          <div className="space-y-3 animate-fade-in">
            <div
              onClick={() => {
                onClose();
                onOpenLuckyWheel();
              }}
              className="p-4 bg-slate-800/90 hover:bg-slate-800 border border-amber-400/40 rounded-2xl flex items-center justify-between cursor-pointer transition-all group shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎡</span>
                <div>
                  <h4 className="text-sm font-black text-amber-300 group-hover:underline">
                    {isEn ? '3D Lucky Wheel Spin' : 'Vòng Quay 3D May Mắn'}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {isEn ? 'Spin daily to win bonus ⭐ points & tickets' : 'Quay thưởng mỗi ngày nhận điểm ⭐ tích lũy quà tặng'}
                  </p>
                </div>
              </div>
              <span className="py-1.5 px-3 bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow">
                {isEn ? 'Play' : 'Chơi Ngay'}
              </span>
            </div>

            <div
              onClick={() => {
                onClose();
                onOpenPuzzleGame();
              }}
              className="p-4 bg-slate-800/90 hover:bg-slate-800 border border-indigo-400/40 rounded-2xl flex items-center justify-between cursor-pointer transition-all group shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🧩</span>
                <div>
                  <h4 className="text-sm font-black text-indigo-300 group-hover:underline">
                    {isEn ? '7 Wonders Puzzle Game' : 'Ghép Hình 7 Kỳ Quan'}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {isEn ? 'Solve puzzles of famous Vietnam heritage sites' : 'Thử thách ghép hình kỳ quan nhận phần thưởng lớn'}
                  </p>
                </div>
              </div>
              <span className="py-1.5 px-3 bg-indigo-500 text-white font-black text-xs rounded-xl shadow">
                {isEn ? 'Play' : 'Chơi Ngay'}
              </span>
            </div>
          </div>
        )}

        {/* TAB 3: CHECK-INS TRAVEL LOG */}
        {activeTab === 'log' && (
          <div className="space-y-2 animate-fade-in max-h-60 overflow-y-auto pr-1">
            {progress.checkIns.length > 0 ? (
              progress.checkIns.map((checkInId, idx) => (
                <div key={idx} className="p-3 bg-slate-800/70 border border-slate-700/80 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">📍 Landmark Check-in #{idx + 1}</span>
                  <span className="text-emerald-400 font-bold">✓ {isEn ? 'Verified' : 'Đã Xác Nhận'}</span>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-slate-400">
                {isEn ? 'No check-ins yet. Tap any landmark on the 3D map to check-in!' : 'Chưa có nhật ký check-in. Bấm chọn địa danh trên bản đồ 3D để bắt đầu lưu vết nhé!'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
