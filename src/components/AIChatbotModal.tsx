'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { regions } from '@/data/vietnamTourismData';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

interface AIChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChatbotModal({ isOpen, onClose }: AIChatbotModalProps) {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: isEn
        ? 'Xin chào! I am your AI Travel Assistant. How can I help you explore Vietnam today?'
        : 'Xin chào! Tôi là Trợ Lý Rồng AI Du Lịch. Tôi có thể giúp gì cho chuyến hành trình khám phá Việt Nam của bạn hôm nay?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const quickPrompts = [
    {
      label: isEn ? '💡 Best local food nearby' : '💡 Gợi ý món ăn ngon & rẻ gần đây',
      query: isEn ? 'Recommend popular local dishes nearby' : 'Cho tôi gợi ý món ăn đặc sản ngon bổ rẻ quanh đây'
    },
    {
      label: isEn ? '🗺️ 3-day travel itinerary' : '🗺️ Lập lịch trình du lịch 3 ngày 2 đêm',
      query: isEn ? 'Create a 3-day 2-night itinerary for Vietnam' : 'Gợi ý lịch trình du lịch 3 ngày 2 đêm tối ưu nhất'
    },
    {
      label: isEn ? '🏨 Nice hotels under $20' : '🏨 Tìm khách sạn view đẹp dưới 500k',
      query: isEn ? 'Find budget hotels with great view under 500k VND' : 'Gợi ý khách sạn view đẹp giá mềm dưới 500.000đ/đêm'
    },
    {
      label: isEn ? '☀️ Weather & trip advice' : '☀️ Hôm nay thời tiết đi chơi ổn không?',
      query: isEn ? 'How is the weather for traveling today?' : 'Thời tiết hôm nay có thích hợp đi du lịch chụp ảnh không?'
    }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateAIResponse = (userQuery: string): string => {
    const q = userQuery.toLowerCase();

    if (q.includes('ăn') || q.includes('món') || q.includes('phở') || q.includes('bún') || q.includes('food')) {
      return isEn
        ? '🍜 Excellent culinary choice! In Hanoi, try Pho Thin & Bun Cha Cua Dong (40k-60k). In Hue, sample Bun Bo Hue & Banh Beo. In Da Nang/Hoi An, don\'t miss Mi Quang & Banh Mi Hoi An!'
        : '🍜 Ẩm thực Việt Nam vô cùng phong phú! Ở Miền Bắc bạn nên thử Phở Thìn Bờ Hồ, Bún Chả Cửa Đông (40k - 60k). Ở Miền Trung không thể bỏ qua Bún bò Huế, Mì Quảng Đà Nẵng & Bánh mì Hội An nổi tiếng thế giới nhé!';
    }

    if (q.includes('lịch trình') || q.includes('3 ngày') || q.includes('tour') || q.includes('itinerary')) {
      return isEn
        ? '🗺️ Recommended 3-Day 2-Night Itinerary:\n• Day 1: Explore Hanoi Old Quarter & Temple of Literature.\n• Day 2: Cruise Halong Bay 3D & Sung Sot Cave.\n• Day 3: Sapa Pine Forest & Fansipan Peak check-in!'
        : '🗺️ Lợi ý Lịch Trình 3 Ngày 2 Đêm Tuyệt Vời:\n• Ngày 1: Tham quan Phố Cổ Hà Nội, Văn Miếu - Quốc Tử Giám & Hồ Hoàn Kiếm.\n• Ngày 2: Trải nghiệm Du thuyền Vịnh Hạ Long, thăm Hang Sửng Sốt.\n• Ngày 3: Chinh phục Đỉnh Fansipan Sa Pa & săn mây đồi thông!';
    }

    if (q.includes('khách sạn') || q.includes('hotel') || q.includes('500k') || q.includes('ở')) {
      return isEn
        ? '🏨 Top Budget Hotels under 500k VND:\n• Hanoi Old Town Budget Hostel (250k - 400k/night)\n• Hue Cozy Homestay (300k - 450k/night)\n• Da Nang Beachfront Mini Hotel (350k - 500k/night).'
        : '🏨 Gợi ý Khách sạn / Homestay View Đẹp dưới 500k:\n• Hanoi Old Town Budget Hostel: 250k - 400k/đêm ngay Phố Cổ.\n• Hue Cozy Homestay: 300k - 450k/đêm trung tâm Huế.\n• Da Nang Beachside Homestay: 350k - 500k/đêm ngắm biển Mỹ Khê!';
    }

    if (q.includes('thời tiết') || q.includes('mưa') || q.includes('nắng') || q.includes('weather')) {
      return isEn
        ? '☀️ Today\'s Travel Weather: Warm and clear with mild ocean breeze! Perfect for outdoor 3D landmark exploration & photo check-ins.'
        : '☀️ Thời tiết du lịch hôm nay: Nắng ấm tự nhiên 28°C, không khí thoáng mát nhẹ nhàng. Rất thích hợp cho các hoạt động tham quan di sản ngoài trời & chụp ảnh Check-in!';
    }

    if (q.includes('hoàng sa') || q.includes('trường sa') || q.includes('đảo') || q.includes('biển')) {
      return isEn
        ? '🇻🇳 Hoang Sa (Da Nang) & Truong Sa (Khanh Hoa) archipelagos are sacred, integral territories of Vietnam, featuring coral reefs & national lighthouses!'
        : '🇻🇳 Quần đảo Hoàng Sa (TP. Đà Nẵng) và Quần đảo Trường Sa (Tỉnh Khánh Hòa) là vùng biển đảo thiêng liêng thuộc chủ quyền không thể tách rời của Việt Nam, nổi tiếng với các rạn san hô hùng vĩ và cột mốc chủ quyền rực rỡ!';
    }

    return isEn
      ? `🤖 Thank you for asking! I've noted: "${userQuery}". You can tap on any landmark or POI on the 3D map to view instant directions, nearby eateries & hotel options!`
      : `🤖 Rồng AI đã ghi nhận thắc mắc của bạn: "${userQuery}". Bạn có thể nhấp trực tiếp vào bất kỳ danh thắng nào trên Bản đồ 3D để xem chỉ đường real-time, danh sách quán ăn & khách sạn lân cận nhé!`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const aiReply = generateAIResponse(query);
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 750);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg h-[85vh] md:h-[620px] bg-slate-900/95 border border-amber-400/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden [transform:translate3d(0,0,0)] [will-change:transform]">
        {/* CHATBOT HEADER */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-xl shadow-lg animate-pulse">
              🤖
            </div>
            <div>
              <h3 className="font-black text-sm md:text-base text-amber-400 flex items-center gap-2">
                {isEn ? 'AI Travel Assistant 24/7' : 'Trợ Lý Rồng AI Du Lịch 24/7'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {isEn ? 'Online • Smart Vietnam Travel Advisor' : 'Trực tuyến • Tư vấn du lịch Việt Nam thông minh'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-sm active:scale-95 transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* QUICK PROMPT CHIPS */}
        <div className="p-3 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p.query)}
              className="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px] font-bold shrink-0 active:scale-95 transition-all cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* MESSAGES BODY */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 touch-scroll text-xs md:text-sm">
          {messages.map(m => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} animate-slide-up`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed font-medium ${
                  m.sender === 'user'
                    ? 'bg-amber-500 text-slate-950 font-bold rounded-tr-none shadow-md'
                    : 'bg-slate-800 text-slate-100 border border-slate-700/80 rounded-tl-none whitespace-pre-line shadow-md'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[9px] text-slate-500 mt-1 px-1">{m.timestamp}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 max-w-[120px]">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs text-amber-300 font-bold">{isEn ? 'AI is typing...' : 'Rồng AI đang soạn...'}</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* INPUT FORM FOOTER */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 shrink-0">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={isEn ? 'Ask AI about food, hotels, weather or routes...' : 'Hỏi Rồng AI về món ăn, khách sạn, thời tiết...'}
              className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs md:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs md:text-sm active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {isEn ? 'Send ✈️' : 'Gửi ✈️'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
