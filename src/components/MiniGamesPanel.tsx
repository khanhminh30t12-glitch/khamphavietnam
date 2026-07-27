'use client';

import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { useLanguage } from '@/context/LanguageContext';
import LuckyWheel from './LuckyWheel';
import PuzzleGame from './PuzzleGame';

// Photo Quiz Questions Pool with Verified Unsplash Images
const PHOTO_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Đây là đặc sản ẩm thực biểu tượng nào nổi tiếng của Hà Nội?',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    options: ['Phở Bò Hà Nội', 'Bún Đậu Mắm Tôm', 'Bún Chả Hà Nội', 'Bánh Cốm Vòng'],
    correct: 0,
    explanation: 'Phở bò Hà Nội thơm mùi sả ruốc, quẩy giòn là di sản ẩm thực Thủ đô.'
  },
  {
    id: 2,
    question: 'Công trình kiến trúc 3D nổi tiếng này nằm ở di sản nào của Việt Nam?',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    options: ['Cầu Vàng Bà Nà Hills (Đà Nẵng)', 'Cầu Rồng Đà Nẵng', 'Cầu Kính Sa Pa', 'Cầu Tràng Tiền Huế'],
    correct: 0,
    explanation: 'Cầu Vàng Bà Nà Hills Đà Nẵng với đôi bàn tay đá khổng lồ thu hút hàng triệu du khách quốc tế.'
  },
  {
    id: 3,
    question: 'Tên gọi của khu di tích cố đô nguy nga hình dưới đây là gì?',
    image: 'https://images.unsplash.com/photo-1599708153386-62e270422119?auto=format&fit=crop&w=800&q=80',
    options: ['Đại Nội Huế', 'Hoàng Thành Thăng Long', 'Thành Nhà Hồ', 'Dinh Độc Lập'],
    correct: 0,
    explanation: 'Đại Nội Huế (Hoàng Thành & Tử Cấm Thành Huế) mang kiến trúc triều Nguyễn cổ kính.'
  },
  {
    id: 4,
    question: 'Ngôi chùa cổ có kiến trúc một cột độc đáo ở Hà Nội có tên là gì?',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    options: ['Chùa Trấn Quốc', 'Chùa Một Cột (Diên Hựu Tự)', 'Chùa Bái Đính', 'Chùa Hương'],
    correct: 1,
    explanation: 'Chùa Một Cột mô phỏng bông hoa sen nở trên mặt hồ nước, xây dựng từ thời Vua Lý Thái Tông.'
  },
  {
    id: 5,
    question: 'Món ăn đặc sản sông nước miền Tây giòn rụm cuốn rau sống này là gì?',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    options: ['Bánh Xèo Miền Tây', 'Bánh Khọt Vũng Tàu', 'Bánh Cống Sóc Trăng', 'Bánh Tai Yến'],
    correct: 0,
    explanation: 'Bánh xèo miền Tây giòn rụm cuốn với 20 loại rau sông đặc sản thanh mát.'
  }
];

