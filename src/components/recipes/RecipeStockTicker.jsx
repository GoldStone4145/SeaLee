import React from 'react';
import { ChefHat, Pause, Play, Plus } from 'lucide-react';

export default function RecipeStockTicker({
  theme,
  filteredRecipes,
  recipeTab,
  setRecipeTab,
  selectedKeywordFilter,
  setSelectedKeywordFilter,
  isTickerLive,
  setIsTickerLive,
  setSelectedRecipe,
  setShowUploadRecipeModal,
  openPiPaymentSheet
}) {
  return (
    <div className={`p-5 rounded-3xl border ${theme.card}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-rose-500 text-white">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-base">실시간 자취·가족 레시피 호가창</h2>
            <p className={`text-xs ${theme.subtext}`}>인기 요리 키워드 실시간 등락률 • 가족 멘토와 유학생 크리에이터 Win-Win 수익화</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsTickerLive(!isTickerLive)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1 ${theme.badge}`}
          >
            {isTickerLive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isTickerLive ? '실시간 변동 중' : '일시정지됨'}</span>
          </button>
          <button
            onClick={() => setShowUploadRecipeModal(true)}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold ${theme.accent} shadow flex items-center gap-1`}
          >
            <Plus className="w-3.5 h-3.5" /> 레시피 상장
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-500/15">
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: '📈 인기 주가창' },
            { id: 'family', label: '👩‍👧‍👦 가족 레시피' },
            { id: 'creator', label: '💰 수익 스튜디오' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setRecipeTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                recipeTab === tab.id ? theme.accent : theme.badge
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1">
          {['전체', '#초간단', '#영국마트재료', '#엄마손맛', '#가성비'].map((kw) => (
            <button
              key={kw}
              onClick={() => setSelectedKeywordFilter(kw)}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition ${
                selectedKeywordFilter === kw ? 'bg-amber-500 text-white' : `${theme.badge} opacity-75`
              }`}
            >
              {kw}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        {filteredRecipes.map((recipe, idx) => (
          <div
            key={recipe.id}
            onClick={() => setSelectedRecipe(recipe)}
            className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${theme.card} ${theme.cardHover} flex flex-col sm:flex-row sm:items-center justify-between gap-2.5`}
          >
            <div className="flex items-start sm:items-center gap-3 min-w-0">
              <div className={`w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${idx < 3 ? 'bg-rose-500 text-white' : theme.badge}`}>
                {idx + 1}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-extrabold text-sm truncate">{recipe.name}</span>
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${recipe.isUp ? 'bg-rose-500/15 text-rose-500' : 'bg-sky-500/15 text-sky-500'}`}>
                    {recipe.badge}
                  </span>
                  <span className={`text-[11px] font-bold ${theme.accentText}`}>{recipe.keyword}</span>
                </div>
                <div className={`flex flex-wrap items-center gap-2 text-[11px] mt-1 ${theme.subtext}`}>
                  <span>👩‍🍳 {recipe.author}</span>
                  <span>• ⏱️ {recipe.time}</span>
                  <span>• ❤️ {recipe.likes}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
              <div className="flex items-end gap-1 h-7 px-1">
                {recipe.sparkline.map((val, i) => (
                  <div
                    key={i}
                    className={`w-1.5 rounded-t ${recipe.isUp ? 'bg-rose-500/70' : 'bg-sky-500/70'}`}
                    style={{ height: `${Math.max(20, val)}%` }}
                  />
                ))}
              </div>
              <div className={`min-w-[85px] text-right px-2.5 py-1 rounded-xl font-mono font-extrabold text-xs ${recipe.isUp ? 'bg-rose-500/15 text-rose-500' : 'bg-sky-500/15 text-sky-500'}`}>
                {recipe.isUp ? `▲ +${recipe.change}%` : `▼ ${recipe.change}%`}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openPiPaymentSheet({
                    mode: 'U2A',
                    title: `[${recipe.name}] 크리에이터 π 후원`,
                    amount: 0.5,
                    memo: `Recipe Tip: ${recipe.name}`,
                    recipient: recipe.author
                  });
                }}
                className="px-2.5 py-1 rounded-xl bg-amber-500/15 text-amber-500 border border-amber-500/30 hover:bg-amber-500 hover:text-white text-[11px] font-extrabold transition"
              >
                0.5 π 후원
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

