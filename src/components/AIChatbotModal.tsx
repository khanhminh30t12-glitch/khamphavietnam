'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { regions } from '@/data/vietnamTourismData';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

const QUICK_PROMPT_CHIPS = [
  { id: 'food', label: '💡 Gợi ý món ăn ngon & rẻ gần đây', prompt: 'Gợi ý cho mình các món ăn đặc sản ngon, bổ, rẻ gần đây nhé!' },
  { id: 'itinerary', label: '🗺️ Lập lịch trình du lịch 3 ngày 2 đêm', prompt: 'Hãy thiết kế giúp mình lịch trình du lịch 3 ngày 2 đêm tối ưu nhất ở Việt Nam.' },
  { id: 'hotel', label: '🏨 Tìm khách sạn view đẹp dưới 500k', prompt: 'Gợi ý giúp mình những khách sạn hoặc homestay view đẹp giá dưới 500k/đêm.' },
  { id: 'weather', label: '☀️ Hôm nay thời tiết đi chơi ổn không?', prompt: 'Hôm nay thời tiết thế nào, có thích hợp để đi tham quan chụp ảnh không?' },
];

export default function AIChatbotModal() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome_msg',
      sender: 'ai',
      text: 'Xin chào! Tôi là Trợ Lý AI Du Lịch Rồng Việt Nam 🐉. Tôi có thể giúp bạn lập lịch trình, tìm món ăn đặc sản, khách sạn giá tốt hoặc giải đáp thắc mắc về các địa danh du lịch và biển đảo Việt Nam. Bạn cần hỗ trợ gì hôm nay?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Smart fallback response generator for offline/unconfigured API state
  const getSmartFallbackResponse = (userPrompt: string): string => {
    const promptLower = userPrompt.toLowerCase();

    if (promptLower.includes('món ăn') || promptLower.includes('ăn ngon') || promptLower.includes('đặc sản') || promptLower.includes('food')) {
      return `🐉 **Gợi ý ẩm thực 3 miền cực ngon & giá hợp lý:**

🍜 **Miền Bắc (Hà Nội):**
- **Phở Thìn Bờ Hồ** (50k - 70k): Nước dùng đậm đà, phở tái lăn thơm lừng.
- **Bún Chả Hương Liên** (80k - 120k): Món bún chả thơm lừng từng đón tiếp cựu Tổng thống Obama.

🍢 **Miền Trung (Đà Nẵng & Huế & Hội An):**
- **Bún Bò Huế O Phượng** (40k - 65k): Đậm đà hương vị sả ruốc truyền thống Cố Đô.
- **Cao Lầu Thanh Hội An** (35k - 50k): Sợi mì dai vàng giòn ăn kèm xá xíu mềm mại.

🍧 **Miền Nam (Sài Gòn):**
- **Bánh Mì Huỳnh Hoa** (60k): Ổ bánh mì đầy ặn paté và chả lụa nức tiếng.
- **Cơm Tấm Ba Gieo** (45k - 75k): Sườn nướng cháy xém thơm phức kèm chả trứng béo ngậy.`;
    }

    if (promptLower.includes('lịch trình') || promptLower.includes('3 ngày 2 đêm') || promptLower.includes('itinerary') || promptLower.includes('tour')) {
      return `🐉 **Gợi ý Lịch Trình Du Lịch 3 Ngày 2 Đêm Tuyệt Mới:**

📍 **NGÀY 1: Khám phá Di sản & Kiến trúc Văn hóa**
- **Sáng:** Đón bình minh, tham quan Văn Miếu - Quốc Tử Giám & Đại Nội Huế.
- **Trưa:** Thưởng thức Bún Chả / Bún Bò Huế chuẩn vị.
- **Chiều - Tối:** Thắp đèn lồng Phố Cổ Hội An hoặc dạo Hồ Hoàn Kiếm, ngắm cầu Rồng phun lửa.

📍 **NGÀY 2: Hành trình Biển Đảo & Check-in Thiên nhiên**
- **Sáng:** Đón gió biển tại Vịnh Hạ Long / Bán đảo Sơn Trà. Tìm hiểu mốc chủ quyền Quần đảo Hoàng Sa & Trường Sa.
- **Trưa:** Thưởng thức tiệc hải sản biển sâu tươi ngon.
- **Tối:** Thư giãn tại các quán cà phê sân thượng view toàn cảnh thành phố.

📍 **NGÀY 3: Mua sắm Đặc sản & Đổi quà lưu niệm**
- **Sáng:** Ghé thăm chợ truyền thống mua trà, bánh cốm, nước mắm truyền thống.
- **Chiều:** Thực hiện Check-in nhận 300 Points thưởng trên ứng dụng và hoàn thành hành trình!`;
    }

    if (promptLower.includes('khách sạn') || promptLower.includes('view đẹp') || promptLower.includes('500k') || promptLower.includes('hotel') || promptLower.includes('homestay')) {
      return `🐉 **Danh sách Khách sạn & Homestay view đẹp giá dưới 500k/đêm:**

🏨 **Hanoi Old Town Budget Hostel** (Chỉ từ 250k - 450k/đêm)
- Vị trí: Ngay trung tâm Phố Cổ Hà Nội. Phòng sạch đẹp, không gian ấm cúng.

🌿 **Huế Eco Garden Homestay** (Chỉ từ 300k - 500k/đêm)
- Vị trí: Ven dòng sông Hương thơ mộng. Nhà vườn xanh mát, yên bình chuẩn phong cách xứ Huế.

🌊 **Saigon Backpacker Boutique Lodge** (Chỉ từ 350k - 480k/đêm)
- Vị trí: Quận 1 gần Dinh Độc Lập & Nhà Thờ Đức Bà. Không gian hiện đại, đầy đủ tiện nghi.`;
    }

    if (promptLower.includes('thời tiết') || promptLower.includes('nắng') || promptLower.includes('mưa') || promptLower.includes('weather')) {
      return `🐉 **Dự báo thời tiết & Lời khuyên trải nghiệm:**

☀️ **Tình trạng:** Nắng nhẹ rực rỡ, độ ẩm 65%, nhiệt độ dễ chịu khoảng 26°C - 29°C.
📸 **Lời khuyên Trợ Lý AI:** Thời tiết cực kỳ thích hợp cho các hoạt động check-in ngoài trời, dạo biển và chụp ảnh cùng các cột mốc di tích lịch sử. Đừng quên trang bị kính râm, kem chống nắng và ô nhỏ nhé!`;
    }

    if (promptLower.includes('hoàng sa') || promptLower.includes('trường sa') || promptLower.includes('biển đảo') || promptLower.includes('chủ quyền')) {
      return `🇻🇳 **Thông tin Biển Đảo Thiêng Liêng Việt Nam:**

🇻🇳 **Quần đảo Hoàng Sa (TP. Đà Nẵng):** Tọa độ 16.5°N, 112.0°E. Quần đảo san hô nhiệt đới gồm hơn 30 đảo, đá, cồn cát. Từ thế kỷ XVII dưới triều Nguyễn, Đội Hoàng Sa đã thực thi chủ quyền Tổ quốc.

🇻🇳 **Quần đảo Trường Sa (Tỉnh Khánh Hòa):** Tọa độ 8.86°N, 111.91°E. Nổi bật với Cột mốc chủ quyền, Nhà giàn DK1, cây Bàng Vuông và Phong Ba kiên cường giữa đại dương.`;
    }

    return `🐉 Trợ lý Rồng AI đã ghi nhận câu hỏi của bạn: "${userPrompt}". 
Việt Nam có vô vàn danh lam thắng cảnh đẹp từ Bắc vào Nam và biển đảo thiêng liêng Hoàng Sa - Trường Sa. Bạn có thể sử dụng Bảng Lọc Bán Kính (3km - 30km) trên bản đồ để tìm thêm các nhà hàng, quán cà phê và khách sạn tuyệt vời nhất nhé!`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = textToSend || inputMessage;
    if (!queryText.trim() || isLoading) return;

    const userMsg: Message = {
      id: 'user_' + Date.now(),
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

      if (apiKey) {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: `Bạn là Rồng AI Trợ Lý Du Lịch Việt Nam thông minh, thân thiện. Hãy giải đáp thắc mắc sau của du khách một cách ngắn gọn, súc tích, sinh động bằng tiếng Việt với các biểu tượng emoji phù hợp. Câu hỏi: "${queryText}"`
                    }
                  ]
                }
              ]
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const aiReplyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiReplyText) {
            setMessages(prev => [
              ...prev,
              {
                id: 'ai_' + Date.now(),
                sender: 'ai',
                text: aiReplyText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]);
            setIsLoading(false);
            return;
          }
        }
      }
    } catch (err) {
      console.warn('Gemini API call warning, falling back to smart client engine:', err);
    }

    // Fallback response if API key is not configured or fails
    setTimeout(() => {
      const fallbackText = getSmartFallbackResponse(queryText);
      setMessages(prev => [
        ...prev,
        {
          id: 'ai_' + Date.now(),
          sender: 'ai',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsLoading(false);
    }, 600);
  };

  return (
    <>
      {/* FLOATING ACTION BUTTON (FAB) FOR AI ASSISTANT */}
      <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative px-4 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-400 hover:to-red-400 text-slate-950 font-black rounded-full shadow-2xl backdrop-blur-xl border border-amber-300/60 flex items-center gap-2.5 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
          title="Mở Trợ Lý Du Lịch AI 24/7"
        >
          <span className="text-xl animate-bounce">🤖</span>
          <span className="text-xs md:text-sm font-black tracking-wide hidden sm:inline">Trợ Lý AI</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute top-1 right-1" />
        </button>
      </div>

      {/* CHATBOT MODAL SLIDE-OVER / POPUP WINDOW */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          <div className="relative w-full sm:max-w-lg h-[85vh] sm:h-[650px] bg-slate-900/95 border border-amber-400/30 rounded-t-3xl sm:rounded-3xl shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden z-10">
            {/* Modal Header */}
            <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-xl shadow-lg border border-amber-300">
                  🐉
                </div>
                <div>
                  <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                    <span>Trợ Lý Rồng AI Du Lịch</span>
                    <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full font-bold border border-emerald-500/30">Online 24/7</span>
                  </h3>
                  <p className="text-[11px] text-slate-400">Tư vấn lịch trình, ẩm thực & khách sạn Việt Nam</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick Prompt Chips Bar */}
            <div className="px-3 py-2 bg-slate-950/50 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              {QUICK_PROMPT_CHIPS.map(chip => (
                <button
                  key={chip.id}
                  onClick={() => handleSendMessage(chip.prompt)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-amber-500/20 border border-slate-700 hover:border-amber-400/50 text-slate-300 hover:text-amber-300 text-xs font-semibold whitespace-nowrap transition-all active:scale-95 cursor-pointer shrink-0"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Messages Scroll Area */}
            <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4 touch-scroll">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 ${
                    msg.sender === 'user' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 border border-amber-400/40 text-amber-400'
                  }`}>
                    {msg.sender === 'user' ? '👤' : '🐉'}
                  </div>

                  <div className={`max-w-[80%] rounded-2xl p-3 text-xs md:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 font-semibold rounded-tr-none'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700 rounded-tl-none whitespace-pre-wrap'
                  }`}>
                    <div>{msg.text}</div>
                    <div className={`text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-slate-900/70' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-slate-400 text-xs italic p-2 bg-slate-800/40 rounded-xl w-max border border-slate-700/50">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>Rồng AI đang suy nghĩ câu trả lời...</span>
                </div>
              )}
            </div>

            {/* Input Box Bar */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Hỏi Rồng AI về địa danh, lịch trình, món ăn..."
                  className="flex-1 bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs md:text-sm text-white placeholder-slate-500 outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 text-slate-950 font-black rounded-xl text-xs md:text-sm transition-all active:scale-95 cursor-pointer shrink-0"
                >
                  Gửi 🚀
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
