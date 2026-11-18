import React from 'react';
import { Image as ImageIcon, Upload, X } from 'lucide-react';

export function HomePlateLogo({ customLogoUrl, logoStyle = 'housePlate', size = 'md', onClick }) {
  const sizeClasses = {
    sm: 'w-9 h-9 rounded-xl',
    md: 'w-11 h-11 rounded-2xl',
    lg: 'w-16 h-16 rounded-3xl'
  }[size] || 'w-11 h-11 rounded-2xl';

  return (
    <div
      onClick={onClick}
      title="HomePlate 로고 슬롯 (클릭하여 로고 이미지 등록/변경)"
      className={`${sizeClasses} relative overflow-hidden flex items-center justify-center cursor-pointer select-none shadow-md border border-amber-400/40 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white group shrink-0 transition-transform hover:scale-105`}
    >
      {customLogoUrl ? (
        <img
          src={customLogoUrl}
          alt="HomePlate Logo"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      ) : logoStyle === 'housePlate' ? (
        <svg viewBox="0 0 40 40" className="w-7 h-7 fill-none stroke-current" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 18.5L20 8l13 10.5" />
          <path d="M11.5 16.5v13a2 2 0 002 2h13a2 2 0 002-2v-13" />
          <circle cx="20" cy="23" r="5.2" fill="rgba(255,255,255,0.22)" />
          <path d="M18 21.5c0-1.2 1.5-1.2 1.5-2.4M22 21.5c0-1.2 1.5-1.2 1.5-2.4" strokeWidth="1.8" />
        </svg>
      ) : logoStyle === 'homeBase' ? (
        <svg viewBox="0 0 40 40" className="w-7 h-7 fill-none stroke-current" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="9,10 31,10 31,23 20,33 9,23" fill="rgba(255,255,255,0.18)" />
          <circle cx="20" cy="19.5" r="5" />
          <path d="M18.5 19.5h3M20 18v3" strokeWidth="2" />
        </svg>
      ) : (
        <svg viewBox="0 0 40 40" className="w-7 h-7 fill-none stroke-current" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 26a12 12 0 0124 0" fill="rgba(255,255,255,0.2)" />
          <line x1="6" y1="26" x2="34" y2="26" />
          <circle cx="20" cy="11" r="2" />
          <path d="M15 21h10M17.5 21v5M22.5 21v5" strokeWidth="2" />
        </svg>
      )}
      <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-black/65 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <ImageIcon className="w-2.5 h-2.5" />
      </span>
    </div>
  );
}

export function HomePlateLogoModal({
  showLogoModal,
  setShowLogoModal,
  theme,
  customLogoUrl,
  setCustomLogoUrl,
  logoStyle,
  setLogoStyle,
  handleLogoFileUpload,
  showNotification
}) {
  if (!showLogoModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`w-full max-w-md rounded-3xl border p-6 shadow-2xl animate-fadeIn ${theme.card} ${theme.text}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-base">HomePlate 로고 슬롯 설정</h3>
          </div>
          <button onClick={() => setShowLogoModal(false)} className={`p-1.5 rounded-xl ${theme.badge}`}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className={`p-4 rounded-2xl border mb-4 flex items-center gap-4 ${theme.accentSoft}`}>
          <HomePlateLogo customLogoUrl={customLogoUrl} logoStyle={logoStyle} size="lg" />
          <div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500 text-white">
              LIVE PREVIEW
            </span>
            <h4 className="font-black text-base mt-1">HomePlate 공식 로고 슬롯</h4>
            <p className="text-[11px] opacity-80">상단 헤더 좌측과 VIP 로그인 모달에 표시됩니다.</p>
          </div>
        </div>

        <div className="space-y-3.5 text-xs">
          <div>
            <label className="block font-extrabold mb-1.5">1. 내 기기에서 로고 이미지 파일 직접 업로드</label>
            <label className={`w-full py-2.5 px-4 rounded-xl border border-dashed cursor-pointer flex items-center justify-center gap-2 font-bold ${theme.card} hover:border-amber-500 transition`}>
              <Upload className="w-4 h-4 text-amber-500" />
              <span>로고 이미지 파일 선택 (PNG, JPG, SVG)</span>
              <input type="file" accept="image/*" onChange={handleLogoFileUpload} className="hidden" />
            </label>
          </div>

          <div>
            <label className="block font-extrabold mb-1">2. 또는 GitHub 이미지 경로 입력 (예: /logo.png)</label>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={customLogoUrl}
                onChange={(e) => setCustomLogoUrl(e.target.value)}
                placeholder="/logo.png 또는 https://.../logo.png"
                className={`flex-1 px-3 py-2 rounded-xl border ${theme.input}`}
              />
              {customLogoUrl && (
                <button onClick={() => setCustomLogoUrl('')} className={`px-3 py-2 rounded-xl font-bold ${theme.badge}`}>
                  초기화
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block font-extrabold mb-1.5">3. 기본 내장 HomePlate 심볼 스타일 선택</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'housePlate', label: '🏠 집 + 접시' },
                { id: 'homeBase', label: '⚾ 홈베이스' },
                { id: 'piPlate', label: 'π + 클로슈' }
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => {
                    setCustomLogoUrl('');
                    setLogoStyle(st.id);
                  }}
                  className={`py-2 px-2 rounded-xl font-extrabold border text-[11px] transition ${
                    !customLogoUrl && logoStyle === st.id ? `${theme.accent} border-transparent` : theme.badge
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setShowLogoModal(false);
              showNotification('✅ HomePlate 로고 슬롯 설정이 완료되었습니다!');
            }}
            className={`w-full py-3 rounded-xl font-extrabold ${theme.accent} shadow mt-2`}
          >
            적용 완료
          </button>
        </div>
      </div>
    </div>
  );
}
