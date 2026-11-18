import React from 'react';
import { Calendar as CalendarIcon, ArrowUpRight } from 'lucide-react';
import { CULTURAL_CALENDAR_EVENTS, STUDENT_TIMETABLE } from '../../data/initialData.js';

export default function CulturalCalendar({
  theme,
  selectedCultureEvent,
  setSelectedCultureEvent
}) {
  return (
    <div className={`p-5 rounded-3xl border ${theme.card}`}>
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2.5 rounded-2xl bg-sky-600 text-white">
          <CalendarIcon className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-extrabold text-base">글로벌 기념일 & 유학생 시간표 공유</h2>
          <p className={`text-xs ${theme.subtext}`}>영국 현지 기념일 설명 카드 & UK/KR 자동 변환 시간표</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {CULTURAL_CALENDAR_EVENTS.map((ev) => (
          <div
            key={ev.id}
            onClick={() => setSelectedCultureEvent(ev)}
            className={`p-3 rounded-2xl border cursor-pointer transition flex items-center justify-between gap-2 ${
              selectedCultureEvent?.id === ev.id ? `${theme.accentSoft} ring-2 ring-current/20` : theme.card
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-xl shrink-0">{ev.flag}</span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-extrabold">{ev.date}</span>
                  <span className="text-xs font-bold truncate">{ev.title}</span>
                </div>
                <p className={`text-[11px] ${theme.subtext} truncate`}>{ev.shortDesc}</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 shrink-0 opacity-60" />
          </div>
        ))}
      </div>

      {selectedCultureEvent && (
        <div className={`p-4 rounded-2xl border ${theme.accentSoft} mb-5`}>
          <span className="text-xs font-extrabold block mb-1.5">{selectedCultureEvent.familyCard.headline}</span>
          <p className="text-xs leading-relaxed mb-2.5">{selectedCultureEvent.familyCard.explanation}</p>
          <div className="p-2.5 rounded-xl bg-black/10 text-xs">
            <span className="font-bold block mb-0.5">💬 가족 대화 시작 추천 멘트:</span>
            <span className="italic">{selectedCultureEvent.familyCard.conversationStarter}</span>
          </div>
        </div>
      )}

      <div className="pt-3 border-t border-slate-500/15 space-y-2">
        <span className="text-xs font-extrabold block">📅 가족 공유 유학생 일일 시간표 (영국 ⇄ 한국 자동 매핑)</span>
        {STUDENT_TIMETABLE.map((slot, i) => (
          <div
            key={i}
            className={`p-3 rounded-2xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1 ${
              slot.status === 'available' ? 'bg-emerald-500/15 text-emerald-500 font-bold border border-emerald-500/30' : theme.badge
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

