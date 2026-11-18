import React from 'react';
import { BarChart3, ShieldCheck, Lock } from 'lucide-react';

export default function OnDevicePrivacyReport({
  theme,
  showPrivacyInspector,
  setShowPrivacyInspector,
  keywordsData
}) {
  return (
    <div className={`p-5 rounded-3xl border ${theme.card}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-violet-600 text-white">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-base">AI 대화 키워드 & 소통 패턴 분석</h2>
            <p className={`text-xs ${theme.subtext}`}>외부 서버 공유 절대 없음 • 100% 온디바이스(IndexedDB) 분석</p>
          </div>
        </div>
        <button
          onClick={() => setShowPrivacyInspector(!showPrivacyInspector)}
          className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center gap-1"
        >
          <ShieldCheck className="w-4 h-4" /> 보안 검증
        </button>
      </div>

      <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-emerald-500 flex items-center gap-1.5">
            <Lock className="w-4 h-4" /> Zero-Cloud Privacy Engine 작동 중
          </span>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
            외부 전송: 0 Byte
          </span>
        </div>
        {showPrivacyInspector && (
          <div className="mt-2.5 pt-2.5 border-t border-emerald-500/20 text-[11px] font-mono space-y-1">
            <div className="flex justify-between">
              <span>• Storage Engine:</span>
              <span className="text-emerald-400">Local IndexedDB (AES-GCM)</span>
            </div>
            <div className="flex justify-between">
              <span>• External API Telemetry:</span>
              <span className="text-emerald-400">BLOCKED (0 Byte)</span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2.5">
        {keywordsData.map((kw, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] mr-1.5 ${theme.badge}`}>{kw.category}</span>
                {kw.word}
              </span>
              <span className="text-emerald-500">
                {kw.count}회 ({kw.trend})
              </span>
            </div>
            <div className="w-full h-2 bg-slate-500/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-rose-500 rounded-full"
                style={{ width: `${Math.min(100, kw.count * 2.2)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

