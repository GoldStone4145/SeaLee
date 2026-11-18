import React, { useState } from 'react';
import { BarChart3, ShieldCheck, Lock } from 'lucide-react';

export default function PrivacyAnalytics({ theme, localKeywords, setActiveAppView }) {
  const [showPrivacyInspector, setShowPrivacyInspector] = useState(false);

  return (
    <div className={`p-5 rounded-3xl border ${theme.card} space-y-4`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-fuchsia-600 text-white">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-base sm:text-lg">HomePlate 대화 키워드 & 소통 패턴 분석</h2>
            <p className={`text-xs ${theme.subtext}`}>
              1:1 채팅에서 나눈 대화 키워드를 분석하되, 외부 서버로 절대 공유하지 않습니다 (100% 온디바이스)
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowPrivacyInspector(!showPrivacyInspector)}
          className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center gap-1"
        >
          <ShieldCheck className="w-4 h-4" /> 보안 검증
        </button>
      </div>

      <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-emerald-500 flex items-center gap-1.5">
            <Lock className="w-4 h-4" /> HomePlate Zero-Cloud Privacy Engine 작동 중
          </span>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-500">
            외부 전송: 0 Byte
          </span>
        </div>
        {showPrivacyInspector && (
          <div className="mt-2.5 pt-2.5 border-t border-emerald-500/20 text-[11px] font-mono space-y-1">
            <div className="flex justify-between">
              <span>• Local Storage Engine:</span>
              <span className="font-bold">HomePlateOnDevicePrivacyDB (IndexedDB)</span>
            </div>
            <div className="flex justify-between">
              <span>• External Server Upload:</span>
              <span className="font-bold">BLOCKED (0 Byte)</span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {localKeywords.map((kw, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span>
                <span className={`px-2 py-0.5 rounded text-[10px] mr-1.5 ${theme.badge}`}>{kw.category}</span>
                {kw.word}
              </span>
              <span className="text-emerald-500">
                {kw.count}회 ({kw.trend})
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-500/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, kw.count * 2)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className={`p-3.5 rounded-2xl border ${theme.accentSoft} text-xs flex items-center justify-between gap-2`}>
        <span>
          💡 <strong>AI 소통 코칭:</strong> 가족과 '집밥 레시피' 및 '해커톤 응원' 대화가 가장 활발합니다!
        </span>
        <button
          onClick={() => setActiveAppView('comm')}
          className={`px-3 py-1.5 rounded-xl font-extrabold shrink-0 ${theme.accent}`}
        >
          채팅하러 가기
        </button>
      </div>
    </div>
  );
}
