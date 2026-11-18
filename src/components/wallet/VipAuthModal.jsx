import React from 'react';
import { X } from 'lucide-react';

export default function VipAuthModal({
  showVipModal,
  setShowVipModal,
  theme,
  vipIdInput,
  setVipIdInput,
  vipTestCodeInput,
  setVipTestCodeInput,
  handlePiAuthenticate,
  isAuthenticatingPi
}) {
  if (!showVipModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className={`w-full max-w-lg rounded-3xl border p-6 shadow-2xl ${theme.card} ${theme.text}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-base">π</div>
            <div>
              <h3 className="font-extrabold text-lg">Pi Browser 인증 & VIP 초대 전용 멤버십</h3>
              <p className={`text-xs ${theme.subtext}`}>Pi SDK v2.0 공식 로그인(`Pi.authenticate`) + VIP 초대 코드</p>
            </div>
          </div>
          <button onClick={() => setShowVipModal(false)} className={`p-1.5 rounded-xl ${theme.badge}`}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold mb-1">Pi Network Pioneer 계정 (@username)</label>
            <input
              type="text"
              value={vipIdInput}
              onChange={(e) => setVipIdInput(e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl text-xs font-bold border ${theme.input}`}
            />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">VIP 초대 코드 (초대 전용 클럽 검증)</label>
            <input
              type="text"
              value={vipTestCodeInput}
              onChange={(e) => setVipTestCodeInput(e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl text-xs font-mono font-bold border ${theme.input}`}
            />
          </div>
          <button
            onClick={() => handlePiAuthenticate(vipIdInput, vipTestCodeInput)}
            disabled={isAuthenticatingPi}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-xs shadow-lg"
          >
            {isAuthenticatingPi ? 'Pi Browser 지갑 서명 및 검증 중...' : 'Pi Browser로 로그인 (Pi.authenticate) & 지갑 연동'}
          </button>
        </div>
      </div>
    </div>
  );
}

