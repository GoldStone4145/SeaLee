import React, { useState, useMemo } from 'react';
import { ChefHat, Plus, X } from 'lucide-react';
import { POPULAR_RECIPE_KEYWORDS } from '../../constants/initialData';

export default function RecipeHub({
  theme,
  recipes,
  selectedRecipe,
  setSelectedRecipe,
  onToggleSubscribe,
  onLikeRecipe,
  recipeCommentInput,
  setRecipeCommentInput,
  onAddRecipeComment,
  showUploadRecipeModal,
  setShowUploadRecipeModal,
  newRecipeForm,
  setNewRecipeForm,
  onUploadRecipe,
  onOpenPiPaymentSheet
}) {
  const [recipeFilterTab, setRecipeFilterTab] = useState('all');

  const filteredRecipes = useMemo(() => {
    return recipes.filter((r) => {
      if (recipeFilterTab === 'subscribed' && !r.isSubscribed) return false;
      if (recipeFilterTab === 'family' && r.type !== 'family') return false;
      if (recipeFilterTab === 'creator' && r.type !== 'creator') return false;
      return true;
    });
  }, [recipes, recipeFilterTab]);

  return (
    <div className={`p-5 rounded-3xl border ${theme.card} space-y-4`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-rose-500 text-white shadow">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-extrabold text-base sm:text-lg">HomePlate 레시피 콘텐츠 허브</h2>
            <p className={`text-xs ${theme.subtext}`}>
              레시피를 구독해 찾아보고, 직접 크리에이터가 되어 가족·자취생과 소통하며 π 수익을 창출하세요
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowUploadRecipeModal(true)}
          className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold ${theme.accent} shadow-md flex items-center gap-1.5`}
        >
          <Plus className="w-4 h-4" /> 나만의 레시피 올리기
        </button>
      </div>

      {/* 실시간 인기 레시피 키워드 순위 바 */}
      <div className={`p-3 rounded-2xl border ${theme.accentSoft} flex flex-wrap items-center justify-between gap-2`}>
        <span className="text-xs font-extrabold">🔥 실시간 인기 레시피 키워드 순위:</span>
        <div className="flex flex-wrap items-center gap-1.5">
          {POPULAR_RECIPE_KEYWORDS.map((item) => (
            <span
              key={item.rank}
              className="px-2.5 py-1 rounded-xl bg-black/10 text-[11px] font-bold flex items-center gap-1"
            >
              <span className="text-rose-500 font-black">{item.rank}.</span>
              <span>{item.keyword}</span>
              <span className="text-[9px] px-1 rounded bg-rose-500 text-white font-extrabold">{item.change}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 필터 탭 */}
      <div className="flex flex-wrap gap-1.5 pb-3 border-b border-slate-500/15">
        {[
          { id: 'all', label: '🍽️ 전체 레시피 피드' },
          { id: 'subscribed', label: '⭐ 내가 구독한 채널' },
          { id: 'family', label: '👩‍👧‍👦 가족 멘토 레시피' },
          { id: 'creator', label: '🧑‍🍳 유학생 크리에이터' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setRecipeFilterTab(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              recipeFilterTab === tab.id ? theme.accent : theme.badge
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 레시피 피드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className={`rounded-3xl border overflow-hidden flex flex-col justify-between ${theme.card} ${theme.cardHover}`}
          >
            <div>
              <div
                onClick={() => setSelectedRecipe(recipe)}
                className="h-32 bg-gradient-to-br from-rose-500/15 via-amber-500/10 to-indigo-500/15 flex items-center justify-center text-5xl relative cursor-pointer"
              >
                <span>{recipe.coverIcon}</span>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-black/60 text-white">
                  {recipe.type === 'family' ? '👩‍👧‍👦 가족 공식 멘토' : '🧑‍🍳 유학생 크리에이터'}
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-white/90 text-slate-800">
                  ⏱️ {recipe.time} • {recipe.difficulty}
                </span>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-1 mb-1.5">
                  {recipe.tags.map((tg) => (
                    <span key={tg} className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${theme.badge}`}>
                      {tg}
                    </span>
                  ))}
                </div>
                <h3
                  onClick={() => setSelectedRecipe(recipe)}
                  className="font-extrabold text-base cursor-pointer hover:underline"
                >
                  {recipe.name}
                </h3>
                <p className={`text-xs mt-1 line-clamp-2 ${theme.subtext}`}>{recipe.desc}</p>
                <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px]">
                  <strong className="text-amber-600 block">💡 가족/현지 마트 비법:</strong>
                  <span className="line-clamp-1">{recipe.familyTip}</span>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 border-t border-slate-500/10 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs font-extrabold truncate">{recipe.author}</p>
                <p className={`text-[10px] ${theme.subtext}`}>
                  구독자 {recipe.subscribers}명 • ❤️ {recipe.likes} • 💬 {(recipe.comments || []).length}
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => onToggleSubscribe(recipe.id)}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold ${
                    recipe.isSubscribed ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30' : theme.accent
                  }`}
                >
                  {recipe.isSubscribed ? '✓ 구독중' : '+ 구독'}
                </button>
                <button
                  onClick={() => setSelectedRecipe(recipe)}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold ${theme.badge}`}
                >
                  상세·댓글
                </button>
                <button
                  onClick={() =>
                    onOpenPiPaymentSheet({
                      mode: 'U2A',
                      title: `[${recipe.name}] 크리에이터 응원 후원`,
                      amount: 0.5,
                      recipient: recipe.author
                    })
                  }
                  className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 text-amber-500 border border-amber-500/30 text-[11px] font-extrabold"
                >
                  0.5 π
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 레시피 상세 & 댓글 모달 */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-xl rounded-3xl border p-6 shadow-2xl max-h-[90vh] overflow-y-auto ${theme.card} ${theme.text}`}>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/15 flex items-center justify-center text-3xl">
                  {selectedRecipe.coverIcon}
                </div>
                <div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-500">
                    {selectedRecipe.authorRole}
                  </span>
                  <h3 className="text-lg font-black mt-0.5">{selectedRecipe.name}</h3>
                  <p className={`text-xs ${theme.subtext}`}>
                    {selectedRecipe.author} • 구독자 {selectedRecipe.subscribers}명
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedRecipe(null)} className={`p-1.5 rounded-xl ${theme.badge}`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className={`p-3.5 rounded-2xl border mb-3 ${theme.accentSoft}`}>
              <p className="text-xs font-extrabold mb-1">🛒 영국 현지 마트 재료 팁</p>
              <p className="text-xs">{selectedRecipe.ukMartTip}</p>
            </div>

            <div className="p-3.5 rounded-2xl border border-amber-500/30 bg-amber-500/10 mb-4">
              <p className="text-xs font-extrabold text-amber-600 mb-1">❤️ 가족 멘토의 비법 노트</p>
              <p className="text-xs">{selectedRecipe.familyTip}</p>
            </div>

            <div className="space-y-2 mb-4">
              <h4 className="text-xs font-extrabold">조리 순서</h4>
              {selectedRecipe.steps.map((step, idx) => (
                <div key={idx} className={`p-2.5 rounded-xl border text-xs flex items-start gap-2 ${theme.card}`}>
                  <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${theme.accent}`}>
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-500/15 mb-4">
              <h4 className="text-xs font-extrabold mb-2">
                💬 가족 & 구독자 요리 피드백 ({(selectedRecipe.comments || []).length})
              </h4>
              <div className="space-y-1.5 mb-2.5">
                {(selectedRecipe.comments || []).map((cm) => (
                  <div key={cm.id} className={`p-2.5 rounded-xl text-xs ${theme.badge}`}>
                    <strong>{cm.user}:</strong> {cm.text}
                  </div>
                ))}
              </div>
              <form onSubmit={onAddRecipeComment} className="flex gap-2">
                <input
                  type="text"
                  value={recipeCommentInput}
                  onChange={(e) => setRecipeCommentInput(e.target.value)}
                  placeholder="가족이나 크리에이터에게 질문/응원 댓글을 남겨보세요..."
                  className={`flex-1 px-3 py-2 rounded-xl text-xs border ${theme.input}`}
                />
                <button type="submit" className={`px-3.5 py-2 rounded-xl text-xs font-bold ${theme.accent}`}>
                  등록
                </button>
              </form>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-500/15">
              <div className="flex gap-2">
                <button
                  onClick={() => onToggleSubscribe(selectedRecipe.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold ${
                    selectedRecipe.isSubscribed ? theme.badge : theme.accent
                  }`}
                >
                  {selectedRecipe.isSubscribed ? '✓ 구독중' : '+ 채널 구독하기'}
                </button>
                <button
                  onClick={() => onLikeRecipe(selectedRecipe.id)}
                  className="px-3.5 py-2 rounded-xl text-xs font-extrabold bg-rose-500/15 text-rose-500"
                >
                  ❤️ 공감 ({selectedRecipe.likes})
                </button>
              </div>
              <button
                onClick={() => {
                  const target = selectedRecipe;
                  setSelectedRecipe(null);
                  onOpenPiPaymentSheet({
                    mode: 'U2A',
                    title: `[${target.name}] 크리에이터 0.5 π 후원`,
                    amount: 0.5,
                    recipient: target.author
                  });
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-extrabold shadow"
              >
                0.5 π 후원하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 새 레시피 발행 모달 */}
      {showUploadRecipeModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl border p-6 shadow-2xl ${theme.card} ${theme.text}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-base">HomePlate 레시피 발행</h3>
              <button onClick={() => setShowUploadRecipeModal(false)} className={`p-1.5 rounded-xl ${theme.badge}`}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={onUploadRecipe} className="space-y-3">
              <input
                type="text"
                required
                value={newRecipeForm.name}
                onChange={(e) => setNewRecipeForm({ ...newRecipeForm, name: e.target.value })}
                placeholder="레시피 제목 (예: 영국 기숙사 5분 순두부 열라면)"
                className={`w-full px-3.5 py-2 rounded-xl text-xs border ${theme.input}`}
              />
              <input
                type="text"
                value={newRecipeForm.tags}
                onChange={(e) => setNewRecipeForm({ ...newRecipeForm, tags: e.target.value })}
                placeholder="태그 (#초간단 #자취요리)"
                className={`w-full px-3.5 py-2 rounded-xl text-xs border ${theme.input}`}
              />
              <textarea
                rows="2"
                value={newRecipeForm.desc}
                onChange={(e) => setNewRecipeForm({ ...newRecipeForm, desc: e.target.value })}
                placeholder="요리 소개 및 간단한 조리 포인트"
                className={`w-full px-3.5 py-2 rounded-xl text-xs border ${theme.input}`}
              />
              <input
                type="text"
                value={newRecipeForm.ukMartTip}
                onChange={(e) => setNewRecipeForm({ ...newRecipeForm, ukMartTip: e.target.value })}
                placeholder="현지 마트 재료 팁"
                className={`w-full px-3.5 py-2 rounded-xl text-xs border ${theme.input}`}
              />
              <button type="submit" className={`w-full py-3 rounded-xl text-xs font-extrabold ${theme.accent}`}>
                레시피 발행하기 (+3.0 π 보상)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
