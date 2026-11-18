import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles, Wallet, Award, ChefHat, Phone, Calendar as CalendarIcon,
  BarChart3, Settings, ChevronLeft, ChevronRight, ArrowUp, ArrowDown,
  ArrowRightLeft, CheckCircle2, Circle, Video, AlertTriangle, X
} from 'lucide-react';

import { useTranslation } from './i18n/index.jsx';
import {
  THEMES, CUSTOM_AURA_PRESETS, STUDENT_STATUS_MODES, INITIAL_PINNED_WIDGETS,
  INITIAL_PI_TRANSACTIONS, INITIAL_QUESTS, INITIAL_RECIPES,
  CULTURAL_CALENDAR_EVENTS, LOCAL_KEYWORDS, CONTACTS
} from './data/initialData.js';
import {
  initPiSdk, authenticateWithPi, approvePaymentOnServer, completePaymentOnServer
} from './services/piNetworkSdk.js';
import { saveKeywordsLocally } from './storage/localIndexedDb.js';

import Header from './components/layout/Header.jsx';
import DualClockBar from './components/layout/DualClockBar.jsx';
import AppLauncherGrid from './components/layout/AppLauncherGrid.jsx';
import FloatingDock from './components/layout/FloatingDock.jsx';
import PiWalletCenter from './components/wallet/PiWalletCenter.jsx';
import PiPaymentSheetModal from './components/wallet/PiPaymentSheetModal.jsx';
import VipAuthModal from './components/wallet/VipAuthModal.jsx';
import QuestBoard from './components/quests/QuestBoard.jsx';
import RecipeStockTicker from './components/recipes/RecipeStockTicker.jsx';
import SafeCallHub from './components/communication/SafeCallHub.jsx';
import CulturalCalendar from './components/calendar/CulturalCalendar.jsx';
import OnDevicePrivacyReport from './components/analytics/OnDevicePrivacyReport.jsx';

