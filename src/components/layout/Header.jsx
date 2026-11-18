import React from 'react';
import { Wallet, Smartphone, Monitor, Sliders, Key, Sparkles, X } from 'lucide-react';
import { THEMES, CUSTOM_AURA_PRESETS } from '../../data/initialData.js';

export default function Header({
  theme,
  themeKey,
  setThemeKey,
  customAura,
  setCustomAura,
  showThemeDrawer,
  setShowThemeDrawer,
  viewportMode,
  setViewportMode,
  piAuthUser,
  piWalletBalance,
  setActiveAppView,
  setShowVipModal,
  lang,
  setLang,
  t,
  I18N_PACK,
  showNotification
}) {
  return (
    <header className={`sticky top-0 z-30 border-b ${theme.header}`}>
      <div className={`${viewportMode === 'mobile' ? 'max-w-lg' : 'max-w-6xl'} mx-auto px-3 sm:px-6 py-2.5`}>
        <div className="flex items-center justify-between gap-1.5">
          <button
            onClick={() => setActiveAppView('home')}
            className="flex items-center gap-2 text-left group shrink-0"
          >
            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-2xl flex items-center justify-center font-black text-base shadow-md ${theme.accent} group-hover:scale-105 transition`}>
              π
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-sm sm:text-base tracking-tight">Pi-Bridge</h1>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/30">
                  @{piAuthUser.username}
                </span>
              </div>
              <p className={`text-[10px] ${theme.subtext} hidden md:block`}>{t.subtitle}</p>
            </div>
          </button>

          <div className="flex items-center gap-1 flex-wrap justify-end">
            <select
              value={lang}
              onChange={(e) => {
                setLang(e.target.value);
                showNotification(`🌐 Language switched to ${I18N_PACK[e.target.value].langLabel}`);
              }}
              className={`px-2 py-1.5 rounded-xl border text-[11px] font-extrabold cursor-pointer ${theme.card}`}
            >
              <option value="ko">🇰🇷 한국어</option>
              <option value="en">🇬🇧 English</option>
              <option value="ja">🇯🇵 日本語</option>
              <option value="zh">🇨🇳 中文</option>
            </select>

            <button
              onClick={() => setActiveAppView('wallet')}
              className="px-2 py-1.5 rounded-xl bg-amber-500/15 text-amber-500 border border-amber-500/30 font-extrabold text-[11px] flex items-center gap-1 hover:bg-amber-500/25 transition"
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>{piWalletBalance} π</span>
            </button>

            <button
              onClick={() => setViewportMode(viewportMode === 'mobile' ? 'desktop' : 'mobile')}
              className={`px-2 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1 ${theme.card}`}
            >
              {viewportMode === 'mobile' ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
              <span className="hidden lg:inline">{viewportMode === 'mobile' ? t.mobileView : t.wideView}</span>
            </button>

            <button
              onClick={() => setShowThemeDrawer(!showThemeDrawer)}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border ${theme.card} ${theme.cardHover} flex items-center gap-1 text-xs font-bold`}
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setShowVipModal(true)}
              className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-[11px] shadow-sm hover:brightness-110 transition flex items-center gap-1"
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.piAuthBtn}</span>
            </button>
          </div>
        </div>

        {showThemeDrawer && (
          <div className={`mt-2.5 p-3.5 rounded-2xl border ${theme.card} animate-fadeIn`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                5대 트렌디 테마 & 배경 설정
              </span>
              <button onClick={() => setShowThemeDrawer(false)} className={`p-1 rounded-lg ${theme.badge}`}>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {Object.values(THEMES).map((th) => (
                <button
                  key={th.id}
                  onClick={() => setThemeKey(th.id)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                    themeKey === th.id ? `${theme.accent} border-transparent shadow` : `${theme.badge} border-transparent`
                  }`}
                >
                  {th.name}
                </button>
              ))}
            </div>
            {themeKey === 'custom' && (
              <div className="mt-2.5 pt-2.5 border-t border-white/15 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-semibold mr-1">맞춤 배경:</span>
                {CUSTOM_AURA_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setCustomAura(preset)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition flex items-center gap-1.5 ${
                      customAura.id === preset.id ? 'border-amber-400 bg-white/20 text-white' : 'border-white/15 bg-black/20 text-white/80'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${preset.gradient}`} />
                    {preset.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

