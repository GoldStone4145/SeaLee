import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { STUDENT_STATUS_MODES } from '../../constants/themes';

export default function DualClockBar({
  theme,
  t,
  timeInfo,
  simulateSummerTime,
  setSimulateSummerTime,
  timePreset,
  onSelectTimePreset,
  studentStatusId,
  setStudentStatusId,
  currentStatusObj,
  customStatusNote,
  setCustomStatusNote,
  showNotification
}) {
  const [isEditingStatusMsg, setIsEditingStatusMsg] = useState(false);

  return (
    <section className={`p-3.5 rounded-3xl border ${theme.card} mb-4`}>
      <div className="grid grid-cols-11 items-center gap-1 pb-2.5 border-b border-slate-500/15">
        {/* 영국 시계 */}
        <div className="col-span-4 flex items-center gap-2">
          <span className="text-xl">🇬🇧</span>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className={`text-[10px] font-bold ${theme.subtext} truncate`}>{t.ukCity}</span>
              <span className="text-[9px] px-1 rounded bg-indigo-500/15 text-indigo-400 font-bold">
                {simulateSummerTime ? 'BST' : 'GMT'}
              </span>
            </div>
            <div className="text-sm sm:text-base font-black tabular-nums truncate">{timeInfo.londonTimeStr}</div>
          </div>
        </div>

        {/* 시차 & 서머타임 스위치 */}
        <div className="col-span-3 flex flex-col items-center justify-center text-center">
          <button
            onClick={() => {
              setSimulateSummerTime(!simulateSummerTime);
              showNotification(
                !simulateSummerTime ? '☀️ 영국 서머타임(BST) 적용: 시차 8시간' : '❄️ 영국 표준시(GMT) 적용: 시차 9시간'
              );
            }}
            className={`px-2 py-1 rounded-xl text-[10px] font-extrabold border flex items-center gap-1 ${
              simulateSummerTime ? 'bg-amber-500/20 text-amber-500 border-amber-500/40' : theme.accentSoft
            }`}
          >
            <RefreshCw className="w-3 h-3" />
            <span>-{timeInfo.timeDiffHours}{t.hours}</span>
          </button>
          <span className={`text-[9px] mt-0.5 ${theme.subtext}`}>
            {simulateSummerTime ? t.dstOn : t.dstToggle}
          </span>
        </div>

        {/* 한국 시계 */}
        <div className="col-span-4 flex items-center justify-end gap-2 text-right">
          <div className="min-w-0">
            <div className="flex items-center justify-end gap-1">
              <span className="text-[9px] px-1 rounded bg-emerald-500/15 text-emerald-500 font-bold">KST</span>
              <span className={`text-[10px] font-bold ${theme.subtext} truncate`}>{t.krCity}</span>
            </div>
            <div className="text-sm sm:text-base font-black tabular-nums truncate">{timeInfo.seoulTimeStr}</div>
          </div>
          <span className="text-xl">🇰🇷</span>
        </div>
      </div>

      {/* 유학생 현재 상태 및 시간대 시뮬레이터 */}
      <div className="pt-2.5 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full animate-pulse ${currentStatusObj.dot}`} />
            <span className="text-[11px] font-extrabold">내 현재 상태 (가족 공유):</span>
          </div>
          <div className="flex items-center gap-1">
            {[
              { id: 'realtime', label: '실시간' },
              { id: 'uk_6am', label: 'UK 6AM(수면)' },
              { id: 'uk_lecture', label: '수업중' },
              { id: 'golden_time', label: '골든타임' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectTimePreset(p.id)}
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold transition ${
                  timePreset === p.id ? theme.accent : theme.badge
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          {STUDENT_STATUS_MODES.map((mode) => {
            const IconComp = mode.icon;
            const isSelected = studentStatusId === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => {
                  setStudentStatusId(mode.id);
                  showNotification(`🔔 내 상태가 [${mode.label}](으)로 변경되었습니다.`);
                }}
                className={`px-2 py-1.5 rounded-xl text-[11px] font-bold border transition flex items-center justify-center gap-1 ${
                  isSelected ? mode.color + ' ring-1 ring-current/40' : `${theme.badge} border-transparent opacity-75`
                }`}
              >
                <IconComp className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{mode.label}</span>
              </button>
            );
          })}
        </div>

        <div className={`px-3 py-1.5 rounded-xl border text-[11px] flex items-center justify-between gap-2 ${theme.accentSoft}`}>
          {isEditingStatusMsg ? (
            <div className="flex items-center gap-1.5 w-full">
              <input
                type="text"
                value={customStatusNote}
                onChange={(e) => setCustomStatusNote(e.target.value)}
                placeholder={currentStatusObj.autoMessage}
                className={`flex-1 px-2.5 py-1 rounded-lg text-xs border ${theme.input}`}
              />
              <button
                onClick={() => setIsEditingStatusMsg(false)}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] ${theme.accent}`}
              >
                저장
              </button>
            </div>
          ) : (
            <>
              <span className="truncate">
                <strong>자동 안내:</strong> "{customStatusNote || currentStatusObj.autoMessage}"
              </span>
              <button onClick={() => setIsEditingStatusMsg(true)} className="text-[10px] font-bold underline shrink-0">
                문구 수정
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

