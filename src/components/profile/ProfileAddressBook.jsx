import React, { useState, useRef, useMemo } from 'react';
import {
  Users,
  Plus,
  Minus,
  Move,
  Edit3,
  Trash2,
  Search,
  MessageCircle,
  Phone,
  Video,
  ChevronRight,
  Wallet,
  X
} from 'lucide-react';
import { GROUP_COLORS, GROUP_LABELS } from '../../constants/initialData';

export default function ProfileAddressBook({
  theme,
  userProfile,
  setUserProfile,
  contactNodes,
  setContactNodes,
  selectedNodeId,
  setSelectedNodeId,
  nodeActionSheet,
  setNodeActionSheet,
  showContactFormModal,
  setShowContactFormModal,
  editingContactId,
  setEditingContactId,
  contactForm,
  setContactForm,
  onOpenAddContactModal,
  onOpenEditContactModal,
  onSaveContactForm,
  onDeleteContact,
  onOpenChatWithNode,
  onStartCallWithNode,
  onOpenPiPaymentSheet,
  showNotification
}) {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState(userProfile);

  // 인터랙티브 맵 확대/축소(Zoom) 및 드래그 이동(Pan) 상태
  const [mapScale, setMapScale] = useState(1.0);
  const [mapPan, setMapPan] = useState({ x: 0, y: 0 });
  const [isPanningMap, setIsPanningMap] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);

  // 주소록 목록 검색 & 그룹 필터
  const [contactSearchQuery, setContactSearchQuery] = useState('');
  const [contactGroupFilter, setContactGroupFilter] = useState('all');

  const selectedNodeObj = useMemo(
    () => contactNodes.find((n) => n.id === selectedNodeId) || contactNodes[0],
    [contactNodes, selectedNodeId]
  );

  const filteredContactList = useMemo(() => {
    return contactNodes
      .filter((n) => n.id !== 'me')
      .filter((n) => {
        if (contactGroupFilter !== 'all' && n.group !== contactGroupFilter) return false;
        if (!contactSearchQuery.trim()) return true;
        const q = contactSearchQuery.toLowerCase();
        return (
          n.label.toLowerCase().includes(q) ||
          n.relation.toLowerCase().includes(q) ||
          (n.note && n.note.toLowerCase().includes(q))
        );
      });
  }, [contactNodes, contactGroupFilter, contactSearchQuery]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUserProfile(profileForm);
    setContactNodes((prev) =>
      prev.map((n) => (n.id === 'me' ? { ...n, label: `나 (${profileForm.name.split(' ')[0]})` } : n))
    );
    setIsEditingProfile(false);
    showNotification(`✅ [${profileForm.name}] 님의 프로필 정보가 저장되었습니다!`);
  };

  // 맵 확대/축소 핸들러
  const handleZoomMap = (delta) => {
    setMapScale((prev) => {
      const next = +(prev + delta).toFixed(2);
      return Math.max(0.55, Math.min(2.2, next));
    });
  };

  const handleResetMapView = () => {
    setMapScale(1.0);
    setMapPan({ x: 0, y: 0 });
    showNotification('🧭 주소록 맵 화면이 중앙(100%)으로 정렬되었습니다.');
  };

  // 맵 드래그 이동(Pan) 핸들러 (마우스 & 모바일 터치 지원)
  const startMapPan = (clientX, clientY) => {
    setIsPanningMap(true);
    hasDraggedRef.current = false;
    panStartRef.current = { x: clientX - mapPan.x, y: clientY - mapPan.y };
  };

  const moveMapPan = (clientX, clientY) => {
    if (!isPanningMap) return;
    const dx = clientX - panStartRef.current.x;
    const dy = clientY - panStartRef.current.y;
    if (Math.abs(dx - mapPan.x) > 4 || Math.abs(dy - mapPan.y) > 4) {
      hasDraggedRef.current = true;
    }
    setMapPan({
      x: Math.max(-360, Math.min(360, dx)),
      y: Math.max(-280, Math.min(280, dy))
    });
  };

  const endMapPan = () => {
    setIsPanningMap(false);
  };

  const handleClickContactNode = (node) => {
    if (hasDraggedRef.current) return;
    setSelectedNodeId(node.id);
    if (node.id !== 'me') {
      setNodeActionSheet(node);
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. 본인 프로필 정보 카드 */}
      <div className={`p-5 rounded-3xl border ${theme.card}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center text-3xl shadow-md">
              {userProfile.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-base sm:text-lg">{userProfile.name}</h2>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-500">
                  @{userProfile.username}
                </span>
              </div>
              <p className={`text-xs ${theme.subtext}`}>{userProfile.university}</p>
            </div>
          </div>

          <button
            onClick={() => {
              setProfileForm(userProfile);
              setIsEditingProfile(!isEditingProfile);
            }}
            className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 ${
              isEditingProfile ? theme.badge : theme.accent
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditingProfile ? '취소' : '내 정보 수정'}</span>
          </button>
        </div>

        {isEditingProfile ? (
          <form onSubmit={handleSaveProfile} className="space-y-3 pt-2 border-t border-slate-500/15">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold mb-1">이름 / 닉네임 (상단 헤더 표시)</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs border ${theme.input}`}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold mb-1">소속 대학 / 전공</label>
                <input
                  type="text"
                  value={profileForm.university}
                  onChange={(e) => setProfileForm({ ...profileForm, university: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs border ${theme.input}`}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold mb-1">영국 체류 도시</label>
                <input
                  type="text"
                  value={profileForm.ukCity}
                  onChange={(e) => setProfileForm({ ...profileForm, ukCity: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs border ${theme.input}`}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold mb-1">한국 본가 위치</label>
                <input
                  type="text"
                  value={profileForm.krHometown}
                  onChange={(e) => setProfileForm({ ...profileForm, krHometown: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs border ${theme.input}`}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold mb-1">수면 보호 시간대</label>
                <input
                  type="text"
                  value={profileForm.sleepWindowUk}
                  onChange={(e) => setProfileForm({ ...profileForm, sleepWindowUk: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs border ${theme.input}`}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold mb-1">통화 골든타임</label>
                <input
                  type="text"
                  value={profileForm.goldenCallTime}
                  onChange={(e) => setProfileForm({ ...profileForm, goldenCallTime: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs border ${theme.input}`}
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold mb-1">자기소개 & 라이프스타일</label>
              <textarea
                rows="2"
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                className={`w-full px-3 py-2 rounded-xl text-xs border ${theme.input}`}
              />
            </div>
            <button type="submit" className={`w-full py-2.5 rounded-xl text-xs font-extrabold ${theme.accent} shadow`}>
              내 프로필 저장하기
            </button>
          </form>
        ) : (
          <div className="space-y-3">
            <p className="text-xs leading-relaxed">{userProfile.bio}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className={`p-2.5 rounded-2xl ${theme.badge}`}>
                <span className="text-[10px] opacity-75 block">🇬🇧 체류지</span>
                <span className="font-extrabold">{userProfile.ukCity}</span>
              </div>
              <div className={`p-2.5 rounded-2xl ${theme.badge}`}>
                <span className="text-[10px] opacity-75 block">🇰🇷 본가</span>
                <span className="font-extrabold">{userProfile.krHometown}</span>
              </div>
              <div className={`p-2.5 rounded-2xl ${theme.badge}`}>
                <span className="text-[10px] opacity-75 block">🌙 수면 시간</span>
                <span className="font-extrabold">{userProfile.sleepWindowUk}</span>
              </div>
              <div className={`p-2.5 rounded-2xl ${theme.badge}`}>
                <span className="text-[10px] opacity-75 block">📞 통화 골든타임</span>
                <span className="font-extrabold">{userProfile.goldenCallTime}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. 인터랙티브 주소록(연락처) 맵 (드래그 이동 & 확대/축소 지원) */}
      <div className={`p-5 rounded-3xl border ${theme.card}`}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500" />
              <h3 className="font-extrabold text-base">내 주소록 (연락처)</h3>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-500">
                총 {contactNodes.length - 1}명
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${theme.subtext}`}>
              화면을 <strong>드래그하여 상하좌우로 이동</strong>하거나 <strong>확대·축소</strong>할 수 있으며, 연락처를 누르면 <strong>채팅·통화·수정·삭제</strong>가 가능합니다.
            </p>
          </div>
          <button
            onClick={onOpenAddContactModal}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold ${theme.accent} flex items-center gap-1 shadow`}
          >
            <Plus className="w-4 h-4" /> 새 연락처 추가
          </button>
        </div>

        {/* Pan & Zoom 캔버스 뷰포트 */}
        <div
          onMouseDown={(e) => startMapPan(e.clientX, e.clientY)}
          onMouseMove={(e) => moveMapPan(e.clientX, e.clientY)}
          onMouseUp={endMapPan}
          onMouseLeave={endMapPan}
          onTouchStart={(e) => {
            if (e.touches.length === 1) {
              startMapPan(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          onTouchMove={(e) => {
            if (e.touches.length === 1) {
              moveMapPan(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          onTouchEnd={endMapPan}
          onWheel={(e) => {
            e.preventDefault();
            handleZoomMap(e.deltaY < 0 ? 0.12 : -0.12);
          }}
          style={{ touchAction: 'none' }}
          className={`relative w-full h-80 sm:h-96 rounded-3xl map-grid-bg bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-rose-500/5 border border-slate-500/20 overflow-hidden mb-4 select-none ${
            isPanningMap ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {/* 우측 상단 확대/축소 컨트롤 바 */}
          <div
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 z-20 flex items-center gap-1 p-1.5 rounded-2xl bg-slate-900/80 text-white backdrop-blur-md shadow-lg border border-white/15"
          >
            <button onClick={() => handleZoomMap(-0.2)} className="p-1.5 rounded-xl hover:bg-white/15 transition" title="축소">
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[11px] font-black tabular-nums">{Math.round(mapScale * 100)}%</span>
            <button onClick={() => handleZoomMap(0.2)} className="p-1.5 rounded-xl hover:bg-white/15 transition" title="확대">
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetMapView}
              className="px-2 py-1 rounded-xl bg-amber-500 text-slate-950 text-[10px] font-black ml-0.5"
            >
              중앙정렬
            </button>
          </div>

          {/* 좌측 상단 조작 가이드 */}
          <div className="absolute top-3 left-3 z-20 pointer-events-none">
            <span className="px-2.5 py-1 rounded-xl bg-black/55 text-white text-[10px] font-bold backdrop-blur-sm flex items-center gap-1">
              <Move className="w-3 h-3 text-amber-400" /> 드래그로 화면 이동 • + / - 확대·축소
            </span>
          </div>

          {/* 변환 레이어 */}
          <div
            style={{
              transform: `translate(${mapPan.x}px, ${mapPan.y}px) scale(${mapScale})`,
              transformOrigin: 'center center',
              transition: isPanningMap ? 'none' : 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="w-full h-full relative"
          >
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {contactNodes
                .filter((n) => n.id !== 'me')
                .map((node) => {
                  const center = contactNodes.find((n) => n.id === 'me') || { x: 50, y: 50 };
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <line
                      key={`edge-${node.id}`}
                      x1={`${center.x}%`}
                      y1={`${center.y}%`}
                      x2={`${node.x}%`}
                      y2={`${node.y}%`}
                      stroke={isSelected ? '#6366f1' : '#94a3b8'}
                      strokeWidth={isSelected ? '3' : '1.8'}
                      strokeDasharray={node.group === 'family' ? '0' : '5 5'}
                      opacity={isSelected ? '0.95' : '0.45'}
                    />
                  );
                })}
            </svg>

            {contactNodes.map((node) => {
              const isCenter = node.id === 'me';
              const isSelected = selectedNodeId === node.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickContactNode(node);
                  }}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group focus:outline-none z-10"
                >
                  <div
                    className={`${
                      isCenter ? 'w-16 h-16 text-3xl ring-4 ring-indigo-400/50 animate-pulse-ring' : 'w-12 h-12 text-2xl'
                    } rounded-full ${node.color} text-white flex items-center justify-center shadow-lg transition-transform ${
                      isSelected ? 'scale-115 ring-4 ring-amber-400' : 'group-hover:scale-110'
                    }`}
                  >
                    {node.icon}
                  </div>
                  <div
                    className={`mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold shadow-sm border whitespace-nowrap ${
                      isSelected ? 'bg-slate-900 text-white border-amber-400' : `${theme.card}`
                    }`}
                  >
                    {node.label}
                  </div>
                  {!isCenter && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-black/55 text-white mt-0.5">
                      {node.relation.split(' ')[0]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 선택된 연락처 상세 카드 */}
        {selectedNodeObj && (
          <div className={`p-4 rounded-2xl border ${theme.accentSoft} flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5`}>
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-2xl ${selectedNodeObj.color} text-white flex items-center justify-center text-2xl shrink-0 shadow`}>
                {selectedNodeObj.icon}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <h4 className="font-black text-sm">{selectedNodeObj.label}</h4>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-black/10">
                    {selectedNodeObj.relation}
                  </span>
                  <span className="text-[10px] font-bold text-rose-500">❤️ 친밀도 {selectedNodeObj.closeness}%</span>
                </div>
                <p className="text-xs mt-1">{selectedNodeObj.note}</p>
                <p className="text-[11px] opacity-80 mt-1">
                  🕒 시간대: <strong>{selectedNodeObj.timezone}</strong> • 상태: <strong>{selectedNodeObj.status}</strong>
                  {selectedNodeObj.phone ? ` • 📱 ${selectedNodeObj.phone}` : ''}
                </p>
              </div>
            </div>

            {selectedNodeObj.id !== 'me' && (
              <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                <button
                  onClick={() => onOpenChatWithNode(selectedNodeObj)}
                  className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1 shadow ${theme.accent}`}
                >
                  <MessageCircle className="w-3.5 h-3.5" /> 채팅
                </button>
                <button
                  onClick={() => onStartCallWithNode(selectedNodeObj, 'voice')}
                  className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-extrabold flex items-center gap-1 shadow"
                >
                  <Phone className="w-3.5 h-3.5" /> 음성통화
                </button>
                <button
                  onClick={() => onStartCallWithNode(selectedNodeObj, 'video')}
                  className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-xs font-extrabold flex items-center gap-1 shadow"
                >
                  <Video className="w-3.5 h-3.5" /> 영상통화
                </button>
                <button
                  onClick={() => onOpenEditContactModal(selectedNodeObj)}
                  className={`p-2 rounded-xl border ${theme.card}`}
                  title="연락처 정보 수정"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeleteContact(selectedNodeObj.id)}
                  className="p-2 rounded-xl bg-rose-500/15 text-rose-500 border border-rose-500/30"
                  title="연락처 삭제"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* 3. 주소록(연락처) 직접 관리 목록 (검색 · 그룹 필터 · 수정 · 삭제) */}
        <div className="pt-4 border-t border-slate-500/15 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="font-extrabold text-sm flex items-center gap-1.5">
              📇 주소록(연락처) 직접 관리 ({filteredContactList.length}명)
            </h4>
            <div className="flex items-center gap-1.5 flex-1 sm:flex-initial max-w-xs">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border w-full ${theme.input}`}>
                <Search className="w-3.5 h-3.5 opacity-60 shrink-0" />
                <input
                  type="text"
                  value={contactSearchQuery}
                  onChange={(e) => setContactSearchQuery(e.target.value)}
                  placeholder="이름, 관계, 메모 검색..."
                  className="bg-transparent text-xs w-full focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {Object.entries(GROUP_LABELS).map(([gKey, gLabel]) => (
              <button
                key={gKey}
                onClick={() => setContactGroupFilter(gKey)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  contactGroupFilter === gKey ? theme.accent : theme.badge
                }`}
              >
                {gLabel}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {filteredContactList.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedNodeId(contact.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between gap-2 transition ${
                  selectedNodeId === contact.id
                    ? `${theme.accentSoft} ring-1 ring-current/30`
                    : `${theme.card} ${theme.cardHover}`
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-11 h-11 rounded-2xl ${contact.color} text-white flex items-center justify-center text-xl shrink-0 shadow`}>
                    {contact.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-extrabold text-xs sm:text-sm truncate">{contact.label}</p>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${theme.badge} shrink-0`}>
                        {contact.timezone}
                      </span>
                    </div>
                    <p className={`text-[11px] ${theme.subtext} truncate`}>
                      {contact.relation} {contact.phone ? `• ${contact.phone}` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onOpenChatWithNode(contact)}
                    className={`p-2 rounded-xl ${theme.accent}`}
                    title="1:1 채팅"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onStartCallWithNode(contact, 'voice')}
                    className="p-2 rounded-xl bg-emerald-600 text-white"
                    title="무료 통화"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onOpenEditContactModal(contact)}
                    className={`p-2 rounded-xl border ${theme.card}`}
                    title="연락처 수정"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteContact(contact.id)}
                    className="p-2 rounded-xl bg-rose-500/15 text-rose-500"
                    title="연락처 삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 모달 1: 연락처 클릭 시 상호작용 시트 */}
      {nodeActionSheet && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-sm rounded-3xl border p-6 shadow-2xl animate-fadeIn ${theme.card} ${theme.text}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-14 h-14 rounded-2xl ${nodeActionSheet.color} text-white flex items-center justify-center text-3xl shadow-lg`}>
                  {nodeActionSheet.icon}
                </div>
                <div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-500">
                    {nodeActionSheet.relation}
                  </span>
                  <h3 className="font-black text-lg mt-0.5">{nodeActionSheet.label}</h3>
                  <p className={`text-xs ${theme.subtext}`}>
                    {nodeActionSheet.timezone} • {nodeActionSheet.status}
                  </p>
                </div>
              </div>
              <button onClick={() => setNodeActionSheet(null)} className={`p-1.5 rounded-xl ${theme.badge}`}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className={`text-xs p-3 rounded-2xl mb-4 ${theme.accentSoft}`}>💡 "{nodeActionSheet.note}"</p>

            <div className="space-y-2">
              <button
                onClick={() => onOpenChatWithNode(nodeActionSheet)}
                className={`w-full py-3 px-4 rounded-2xl font-extrabold text-xs flex items-center justify-between shadow ${theme.accent}`}
              >
                <span className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> 1:1 실시간 채팅 시작하기
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onStartCallWithNode(nodeActionSheet, 'voice')}
                  className="py-3 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <Phone className="w-4 h-4" /> 무료 음성통화
                </button>
                <button
                  onClick={() => onStartCallWithNode(nodeActionSheet, 'video')}
                  className="py-3 px-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <Video className="w-4 h-4" /> 무료 영상통화
                </button>
              </div>

              <button
                onClick={() => {
                  const target = nodeActionSheet;
                  setNodeActionSheet(null);
                  onOpenPiPaymentSheet({
                    mode: 'U2A',
                    title: `${target.label} 님께 감사 π 보내기`,
                    amount: 1.0,
                    recipient: target.label
                  });
                }}
                className="w-full py-2.5 px-4 rounded-2xl bg-amber-500/15 text-amber-500 border border-amber-500/30 font-extrabold text-xs flex items-center justify-center gap-1.5"
              >
                <Wallet className="w-4 h-4" /> Pi 지갑으로 1.0 π 선물 보내기
              </button>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-500/15">
                <button
                  onClick={() => onOpenEditContactModal(nodeActionSheet)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-extrabold border flex items-center justify-center gap-1.5 ${theme.card}`}
                >
                  <Edit3 className="w-3.5 h-3.5" /> 연락처 수정
                </button>
                <button
                  onClick={() => onDeleteContact(nodeActionSheet.id)}
                  className="py-2.5 px-3 rounded-xl bg-rose-500/15 text-rose-500 border border-rose-500/30 text-xs font-extrabold flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" /> 연락처 삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 모달 2: 주소록(연락처) 추가 및 수정 폼 */}
      {showContactFormModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl border p-6 shadow-2xl animate-fadeIn ${theme.card} ${theme.text}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-base">
                {editingContactId ? '✏️ 연락처 정보 수정' : '📇 주소록에 새 연락처 추가'}
              </h3>
              <button onClick={() => setShowContactFormModal(false)} className={`p-1.5 rounded-xl ${theme.badge}`}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={onSaveContactForm} className="space-y-3 text-xs">
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-1">
                  <label className="block font-bold mb-1">아이콘</label>
                  <select
                    value={contactForm.icon}
                    onChange={(e) => setContactForm({ ...contactForm, icon: e.target.value })}
                    className={`w-full px-2 py-2 rounded-xl border text-base text-center ${theme.input}`}
                  >
                    {['😊', '👩‍🍳', '👨‍💼', '👦', '👧', '👵', '👴', '👱‍♂️', '👩‍🏫', '🧑‍💻', '❤️'].map((em) => (
                      <option key={em} value={em}>
                        {em}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-3">
                  <label className="block font-bold mb-1">이름 또는 호칭 *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.label}
                    onChange={(e) => setContactForm({ ...contactForm, label: e.target.value })}
                    placeholder="예: 어머니, 외할머니, 런던 룸메이트"
                    className={`w-full px-3.5 py-2 rounded-xl border ${theme.input}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">나와의 관계</label>
                  <input
                    type="text"
                    value={contactForm.relation}
                    onChange={(e) => setContactForm({ ...contactForm, relation: e.target.value })}
                    placeholder="예: 가족 (본가), 학과 친구"
                    className={`w-full px-3 py-2 rounded-xl border ${theme.input}`}
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">연락처 / 전화번호</label>
                  <input
                    type="text"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="예: +82 10-0000-0000"
                    className={`w-full px-3 py-2 rounded-xl border ${theme.input}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">그룹 분류</label>
                  <select
                    value={contactForm.group}
                    onChange={(e) => setContactForm({ ...contactForm, group: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border ${theme.input}`}
                  >
                    <option value="family">👩‍👧‍👦 가족 (본가)</option>
                    <option value="uk_friend">🇬🇧 영국 친구</option>
                    <option value="mentor">🌟 멘토/선배</option>
                    <option value="other">🤝 지인/기타</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">거주 시간대</label>
                  <select
                    value={contactForm.timezone}
                    onChange={(e) => setContactForm({ ...contactForm, timezone: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border ${theme.input}`}
                  >
                    <option value="KR (KST)">🇰🇷 한국 (KST)</option>
                    <option value="UK (GMT)">🇬🇧 영국 (GMT)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">현재 상태 메모</label>
                  <input
                    type="text"
                    value={contactForm.status}
                    onChange={(e) => setContactForm({ ...contactForm, status: e.target.value })}
                    placeholder="예: 저녁 휴식 중 • 통화 가능"
                    className={`w-full px-3 py-2 rounded-xl border ${theme.input}`}
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">친밀도 ({contactForm.closeness}%)</label>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={contactForm.closeness}
                    onChange={(e) => setContactForm({ ...contactForm, closeness: e.target.value })}
                    className="w-full accent-indigo-600 mt-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">기억할 메모 (통화 시간대 / 취향 등)</label>
                <input
                  type="text"
                  value={contactForm.note}
                  onChange={(e) => setContactForm({ ...contactForm, note: e.target.value })}
                  placeholder="예: 매주 일요일 밤 영상통화, 김치찌개 레시피 멘토"
                  className={`w-full px-3.5 py-2 rounded-xl border ${theme.input}`}
                />
              </div>

              <div className="flex gap-2 pt-2">
                {editingContactId && (
                  <button
                    type="button"
                    onClick={() => onDeleteContact(editingContactId)}
                    className="px-4 py-3 rounded-xl bg-rose-500/15 text-rose-500 font-extrabold"
                  >
                    삭제
                  </button>
                )}
                <button type="submit" className={`flex-1 py-3 rounded-xl font-extrabold ${theme.accent} shadow`}>
                  {editingContactId ? '수정 내용 저장하기' : '주소록에 저장하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