export default function App() {
  const { lang, setLang, t, I18N_PACK } = useTranslation();

  const [themeKey, setThemeKey] = useState('warm');
  const [customAura, setCustomAura] = useState(CUSTOM_AURA_PRESETS[0]);
  const [showThemeDrawer, setShowThemeDrawer] = useState(false);

  const [activeAppView, setActiveAppView] = useState('home');
  const [viewportMode, setViewportMode] = useState('mobile');

  const [piNetworkMode, setPiNetworkMode] = useState('testnet');
  const [piAuthUser, setPiAuthUser] = useState({
    uid: 'pi-uid-2026-uk8821',
    username: 'yong_uk_scholar',
    walletAddress: 'GDR7X9K2M4P8Q1W3E5R7T9Y2U4I6O8P0A2S4D6F8G0H4K2P',
    scopes: ['username', 'payments', 'wallet_address'],
    vipVerified: true,
    vipCode: 'PI-VIP-2026-UK'
  });
  const [piWalletBalance, setPiWalletBalance] = useState(148.5);
  const [piTransactions, setPiTransactions] = useState(INITIAL_PI_TRANSACTIONS);
  const [isAuthenticatingPi, setIsAuthenticatingPi] = useState(false);
  const [paymentSheet, setPaymentSheet] = useState(null);

  const [pinnedWidgets, setPinnedWidgets] = useState(INITIAL_PINNED_WIDGETS);
  const [showWidgetCustomizer, setShowWidgetCustomizer] = useState(false);
  const [isEditingStatusMsg, setIsEditingStatusMsg] = useState(false);

  const [now, setNow] = useState(new Date());
  const [simulateSummerTime, setSimulateSummerTime] = useState(false);
  const [timePreset, setTimePreset] = useState('realtime');

  const [studentStatusId, setStudentStatusId] = useState('available');
  const [customStatusNote, setCustomStatusNote] = useState('');
  const [callerPerspective, setCallerPerspective] = useState('family_to_uk');

  const [quests, setQuests] = useState(INITIAL_QUESTS);
  const [userXp, setUserXp] = useState(640);
  const [userLevel, setUserLevel] = useState(7);
  const [piBalance, setPiBalance] = useState(24.5);
  const [newQuestTitle, setNewQuestTitle] = useState('');
  const [newQuestCategory, setNewQuestCategory] = useState('생활');
  const [questToast, setQuestToast] = useState(null);

  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  const [recipeTab, setRecipeTab] = useState('all');
  const [selectedKeywordFilter, setSelectedKeywordFilter] = useState('전체');
  const [isTickerLive, setIsTickerLive] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showUploadRecipeModal, setShowUploadRecipeModal] = useState(false);
  const [newRecipeForm, setNewRecipeForm] = useState({
    name: '', keyword: '#초간단 #자취요리', time: '15분', ukMartTip: '', familyTip: ''
  });

  const [preCallModal, setPreCallModal] = useState(null);
  const [activeCall, setActiveCall] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callNoteInput, setCallNoteInput] = useState('');
  const [reservedMessages, setReservedMessages] = useState([
    { id: 1, from: '어머니', text: '수업 끝나면 밥 챙겨 먹고 천천히 전화 주렴~ 사랑한다!', time: '오후 5:10 (KST)' }
  ]);

  const [selectedCultureEvent, setSelectedCultureEvent] = useState(CULTURAL_CALENDAR_EVENTS[0]);
  const [showPrivacyInspector, setShowPrivacyInspector] = useState(false);
  const [keywordsData] = useState(LOCAL_KEYWORDS);

  const [showVipModal, setShowVipModal] = useState(false);
  const [vipTestCodeInput, setVipTestCodeInput] = useState('PI-VIP-2026-UK');
  const [vipIdInput, setVipIdInput] = useState('yong_uk_scholar');

  const theme = useMemo(() => {
    if (themeKey === 'custom') {
      return { ...THEMES.custom, bg: `bg-gradient-to-br ${customAura.gradient}` };
    }
    return THEMES[themeKey] || THEMES.warm;
  }, [themeKey, customAura]);

  const currentStatusObj = useMemo(
    () => STUDENT_STATUS_MODES.find((s) => s.id === studentStatusId) || STUDENT_STATUS_MODES[0],
    [studentStatusId]
  );

  useEffect(() => {
    initPiSdk(piNetworkMode === 'testnet');
    saveKeywordsLocally(LOCAL_KEYWORDS);
  }, [piNetworkMode]);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isTickerLive) return;
    const tickerInterval = setInterval(() => {
      setRecipes((prev) =>
        prev.map((item) => {
          const delta = (Math.random() * 2.4 - 0.9).toFixed(1);
          const nextChange = parseFloat((item.change + parseFloat(delta)).toFixed(1));
          const isUp = nextChange >= 0;
          const nextSpark = [
            ...item.sparkline.slice(1),
            Math.max(15, Math.min(100, item.sparkline[6] + Math.round(parseFloat(delta) * 3)))
          ];
          return { ...item, change: nextChange, isUp, sparkline: nextSpark };
        })
      );
    }, 3200);
    return () => clearInterval(tickerInterval);
  }, [isTickerLive]);

  useEffect(() => {
    if (!activeCall) return;
    const callTimer = setInterval(() => {
      setActiveCall((prev) => (prev ? { ...prev, duration: prev.duration + 1 } : null));
    }, 1000);
    return () => clearInterval(callTimer);
  }, [activeCall]);

  const timeInfo = useMemo(() => {
    let baseDate = new Date(now);
    if (timePreset === 'uk_6am') {
      baseDate = new Date(Date.UTC(2026, 10, 19, simulateSummerTime ? 5 : 6, 0, now.getSeconds()));
    } else if (timePreset === 'uk_lecture') {
      baseDate = new Date(Date.UTC(2026, 10, 19, simulateSummerTime ? 9 : 10, 15, now.getSeconds()));
    } else if (timePreset === 'golden_time') {
      baseDate = new Date(Date.UTC(2026, 10, 19, simulateSummerTime ? 12 : 13, 0, now.getSeconds()));
    }

    const localeCode = lang === 'en' ? 'en-US' : lang === 'ja' ? 'ja-JP' : lang === 'zh' ? 'zh-CN' : 'ko-KR';
    const seoulFormatter = new Intl.DateTimeFormat(localeCode, {
      timeZone: 'Asia/Seoul', hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true
    });
    const ukDateToFormat = simulateSummerTime ? new Date(baseDate.getTime() + 60 * 60 * 1000) : baseDate;
    const londonFormatter = new Intl.DateTimeFormat(localeCode, {
      timeZone: 'Europe/London', hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true
    });

    return {
      seoulTimeStr: seoulFormatter.format(baseDate),
      londonTimeStr: londonFormatter.format(ukDateToFormat),
      timeDiffHours: simulateSummerTime ? 8 : 9
    };
  }, [now, simulateSummerTime, timePreset, lang]);

  const showNotification = (msg) => {
    setQuestToast(msg);
    setTimeout(() => setQuestToast(null), 3500);
  };

  const handleSelectTimePreset = (preset) => {
    setTimePreset(preset);
    if (preset === 'uk_6am') setStudentStatusId('sleeping');
    else if (preset === 'uk_lecture') setStudentStatusId('lecture');
    else if (preset === 'golden_time') setStudentStatusId('available');
  };

  const copyTextSafe = (text, label = '내용') => {
    if (navigator.clipboard) navigator.clipboard.writeText(text);
    showNotification(`📋 [${label}] 클립보드에 복사되었습니다!`);
  };

  const handlePiAuthenticate = async (customUsername, customVipCode) => {
    setIsAuthenticatingPi(true);
    const authData = await authenticateWithPi();
    setPiAuthUser({
      ...authData,
      username: customUsername || authData.username,
      vipVerified: true,
      vipCode: customVipCode || 'PI-VIP-2026-UK'
    });
    setIsAuthenticatingPi(false);
    setShowVipModal(false);
    showNotification('✅ Pi Browser 지갑 인증(Pi.authenticate) 및 VIP 초대 코드 검증 완료!');
  };

  const openPiPaymentSheet = ({ mode = 'U2A', title, amount, memo, recipient, metadata = {} }) => {
    const cleanAmount = parseFloat(Number(amount).toFixed(2));
    if (cleanAmount <= 0) {
      showNotification('⚠️ 결제하거나 출금할 파이(π) 수량이 0보다 커야 합니다.');
      return;
    }
    setPaymentSheet({
      mode, title, amount: cleanAmount, memo: memo || title,
      recipient: recipient || (mode === 'U2A' ? '@pi_bridge_escrow' : `@${piAuthUser.username}`),
      metadata, step: 0, paymentId: null, txid: null
    });
  };

  const executePiPaymentFlow = async () => {
    if (!paymentSheet) return;
    const generatedPayId = `pay_${Math.random().toString(36).substring(2, 10)}`;
    const generatedTxId = `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

    setPaymentSheet((prev) => (prev ? { ...prev, step: 1, paymentId: generatedPayId } : null));
    await approvePaymentOnServer(generatedPayId);
    setPaymentSheet((prev) => (prev ? { ...prev, step: 2 } : null));
    await completePaymentOnServer(generatedPayId, generatedTxId);
    setPaymentSheet((prev) => (prev ? { ...prev, step: 3, txid: generatedTxId } : null));

    const shortenedTx = `${generatedTxId.slice(0, 10)}...${generatedTxId.slice(-6)}`;
    if (paymentSheet.mode === 'U2A') {
      setPiWalletBalance((b) => parseFloat(Math.max(0, b - paymentSheet.amount).toFixed(2)));
      setPiTransactions((prev) => [
        {
          id: `tx-${Date.now()}`, txid: shortenedTx, type: 'U2A', title: paymentSheet.title,
          amount: -paymentSheet.amount, counterparty: paymentSheet.recipient, timestamp: '방금 전',
          network: piNetworkMode === 'mainnet' ? 'Pi Mainnet' : 'Pi Testnet', status: 'CONFIRMED'
        },
        ...prev
      ]);
      showNotification(`💸 [Pi.createPayment 완료] ${paymentSheet.amount} π 결제가 블록체인(${shortenedTx})에 기록되었습니다!`);
    } else {
      setPiBalance((b) => parseFloat(Math.max(0, b - paymentSheet.amount).toFixed(2)));
      setPiWalletBalance((b) => parseFloat((b + paymentSheet.amount).toFixed(2)));
      setPiTransactions((prev) => [
        {
          id: `tx-${Date.now()}`, txid: shortenedTx, type: 'A2U', title: paymentSheet.title,
          amount: paymentSheet.amount, counterparty: `@${piAuthUser.username}`, timestamp: '방금 전',
          network: piNetworkMode === 'mainnet' ? 'Pi Mainnet' : 'Pi Testnet', status: 'CONFIRMED'
        },
        ...prev
      ]);
      showNotification(`🎉 [A2U 지갑 입금 완료] ${paymentSheet.amount} π 보상이 내 Pi 지갑으로 전송되었습니다!`);
    }
  };

  const toggleQuest = (id) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id !== id) return q;
        const nextCompleted = !q.completed;
        if (nextCompleted) {
          const nextXp = userXp + q.xp;
          if (nextXp >= 1000) {
            setUserLevel((lvl) => lvl + 1);
            setUserXp(nextXp - 1000);
          } else {
            setUserXp(nextXp);
          }
          setPiBalance((b) => parseFloat((b + q.piReward).toFixed(2)));
          showNotification(`🎉 [${q.title}] 클리어! +${q.xp} XP & +${q.piReward} π 지급!`);
        } else {
          setUserXp((xp) => Math.max(0, xp - q.xp));
          setPiBalance((b) => parseFloat(Math.max(0, b - q.piReward).toFixed(2)));
        }
        return { ...q, completed: nextCompleted };
      })
    );
  };

  const handleAddQuest = (e) => {
    e.preventDefault();
    if (!newQuestTitle.trim()) return;
    setQuests([
      {
        id: `q-${Date.now()}`, title: newQuestTitle.trim(), category: newQuestCategory,
        xp: 90, piReward: 1.0, completed: false, streak: 1, timeEstimate: '15분',
        aiTip: '미루지 않고 바로 시작하면 AI 성실도 보너스가 함께 적립됩니다!'
      },
      ...quests
    ]);
    setNewQuestTitle('');
    showNotification('✨ 새로운 일일 퀘스트가 등록되었습니다!');
  };

  const handleGenerateAiQuest = () => {
    const aiPool = [
      { title: '어머니표 된장찌개 레시피 따라하고 인증샷 전송하기', category: '요리', xp: 150, piReward: 1.8, timeEstimate: '20분', aiTip: '가족 레시피를 실습하고 사진을 공유하면 가족 친밀도 지수가 상승합니다.' },
      { title: '책상 위 컵 정리 및 비타민 D 영양제 챙겨 먹기', category: '생활', xp: 60, piReward: 0.6, timeEstimate: '3분', aiTip: '일조량이 적은 영국 유학 생활에는 매일 일정한 비타민 D 섭취가 필수예요!' },
      { title: '한국이 잠들기 전 부모님께 30초 음성 안부 남기기', category: '소통', xp: 110, piReward: 1.2, timeEstimate: '2분', aiTip: `현재 한국 시간은 ${timeInfo.seoulTimeStr}입니다. 짧은 음성 메시지가 큰 기쁨이 됩니다.` }
    ];
    const randomPick = aiPool[Math.floor(Math.random() * aiPool.length)];
    setQuests([{ id: `ai-${Date.now()}`, ...randomPick, completed: false, streak: 1 }, ...quests]);
    showNotification(`🤖 AI가 [${randomPick.title}] 퀘스트를 추천했습니다!`);
  };

  const handleUploadRecipe = (e) => {
    e.preventDefault();
    if (!newRecipeForm.name.trim()) return;
    const created = {
      id: `r-${Date.now()}`, rank: recipes.length + 1, name: newRecipeForm.name.trim(),
      keyword: newRecipeForm.keyword || '#자취꿀팁', change: 15.2, isUp: true, badge: '신규상장',
      views: '1,024', author: '나 (영국 유학생 크리에이터)', category: 'creator',
      time: newRecipeForm.time, difficulty: '초급',
      ukMartTip: newRecipeForm.ukMartTip || '영국 현지 마트 기본 식재료로 조리 가능',
      familyTip: newRecipeForm.familyTip || '가족들과 함께 댓글로 비법을 발전시켜보세요!',
      steps: ['신선한 재료를 손질하여 준비합니다.', '레시피 비법 비율대로 양념을 배합해 조리합니다.', '완성된 요리를 촬영해 가족 및 구독자들과 공유합니다!'],
      sparkline: [30, 45, 55, 68, 79, 88, 96], piPrice: '구독 수익 창출 중', likes: 128
    };
    setRecipes([created, ...recipes]);
    setPiBalance((b) => parseFloat((b + 3.0).toFixed(2)));
    setShowUploadRecipeModal(false);
    setNewRecipeForm({ name: '', keyword: '#초간단 #자취요리', time: '15분', ukMartTip: '', familyTip: '' });
    showNotification('🍳 새 레시피가 실시간 트렌드 주가창에 상장되었습니다! (+3.0 π)');
  };

  const handleInitiateCall = (contact, callType) => setPreCallModal({ contact, callType });
  const handleConfirmStartCall = () => {
    if (!preCallModal) return;
    setActiveCall({ contact: preCallModal.contact, callType: preCallModal.callType, duration: 0 });
    setPreCallModal(null);
  };

  const handleLeaveSafeMessage = (e) => {
    e.preventDefault();
    const messageText =
      callNoteInput.trim() ||
      (callerPerspective === 'family_to_uk'
        ? '수업 끝나고 편할 때 연락 주렴! 급한 용건 아니니 걱정 말고 집중해~'
        : '어머니, 저 지금 수업 들어가기 전이라 짧게 안부 남겨요! 이따 저녁에 전화드릴게요.');
    setReservedMessages((prev) => [
      {
        id: Date.now(),
        from: callerPerspective === 'family_to_uk' ? preCallModal?.contact?.name || '가족' : '유학생 (영국)',
        text: messageText,
        time: `방금 전 (UK ${timeInfo.londonTimeStr} / KR ${timeInfo.seoulTimeStr})`
      },
      ...prev
    ]);
    setCallNoteInput('');
    setPreCallModal(null);
    showNotification('💌 상대방의 시차와 일정을 배려한 안심 예약 메시지가 전달되었습니다!');
  };

  const filteredRecipes = useMemo(() => {
    return recipes.filter((r) => {
      if (recipeTab === 'family' && r.category !== 'family') return false;
      if (recipeTab === 'creator' && r.category !== 'creator' && r.category !== 'custom') return false;
      if (selectedKeywordFilter !== '전체' && !r.keyword.includes(selectedKeywordFilter)) return false;
      return true;
    });
  }, [recipes, recipeTab, selectedKeywordFilter]);

  const formatDuration = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const toggleWidgetEnabled = (widgetId) => {
    setPinnedWidgets((prev) => prev.map((w) => (w.id === widgetId ? { ...w, enabled: !w.enabled } : w)));
  };

  const moveWidgetOrder = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= pinnedWidgets.length) return;
    const next = [...pinnedWidgets];
    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;
    setPinnedWidgets(next);
  };

  const remainingQuestsCount = quests.filter((q) => !q.completed).length;

  const APP_LAUNCHER_ITEMS = [
    { id: 'wallet', name: t.launcherNames.wallet.name, sub: t.launcherNames.wallet.sub, icon: Wallet, badge: `${piWalletBalance} π`, gradient: 'from-amber-500 via-yellow-500 to-orange-600', lightBg: 'bg-amber-500/15 text-amber-500 border-amber-500/30' },
    { id: 'quests', name: t.launcherNames.quests.name, sub: t.launcherNames.quests.sub, icon: Award, badge: `${remainingQuestsCount}`, gradient: 'from-indigo-500 to-violet-600', lightBg: 'bg-indigo-500/15 text-indigo-500 border-indigo-500/30' },
    { id: 'recipes', name: t.launcherNames.recipes.name, sub: t.launcherNames.recipes.sub, icon: ChefHat, badge: '▲ LIVE', gradient: 'from-rose-500 to-amber-500', lightBg: 'bg-rose-500/15 text-rose-500 border-rose-500/30' },
    { id: 'calls', name: t.launcherNames.calls.name, sub: t.launcherNames.calls.sub, icon: Phone, badge: 'ON', gradient: 'from-emerald-500 to-teal-600', lightBg: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30' },
    { id: 'calendar', name: t.launcherNames.calendar.name, sub: t.launcherNames.calendar.sub, icon: CalendarIcon, badge: '🇬🇧/🇰🇷', gradient: 'from-sky-500 to-blue-600', lightBg: 'bg-sky-500/15 text-sky-500 border-sky-500/30' },
    { id: 'analytics', name: t.launcherNames.analytics.name, sub: t.launcherNames.analytics.sub, icon: BarChart3, badge: '0 Byte', gradient: 'from-purple-500 to-fuchsia-600', lightBg: 'bg-purple-500/15 text-purple-500 border-purple-500/30' }
  ];

  const enabledWidgetsList = pinnedWidgets.filter((w) => w.enabled);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme.bg} ${theme.text} font-sans pb-24`}>
      {questToast && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 max-w-sm animate-bounce">
          <div className="bg-slate-900/95 text-white border border-amber-400/50 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs font-bold leading-snug">{questToast}</span>
          </div>
        </div>
      )}

      <Header
        theme={theme}
        themeKey={themeKey}
        setThemeKey={setThemeKey}
        customAura={customAura}
        setCustomAura={setCustomAura}
        showThemeDrawer={showThemeDrawer}
        setShowThemeDrawer={setShowThemeDrawer}
        viewportMode={viewportMode}
        setViewportMode={setViewportMode}
        piAuthUser={piAuthUser}
        piWalletBalance={piWalletBalance}
        setActiveAppView={setActiveAppView}
        setShowVipModal={setShowVipModal}
        lang={lang}
        setLang={setLang}
        t={t}
        I18N_PACK={I18N_PACK}
        showNotification={showNotification}
      />

      <div className={`${viewportMode === 'mobile' ? 'max-w-lg' : 'max-w-6xl'} mx-auto px-3.5 sm:px-6 pt-3 transition-all duration-300`}>
        <DualClockBar
          theme={theme}
          t={t}
          timeInfo={timeInfo}
          simulateSummerTime={simulateSummerTime}
          setSimulateSummerTime={setSimulateSummerTime}
          currentStatusObj={currentStatusObj}
          studentStatusId={studentStatusId}
          setStudentStatusId={setStudentStatusId}
          timePreset={timePreset}
          handleSelectTimePreset={handleSelectTimePreset}
          isEditingStatusMsg={isEditingStatusMsg}
          setIsEditingStatusMsg={setIsEditingStatusMsg}
          customStatusNote={customStatusNote}
          setCustomStatusNote={setCustomStatusNote}
          showNotification={showNotification}
        />

        {activeAppView === 'home' ? (
          <div className="space-y-4">
            <AppLauncherGrid
              theme={theme}
              t={t}
              piBalance={piBalance}
              userLevel={userLevel}
              launcherItems={APP_LAUNCHER_ITEMS}
              setActiveAppView={setActiveAppView}
            />

            <section className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <h2 className="font-extrabold text-sm">{t.homeBoardTitle}</h2>
                  <span className={`text-[11px] ${theme.subtext}`}>
                    ({enabledWidgetsList.length}{t.showingCount})
                  </span>
                </div>
                <button
                  onClick={() => setShowWidgetCustomizer(!showWidgetCustomizer)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition ${
                    showWidgetCustomizer ? theme.accent : `${theme.card} ${theme.cardHover}`
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>{t.editWidgets}</span>
                </button>
              </div>

              {showWidgetCustomizer && (
                <div className={`p-4 rounded-3xl border ${theme.card} space-y-2.5 animate-fadeIn`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold">⚙️ 대시보드 첫 화면 위젯 맞춤 설정</h3>
                    <button onClick={() => setShowWidgetCustomizer(false)} className={`px-2.5 py-1 rounded-lg text-xs font-bold ${theme.accent}`}>
                      완료
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {pinnedWidgets.map((w, idx) => (
                      <div key={w.id} className={`p-2.5 rounded-2xl border flex items-center justify-between gap-2 ${w.enabled ? theme.accentSoft : `${theme.card} opacity-60`}`}>
                        <label className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0">
                          <input type="checkbox" checked={w.enabled} onChange={() => toggleWidgetEnabled(w.id)} className="w-4 h-4 rounded accent-indigo-600" />
                          <div className="min-w-0">
                            <p className="text-xs font-extrabold truncate">{w.title}</p>
                            <p className="text-[10px] opacity-80 truncate">{w.desc}</p>
                          </div>
                        </label>
                        <div className="flex items-center gap-1 shrink-0">
                          <button onClick={() => moveWidgetOrder(idx, -1)} disabled={idx === 0} className={`p-1 rounded-lg ${theme.badge} disabled:opacity-30`}>
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => moveWidgetOrder(idx, 1)} disabled={idx === pinnedWidgets.length - 1} className={`p-1 rounded-lg ${theme.badge} disabled:opacity-30`}>
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={`grid grid-cols-1 ${viewportMode === 'desktop' ? 'md:grid-cols-2' : ''} gap-3.5`}>
                {enabledWidgetsList.map((widget) => {
                  if (widget.id === 'mini_wallet') {
                    return (
                      <div key={widget.id} className={`p-4 rounded-3xl border ${theme.card}`}>
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-xl bg-amber-500/15 text-amber-500"><Wallet className="w-4 h-4" /></div>
                            <div>
                              <h3 className="font-extrabold text-xs sm:text-sm">Pi 브라우저 지갑 & 리워드</h3>
                              <p className={`text-[10px] font-mono ${theme.subtext}`}>@{piAuthUser.username}</p>
                            </div>
                          </div>
                          <button onClick={() => setActiveAppView('wallet')} className={`text-[11px] font-bold flex items-center gap-0.5 ${theme.accentText}`}>
                            지갑·SDK 열기 <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-2.5">
                          <div className={`p-2.5 rounded-2xl border ${theme.card}`}>
                            <span className={`text-[10px] font-bold ${theme.subtext}`}>내 Pi 지갑 잔액</span>
                            <p className="text-sm sm:text-base font-black text-amber-500 mt-0.5">{piWalletBalance} π</p>
                          </div>
                          <div className={`p-2.5 rounded-2xl border ${theme.card}`}>
                            <span className={`text-[10px] font-bold ${theme.subtext}`}>출금 가능 앱 보상</span>
                            <p className="text-sm sm:text-base font-black text-emerald-500 mt-0.5">+{piBalance} π</p>
                          </div>
                        </div>
                        <button
                          onClick={() => openPiPaymentSheet({ mode: 'A2U', title: '퀘스트 & 크리에이터 보상 Pi 지갑 출금', amount: piBalance, recipient: `@${piAuthUser.username}` })}
                          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-[11px] shadow-sm flex items-center justify-center gap-1"
                        >
                          <ArrowRightLeft className="w-3.5 h-3.5" /> Pi 지갑으로 보상 출금
                        </button>
                      </div>
                    );
                  }
                  if (widget.id === 'mini_quests') {
                    return (
                      <div key={widget.id} className={`p-4 rounded-3xl border ${theme.card}`}>
                        <div className="flex items-center justify-between mb-2.5">
                          <h3 className="font-extrabold text-xs sm:text-sm">⚡ 오늘의 필수 퀘스트</h3>
                          <button onClick={() => setActiveAppView('quests')} className={`text-[11px] font-bold flex items-center gap-0.5 ${theme.accentText}`}>
                            전체 보기 <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="space-y-2">
                          {quests.slice(0, 2).map((q) => (
                            <div key={q.id} onClick={() => toggleQuest(q.id)} className={`p-2.5 rounded-2xl border cursor-pointer flex items-center justify-between gap-2 ${theme.card}`}>
                              <div className="flex items-center gap-2 min-w-0">
                                {q.completed ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> : <Circle className={`w-4 h-4 ${theme.subtext} shrink-0`} />}
                                <span className={`text-xs font-bold truncate ${q.completed ? 'line-through' : ''}`}>{q.title}</span>
                              </div>
                              <span className="text-[10px] font-extrabold text-amber-500">+{q.piReward} π</span>
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
                          <h3 className="font-extrabold text-xs sm:text-sm">🔥 실시간 레시피 호가창 TOP 3</h3>
                          <button onClick={() => setActiveAppView('recipes')} className={`text-[11px] font-bold flex items-center gap-0.5 ${theme.accentText}`}>
                            거래소 열기 <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="space-y-1.5">
                          {recipes.slice(0, 3).map((r, i) => (
                            <div key={r.id} onClick={() => setSelectedRecipe(r)} className={`px-3 py-2 rounded-2xl border cursor-pointer flex items-center justify-between gap-2 ${theme.card}`}>
                              <span className="text-xs font-bold truncate">{i + 1}. {r.name}</span>
                              <span className={`text-[11px] font-mono font-extrabold ${r.isUp ? 'text-rose-500' : 'text-sky-500'}`}>
                                {r.isUp ? `▲ +${r.change}%` : `▼ ${r.change}%`}
                              </span>
                            </div>
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
        ) : (
          <div className="space-y-4 animate-fadeIn">
            <div className={`p-3 rounded-2xl border ${theme.card} flex items-center justify-between gap-2`}>
              <button
                onClick={() => setActiveAppView('home')}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 ${theme.accent} shadow-sm shrink-0`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t.backToHome}</span>
              </button>
              <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                {APP_LAUNCHER_ITEMS.map((app) => {
                  const IconComp = app.icon;
                  return (
                    <button
                      key={app.id}
                      onClick={() => setActiveAppView(app.id)}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1 shrink-0 transition ${
                        activeAppView === app.id ? theme.accentSoft + ' border' : theme.badge
                      }`}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                      <span>{app.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {activeAppView === 'wallet' && (
              <PiWalletCenter
                theme={theme}
                piNetworkMode={piNetworkMode}
                setPiNetworkMode={setPiNetworkMode}
                piAuthUser={piAuthUser}
                piWalletBalance={piWalletBalance}
                piBalance={piBalance}
                piTransactions={piTransactions}
                openPiPaymentSheet={openPiPaymentSheet}
                copyTextSafe={copyTextSafe}
              />
            )}

            {activeAppView === 'quests' && (
              <QuestBoard
                theme={theme}
                quests={quests}
                toggleQuest={toggleQuest}
                piBalance={piBalance}
                piAuthUser={piAuthUser}
                openPiPaymentSheet={openPiPaymentSheet}
                newQuestCategory={newQuestCategory}
                setNewQuestCategory={setNewQuestCategory}
                newQuestTitle={newQuestTitle}
                setNewQuestTitle={setNewQuestTitle}
                handleAddQuest={handleAddQuest}
                handleGenerateAiQuest={handleGenerateAiQuest}
              />
            )}

            {activeAppView === 'recipes' && (
              <RecipeStockTicker
                theme={theme}
                filteredRecipes={filteredRecipes}
                recipeTab={recipeTab}
                setRecipeTab={setRecipeTab}
                selectedKeywordFilter={selectedKeywordFilter}
                setSelectedKeywordFilter={setSelectedKeywordFilter}
                isTickerLive={isTickerLive}
                setIsTickerLive={setIsTickerLive}
                setSelectedRecipe={setSelectedRecipe}
                setShowUploadRecipeModal={setShowUploadRecipeModal}
                openPiPaymentSheet={openPiPaymentSheet}
              />
            )}

            {activeAppView === 'calls' && (
              <SafeCallHub
                theme={theme}
                callerPerspective={callerPerspective}
                setCallerPerspective={setCallerPerspective}
                handleInitiateCall={handleInitiateCall}
                reservedMessages={reservedMessages}
              />
            )}

            {activeAppView === 'calendar' && (
              <CulturalCalendar
                theme={theme}
                selectedCultureEvent={selectedCultureEvent}
                setSelectedCultureEvent={setSelectedCultureEvent}
              />
            )}

            {activeAppView === 'analytics' && (
              <OnDevicePrivacyReport
                theme={theme}
                showPrivacyInspector={showPrivacyInspector}
                setShowPrivacyInspector={setShowPrivacyInspector}
                keywordsData={keywordsData}
              />
            )}
          </div>
        )}
      </div>

      <FloatingDock theme={theme} t={t} activeAppView={activeAppView} setActiveAppView={setActiveAppView} />

      <VipAuthModal
        showVipModal={showVipModal}
        setShowVipModal={setShowVipModal}
        theme={theme}
        vipIdInput={vipIdInput}
        setVipIdInput={setVipIdInput}
        vipTestCodeInput={vipTestCodeInput}
        setVipTestCodeInput={setVipTestCodeInput}
        handlePiAuthenticate={handlePiAuthenticate}
        isAuthenticatingPi={isAuthenticatingPi}
      />

      <PiPaymentSheetModal
        paymentSheet={paymentSheet}
        setPaymentSheet={setPaymentSheet}
        executePiPaymentFlow={executePiPaymentFlow}
      />
    </div>
  );
}

