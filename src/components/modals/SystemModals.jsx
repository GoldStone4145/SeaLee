import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Upload,
  AlertTriangle,
  Mic,
  MicOff,
  VideoOff,
  X
} from 'lucide-react';
import HomePlateLogo from '../common/HomePlateLogo';

export default function SystemModals({
  theme,
  timeInfo,
  simulateSummerTime,
  currentStatusObj,
  customStatusNote,
  showLogoModal,
  setShowLogoModal,
  customLogoUrl,
  setCustomLogoUrl,
  logoStyle,
  setLogoStyle,
  onLogoFileUpload,
  preCallModal,
  setPreCallModal,
  activeCall,
  setActiveCall,
  onSwitchToChatFromGuard,
  onFinishCallReward,
  paymentSheet,
  setPaymentSheet,
  onExecutePiPaymentFlow,
  showVipModal,
  setShowVipModal,
  vipLoginNameInput,
  setVipLoginNameInput,
  vipLoginHandleInput,
  setVipLoginHandleInput,
  vipCodeInput,
  setVipCodeInput,
  onApplyVipLogin,
  showNotification
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  return (
    <>
      {/* 1. HomePlate 로고 슬롯 설정 모달 */}
      {showLogoModal && (
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
                <p className="text-[11px] opacity-80">상단 헤더 좌측과 VIP 로그인 화면에 표시됩니다.</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-extrabold mb-1.5">1. 내 컴퓨터/휴대폰에서 로고 이미지 업로드</label>
                <label
                  className={`w-full py-2.5 px-4 rounded-xl border border-dashed cursor-pointer flex items-center justify-center gap-2 font-bold ${theme.card} hover:border-amber-500 transition`}
                >
                  <Upload className="w-4 h-4 text-amber-500" />
                  <span>로고 이미지 파일 선택 (PNG, JPG, SVG)</span>
                  <input type="file" accept="image/*" onChange={onLogoFileUpload} className="hidden" />
                </label>
              </div>

              <div>
                <label className="block font-extrabold mb-1">2. 또는 GitHub 이미지 경로 / URL 입력 (예: ./logo.png)</label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={customLogoUrl}
                    onChange={(e) => setCustomLogoUrl(e.target.value)}
                    placeholder="./logo.png 또는 https://.../logo.png"
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
      )}

      {/* 2. 통화 전 시차 & 상태 보호 가드 */}
      {preCallModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl border p-6 shadow-2xl ${theme.card} ${theme.text}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-extrabold text-base flex items-center gap-1.5">
                <AlertTriangle className="w-5 h-5 text-amber-500" /> 통화 전 시차 & 상태 보호 가드
              </h3>
              <button onClick={() => setPreCallModal(null)} className={`p-1.5 rounded-xl ${theme.badge}`}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className={`p-4 rounded-2xl border mb-4 ${theme.accentSoft} text-xs space-y-1.5`}>
              <p className="font-extrabold text-sm">
                📢 잠깐! 한국은 현재 {timeInfo.seoulTimeStr}, 영국은 현재 {timeInfo.londonTimeStr}입니다.
              </p>
              <p>
                • 시차 안내:{' '}
                <strong>
                  {timeInfo.timeDiffHours}시간 차이 ({simulateSummerTime ? '서머타임 BST 적용 중' : '표준시 GMT'})
                </strong>
              </p>
              <p>
                • 설정된 상태: <strong>[{currentStatusObj.label}]</strong> "
                {customStatusNote || currentStatusObj.autoMessage}"
              </p>
            </div>

            <div className="flex flex-wrap justify-end gap-2">
              <button
                onClick={() => onSwitchToChatFromGuard(preCallModal.contact)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold ${theme.badge}`}
              >
                💬 통화 대신 채팅 남기기
              </button>
              <button
                onClick={() => {
                  setActiveCall({ contact: preCallModal.contact, callType: preCallModal.callType, duration: 0 });
                  setPreCallModal(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold shadow"
              >
                📞 {preCallModal.callType === 'video' ? '무료 영상통화 연결' : '무료 음성통화 연결'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. 실시간 WebRTC 무료 통화 화면 */}
      {activeCall && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700 text-white p-6 text-center">
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {activeCall.callType === 'video' ? '🎥 HomePlate 무료 영상통화' : '📞 HomePlate 무료 음성통화'}
            </span>
            <div className="text-6xl my-4">{activeCall.contact.avatar}</div>
            <h3 className="font-black text-xl">{activeCall.contact.name}</h3>
            <p className="text-xs text-emerald-400 mt-1">연결됨 • {activeCall.duration}초 경과</p>

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-2xl ${isMuted ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-white'}`}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              {activeCall.callType === 'video' && (
                <button
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`p-3 rounded-2xl ${isVideoOff ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-white'}`}
                >
                  <VideoOff className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={onFinishCallReward}
                className="px-6 py-3 rounded-2xl bg-rose-600 text-white text-xs font-extrabold"
              >
                통화 종료
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Pi 지갑 결제 시트 */}
      {paymentSheet && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-amber-500/40 text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-sm">HomePlate • Pi Wallet 결제 시트</h3>
              <button onClick={() => setPaymentSheet(null)} className="p-1 rounded-lg bg-slate-800">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800 text-center mb-4">
              <p className="text-2xl font-black text-amber-400">{paymentSheet.amount} π</p>
              <p className="text-xs mt-1">{paymentSheet.title}</p>
            </div>
            {paymentSheet.step === 0 ? (
              <button
                onClick={onExecutePiPaymentFlow}
                className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs"
              >
                Pi 지갑으로 승인하기
              </button>
            ) : paymentSheet.step < 3 ? (
              <div className="w-full py-3 rounded-xl bg-slate-800 text-amber-300 text-xs font-bold text-center animate-pulse">
                Pi 블록체인 검증 중...
              </div>
            ) : (
              <button
                onClick={() => setPaymentSheet(null)}
                className="w-full py-3 rounded-xl bg-emerald-600 text-white font-extrabold text-xs"
              >
                완료 및 닫기
              </button>
            )}
          </div>
        </div>
      )}

      {/* 5. HomePlate VIP 초대 로그인 & 사용자 이름 변경 모달 */}
      {showVipModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl border p-6 shadow-2xl ${theme.card} ${theme.text}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <HomePlateLogo customLogoUrl={customLogoUrl} logoStyle={logoStyle} size="sm" />
                <div>
                  <h3 className="font-extrabold text-base">HomePlate VIP 초대 로그인</h3>
                  <p className={`text-[11px] ${theme.subtext}`}>초대 코드 인증 & Pi 브라우저 지갑 연동</p>
                </div>
              </div>
              <button onClick={() => setShowVipModal(false)} className={`p-1.5 rounded-xl ${theme.badge}`}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">표시할 사용자 이름 (상단 헤더에 반영)</label>
                <input
                  type="text"
                  value={vipLoginNameInput}
                  onChange={(e) => setVipLoginNameInput(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl text-xs font-bold border ${theme.input}`}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Pi Network Pioneer 계정 (@username)</label>
                <input
                  type="text"
                  value={vipLoginHandleInput}
                  onChange={(e) => setVipLoginHandleInput(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl text-xs font-bold border ${theme.input}`}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">HomePlate VIP 초대 코드</label>
                <input
                  type="text"
                  value={vipCodeInput}
                  onChange={(e) => setVipCodeInput(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl text-xs font-mono font-bold border ${theme.input}`}
                />
              </div>
              <button
                onClick={onApplyVipLogin}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-xs shadow"
              >
                로그인 및 사용자 이름 적용하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
