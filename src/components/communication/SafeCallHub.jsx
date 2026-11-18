import React from 'react';
import { Phone, Video, MessageSquare } from 'lucide-react';
import { CONTACTS } from '../../data/initialData.js';

export default function SafeCallHub({
  theme,
  callerPerspective,
  setCallerPerspective,
  handleInitiateCall,
  reservedMessages
}) {
  return (
    <div className={`p-5 rounded-3xl border ${theme.card}`}>
      <div className="flex items-center gap-2.5 mb-3">
        <div className="p-2.5 rounded-2xl bg-emerald-600 text-white">
          <Phone className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-extrabold text-base">인터넷 무료 통화 & 시차 가드</h2>
          <p className={`text-xs ${theme.subtext}`}>통화 전 현지 시각과 수업/수면 상태를 먼저 안내합니다</p>
        </div>
      </div>

      <div className={`p-2.5 rounded-2xl mb-4 border ${theme.accentSoft} flex flex-wrap items-center justify-between gap-2`}>
        <span className="text-xs font-bold pl-1">통화 시점 시뮬레이션:</span>
        <div className="flex gap-1.5">
          <button
            onClick={() => setCallerPerspective('family_to_uk')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition ${callerPerspective === 'family_to_uk' ? theme.accent : 'opacity-70'}`}
          >
            한국 가족 ➔ 영국 유학생
          </button>
          <button
            onClick={() => setCallerPerspective('uk_to_family')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition ${callerPerspective === 'uk_to_family' ? theme.accent : 'opacity-70'}`}
          >
            영국 유학생 ➔ 한국 본가
          </button>
        </div>
      </div>

      <div className="space-y-2.5">
        {CONTACTS.map((person) => (
          <div key={person.id} className={`p-3.5 rounded-2xl border ${theme.card} flex items-center justify-between gap-3`}>
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-slate-500/10 flex items-center justify-center text-2xl shrink-0">
                {person.avatar}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm truncate">{person.name}</p>
                <p className={`text-xs ${theme.subtext} truncate`}>{person.statusText}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => handleInitiateCall(person, 'voice')}
                className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500 hover:text-white transition"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleInitiateCall(person, 'video')}
                className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-500 hover:bg-indigo-500 hover:text-white transition"
              >
                <Video className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleInitiateCall(person, 'message')}
                className={`p-2.5 rounded-xl ${theme.badge}`}
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-500/15 space-y-2">
        <span className="text-xs font-bold block">💌 시차 배려 안심 메시지함 ({reservedMessages.length}건)</span>
        {reservedMessages.map((m) => (
          <div key={m.id} className={`p-3 rounded-2xl text-xs border ${theme.accentSoft}`}>
            <div className="flex justify-between font-bold mb-1">
              <span>{m.from}</span>
              <span className="text-[10px] opacity-75">{m.time}</span>
            </div>
            <p>{m.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

