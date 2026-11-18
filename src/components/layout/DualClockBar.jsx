import React from 'react';
import { RefreshCw, Bell } from 'lucide-react';
import { STUDENT_STATUS_MODES } from '../../data/initialData.js';

export default function DualClockBar({
  theme,
  t,
  timeInfo,
  simulateSummerTime,
  setSimulateSummerTime,
  currentStatusObj,
  studentStatusId,
  setStudentStatusId,
  timePreset,
  handleSelectTimePreset,
  isEditingStatusMsg,
  setIsEditingStatusMsg,
  customStatusNote,
  setCustomStatusNote,
  showNotification
}) {
  return (
    <section className={`p-3.5 sm:p-4 rounded-3xl border ${theme.card} mb-4`}>
      <div className="grid grid-cols-11 items-center gap-1 sm:gap-2 pb-3 border-b border-slate-500/15">
        <div className="col-span-4 flex items-center gap-2">
          <span className="text-xl sm:text-2xl shrink-0">🇬🇧</span>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className={`text-[10px] font-bold uppercase ${theme.subtext} truncate`}>{t.ukCity}</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-500/15 text-indigo-400 font-bold">
                {simulateSummerTime ? 'BST' : 'GMT'}
              </span>
            </div>
            <div className="text-sm sm:text-lg font-black tabular-nums tracking-tight truncate">
              {timeInfo.londonTimeStr}
            </div>
          </div>
        </div>

        <div className="col-span-3 flex flex-col items-center justify-center text-center">
          <button
            onClick={() => {
              setSimulateSummerTime(!simulateSummerTime);
              showNotification(
                !simulateSummerTime
                  ? '☀️ 영국 서머타임(BST) 적용! 한국과의 시차가 8시간으로 달라집니다.'
                  : '❄️ 영국 표준시(GMT) 적용! 한국과의 시차가 9시간으로 설정됩니다.'
              );
            }}
            className={`px-2 py-1 rounded-xl text-[10px] font-extrabold border transition flex items-center gap-1 ${
              simulateSummerTime ? 'bg-amber-500/20 text-amber-500 border-amber-500/40' : theme.accentSoft
            }`}
          >
            <RefreshCw className="w-3 h-3 shrink-0" />
            <span>-{timeInfo.timeDiffHours}{t.hours}</span>
          </button>
          <span className={`text-[9px] mt-0.5 ${theme.subtext}`}>
            {simulateSummerTime ? t.dstOn : t.dstToggle}
          </span>
        </div>

        <div className="col-span-4 flex items-center justify-end gap-2 text-right">
          <div className="min-w-0">
            <div className="flex items-center justify-end gap-1">
              <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/15 text-emerald-500 font-bold">KST</span>
              <span className={`text-[10px] font-bold uppercase ${theme.subtext} truncate`}>{t.krCity}</span>
            </div>
            <div className="text-sm sm:text-lg font-black tabular-nums tracking-tight truncate">
              {timeInfo.seoulTimeStr}
            </div>
          </div>
          <span className="text-xl sm:text-2xl shrink-0">🇰🇷</span>
        </div>
      </div>

      <div className="pt-2.5 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${currentStatusObj.dot}`} />
            <span className="text-[11px] font-extrabold">{t.myStatus}</span>
          </div>
          <div className="flex items-center gap-1">
            {[
              { id: 'realtime', label: t.presetRealtime },
              { id: 'uk_6am', label: t.presetUk6am },
              { id: 'uk_lecture', label: t.presetLecture },
              { id: 'golden_time', label: t.presetGolden }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectTimePreset(p.id)}
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold transition ${
                  timePreset === p.id ? theme.accent : theme.badge
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {STUDENT_STATUS_MODES.map((mode) => {
            const IconComp = mode.icon;
            const isSelected = studentStatusId === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => {
                  setStudentStatusId(mode.id);
                  showNotification(`🔔 [${t.statusModes[mode.id]}](으)로 변경되었습니다.`);
                }}
                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? mode.color + ' ring-1 ring-current/40 shadow-sm'
                    : `${theme.badge} border-transparent opacity-75 hover:opacity-100`
                }`}
              >
                <IconComp className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{t.statusModes[mode.id]}</span>
              </button>
            );
          })}
        </div>

        <div className={`px-3 py-2 rounded-2xl border text-[11px] flex items-center justify-between gap-2 ${theme.accentSoft}`}>
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
                {t.saveBtn}
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-1.5 min-w-0">
                <Bell className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">
                  <strong>{t.autoNotice}</strong> "{customStatusNote || currentStatusObj.autoMessage}"
                </span>
              </div>
              <button
                onClick={() => setIsEditingStatusMsg(true)}
                className="text-[10px] font-bold underline shrink-0 opacity-80 hover:opacity-100"
              >
                {t.editMsg}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

