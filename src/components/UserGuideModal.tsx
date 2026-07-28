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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in pointer-events-auto">
      {/* HIGH CONTRAST BEIGE & RED MODAL CONTAINER */}
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] border-4 border-red-600 rounded-3xl p-5 md:p-7 shadow-2xl shadow-red-950/50 text-slate-900 overflow-hidden flex flex-col max-h-[90vh] [transform:translate3d(0,0,0)] [will-change:transform]">
        {/* HEADER */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-red-600/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-700 border border-amber-400 flex items-center justify-center text-xl text-amber-300 animate-bounce shadow-md">
              ⭐
            </div>
            <div>
              <h2 className="text-base md:text-xl font-black text-amber-700 bg-amber-100/90 px-3 py-1 rounded-xl border border-amber-300 flex items-center gap-2 shadow-xs">
                <span>{isEn ? 'Vietnam Travel Interactive Guide' : 'Cẩm Nang Hướng Dẫn Du Khách'}</span>
              </h2>
              <p className="text-xs text-red-900 font-extrabold mt-0.5">
                {isEn ? 'Master 3D Map, Services Filter & Real Navigation' : 'Làm chủ Bản đồ 3D, Lọc dịch vụ & Chỉ đường thực tế'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-800 flex items-center justify-center text-base font-black transition-all cursor-pointer border border-red-300"
          >
            ✕
          </button>
        </div>

        {/* 4 TABS NAVIGATION BAR WITH HIGH CONTRAST BUTTONS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 bg-slate-200/90 rounded-2xl border border-slate-300 mb-4">
          <button
            onClick={() => setActiveTab('map')}
            className={`py-2.5 px-2 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'map'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md border border-red-400'
                : 'bg-white text-slate-900 hover:bg-red-50 hover:text-red-700 border border-slate-300'
            }`}
          >
            <span>📱</span>
            <span>{isEn ? '1. 3D Map' : '1. Bản Đồ 3D'}</span>
          </button>

          <button
            onClick={() => setActiveTab('radius')}
            className={`py-2.5 px-2 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'radius'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md border border-red-400'
                : 'bg-white text-slate-900 hover:bg-red-50 hover:text-red-700 border border-slate-300'
            }`}
          >
            <span>🍜</span>
            <span>{isEn ? '2. Services' : '2. Quán Ăn & Khách Sạn'}</span>
          </button>

          <button
            onClick={() => setActiveTab('nav')}
            className={`py-2.5 px-2 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'nav'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md border border-red-400'
                : 'bg-white text-slate-900 hover:bg-red-50 hover:text-red-700 border border-slate-300'
            }`}
          >
            <span>🚗</span>
            <span>{isEn ? '3. GPS Nav' : '3. Chỉ Đường GPS'}</span>
          </button>

          <button
            onClick={() => setActiveTab('mascot')}
            className={`py-2.5 px-2 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'mascot'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md border border-red-400'
                : 'bg-white text-slate-900 hover:bg-red-50 hover:text-red-700 border border-slate-300'
            }`}
          >
            <span>⭐</span>
            <span>{isEn ? '4. Star Mascot' : '4. Ngôi Sao Lv.X'}</span>
          </button>
        </div>

        {/* TAB CONTENT BODY WITH HIGH CONTRAST SOLID BLACK TEXT */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 p-1">
          {/* TAB 1: KHÁM PHÁ BẢN ĐỒ VIỆT NAM */}
          {activeTab === 'map' && (
            <div className="space-y-3 animate-fade-in text-slate-950">
              <div className="p-4 rounded-2xl bg-white border-2 border-red-200 space-y-2 shadow-sm">
                <h4 className="font-black text-sm md:text-base text-amber-700 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200 flex items-center gap-2">
                  <span className="text-lg">🗺️</span>
                  <span>{isEn ? 'Explore S-shaped Mainland Landmarks' : 'Khám Phá Danh Thắng Dải Đất Chữ S'}</span>
                </h4>
                <p className="text-xs md:text-sm leading-relaxed font-extrabold text-slate-950">
                  {isEn
                    ? 'Chạm vào các biểu tượng Marker danh thắng trên bản đồ để mở Bảng Chi Tiết Địa Điểm. Bạn có thể xem hình ảnh 360°, thông tin lịch sử văn hóa và thời tiết thực tế.'
                    : 'Chạm vào các biểu tượng Marker danh thắng trên bản đồ để mở Bảng Chi Tiết Địa Điểm. Bạn có thể xem hình ảnh 360°, thông tin lịch sử văn hóa và thời tiết thực tế.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-300 space-y-2 shadow-sm">
                <h4 className="font-black text-sm md:text-base text-red-800 flex items-center gap-2">
                  <span className="text-lg">🇻🇳</span>
                  <span>{isEn ? 'Sacred Hoang Sa & Truong Sa Archipelagos' : 'Hai Quần Đảo Thiêng Liêng Hoàng Sa & Trường Sa'}</span>
                </h4>
                <p className="text-xs md:text-sm leading-relaxed font-extrabold text-red-950">
                  {isEn
                    ? 'Hai quần đảo 🇻🇳 Hoàng Sa (TP. Đà Nẵng) và 🇻🇳 Trường Sa (Tỉnh Khánh Hòa) được thể hiện chuẩn địa lý tự nhiên thiêng liêng của Việt Nam dưới dạng Native Text Labels sang trọng.'
                    : 'Hai quần đảo 🇻🇳 Hoàng Sa (TP. Đà Nẵng) và 🇻🇳 Trường Sa (Tỉnh Khánh Hòa) được thể hiện chuẩn địa lý tự nhiên thiêng liêng của Việt Nam dưới dạng Native Text Labels sang trọng.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: TÌM QUÁN ĂN / KHÁCH SẠN THEO BÁN KÍNH */}
          {activeTab === 'radius' && (
            <div className="space-y-3 animate-fade-in text-slate-950">
              <div className="p-4 rounded-2xl bg-white border-2 border-red-200 space-y-2 shadow-sm">
                <h4 className="font-black text-sm md:text-base text-amber-700 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200 flex items-center gap-2">
                  <span className="text-lg">🍜</span>
                  <span>{isEn ? 'Filter Eateries, Cafes & Hotels Around You' : 'Lọc Danh Sách Quán Ăn, Quán Nước & Khách Sạn'}</span>
                </h4>
                <p className="text-xs md:text-sm leading-relaxed font-extrabold text-slate-950">
                  Mở **Bảng Chi Tiết Địa Điểm** ➔ Chọn mục **Quán Ăn** hoặc **Khách Sạn** để xem danh sách dịch vụ xung quanh địa điểm bạn chọn.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 space-y-3 shadow-sm">
                <h4 className="font-black text-xs text-amber-900 uppercase tracking-wider">
                  {isEn ? 'Flexible Radius Filter Options:' : 'Các Mức Lọc Bán Kính Linh Hoạt:'}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="p-2.5 rounded-xl bg-white border-2 border-amber-300 text-center shadow-xs">
                    <div className="font-black text-sm text-red-700">5 KM</div>
                    <div className="text-xs font-black text-slate-900">Đi bộ / Đi dạo</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border-2 border-amber-300 text-center shadow-xs">
                    <div className="font-black text-sm text-red-700">10 KM</div>
                    <div className="text-xs font-black text-slate-900">Xe máy nội thành</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border-2 border-amber-300 text-center shadow-xs">
                    <div className="font-black text-sm text-red-700">20 KM</div>
                    <div className="text-xs font-black text-slate-900">Ô tô / Taxi</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border-2 border-amber-300 text-center shadow-xs">
                    <div className="font-black text-sm text-red-700">30 KM</div>
                    <div className="text-xs font-black text-slate-900">Tour ngoại thành</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CHỈ ĐƯỜNG THỰC TẾ OUTDOOR */}
          {activeTab === 'nav' && (
            <div className="space-y-3 animate-fade-in text-slate-950">
              <div className="p-4 rounded-2xl bg-white border-2 border-red-200 space-y-2 shadow-sm">
                <h4 className="font-black text-sm md:text-base text-amber-700 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200 flex items-center gap-2">
                  <span className="text-lg">🚗</span>
                  <span>{isEn ? 'Seamless GPS Outdoor Map Integration' : 'Tự Động Mở Google Maps / Apple Maps Dẫn Đường'}</span>
                </h4>
                <p className="text-xs md:text-sm leading-relaxed font-extrabold text-slate-950">
                  Khi bạn bấm nút **[🚗 Chỉ đường]** tại bất kỳ Quán ăn, Khách sạn hay Danh thắng nào:
                </p>
                <ul className="text-xs md:text-sm space-y-2 font-black text-slate-900 pl-2">
                  <li className="flex items-center gap-2 bg-slate-100 p-2 rounded-xl border border-slate-300">
                    <span className="text-red-600 text-lg">📲</span>
                    <span>Trên **Android & Máy tính (Web)**: Tự động mở thẳng ứng dụng **Google Maps**.</span>
                  </li>
                  <li className="flex items-center gap-2 bg-slate-100 p-2 rounded-xl border border-slate-300">
                    <span className="text-red-600 text-lg">🍎</span>
                    <span>Trên **iOS (iPhone/iPad)**: Tự động kết nối trực tiếp đến **Apple Maps**.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: NÂNG CẤP LINH VẬT NGÔI SAO AI (LV.1 - LV.20) */}
          {activeTab === 'mascot' && (
            <div className="space-y-3 animate-fade-in text-slate-950">
              <div className="p-4 rounded-2xl bg-white border-2 border-red-200 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-sm md:text-base text-amber-700 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200 flex items-center gap-2">
                    <span className="text-lg">⭐</span>
                    <span>{isEn ? 'AI Humanoid Star Progression' : 'Cấp Độ Trợ Lý Ngôi Sao AI (Lv.1 - Lv.20)'}</span>
                  </h4>
                  <span className="px-3 py-1 rounded-full bg-red-700 text-amber-300 font-mono font-black text-xs border border-amber-400 shadow-xs">
                    Cấp Hiện Tại: Lv.{level}
                  </span>
                </div>
                <p className="text-xs md:text-sm leading-relaxed font-extrabold text-slate-950">
                  Khám phá địa danh, check-in và tạo tour để tích lũy điểm kinh nghiệm (EXP) giúp Ngôi Sao AI của bạn tiến hóa ngoại hình rực rỡ từ **Lv.1** đến **Lv.20 Tối Cao Vũ Trụ**!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-black">
                <div className="p-3 rounded-xl bg-white border-2 border-amber-300">
                  <div className="text-red-700 font-black">Lv.1 - Lv.5</div>
                  <div className="text-slate-950 text-xs">Sao AI Tập Sự</div>
                </div>
                <div className="p-3 rounded-xl bg-white border-2 border-amber-300">
                  <div className="text-red-700 font-black">Lv.6 - Lv.10</div>
                  <div className="text-slate-950 text-xs">Sao AI Dẫn Đường (Kính mát)</div>
                </div>
                <div className="p-3 rounded-xl bg-white border-2 border-amber-300">
                  <div className="text-red-700 font-black">Lv.11 - Lv.15</div>
                  <div className="text-slate-950 text-xs">Sao AI Hoàng Gia (Vương miện)</div>
                </div>
                <div className="p-3 rounded-xl bg-white border-2 border-amber-300">
                  <div className="text-red-700 font-black">Lv.16 - Lv.20</div>
                  <div className="text-slate-950 text-xs">Tối Cao Vũ Trụ (Cánh 3D)</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER ACTION BUTTONS */}
        <div className="flex items-center justify-between pt-4 mt-2 border-t-2 border-red-600/20">
          {onRestartTour && (
            <button
              onClick={() => {
                onClose();
                onRestartTour();
              }}
              className="px-4 py-2.5 rounded-xl bg-red-100 border border-red-300 hover:bg-red-200 text-red-800 font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <span>🔄</span>
              <span>{isEn ? 'Xem lại Tour Hướng Dẫn' : 'Xem lại Tour Hướng Dẫn'}</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="px-6 py-3 ml-auto rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-700/40 active:scale-95 transition-all cursor-pointer border border-red-400"
          >
            {isEn ? '✖️ ĐÓNG CẨM NANG' : '✖️ ĐÓNG CẨM NANG'}
          </button>
        </div>
      </div>
    </div>
  );
}