export default function MiniGamesPanel() {
  const { addPoints, addExp } = useGame();
  const { t } = useLanguage();

  const [activeGame, setActiveGame] = useState<'wheel' | 'quiz' | 'puzzle' | 'ar'>('wheel');

  // --- PHOTO QUIZ STATE ---
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  const speakCelebration = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectAnswer = (index: number) => {
    if (quizAnswered) return;
    setSelectedOption(index);
    setQuizAnswered(true);

    const currentQ = PHOTO_QUIZ_QUESTIONS[currentQuizIdx];
    if (index === currentQ.correct) {
      addPoints(50);
      addExp(30);
      speakCelebration('Tuyệt vời! Bạn đã trả lời chính xác và nhận +50 điểm thưởng từ Rồng AI!');
    } else {
      speakCelebration('Rất tiếc! Hãy thử lại câu hỏi tiếp theo nhé!');
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setQuizAnswered(false);
    if (currentQuizIdx < PHOTO_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIdx(prev => prev + 1);
    } else {
      setCurrentQuizIdx(0);
    }
  };

  // --- SLIDING PUZZLE STATE (3x3) ---
  const [tiles, setTiles] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 0]);
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [moveCount, setMoveCount] = useState(0);

  const shufflePuzzle = () => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setTiles(arr);
    setPuzzleSolved(false);
    setMoveCount(0);
  };

  const handleTileClick = (index: number) => {
    if (puzzleSolved) return;
    const zeroIndex = tiles.indexOf(0);
    const isAdjacent =
      (Math.abs(index - zeroIndex) === 1 && Math.floor(index / 3) === Math.floor(zeroIndex / 3)) ||
      Math.abs(index - zeroIndex) === 3;

    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[zeroIndex]] = [newTiles[zeroIndex], newTiles[index]];
      setTiles(newTiles);
      setMoveCount(prev => prev + 1);

      const isWin = newTiles.every((val, i) => (i === 8 ? val === 0 : val === i + 1));
      if (isWin) {
        setPuzzleSolved(true);
        addPoints(300);
        addExp(150);
        speakCelebration('Chúc mừng bạn đã ghép hoàn thiện bức tranh di sản 3D!');
      }
    }
  };

  // --- AR CHECK-IN STATE ---
  const [arCheckedIn, setArCheckedIn] = useState(false);

  const handleArPhoto = () => {
    setArCheckedIn(true);
    addPoints(150);
    addExp(100);
    speakCelebration('Check in AR thành công! Bạn nhận được 150 điểm thưởng!');
  };

  return (
    <div className="w-full bg-slate-900 text-white rounded-3xl p-4 md:p-6 shadow-2xl border border-slate-800">
      {/* Sub-navigation tabs */}
      <div className="flex bg-slate-800/80 p-1.5 rounded-2xl mb-6 overflow-x-auto no-scrollbar gap-1 border border-slate-700">
        <button
          onClick={() => setActiveGame('wheel')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
            activeGame === 'wheel'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>🎡</span>
          <span>Vòng Quay & Nhiệm Vụ</span>
        </button>

        <button
          onClick={() => setActiveGame('quiz')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
            activeGame === 'quiz'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>🧠</span>
          <span>Đố Vui Hình Ảnh</span>
        </button>

        <button
          onClick={() => setActiveGame('puzzle')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
            activeGame === 'puzzle'
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>🧩</span>
          <span>Ghép Hình 3D</span>
        </button>

        <button
          onClick={() => setActiveGame('ar')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
            activeGame === 'ar'
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>📸</span>
          <span>AR Check-in</span>
        </button>
      </div>

      {/* GAME 1: LUCKY WHEEL & MISSIONS */}
      {activeGame === 'wheel' && <LuckyWheel />}

      {/* GAME 2: PHOTO QUIZ GAME */}
      {activeGame === 'quiz' && (
        <div className="max-w-xl mx-auto py-2">
          <div className="flex justify-between items-center mb-3">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30">
              Câu hỏi {currentQuizIdx + 1} / {PHOTO_QUIZ_QUESTIONS.length}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Đúng nhận <strong className="text-amber-400">+50 Points</strong>
            </span>
          </div>

          <div className="bg-slate-800/90 p-5 rounded-3xl border border-slate-700/80 mb-4 shadow-xl">
            {/* ACCURATE PHOTO PREVIEW */}
            <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 border border-slate-700 shadow-md">
              <img
                src={PHOTO_QUIZ_QUESTIONS[currentQuizIdx].image}
                alt="Quiz image"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute top-2 right-2 px-2.5 py-1 bg-slate-950/80 backdrop-blur rounded-full text-[10px] text-amber-300 font-bold">
                📷 Ảnh Minh Họa Thực Tế
              </div>
            </div>

            <h4 className="font-extrabold text-base md:text-lg text-slate-100 mb-4 leading-relaxed">
              {PHOTO_QUIZ_QUESTIONS[currentQuizIdx].question}
            </h4>

            <div className="space-y-2.5">
              {PHOTO_QUIZ_QUESTIONS[currentQuizIdx].options.map((opt, i) => {
                let btnStyle = 'bg-slate-700/60 hover:bg-slate-700 text-slate-200 border-slate-600';
                if (quizAnswered) {
                  if (i === PHOTO_QUIZ_QUESTIONS[currentQuizIdx].correct) {
                    btnStyle = 'bg-emerald-600 text-white font-bold border-emerald-400 shadow-lg';
                  } else if (i === selectedOption) {
                    btnStyle = 'bg-rose-600 text-white font-bold border-rose-400';
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelectAnswer(i)}
                    disabled={quizAnswered}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm font-semibold transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {quizAnswered && i === PHOTO_QUIZ_QUESTIONS[currentQuizIdx].correct && <span>✅ (Đúng)</span>}
                    {quizAnswered && i === selectedOption && i !== PHOTO_QUIZ_QUESTIONS[currentQuizIdx].correct && <span>❌</span>}
                  </button>
                );
              })}
            </div>

            {quizAnswered && (
              <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-700 text-xs text-slate-300">
                🐉 <strong className="text-amber-400">Rồng AI giải thích:</strong> {PHOTO_QUIZ_QUESTIONS[currentQuizIdx].explanation}
              </div>
            )}
          </div>

          {quizAnswered && (
            <button
              onClick={handleNextQuestion}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black rounded-2xl text-xs md:text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              Câu Tiếp Theo ➔
            </button>
          )}
        </div>
      )}

      {/* GAME 3: 7 WONDERS PUZZLE GAME */}
      {activeGame === 'puzzle' && <PuzzleGame />}

      {/* GAME 4: AR CHECK-IN CHALLENGE */}
      {activeGame === 'ar' && (
        <div className="flex flex-col items-center text-center py-4 max-w-md mx-auto">
          <div className="relative w-full h-56 rounded-2xl bg-slate-950 overflow-hidden border border-slate-800 shadow-2xl mb-4 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
              alt="AR View"
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-pulse">
              <div className="p-3 bg-amber-500/30 backdrop-blur-md border border-amber-400/50 rounded-full text-4xl shadow-2xl">
                🐉
              </div>
            </div>

            <div className="absolute bottom-2 left-2 right-2 p-2 bg-slate-900/80 backdrop-blur rounded-xl text-[11px] text-amber-300 font-bold">
              📸 Thử thách AR: Chụp ảnh cùng Rồng AI tại Di Sản Việt Nam
            </div>
          </div>

          {arCheckedIn ? (
            <div className="p-3 bg-pink-500/20 border border-pink-400/40 rounded-2xl text-pink-300 font-bold text-sm text-center animate-fade-in">
              ✨ Đã Check-in AR thành công! Bạn nhận +150 Điểm Thưởng & Danh hiệu "Nhiếp Ảnh Gia Rồng"!
            </div>
          ) : (
            <button
              onClick={handleArPhoto}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-black rounded-2xl text-xs md:text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>📸</span>
              <span>Chụp Ảnh AR & Nhận +150 Điểm</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
