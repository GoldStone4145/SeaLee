import React, { useState } from 'react';
import { Calendar as CalendarIcon, ArrowUpRight } from 'lucide-react';
import { CULTURAL_CALENDAR_EVENTS, STUDENT_TIMETABLE } from '../../constants/initialData';

export default function CulturalCalendar({ theme, onSendStarterToChat }) {
  const [selectedCultureEvent, setSelectedCultureEvent] = useState(CULTURAL_CALENDAR_EVENTS[0]);

  return (
    <div className={`p-5 rounded-3xl border ${theme.card} space-y-4`}>
      <div className="flex items-center gap-2.5">
        <div className="p-2.5 rounded-2xl bg-sky-600 text-white">
          <CalendarIcon className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-extrabold text-base sm:text-lg">글로벌 기념일 문화 카드 & 유학생 시간표 공유</h2>
          <p className={`text-xs ${theme.subtext}`}>
            영국과 한국의 기념일 정보를 가족 눈높이로 알려주고 내 수업·생활 시간표를 공유합니다
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {CULTURAL_CALENDAR_EVENTS.map((ev) => (
          <div
            key={ev.id}
            onClick={() => setSelectedCultureEvent(ev)}
            className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition ${
              selectedCultureEvent && selectedCultureEvent.id === ev.id
                ? `${theme.accentSoft} ring-2 ring-current/20`
                : theme.card
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{ev.flag}</span>
              <div>
                <p className="text-xs font-extrabold">
                  {ev.date} • {ev.title}
                </p>
                <p className={`text-[11px] ${theme.subtext}`}>{ev.shortDesc}</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 opacity-60" />
          </div>
        ))}
      </div>

      {selectedCultureEvent && (
        <div className={`p-4 rounded-2xl border ${theme.accentSoft}`}>
          <p className="text-xs font-extrabold mb-1.5">{selectedCultureEvent.familyCard.headline}</p>
          <p className="text-xs leading-relaxed mb-3">{selectedCultureEvent.familyCard.explanation}</p>
          <div className="p-3 rounded-xl bg-black/10 text-xs flex items-center justify-between gap-2">
            <div>
              <span className="font-bold block mb-0.5">💬 가족 대화 시작 추천 멘트:</span>
              <span className="italic">{selectedCultureEvent.familyCard.conversationStarter}</span>
            </div>
            <button
              onClick={() => onSendStarterToChat(selectedCultureEvent.familyCard.conversationStarter.replace(/"/g, ''))}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold shrink-0 ${theme.accent}`}
            >
              채팅방으로 보내기
            </button>
          </div>
        </div>
      )}

      <div className="pt-3 border-t border-slate-500/15 space-y-2">
        <span className="text-xs font-extrabold block">📅 가족 공유 유학생 일일 시간표 (영국 ⇄ 한국 자동 변환)</span>
        {STUDENT_TIMETABLE.map((slot, i) => (
          <div
            key={i}
            className={`p-3 rounded-2xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1 ${
              slot.status === 'available'
                ? 'bg-emerald-500/15 text-emerald-500 font-bold border border-emerald-500/30'
                : theme.badge
            }`}
          >
            <div>
              <span className="font-extrabold mr-2">🇬🇧 {slot.time}</span>
              <span>{slot.title}</span>
            </div>
            <span className="text-[11px] opacity-85 font-semibold">🇰🇷 {slot.krTime}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

