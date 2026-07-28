'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useGame, LEVEL_THRESHOLDS } from '@/context/GameContext';

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestartTour?: () => void;
}

export default function UserGuideModal({ isOpen, onClose, onRestartTour }: UserGuideModalProps) {
  const { language } = useLanguage();
  const { progress } = useGame();
  const isEn = language === 'en';

  const [activeTab, setActiveTab] = useState<'map' | 'radius' | 'nav' | 'mascot'>('map');

  if (!isOpen) return null;

  // Calculate Star Level
  const totalExp = progress?.totalExp || 0;
  let level = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (totalExp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  level = Math.min(20, level);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fade-in pointer-events-auto">
      {/* BEIGE & RED MODAL CONTAINER */}
      <div className="relative w-full max-w-2xl bg-[#F5F2EB]/98 border-2 border-red-500/70 backdrop-blur-2xl rounded-3xl p-5 md:p-7 shadow-2xl shadow-red-600/30 text-slate-900 overflow-hidden flex flex-col max-h-[90vh] [transform:translate3d(0,0,0)] [will-change:transform]">
        {/* HEADER */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-red-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600/10 border border-red-500/30 flex items-center justify-center text-xl text-red-600 animate-bounce">
              ⭐
            </div>
            <div>
              <h2 className="text-base md:text-xl font-black text-red-800 flex items-center gap-2">
                <span>{isEn ? 'Vietnam Travel Interactive Guide' : 'Cẩm Nang Hướng Dẫn Du Khách'}</span>
              </h2>
              <p className="text-[11px] text-red-900/80 font-bold">
                {isEn ? 'Master 3D Map, Services Filter & Real Navigation' : 'Làm chủ Bản đồ 3D, Lọc dịch vụ & Chỉ đường thực tế'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#E8E2D5] hover:bg-red-600/20 text-slate-700 hover:text-red-700 flex items-center justify-center text-sm font-extrabold transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* 4 TABS NAVIGATION BAR */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 bg-[#EFEAD8] rounded-2xl border border-red-500/30 mb-4">
          <button
            onClick={() => setActiveTab('map')}
            className={`py-2 px-2.5 rounded-xl font-black text-[11px] md:text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'map'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                : 'text-slate-700 hover:bg-red-600/10 hover:text-red-700'
            }`}
          >
            <span>📱</span>
            <span>{isEn ? '1. 3D Map' : '1. Bản Đồ 3D'}</span>
          </button>

          <button
            onClick={() => setActiveTab('radius')}
            className={`py-2 px-2.5 rounded-xl font-black text-[11px] md:text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'radius'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                : 'text-slate-700 hover:bg-red-600/10 hover:text-red-700'
            }`}
          >
            <span>🍜</span>
            <span>{isEn ? '2. Services' : '2. Quán Ăn & Khách Sạn'}</span>
          </button>

          <button
            onClick={() => setActiveTab('nav')}
            className={`py-2 px-2.5 rounded-xl font-black text-[11px] md:text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'nav'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                : 'text-slate-700 hover:bg-red-600/10 hover:text-red-700'
            }`}
          >
            <span>🚗</span>
            <span>{isEn ? '3. GPS Nav' : '3. Chỉ Đường GPS'}</span>
          </button>

          <button
            onClick={() => setActiveTab('mascot')}
            className={`py-2 px-2.5 rounded-xl font-black text-[11px] md:text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'mascot'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                : 'text-slate-700 hover:bg-red-600/10 hover:text-red-700'
            }`}
          >
            <span>⭐</span>
            <span>{isEn ? '4. Star Mascot' : '4. Ngôi Sao Lv.X'}</span>
          </button>
        </div>

        {/* TAB CONTENT BODY */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 p-1">
          {/* TAB 1: KHÁM PHÁ BẢN ĐỒ VIỆT NAM */}
          {activeTab === 'map' && (
            <div className="space-y-3 animate-fade-in text-slate-800">
              <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-red-500/30 space-y-2 shadow-sm">
                <h4 className="font-black text-sm text-red-800 flex items-center gap-2">
                  <span className="text-lg">🗺️</span>
                  <span>{isEn ? 'Explore S-shaped Mainland Landmarks' : 'Khám Phá Danh Thắng Dải Đất Chữ S'}</span>
                </h4>
                <p className="text-xs leading-relaxed font-medium">
                  {isEn
                    ? 'Chạm vào các biểu tượng Marker danh thắng trên bản đồ để mở Bảng Chi Tiết Địa Điểm. Bạn có thể xem hình ảnh 360°, thông tin lịch sử văn hóa và thời tiết thực tế.'
                    : 'Chạm vào các biểu tượng Marker danh thắng trên bản đồ để mở Bảng Chi Tiết Địa Điểm. Bạn có thể xem hình ảnh 360°, thông tin lịch sử văn hóa và thời tiết thực tế.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-red-600/15 to-rose-600/15 border border-red-500/40 space-y-2 shadow-sm">
                <h4 className="font-black text-sm text-red-800 flex items-center gap-2">
                  <span className="text-lg">🇻🇳</span>
                  <span>{isEn ? 'Sacred Hoang Sa & Truong Sa Archipelagos' : 'Hai Quần Đảo Thiêng Liêng Hoàng Sa & Trường Sa'}</span>
                </h4>
                <p className="text-xs leading-relaxed font-medium">
                  {isEn
                    ? 'Hai quần đảo 🇻🇳 Hoàng Sa (TP. Đà Nẵng) và 🇻🇳 Trường Sa (Tỉnh Khánh Hòa) được thể hiện chuẩn địa lý tự nhiên thiêng liêng của Việt Nam dưới dạng Native Text Labels sang trọng.'
                    : 'Hai quần đảo 🇻🇳 Hoàng Sa (TP. Đà Nẵng) và 🇻🇳 Trường Sa (Tỉnh Khánh Hòa) được thể hiện chuẩn địa lý tự nhiên thiêng liêng của Việt Nam dưới dạng Native Text Labels sang trọng.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: TÌM QUÁN ĂN / KHÁCH SẠN THEO BÁN KÍNH */}
          {activeTab === 'radius' && (
            <div className="space-y-3 animate-fade-in text-slate-800">
              <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-red-500/30 space-y-2 shadow-sm">
                <h4 className="font-black text-sm text-red-800 flex items-center gap-2">
                  <span className="text-lg">🍜</span>
                  <span>{isEn ? 'Filter Eateries, Cafes & Hotels Around You' : 'Lọc Danh Sách Quán Ăn, Quán Nước & Khách Sạn'}</span>
                </h4>
                <p className="text-xs leading-relaxed font-medium">
                  Mở **Bảng Chi Tiết Địa Điểm** ➔ Chọn mục **Quán Ăn** hoặc **Khách Sạn** để xem danh sách dịch vụ xung quanh địa điểm bạn chọn.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#EFEAD8] border border-red-500/30 space-y-3 shadow-sm">
                <h4 className="font-black text-xs text-red-900 uppercase tracking-wider">
                  {isEn ? 'Flexible Radius Filter Options:' : 'Các Mức Lọc Bán Kính Linh Hoạt:'}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#FFFDF9] border border-red-500/40 text-center">
                    <div className="font-black text-xs text-red-700">5 KM</div>
                    <div className="text-[10px] font-bold text-slate-600">Đi bộ / Đi dạo</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FFFDF9] border border-red-500/40 text-center">
                    <div className="font-black text-xs text-red-700">10 KM</div>
                    <div className="text-[10px] font-bold text-slate-600">Xe máy nội thành</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FFFDF9] border border-red-500/40 text-center">
                    <div className="font-black text-xs text-red-700">20 KM</div>
                    <div className="text-[10px] font-bold text-slate-600">Ô tô / Taxi</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FFFDF9] border border-red-500/40 text-center">
                    <div className="font-black text-xs text-red-700">30 KM</div>
                    <div className="text-[10px] font-bold text-slate-600">Tour ngoại thành</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CHỈ ĐƯỜNG THỰC TẾ OUTDOOR */}
          {activeTab === 'nav' && (
            <div className="space-y-3 animate-fade-in text-slate-800">
              <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-red-500/30 space-y-2 shadow-sm">
                <h4 className="font-black text-sm text-red-800 flex items-center gap-2">
                  <span className="text-lg">🚗</span>
                  <span>{isEn ? 'Seamless GPS Outdoor Map Integration' : 'Tự Động Mở Google Maps / Apple Maps Dẫn Đường'}</span>
                </h4>
                <p className="text-xs leading-relaxed font-medium">
                  Khi bạn bấm nút **[🚗 Chỉ đường]** tại bất kỳ Quán ăn, Khách sạn hay Danh thắng nào:
                </p>
                <ul className="text-xs space-y-1.5 font-semibold text-slate-700 pl-2">
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">📲</span>
                    <span>Trên **Android & Máy tính (Web)**: Tự động mở thẳng ứng dụng **Google Maps**.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-600">🍎</span>
                    <span>Trên **iOS (iPhone/iPad)**: Tự động kết nối trực tiếp đến **Apple Maps**.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: NÂNG CẤP LINH VẬT NGÔI SAO AI (LV.1 - LV.20) */}
          {activeTab === 'mascot' && (
            <div className="space-y-3 animate-fade-in text-slate-800">
              <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-red-500/30 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-sm text-red-800 flex items-center gap-2">
                    <span className="text-lg">⭐</span>
                    <span>{isEn ? 'AI Humanoid Star Progression' : 'Cấp Độ Trợ Lý Ngôi Sao AI (Lv.1 - Lv.20)'}</span>
                  </h4>
                  <span className="px-2.5 py-1 rounded-full bg-red-600 text-white font-mono font-black text-xs">
                    Cấp Hiện Tại: Lv.{level}
                  </span>
                </div>
                <p className="text-xs leading-relaxed font-medium">
                  Khám phá địa danh, check-in và tạo tour để tích lũy điểm kinh nghiệm (EXP) giúp Ngôi Sao AI của bạn tiến hóa ngoại hình rực rỡ từ **Lv.1** đến **Lv.20 Tối Cao Vũ Trụ**!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <div className="p-3 rounded-xl bg-[#EFEAD8] border border-red-500/30">
                  <div className="text-red-700 font-black">Lv.1 - Lv.5</div>
                  <div className="text-slate-600 text-[11px]">Sao AI Tập Sự</div>
                </div>
                <div className="p-3 rounded-xl bg-[#EFEAD8] border border-red-500/30">
                  <div className="text-red-700 font-black">Lv.6 - Lv.10</div>
                  <div className="text-slate-600 text-[11px]">Sao AI Dẫn Đường (Kính mát)</div>
                </div>
                <div className="p-3 rounded-xl bg-[#EFEAD8] border border-red-500/30">
                  <div className="text-red-700 font-black">Lv.11 - Lv.15</div>
                  <div className="text-slate-600 text-[11px]">Sao AI Hoàng Gia (Vương miện)</div>
                </div>
                <div className="p-3 rounded-xl bg-[#EFEAD8] border border-red-500/30">
                  <div className="text-red-700 font-black">Lv.16 - Lv.20</div>
                  <div className="text-slate-600 text-[11px]">Tối Cao Vũ Trụ (Cánh 3D)</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER ACTION BUTTONS */}
        <div className="flex items-center justify-between pt-4 mt-2 border-t border-red-500/20">
          {onRestartTour && (
            <button
              onClick={() => {
                onClose();
                onRestartTour();
              }}
              className="px-4 py-2 rounded-xl bg-red-600/10 border border-red-500/30 hover:bg-red-600/20 text-red-700 font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>🔄</span>
              <span>{isEn ? 'Replay Intro Tour' : 'Xem lại Tour Hướng Dẫn'}</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="px-6 py-2.5 ml-auto rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 active:scale-95 transition-all cursor-pointer"
          >
            {isEn ? '✖️ Close Guide' : '✖️ Đóng Cẩm Nang'}
          </button>
        </div>
      </div>
    </div>
  );
}
