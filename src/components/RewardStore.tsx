'use client';

import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { useLanguage } from '@/context/LanguageContext';
import { rewardItems } from '@/data/vietnamTourismData';
import { RewardItem } from '@/types';
import MiniGamesPanel from './MiniGamesPanel';

export default function RewardStore() {
  const { progress, redeemReward } = useGame();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'souvenirs' | 'vouchers' | 'minigames' | 'inventory'>('souvenirs');
  const [selectedItem, setSelectedItem] = useState<RewardItem | null>(null);
  const [showQRModal, setShowQRModal] = useState<RewardItem | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const souvenirs = rewardItems.filter(item => item.category === 'souvenir');
  const vouchers = rewardItems.filter(item => item.category === 'voucher');
  const claimedItems = rewardItems.filter(item => progress.redeemedRewards.includes(item.id));

  const handleConfirmRedeem = () => {
    if (selectedItem && progress.points >= selectedItem.cost) {
      redeemReward(selectedItem.id, selectedItem.cost);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3500);

      // If it's a voucher, open QR Code modal immediately
      if (selectedItem.category === 'voucher') {
        setShowQRModal(selectedItem);
      }
      setSelectedItem(null);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 text-white">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-6 shadow-2xl mb-6">
        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-20 pointer-events-none text-9xl">
          🎁
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-black text-white uppercase tracking-wider">
                Cửa Hàng Đổi Quà & Mini-Games
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black">Tích Điểm Thưởng — Nhận Quà Độc Quyền</h1>
            <p className="text-xs md:text-sm text-white/90 mt-1">
              Đổi Móc khóa 3D, Đặc sản vùng miền hoặc E-Voucher giảm giá ăn uống 30km!
            </p>
          </div>

          <div className="bg-slate-950/40 backdrop-blur border border-white/20 rounded-2xl px-6 py-3 text-center shrink-0">
            <span className="text-[11px] font-extrabold uppercase text-amber-200 tracking-wider">Số Dư Điểm Thưởng</span>
            <div className="text-3xl font-black text-amber-300 flex items-center justify-center gap-1.5 mt-0.5">
              <span>⭐</span>
              <span>{progress.points}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex bg-slate-900/90 p-1.5 rounded-2xl mb-6 border border-slate-800 shadow-xl overflow-x-auto no-scrollbar gap-1">
        <button
          onClick={() => setActiveTab('souvenirs')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs md:text-sm transition-all whitespace-nowrap flex items-center justify-center gap-2 ${
            activeTab === 'souvenirs'
              ? 'bg-amber-500 text-slate-950 shadow-lg font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>🎁</span>
          <span>Quà Lưu Niệm & Đặc Sản</span>
        </button>

        <button
          onClick={() => setActiveTab('vouchers')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs md:text-sm transition-all whitespace-nowrap flex items-center justify-center gap-2 ${
            activeTab === 'vouchers'
              ? 'bg-amber-500 text-slate-950 shadow-lg font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>🎟️</span>
          <span>E-Voucher Quán Ăn / Cà Phê</span>
        </button>

        <button
          onClick={() => setActiveTab('minigames')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs md:text-sm transition-all whitespace-nowrap flex items-center justify-center gap-2 ${
            activeTab === 'minigames'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>🎮</span>
          <span>Mini-Games Tích Điểm</span>
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs md:text-sm transition-all whitespace-nowrap flex items-center justify-center gap-2 relative ${
            activeTab === 'inventory'
              ? 'bg-indigo-600 text-white shadow-lg font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>🎒</span>
          <span>Túi Đồ Của Tôi</span>
          {claimedItems.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black">
              {claimedItems.length}
            </span>
          )}
        </button>
      </div>

      {/* Confetti Banner Notification */}
      {showConfetti && (
        <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-400/50 rounded-2xl text-emerald-300 font-extrabold text-center animate-bounce text-sm">
          🎉 Đổi quà thành công! Quà của bạn đã được lưu vào "Túi Đồ Của Tôi".
        </div>
      )}

      {/* TAB 1: QUÀ LƯU NIỆM */}
      {activeTab === 'souvenirs' && (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {souvenirs.map(item => {
            const isClaimed = progress.redeemedRewards.includes(item.id);
            const canAfford = progress.points >= item.cost;

            return (
              <div
                key={item.id}
                className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden flex flex-col hover:border-amber-500/50 transition-all shadow-xl group"
              >
                <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={item.image}
                    alt={t(item.name)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur text-[10px] font-bold text-amber-400 border border-amber-400/30">
                    📍 {item.region}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-base text-white mb-1 leading-snug">{t(item.name)}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-2.5">{t(item.description)}</p>
                    {item.material && (
                      <div className="text-[10px] text-slate-300 font-medium space-y-0.5 border-t border-slate-800/80 pt-2">
                        <div>✨ <strong>Chất liệu:</strong> {t(item.material)}</div>
                        {item.dimensions && <div>📏 <strong>Kích thước:</strong> {item.dimensions}</div>}
                        {item.claimMethod && <div>📦 <strong>Nhận quà:</strong> {t(item.claimMethod)}</div>}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div className="text-amber-400 font-extrabold text-sm flex items-center gap-1">
                      <span>⭐</span>
                      <span>{item.cost} Điểm</span>
                    </div>

                    {isClaimed ? (
                      <span className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-400 text-xs font-bold">
                        Đã Sở Hữu ✅
                      </span>
                    ) : (
                      <button
                        onClick={() => setSelectedItem(item)}
                        disabled={!canAfford}
                        className={`px-4 py-2 rounded-xl font-black text-xs transition-all active:scale-95 ${
                          canAfford
                            ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        Đổi Ngay
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: E-VOUCHERS */}
      {activeTab === 'vouchers' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {vouchers.map(item => {
            const isClaimed = progress.redeemedRewards.includes(item.id);
            const canAfford = progress.points >= item.cost;

            return (
              <div
                key={item.id}
                className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden flex flex-col hover:border-emerald-500/50 transition-all shadow-xl group"
              >
                <div className="relative h-40 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={item.image}
                    alt={t(item.name)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black shadow-lg">
                    🎟️ E-Voucher
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-base text-white mb-1 leading-snug">{t(item.name)}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{t(item.description)}</p>
                    <div className="mt-2 text-[10px] text-slate-400">HSD: {item.expiryDate}</div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div className="text-amber-400 font-extrabold text-sm flex items-center gap-1">
                      <span>⭐</span>
                      <span>{item.cost} Điểm</span>
                    </div>

                    {isClaimed ? (
                      <button
                        onClick={() => setShowQRModal(item)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1"
                      >
                        <span>📱 Xem QR</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedItem(item)}
                        disabled={!canAfford}
                        className={`px-4 py-2 rounded-xl font-black text-xs transition-all active:scale-95 ${
                          canAfford
                            ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        Nhận Voucher
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: MINI GAMES */}
      {activeTab === 'minigames' && <MiniGamesPanel />}

      {/* TAB 4: MY INVENTORY */}
      {activeTab === 'inventory' && (
        <div className="space-y-4 max-w-3xl mx-auto">
          {claimedItems.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/60 rounded-3xl border border-slate-800">
              <span className="text-5xl mb-3 block">🎒</span>
              <h3 className="font-extrabold text-lg text-slate-200">Túi Đồ Của Bạn Đang Trống</h3>
              <p className="text-xs text-slate-400 mt-1">Hãy dùng điểm thưởng để đổi Quà lưu niệm hoặc E-Voucher nhé!</p>
            </div>
          ) : (
            claimedItems.map(item => (
              <div
                key={item.id}
                className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between gap-4 shadow-lg hover:border-indigo-500/50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-slate-950 overflow-hidden shrink-0 border border-slate-800">
                    <img
                      src={item.image}
                      alt={t(item.name)}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </div>

                  <div>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                      {item.category === 'voucher' ? '🎟️ Voucher' : '🎁 Quà Lưu Niệm'}
                    </span>
                    <h4 className="font-extrabold text-sm text-white mt-1">{t(item.name)}</h4>
                    <p className="text-xs text-slate-400">{t(item.description)}</p>
                  </div>
                </div>

                {item.category === 'voucher' ? (
                  <button
                    onClick={() => setShowQRModal(item)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shrink-0 shadow-lg active:scale-95 transition-all"
                  >
                    Dùng QR Code
                  </button>
                ) : (
                  <span className="px-3 py-1.5 bg-slate-800 text-emerald-400 font-bold text-xs rounded-xl shrink-0">
                    Đã Đổi ✅
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* CONFIRMATION REDEEM MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setSelectedItem(null)} />
          <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-sm shadow-2xl text-center animate-slide-up text-white">
            <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden mb-4 border-2 border-amber-400 shadow-xl">
              <img
                src={selectedItem.image}
                alt={t(selectedItem.name)}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
            <h3 className="font-black text-lg mb-1">{t(selectedItem.name)}</h3>
            <p className="text-xs text-slate-400 mb-4">{t(selectedItem.description)}</p>

            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs mb-5 flex justify-between items-center">
              <span className="text-slate-400">Chi phí đổi:</span>
              <strong className="text-amber-400 font-extrabold">⭐ {selectedItem.cost} Điểm</strong>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedItem(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmRedeem}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg active:scale-95"
              >
                Xác Nhận Đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR CODE E-VOUCHER MODAL */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowQRModal(null)} />
          <div className="relative bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 w-full max-w-sm shadow-2xl text-center animate-slide-up text-white">
            <div className="text-xs font-black uppercase text-emerald-400 tracking-wider mb-2">
              🎟️ E-Voucher QR Code Trực Tiếp
            </div>
            <h3 className="font-black text-lg mb-1">{t(showQRModal.name)}</h3>
            <p className="text-xs text-slate-400 mb-4">Đưa mã QR cho nhân viên quán để áp dụng ưu đãi thực tế</p>

            {/* QR Code Container */}
            <div className="p-4 bg-white rounded-2xl mx-auto w-48 h-48 flex items-center justify-center shadow-xl border border-slate-300 my-2">
              <div className="text-center text-slate-950 font-mono text-xs break-all">
                <div className="text-4xl mb-2">📱</div>
                <strong>{showQRModal.qrCode || 'VN-VOUCHER-2026'}</strong>
              </div>
            </div>

            <div className="my-3 p-2 bg-slate-950 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
              <span className="text-slate-400">Mã Promo:</span>
              <strong className="text-emerald-400 font-mono font-extrabold">{showQRModal.promoCode || 'PROMO2026'}</strong>
            </div>

            <button
              onClick={() => setShowQRModal(null)}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg mt-2"
            >
              Đóng QR Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
