'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export interface NoteItem {
  id: string;
  title: string;
  landmarkName?: string;
  completed: boolean;
}

const DEFAULT_CHECKLIST: NoteItem[] = [
  { id: 'c1', title: 'Hộ chiếu / Căn cước công dân (Passport / ID Card)', completed: true },
  { id: 'c2', title: 'Kem chống nắng & Kính mát (Sunscreen & Sunglasses)', completed: false },
  { id: 'c3', title: 'Sạc dự phòng & Dây sạc (Power Bank & Charger)', completed: true },
  { id: 'c4', title: 'Máy ảnh / Điện thoại sẵn 100% pin (Camera / Phone)', completed: false },
  { id: 'c5', title: 'Áo mưa cá nhân / Ô che nắng (Raincoat / Umbrella)', completed: false },
  { id: 'c6', title: 'Thuốc cá nhân & Băng cá nhân (Personal Medicine)', completed: false }
];

export default function TravelNotesPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t, tr, language } = useLanguage();

  const [checklist, setChecklist] = useState<NoteItem[]>(DEFAULT_CHECKLIST);
  const [customNotes, setCustomNotes] = useState<NoteItem[]>([]);
  const [newCheckItem, setNewCheckItem] = useState('');
  const [newNoteText, setNewNoteText] = useState('');

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCheck = localStorage.getItem('travel_checklist');
      if (savedCheck) {
        try { setChecklist(JSON.parse(savedCheck)); } catch (e) {}
      }

      const savedNotes = localStorage.getItem('travel_notes_list');
      if (savedNotes) {
        try { setCustomNotes(JSON.parse(savedNotes)); } catch (e) {}
      }
    }
  }, []);

  // Save to localStorage
  const saveChecklist = (items: NoteItem[]) => {
    setChecklist(items);
    localStorage.setItem('travel_checklist', JSON.stringify(items));
  };

  const saveNotes = (items: NoteItem[]) => {
    setCustomNotes(items);
    localStorage.setItem('travel_notes_list', JSON.stringify(items));
  };

  const handleToggleCheck = (id: string) => {
    const updated = checklist.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    saveChecklist(updated);
  };

  const handleAddCheckItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCheckItem.trim()) return;
    const newItem: NoteItem = {
      id: 'check_' + Date.now(),
      title: newCheckItem.trim(),
      completed: false
    };
    saveChecklist([...checklist, newItem]);
    setNewCheckItem('');
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    const newNote: NoteItem = {
      id: 'note_' + Date.now(),
      title: newNoteText.trim(),
      completed: false
    };
    saveNotes([...customNotes, newNote]);
    setNewNoteText('');
  };

  const handleDeleteNote = (id: string) => {
    saveNotes(customNotes.filter(n => n.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-[9999] w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col text-white animate-slide-in-right [transform:translate3d(0,0,0)] [will-change:transform]">
      {/* Header */}
      <div className="p-5 bg-slate-950 border-b border-slate-800 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl shadow-lg shrink-0">
            📝
          </div>
          <div>
            <h2 className="text-base md:text-lg font-black text-amber-400 leading-tight">
              {tr('travel_notes_title')}
            </h2>
            <p className="text-[11px] text-slate-400 font-medium">{tr('travel_notes_sub')}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center border border-slate-700 active:scale-95 transition-all"
        >
          ✕
        </button>
      </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-6 no-scrollbar">
          
          {/* SECTION 1: PACKING CHECKLIST */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 shadow-lg">
            <h3 className="font-extrabold text-sm text-amber-400 mb-3 flex items-center gap-2 border-b border-slate-800 pb-2">
              <span>🎒</span>
              <span>Danh Sách Đồ Dùng Cần Chuẩn Bị (Packing Checklist)</span>
            </h3>

            {/* Checklist Items */}
            <div className="space-y-2 mb-3">
              {checklist.map(item => (
                <label
                  key={item.id}
                  className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer border transition-all ${
                    item.completed
                      ? 'bg-slate-900/40 border-slate-800/60 line-through text-slate-500'
                      : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-amber-500/40'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleToggleCheck(item.id)}
                    className="w-4 h-4 text-amber-500 rounded focus:ring-amber-400 accent-amber-500"
                  />
                  <span className="text-xs md:text-sm font-semibold">{item.title}</span>
                </label>
              ))}
            </div>

            {/* Add New Check Item Form */}
            <form onSubmit={handleAddCheckItem} className="flex gap-2">
              <input
                type="text"
                value={newCheckItem}
                onChange={e => setNewCheckItem(e.target.value)}
                placeholder="Thêm món đồ cần mang..."
                className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md active:scale-95"
              >
                + Thêm
              </button>
            </form>
          </div>

          {/* SECTION 2: PERSONAL TRAVEL REMINDERS / NOTES */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 shadow-lg">
            <h3 className="font-extrabold text-sm text-emerald-400 mb-3 flex items-center gap-2 border-b border-slate-800 pb-2">
              <span>📌</span>
              <span>Ghi Chú Nhắc Nhở Chuyến Đi (Travel Reminders)</span>
            </h3>

            {/* Notes List */}
            {customNotes.length === 0 ? (
              <p className="text-xs text-slate-500 italic mb-3">Chưa có ghi chú nào. Hãy thêm ghi chú cho chuyến đi của bạn!</p>
            ) : (
              <div className="space-y-2 mb-3">
                {customNotes.map(note => (
                  <div
                    key={note.id}
                    className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between gap-2"
                  >
                    <div className="text-xs text-slate-200 font-semibold leading-relaxed">
                      ✍️ {note.title}
                    </div>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-xs text-rose-400 hover:text-rose-300 px-2 py-1 bg-rose-500/10 rounded-lg border border-rose-500/20"
                    >
                      Xóa
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Note Form */}
            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                value={newNoteText}
                onChange={e => setNewNoteText(e.target.value)}
                placeholder="Ví dụ: Ghé Phở Thìn lúc 8h sáng..."
                className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-md active:scale-95"
              >
                + Lưu Ghi Chú
              </button>
            </form>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0 text-center text-xs text-slate-400 font-medium">
          {tr('storage_hint')}
        </div>

    </div>
  );
}
