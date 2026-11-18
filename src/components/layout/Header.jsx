import React from 'react';
import { Wallet, Smartphone, Monitor, Sliders, Key, Sparkles, X, Image as ImageIcon } from 'lucide-react';
import { THEMES, CUSTOM_AURA_PRESETS } from '../../data/initialData.js';
import { HomePlateLogo } from './HomePlateLogo.jsx';

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
  userProfile,
  piWalletBalance,
  setActiveAppView,
  setShowVipModal,
  customLogoUrl,
  logoStyle,
  setShowLogoModal,
  lang,
  setLang,
  t,
  I18N_PACK,
  showNotification
}) {
  return (
    <header className={`sticky top-0 z-30 border-b ${theme.header}`}>
      <div className={`${viewportMode === 'mobile' ? 'max-w-lg' : 'max-w-6xl'} mx-auto px-3.5 py-2.5`}>
        <div className="flex items-center justify-between gap-2">
          {/* 좌측 상단: [HomePlate 로고 슬롯] + [HomePlate 배지 & 로그인한 사용자 이름] */}
          <div className="flex items-center gap-2.5 min-w-0">
            <HomePlateLogo
              customLogoUrl={customLogoUrl}
              logoStyle={logoStyle}
              size="md"
              onClick={() => setShowLogoModal(true)}
            />

            <button
              onClick={() => setActiveAppView('profile')}
              className="text-left group min-w-0"
              title="내 프로필 및 마인드맵 주소록 열기"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded-md bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-600 border border-amber-500/30 shrink-0">
                  HomePlate
                </span>
                <h1 className="font-black text-sm sm:text-base tracking-tight truncate group-hover:underline">
                  {userProfile.name}
                </h1>
                <span className="hidden sm:inline-block text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 shrink-0">
                  VIP
                </span>
              </div>
              <p className={`text-[11px] font-semibold ${theme.subtext} truncate mt-0.5`}>
                @{userProfile.username} • {userProfile.ukCity}
              </p>
            </button>
          </div>

          {/* 우측 컨트롤 바 */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setShowLogoModal(true)}
              className={`p-2 rounded-xl border ${theme.card}`}
              title="HomePlate 로고 슬롯 이미지 설정"
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
            </button>

            <select
              value={lang}
              onChange={(e) => {
                setLang(e.target.value);
                showNotification(`🌐 Language switched to ${I18N_PACK[e.target.value].langLabel}`);
              }}
              className={`px-2 py-1.5 rounded-xl border text-[11px] font-extrabold cursor-pointer ${theme.card}`}
            >
              <option value="ko">🇰🇷 한국어</option>
              <option value="en">🇬🇧 EN</option>
              <option value="ja">🇯🇵 JP</option>
              <option value="zh">🇨🇳 CN</option>
            </select>

            <button
              onClick={() => setActiveAppView('wallet')}
              className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 text-amber-500 border border-amber-500/30 font-extrabold text-[11px] flex items-center gap-1"
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>{piWalletBalance} π</span>
            </button>

            <button
              onClick={() => setViewportMode(viewportMode === 'mobile' ? 'desktop' : 'mobile')}
              className={`p-2 rounded-xl border ${theme.card}`}
              title="모바일뷰 / 와이드뷰 전환"
            >
              {viewportMode === 'mobile' ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setShowThemeDrawer(!showThemeDrawer)}
              className={`p-2 rounded-xl border ${theme.card}`}
              title="테마 설정"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setShowVipModal(true)}
              className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-[11px] shadow-sm flex items-center gap-1"
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.piAuthBtn}</span>
            </button>
          </div>
        </div>

        {showThemeDrawer && (
          <div className={`mt-2.5 p-3 rounded-2xl border ${theme.card} space-y-2 animate-fadeIn`}>
            <div className="flex items-center justify-between">
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
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                    themeKey === th.id ? `${theme.accent} border-transparent shadow` : `${theme.badge} border-transparent`
                  }`}
                >
                  {th.name}
                </button>
              ))}
            </div>
            {themeKey === 'custom' && (
              <div className="pt-2 border-t border-white/15 flex flex-wrap gap-1.5">
                {CUSTOM_AURA_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setCustomAura(preset)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border ${
                      customAura.id === preset.id ? 'border-amber-400 bg-white/20 text-white' : 'border-white/15 bg-black/20 text-white/80'
                    }`}
                  >
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
