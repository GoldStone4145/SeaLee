import React from 'react';
import { Phone, Video, Send } from 'lucide-react';

export default function CommChatCallHub({
  theme,
  contactNodes,
  activeChatPartner,
  setActiveChatPartnerId,
  chatHistories,
  chatInputText,
  setChatInputText,
  onSendChatMessage,
  onStartCallWithNode,
  setActiveAppView
}) {
  return (
    <div className={`p-5 rounded-3xl border ${theme.card} space-y-4`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-extrabold text-base sm:text-lg">HomePlate 1:1 채팅 & 무료 통화</h2>
          <p className={`text-xs ${theme.subtext}`}>
            내 주소록(연락처)에 등록된 가족·친구와 실시간 채팅 및 WebRTC 무료 음성·영상 통화를 나눕니다
          </p>
        </div>
        <button
          onClick={() => setActiveAppView('profile')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${theme.card}`}
        >
          📇 주소록(연락처) 관리
        </button>
      </div>

      {/* 상단 연락처 선택 바 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-500/15">
        {contactNodes
          .filter((n) => n.id !== 'me')
          .map((person) => {
            const isSelected = activeChatPartner && activeChatPartner.id === person.id;
            return (
              <button
                key={person.id}
                onClick={() => setActiveChatPartnerId(person.id)}
                className={`px-3 py-2 rounded-2xl border text-xs font-extrabold flex items-center gap-2 shrink-0 transition ${
                  isSelected ? `${theme.accent} border-transparent shadow` : `${theme.card}`
                }`}
              >
                <span className="text-base">{person.icon}</span>
                <div className="text-left">
                  <p className="leading-none">{person.label}</p>
                  <span className="text-[9px] opacity-80">{person.timezone}</span>
                </div>
              </button>
            );
          })}
      </div>

      {activeChatPartner && (
        <>
          <div className={`p-3.5 rounded-2xl border ${theme.accentSoft} flex flex-wrap items-center justify-between gap-2`}>
            <div className="flex items-center gap-2.5">
              <div className={`w-10 h-10 rounded-2xl ${activeChatPartner.color} text-white flex items-center justify-center text-xl shadow`}>
                {activeChatPartner.icon}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-sm">{activeChatPartner.label}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/10 font-bold">
                    {activeChatPartner.relation}
                  </span>
                </div>
                <p className="text-[11px] opacity-85">
                  {activeChatPartner.timezone} • {activeChatPartner.status}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onStartCallWithNode(activeChatPartner, 'voice')}
                className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-extrabold flex items-center gap-1 shadow"
              >
                <Phone className="w-3.5 h-3.5" /> 무료 음성통화
              </button>
              <button
                onClick={() => onStartCallWithNode(activeChatPartner, 'video')}
                className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-xs font-extrabold flex items-center gap-1 shadow"
              >
                <Video className="w-3.5 h-3.5" /> 무료 영상통화
              </button>
            </div>
          </div>

          {/* 1:1 메시지 스트림 */}
          <div className="h-72 sm:h-80 overflow-y-auto p-3.5 rounded-2xl bg-slate-500/5 border border-slate-500/15 space-y-3">
            {(chatHistories[activeChatPartner.id] || []).map((msg) => {
              const isMe = msg.sender === 'me';
              return (
                <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-end gap-2 max-w-[82%]">
                    {!isMe && (
                      <div className={`w-7 h-7 rounded-full ${activeChatPartner.color} text-white flex items-center justify-center text-xs shrink-0`}>
                        {activeChatPartner.icon}
                      </div>
                    )}
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        isMe ? `${theme.accent} rounded-br-none shadow-sm` : `${theme.card} border rounded-bl-none`
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                  <span className={`text-[9px] mt-1 px-1 ${theme.subtext}`}>{msg.time}</span>
                </div>
              );
            })}
          </div>

          <form onSubmit={onSendChatMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={chatInputText}
              onChange={(e) => setChatInputText(e.target.value)}
              placeholder={`${activeChatPartner.label} 님에게 메시지를 입력하세요 (대화 패턴은 기기 내부에서만 안전하게 분석됩니다)...`}
              className={`flex-1 px-4 py-2.5 rounded-2xl text-xs border ${theme.input}`}
            />
            <button
              type="submit"
              className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-1.5 ${theme.accent} shadow`}
            >
              <Send className="w-3.5 h-3.5" /> 전송
            </button>
          </form>
        </>
      )}
    </div>
  );
}
