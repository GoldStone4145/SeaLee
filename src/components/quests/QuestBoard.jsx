import React from 'react';
import { Award, Wallet, Plus, Sparkles, CheckCircle2, Circle } from 'lucide-react';

export default function QuestBoard({
  theme,
  quests,
  toggleQuest,
  piBalance,
  piAuthUser,
  openPiPaymentSheet,
  newQuestCategory,
  setNewQuestCategory,
  newQuestTitle,
  setNewQuestTitle,
  handleAddQuest,
  handleGenerateAiQuest
}) {
  return (
    <div className={`p-5 rounded-3xl border ${theme.card}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2.5">
          <div className={`p-2.5 rounded-2xl ${theme.accent}`}>
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-base">AI 라이프 퀘스트</h2>
            <p className={`text-xs ${theme.subtext}`}>설거지·방 청소·안부 전화·과제를 클리어하고 Pi 지갑으로 출금하세요</p>
          </div>
        </div>
        <button
          onClick={() =>
            openPiPaymentSheet({
              mode: 'A2U',
              title: 'AI 퀘스트 달성 보상 Pi 지갑 출금',
              amount: piBalance,
              memo: 'Quest Reward A2U Transfer',
              recipient: `@${piAuthUser.username}`
            })
          }
          className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-xs shadow flex items-center gap-1"
        >
          <Wallet className="w-3.5 h-3.5" /> 지갑 출금 ({piBalance} π)
        </button>
      </div>

      <form onSubmit={handleAddQuest} className="flex flex-col sm:flex-row gap-2 mb-4">
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
        <button type="submit" className={`px-4 py-2 rounded-xl text-xs font-extrabold ${theme.accent} flex items-center justify-center gap-1`}>
          <Plus className="w-4 h-4" /> 추가
        </button>
        <button
          type="button"
          onClick={handleGenerateAiQuest}
          className="px-3.5 py-2 rounded-xl text-xs font-extrabold bg-amber-500/15 text-amber-500 border border-amber-500/30 flex items-center justify-center gap-1"
        >
          <Sparkles className="w-3.5 h-3.5" /> AI 추천
        </button>
      </form>

      <div className="space-y-2.5">
        {quests.map((q) => (
          <div
            key={q.id}
            onClick={() => toggleQuest(q.id)}
            className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
              q.completed ? 'opacity-65 bg-emerald-500/5 border-emerald-500/30' : `${theme.card} ${theme.cardHover}`
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                {q.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <Circle className={`w-5 h-5 ${theme.subtext} shrink-0 mt-0.5`} />
                )}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${theme.badge}`}>{q.category}</span>
                    <span className="text-[10px] font-bold text-amber-500">🔥 {q.streak}일 연속</span>
                    <span className={`text-[10px] ${theme.subtext}`}>• 예상 {q.timeEstimate}</span>
                  </div>
                  <p className={`font-extrabold text-sm ${q.completed ? 'line-through' : ''}`}>{q.title}</p>
                  <p className={`text-xs mt-1 ${theme.subtext}`}>💡 {q.aiTip}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="inline-block px-2.5 py-1 rounded-xl bg-amber-500/15 text-amber-500 font-extrabold text-xs">
                  +{q.piReward} π
                </span>
                <span className={`block text-[10px] font-bold mt-1 ${theme.subtext}`}>+{q.xp} XP</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

