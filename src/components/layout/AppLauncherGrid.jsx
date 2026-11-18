import React from 'react';
import {
  LayoutGrid,
  Sparkles,
  Settings,
  ArrowUp,
  ArrowDown,
  Users,
  Plus,
  Award,
  CheckCircle2,
  Circle,
  ChefHat,
  Calendar as CalendarIcon,
  BarChart3
} from 'lucide-react';
import { CULTURAL_CALENDAR_EVENTS } from '../../constants/initialData';

export default function AppLauncherGrid({
  theme,
  t,
  viewportMode,
  userLevel,
  piBalance,
  launcherItems,
  setActiveAppView,
  pinnedWidgets,
  showWidgetCustomizer,
  setShowWidgetCustomizer,
  onToggleWidget,
  onMoveWidgetOrder,
  contactNodes,
  onClickContactNode,
  onOpenAddContactFromHome,
  quests,
  onToggleQuest,
  recipes,
  onSelectRecipeFromHome,
  localKeywords
}) {
  const enabledWidgetsList = pinnedWidgets.filter((w) => w.enabled);

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* 7대 핵심 기능 아이콘 런처 */}
      <section className={`p-4 rounded-3xl border ${theme.card}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <LayoutGrid className="w-4 h-4 text-amber-500" />
            <h2 className="font-extrabold text-sm">{t.launcherTitle}</h2>
            <span className={`text-[11px] ${theme.subtext}`}>{t.launcherSub}</span>
          </div>
          <span className="text-xs font-extrabold text-amber-500">
            Lv.{userLevel} • +{piBalance} π
          </span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {launcherItems.map((app) => {
            const IconComponent = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => setActiveAppView(app.id)}
                className={`group p-2.5 rounded-2xl border ${theme.card} ${theme.cardHover} flex flex-col items-center text-center transition-all hover:-translate-y-0.5`}
              >
                <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-full border mb-1.5 ${app.lightBg}`}>
                  {app.badge}
                </span>
                <div
                  className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${app.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition mb-1.5`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="font-extrabold text-[11px] tracking-tight line-clamp-1">{app.name}</span>
                <span className={`text-[9px] ${theme.subtext} mt-0.5 line-clamp-1 hidden sm:block`}>{app.sub}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 유저가 설정한 맞춤형 대시보드 위젯 */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="font-extrabold text-sm">{t.homeWidgetTitle}</h2>
            <span className={`text-[11px] ${theme.subtext}`}>({enabledWidgetsList.length}개 표시 중)</span>
          </div>
          <button
            onClick={() => setShowWidgetCustomizer(!showWidgetCustomizer)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1 transition ${
              showWidgetCustomizer ? theme.accent : `${theme.card} ${theme.cardHover}`
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{t.editWidgets}</span>
          </button>
        </div>

        {showWidgetCustomizer && (
          <div className={`p-4 rounded-3xl border ${theme.card} space-y-2 animate-fadeIn`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-extrabold">⚙️ 첫 화면에 바로 볼 위젯 선택 및 순서 변경</span>
              <button
                onClick={() => setShowWidgetCustomizer(false)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold ${theme.accent}`}
              >
                완료
              </button>
            </div>
            {pinnedWidgets.map((w, idx) => (
              <div
                key={w.id}
                className={`p-2.5 rounded-2xl border flex items-center justify-between gap-2 ${
                  w.enabled ? theme.accentSoft : `${theme.card} opacity-60`
                }`}
              >
                <label className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={w.enabled}
                    onChange={() => onToggleWidget(w.id)}
                    className="w-4 h-4 rounded accent-indigo-600"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold truncate">{w.title}</p>
                    <p className="text-[10px] opacity-80 truncate">{w.desc}</p>
                  </div>
                </label>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onMoveWidgetOrder(idx, -1)}
                    disabled={idx === 0}
                    className={`p-1 rounded-lg ${theme.badge} disabled:opacity-30`}
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onMoveWidgetOrder(idx, 1)}
                    disabled={idx === pinnedWidgets.length - 1}
                    className={`p-1 rounded-lg ${theme.badge} disabled:opacity-30`}
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={`grid grid-cols-1 ${viewportMode === 'desktop' ? 'md:grid-cols-2' : ''} gap-3.5`}>
          {enabledWidgetsList.map((widget) => {
            if (widget.id === 'mini_profile') {
              return (
                <div key={widget.id} className={`p-4 rounded-3xl border ${theme.card}`}>
                  <div className="flex items-center justify-between mb-2.5">
                    <h3 className="font-extrabold text-xs sm:text-sm flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-indigo-500" /> 내 주소록 (연락처 클릭 시 채팅·통화)
                    </h3>
                    <button
                      onClick={() => setActiveAppView('profile')}
                      className={`text-xs font-extrabold ${theme.accentText}`}
                    >
                      주소록 관리 &rarr;
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-indigo-500/5 border border-indigo-500/20">
                    <div className="flex items-center gap-2.5 overflow-x-auto py-0.5">
                      {contactNodes
                        .filter((n) => n.id !== 'me')
                        .map((n) => (
                          <button
                            key={n.id}
                            onClick={() => onClickContactNode(n)}
                            className="flex flex-col items-center shrink-0 group"
                          >
                            <div
                              className={`w-10 h-10 rounded-full ${n.color} text-white flex items-center justify-center text-lg shadow group-hover:scale-110 transition`}
                            >
                              {n.icon}
                            </div>
                            <span className="text-[10px] font-bold mt-1">{n.label}</span>
                          </button>
                        ))}
                      <button
                        onClick={onOpenAddContactFromHome}
                        className={`w-10 h-10 rounded-full border border-dashed flex items-center justify-center shrink-0 ${theme.badge}`}
                        title="새 연락처 추가"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            if (widget.id === 'mini_quests') {
              return (
                <div key={widget.id} className={`p-4 rounded-3xl border ${theme.card}`}>
                  <div className="flex items-center justify-between mb-2.5">
                    <h3 className="font-extrabold text-xs sm:text-sm flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-violet-500" /> 오늘의 필수 AI 퀘스트
                    </h3>
                    <button
                      onClick={() => setActiveAppView('quests')}
                      className={`text-xs font-extrabold ${theme.accentText}`}
                    >
                      전체 보기 &rarr;
                    </button>
                  </div>
                  <div className="space-y-2">
                    {quests.slice(0, 2).map((q) => (
                      <div
                        key={q.id}
                        onClick={() => onToggleQuest(q.id)}
                        className={`p-2.5 rounded-2xl border cursor-pointer flex items-center justify-between gap-2 ${theme.card}`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {q.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : (
                            <Circle className={`w-4 h-4 ${theme.subtext} shrink-0`} />
                          )}
                          <span className={`text-xs font-bold truncate ${q.completed ? 'line-through opacity-60' : ''}`}>
                            {q.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-extrabold text-amber-500 shrink-0">+{q.piReward} π</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            if (widget.id === 'mini_recipes') {
              return (
                <div key={widget.id} className={`p-4 rounded-3xl border ${theme.card}`}>
                  <div className="flex items-center justify-between mb-2.5">
                    <h3 className="font-extrabold text-xs sm:text-sm flex items-center gap-1.5">
                      <ChefHat className="w-4 h-4 text-rose-500" /> HomePlate 구독 레시피 & 인기 검색어
                    </h3>
                    <button
                      onClick={() => setActiveAppView('recipes')}
                      className={`text-xs font-extrabold ${theme.accentText}`}
                    >
                      레시피 허브 &rarr;
                    </button>
                  </div>
                  <div className="space-y-2">
                    {recipes.slice(0, 2).map((r) => (
                      <div
                        key={r.id}
                        onClick={() => onSelectRecipeFromHome(r)}
                        className={`p-2.5 rounded-2xl border cursor-pointer flex items-center justify-between gap-2 ${theme.card}`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-xl">{r.coverIcon}</span>
                          <div className="min-w-0">
                            <p className="text-xs font-extrabold truncate">{r.name}</p>
                            <p className={`text-[10px] ${theme.subtext} truncate`}>
                              {r.author} • 구독 {r.subscribers}명
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/15 text-rose-500 shrink-0">
                          {r.isSubscribed ? '구독중' : '추천'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            if (widget.id === 'mini_calendar') {
              return (
                <div key={widget.id} className={`p-4 rounded-3xl border ${theme.card}`}>
                  <div className="flex items-center justify-between mb-2.5">
                    <h3 className="font-extrabold text-xs sm:text-sm flex items-center gap-1.5">
                      <CalendarIcon className="w-4 h-4 text-sky-500" /> 영국/한국 기념일 & 공유 시간표
                    </h3>
                    <button
                      onClick={() => setActiveAppView('calendar')}
                      className={`text-xs font-extrabold ${theme.accentText}`}
                    >
                      캘린더 열기 &rarr;
                    </button>
                  </div>
                  <div
                    onClick={() => setActiveAppView('calendar')}
                    className={`p-3 rounded-2xl border cursor-pointer ${theme.accentSoft} text-xs`}
                  >
                    <div className="font-extrabold flex items-center gap-1.5">
                      <span>{CULTURAL_CALENDAR_EVENTS[0].flag}</span>
                      <span>
                        {CULTURAL_CALENDAR_EVENTS[0].date}: {CULTURAL_CALENDAR_EVENTS[0].title}
                      </span>
                    </div>
                    <p className="text-[11px] opacity-85 mt-1 line-clamp-1">{CULTURAL_CALENDAR_EVENTS[0].shortDesc}</p>
                  </div>
                </div>
              );
            }

            if (widget.id === 'mini_analytics') {
              return (
                <div key={widget.id} className={`p-4 rounded-3xl border ${theme.card}`}>
                  <div className="flex items-center justify-between mb-2.5">
                    <h3 className="font-extrabold text-xs sm:text-sm flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4 text-fuchsia-500" /> 온디바이스 대화 패턴 요약
                    </h3>
                    <button
                      onClick={() => setActiveAppView('analytics')}
                      className={`text-xs font-extrabold ${theme.accentText}`}
                    >
                      분석 리포트 &rarr;
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {localKeywords.slice(0, 3).map((kw, idx) => (
                      <span key={idx} className={`px-2.5 py-1 rounded-xl text-[11px] font-bold ${theme.badge}`}>
                        {kw.word} <strong className="text-emerald-500">({kw.count}회)</strong>
                      </span>
                    ))}
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      </section>
    </div>
  );
}
