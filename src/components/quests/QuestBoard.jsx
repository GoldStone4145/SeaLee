import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

export default function QuestBoard({
  theme,
  quests,
  onToggleQuest,
  newQuestTitle,
  setNewQuestTitle,
  newQuestCategory,
  setNewQuestCategory,
  onAddQuest,
  piBalance,
  userProfile,
  onOpenPiPaymentSheet
}) {
  return (
    <div className={`p-5 rounded-3xl border ${theme.card} space-y-4`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-extrabold text-base sm:text-lg">HomePlate AI 퀘스트 시스템</h2>
          <p className={`text-xs ${theme.subtext}`}>설거지, 방 청소, 안부 전화, 과제를 미루지 않고 클리어하세요</p>
        </div>
        <button
          onClick={() =>
            onOpenPiPaymentSheet({
              mode: 'A2U',
              title: '퀘스트 보상 Pi 지갑 출금',
              amount: piBalance,
              recipient: `@${userProfile.username}`
            })
          }
          className="px-3.5 py-2 rounded-xl bg-amber-500 text-white text-xs font-extrabold shadow"
        >
          보상 출금 ({piBalance} π)
        </button>
      </div>

      <form onSubmit={onAddQuest} className="flex flex-col sm:flex-row gap-2">
        <select
          value={newQuestCategory}
          onChange={(e) => setNewQuestCategory(e.target.value)}
          className={`px-3 py-2 rounded-xl text-xs font-bold border ${theme.input}`}
        >
          <option value="생활">🧹 생활</option>
          <option value="소통">📞 소통</option>
          <option value="학업">💻 학업</option>
          <option value="요리">🍳 요리</option>
        </select>
        <input
          type="text"
          value={newQuestTitle}
          onChange={(e) => setNewQuestTitle(e.target.value)}
          placeholder="미루기 쉬운 할 일을 퀘스트로 등록하세요"
          className={`flex-1 px-3.5 py-2 rounded-xl text-xs border ${theme.input}`}
        />
        <button type="submit" className={`px-4 py-2 rounded-xl text-xs font-extrabold ${theme.accent}`}>
          + 퀘스트 추가
        </button>
      </form>

      <div className="space-y-2.5">
        {quests.map((q) => (
          <div
            key={q.id}
            onClick={() => onToggleQuest(q.id)}
            className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between gap-3 ${
              q.completed ? 'opacity-60 bg-emerald-500/5 border-emerald-500/30' : theme.card
            }`}
          >
            <div className="flex items-start gap-3">
              {q.completed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
              ) : (
                <Circle className={`w-5 h-5 ${theme.subtext} mt-0.5`} />
              )}
              <div>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${theme.badge}`}>
                  {q.category}
                </span>
                <p className={`font-extrabold text-sm mt-1 ${q.completed ? 'line-through' : ''}`}>{q.title}</p>
                <p className={`text-xs mt-0.5 ${theme.subtext}`}>💡 {q.aiTip}</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-xl bg-amber-500/15 text-amber-500 font-extrabold text-xs shrink-0">
              +{q.piReward} π
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

