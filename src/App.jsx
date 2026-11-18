import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  ChevronLeft,
  Users,
  MessageCircle,
  ChefHat,
  Award,
  Calendar as CalendarIcon,
  BarChart3,
  Wallet
} from 'lucide-react';

import { I18N_PACK } from './i18n';
import { THEMES, CUSTOM_AURA_PRESETS, STUDENT_STATUS_MODES } from './constants/themes';
import {
  GROUP_COLORS,
  INITIAL_CONTACT_NODES,
  INITIAL_CHAT_HISTORIES,
  INITIAL_PINNED_WIDGETS,
  INITIAL_QUESTS,
  INITIAL_RECIPES,
  INITIAL_LOCAL_KEYWORDS,
  INITIAL_PI_TRANSACTIONS
} from './constants/initialData';
import { initPiSdk } from './services/piNetworkSdk';
import { saveKeywordsLocally } from './storage/localIndexedDb';

import Header from './components/layout/Header';
import DualClockBar from './components/layout/DualClockBar';
import AppLauncherGrid from './components/layout/AppLauncherGrid';
import BottomNavDock from './components/layout/BottomNavDock';
import ProfileAddressBook from './components/profile/ProfileAddressBook';
import CommChatCallHub from './components/comm/CommChatCallHub';
import RecipeHub from './components/recipes/RecipeHub';
import QuestBoard from './components/quests/QuestBoard';
import CulturalCalendar from './components/calendar/CulturalCalendar';
import PrivacyAnalytics from './components/analytics/PrivacyAnalytics';
import PiWalletCenter from './components/wallet/PiWalletCenter';
import SystemModals from './components/modals/SystemModals';

export default function App() {
  const [lang, setLang] = useState('ko');
  const t = I18N_PACK[lang] || I18N_PACK.ko;

  const [themeKey, setThemeKey] = useState('warm');
  const [customAura, setCustomAura] = useState(CUSTOM_AURA_PRESETS[0]);
  const [showThemeDrawer, setShowThemeDrawer] = useState(false);

  const theme = useMemo(() => {
    if (themeKey === 'custom') {
      return { ...THEMES.custom, bg: `bg-gradient-to-br ${customAura.gradient}` };
    }
    return THEMES[themeKey] || THEMES.warm;
  }, [themeKey, customAura]);

  // HomePlate 로고 슬롯 상태
  const [customLogoUrl, setCustomLogoUrl] = useState('');
  const [logoStyle, setLogoStyle] = useState('housePlate');
  const [showLogoModal, setShowLogoModal] = useState(false);

  const [activeAppView, setActiveAppView] = useState('home');
  const [viewportMode, setViewportMode] = useState('mobile');

  // 로그인한 사용자 프로필 상태
  const [userProfile, setUserProfile] = useState({
    name: 'Yong (영국 유학생)',
    username: 'yong_uk_scholar',
    avatar: '🧑‍🎓',
    university: 'University of London • Computer Science',
    ukCity: '영국 런던 (Zone 1 기숙사)',
    krHometown: '경기도 파주시 (본가)',
    bio: '런던 유학 2년차! HomePlate에서 미루지 않는 일일 퀘스트와 어머니의 집밥 레시피로 건강한 유학 생활을 만들어가고 있습니다.',
    sleepWindowUk: '01:30 - 07:30 (UK)',
    goldenCallTime: '영국 12:30~14:00 (한국 21:30~23:00)',
    walletAddress: 'GDR7X9K2M4P8Q1W3E5R7T9Y2U4I6O8P0A2S4D6F8G0H4K2P',
    vipCode: 'HP-VIP-2026-UK'
  });

  // 주소록(연락처) 상태 & CRUD 모달 상태
  const [contactNodes, setContactNodes] = useState(INITIAL_CONTACT_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState('mom');
  const [nodeActionSheet, setNodeActionSheet] = useState(null);
  const [showContactFormModal, setShowContactFormModal] = useState(false);
  const [editingContactId, setEditingContactId] = useState(null);
  const [contactForm, setContactForm] = useState({
    label: '',
    relation: '',
    group: 'family',
    icon: '😊',
    phone: '',
    timezone: 'KR (KST)',
    status: '온라인 • 소통 가능',
    closeness: 90,
    note: ''
  });

  // 주소록 연동 1:1 채팅 상태
  const [activeChatPartnerId, setActiveChatPartnerId] = useState('mom');
  const [chatHistories, setChatHistories] = useState(INITIAL_CHAT_HISTORIES);
  const [chatInputText, setChatInputText] = useState('');

  // 온디바이스 대화 패턴 분석 상태
  const [localKeywords, setLocalKeywords] = useState(INITIAL_LOCAL_KEYWORDS);

  // 홈 위젯 커스터마이저 상태
  const [pinnedWidgets, setPinnedWidgets] = useState(INITIAL_PINNED_WIDGETS);
  const [showWidgetCustomizer, setShowWidgetCustomizer] = useState(false);

  // 시계 & 서머타임 & 상태 모드
  const [now, setNow] = useState(new Date());
  const [simulateSummerTime, setSimulateSummerTime] = useState(false);
  const [timePreset, setTimePreset] = useState('realtime');
  const [studentStatusId, setStudentStatusId] = useState('available');
  const [customStatusNote, setCustomStatusNote] = useState('');

  const currentStatusObj = useMemo(
    () => STUDENT_STATUS_MODES.find((s) => s.id === studentStatusId) || STUDENT_STATUS_MODES[0],
    [studentStatusId]
  );

  // AI 퀘스트 상태
  const [quests, setQuests] = useState(INITIAL_QUESTS);
  const [userXp, setUserXp] = useState(640);
  const [userLevel] = useState(7);
  const [newQuestTitle, setNewQuestTitle] = useState('');
  const [newQuestCategory, setNewQuestCategory] = useState('생활');

  // 레시피 콘텐츠 허브 상태
  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeCommentInput, setRecipeCommentInput] = useState('');
  const [showUploadRecipeModal, setShowUploadRecipeModal] = useState(false);
  const [newRecipeForm, setNewRecipeForm] = useState({
    name: '',
    tags: '#초간단 #자취요리',
    time: '15분',
    desc: '',
    ukMartTip: '',
    familyTip: ''
  });

  // 무료 통화 & 시차 가드 상태
  const [preCallModal, setPreCallModal] = useState(null);
  const [activeCall, setActiveCall] = useState(null);

  // Pi 지갑 & VIP 모달 상태
  const [piWalletBalance, setPiWalletBalance] = useState(148.5);
  const [piBalance, setPiBalance] = useState(24.5);
  const [piTransactions, setPiTransactions] = useState(INITIAL_PI_TRANSACTIONS);
  const [paymentSheet, setPaymentSheet] = useState(null);
  const [showVipModal, setShowVipModal] = useState(false);
  const [vipLoginNameInput, setVipLoginNameInput] = useState(userProfile.name);
  const [vipLoginHandleInput, setVipLoginHandleInput] = useState(userProfile.username);
  const [vipCodeInput, setVipCodeInput] = useState('HP-VIP-2026-UK');

  const [toastMsg, setToastMsg] = useState(null);

  useEffect(() => {
    initPiSdk();
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

    const seoulFormatter = new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'Asia/Seoul',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    const ukDateToFormat = simulateSummerTime ? new Date(baseDate.getTime() + 60 * 60 * 1000) : baseDate;
    const londonFormatter = new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'Europe/London',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    return {
      seoulTimeStr: seoulFormatter.format(baseDate),
      londonTimeStr: londonFormatter.format(ukDateToFormat),
      timeDiffHours: simulateSummerTime ? 8 : 9
    };
  }, [now, simulateSummerTime, timePreset]);

  const showNotification = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleLogoFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCustomLogoUrl(ev.target.result);
      showNotification('🏠 HomePlate 커스텀 로고 이미지가 슬롯에 적용되었습니다!');
    };
    reader.readAsDataURL(file);
  };

  const handleSelectTimePreset = (preset) => {
    setTimePreset(preset);
    if (preset === 'uk_6am') setStudentStatusId('sleeping');
    else if (preset === 'uk_lecture') setStudentStatusId('lecture');
    else if (preset === 'golden_time') setStudentStatusId('available');
  };

  // 주소록(연락처) 추가 / 수정 / 삭제 핸들러
  const openAddContactModal = () => {
    setEditingContactId(null);
    setContactForm({
      label: '',
      relation: '',
      group: 'family',
      icon: '😊',
      phone: '',
      timezone: 'KR (KST)',
      status: '온라인 • 소통 가능',
      closeness: 90,
      note: ''
    });
    setShowContactFormModal(true);
  };

  const openEditContactModal = (contact) => {
    if (!contact || contact.id === 'me') return;
    setEditingContactId(contact.id);
    setContactForm({
      label: contact.label,
      relation: contact.relation,
      group: contact.group || 'family',
      icon: contact.icon || '😊',
      phone: contact.phone || '',
      timezone: contact.timezone || 'KR (KST)',
      status: contact.status || '온라인 • 소통 가능',
      closeness: contact.closeness || 90,
      note: contact.note || ''
    });
    setNodeActionSheet(null);
    setShowContactFormModal(true);
  };

  const handleSaveContactForm = (e) => {
    e.preventDefault();
    if (!contactForm.label.trim()) return;

    if (editingContactId) {
      setContactNodes((prev) =>
        prev.map((n) =>
          n.id === editingContactId
            ? {
                ...n,
                label: contactForm.label.trim(),
                relation: contactForm.relation.trim() || '소중한 연락처',
                group: contactForm.group,
                color: GROUP_COLORS[contactForm.group] || 'bg-indigo-500',
                icon: contactForm.icon || '😊',
                phone: contactForm.phone.trim(),
                timezone: contactForm.timezone,
                status: contactForm.status.trim() || '온라인 • 소통 가능',
                closeness: Number(contactForm.closeness) || 90,
                note: contactForm.note.trim() || 'HomePlate 주소록에 등록된 소중한 인연입니다.'
              }
            : n
        )
      );
      showNotification(`✏️ [${contactForm.label}] 님의 연락처 정보가 수정되었습니다.`);
    } else {
      const count = contactNodes.length;
      const angle = (count * 58) % 360;
      const rad = (angle * Math.PI) / 180;
      const radius = count > 6 ? 40 : 33;
      const x = Math.max(10, Math.min(90, Math.round(50 + radius * Math.cos(rad))));
      const y = Math.max(10, Math.min(90, Math.round(50 + radius * Math.sin(rad))));

      const created = {
        id: `contact-${Date.now()}`,
        label: contactForm.label.trim(),
        relation: contactForm.relation.trim() || '소중한 연락처',
        group: contactForm.group,
        x,
        y,
        color: GROUP_COLORS[contactForm.group] || 'bg-indigo-500',
        icon: contactForm.icon || '😊',
        phone: contactForm.phone.trim(),
        timezone: contactForm.timezone,
        status: contactForm.status.trim() || '온라인 • 소통 가능',
        closeness: Number(contactForm.closeness) || 90,
        note: contactForm.note.trim() || 'HomePlate 주소록에서 함께 일상을 나누는 소중한 인연입니다.'
      };
      setContactNodes((prev) => [...prev, created]);
      setChatHistories((prev) => ({
        ...prev,
        [created.id]: [
          {
            id: `init-${Date.now()}`,
            sender: 'them',
            text: `안녕하세요! [${created.label}] 연락처가 HomePlate 주소록에 연결되었습니다. 편하게 채팅이나 무료 통화를 걸어주세요!`,
            time: '방금 전'
          }
        ]
      }));
      setSelectedNodeId(created.id);
      showNotification(`📇 [${created.label}] 님이 주소록(연락처)에 추가되었습니다!`);
    }

    setShowContactFormModal(false);
    setEditingContactId(null);
  };

  const handleDeleteContact = (contactId) => {
    if (contactId === 'me') return;
    const target = contactNodes.find((n) => n.id === contactId);
    if (!target) return;
    const remaining = contactNodes.filter((n) => n.id !== contactId);
    setContactNodes(remaining);
    if (selectedNodeId === contactId) {
      const fallback = remaining.find((n) => n.id !== 'me') || remaining[0];
      setSelectedNodeId(fallback ? fallback.id : 'me');
    }
    if (activeChatPartnerId === contactId) {
      const fallback = remaining.find((n) => n.id !== 'me');
      if (fallback) setActiveChatPartnerId(fallback.id);
    }
    setNodeActionSheet(null);
    setShowContactFormModal(false);
    showNotification(`🗑️ [${target.label}] 연락처가 주소록에서 삭제되었습니다.`);
  };

  const handleOpenChatWithNode = (node) => {
    setActiveChatPartnerId(node.id);
    setNodeActionSheet(null);
    setActiveAppView('comm');
    showNotification(`💬 [${node.label}] 님과의 1:1 안심 채팅방으로 이동했습니다.`);
  };

  const handleStartCallWithNode = (node, callType) => {
    setNodeActionSheet(null);
    setPreCallModal({
      contact: {
        id: node.id,
        name: node.label,
        relation: node.relation,
        avatar: node.icon,
        timezone: node.timezone,
        status: node.status
      },
      callType
    });
  };

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInputText.trim()) return;
    const text = chatInputText.trim();
    const partner = contactNodes.find((n) => n.id === activeChatPartnerId) || contactNodes[1] || contactNodes[0];

    const myMsg = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      text,
      time: `방금 전 (UK ${timeInfo.londonTimeStr})`
    };

    setChatHistories((prev) => ({
      ...prev,
      [partner.id]: [...(prev[partner.id] || []), myMsg]
    }));
    setChatInputText('');

    setLocalKeywords((prev) => {
      const updated = [...prev];
      if (text.includes('김치') || text.includes('밥') || text.includes('요리') || text.includes('레시피')) {
        updated[0] = { ...updated[0], count: updated[0].count + 1 };
      } else if (text.includes('과제') || text.includes('해커톤') || text.includes('수업')) {
        updated[1] = { ...updated[1], count: updated[1].count + 1 };
      } else if (text.includes('날씨') || text.includes('감기') || text.includes('건강')) {
        updated[2] = { ...updated[2], count: updated[2].count + 1 };
      } else {
        updated[3] = { ...updated[3], count: updated[3].count + 1 };
      }
      saveKeywordsLocally(updated);
      return updated;
    });

    setTimeout(() => {
      const replyMap = {
        mom: '그래 아들~ 타지에서 밥 잘 챙겨 먹는 게 제일 중요하다! 시간 될 때 무료 영상통화 걸어렴 ❤️',
        dad: '든든하구나! 언제나 응원하고 있으니 건강 챙기면서 HomePlate 해커톤 잘 마무리해라!',
        bro: '오케이 형! 나도 오늘 자취방 청소 퀘스트 클리어하고 인증샷 올릴게 ㅋㅋ',
        james: 'Sounds awesome! Let’s catch up on voice call before the lecture starts.',
        mentor: '좋은 생각이에요! 궁금한 영국 자취 꿀팁 있으면 언제든 메시지 남겨주세요 😊'
      };
      const replyMsg = {
        id: `reply-${Date.now()}`,
        sender: 'them',
        text: replyMap[partner.id] || `${partner.label}: 메시지 잘 확인했어! 편할 때 통화하자~`,
        time: `방금 전 (${partner.timezone})`
      };
      setChatHistories((prev) => ({
        ...prev,
        [partner.id]: [...(prev[partner.id] || []), replyMsg]
      }));
    }, 900);
  };

  const toggleQuest = (id) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id !== id) return q;
        const nextCompleted = !q.completed;
        if (nextCompleted) {
          setUserXp((xp) => xp + q.xp);
          setPiBalance((b) => +(b + q.piReward).toFixed(2));
          showNotification(`🎉 [${q.title}] 클리어! +${q.xp} XP & +${q.piReward} π 적립!`);
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
        id: `q-${Date.now()}`,
        title: newQuestTitle.trim(),
        category: newQuestCategory,
        xp: 90,
        piReward: 1.0,
        completed: false,
        streak: 1,
        timeEstimate: '15분',
        aiTip: '미루지 않고 바로 시작하면 AI 성실도 보너스가 함께 적립됩니다!'
      },
      ...quests
    ]);
    setNewQuestTitle('');
    showNotification('✨ 새로운 일일 퀘스트가 등록되었습니다!');
  };

  const toggleRecipeSubscribe = (recipeId) => {
    setRecipes((prev) =>
      prev.map((r) => {
        if (r.id !== recipeId) return r;
        const nextSub = !r.isSubscribed;
        showNotification(nextSub ? `⭐ [${r.author}] 채널을 구독했습니다!` : '구독이 해제되었습니다.');
        return {
          ...r,
          isSubscribed: nextSub,
          subscribers: nextSub ? r.subscribers + 1 : Math.max(0, r.subscribers - 1)
        };
      })
    );
  };

  const handleLikeRecipe = (recipeId) => {
    setRecipes((prev) => prev.map((r) => (r.id === recipeId ? { ...r, likes: r.likes + 1 } : r)));
    if (selectedRecipe && selectedRecipe.id === recipeId) {
      setSelectedRecipe((prev) => ({ ...prev, likes: prev.likes + 1 }));
    }
    showNotification('❤️ 레시피에 따뜻한 공감을 보냈습니다!');
  };

  const handleAddRecipeComment = (e) => {
    e.preventDefault();
    if (!recipeCommentInput.trim() || !selectedRecipe) return;
    const newComment = {
      id: `cm-${Date.now()}`,
      user: userProfile.name,
      text: recipeCommentInput.trim()
    };
    setRecipes((prev) =>
      prev.map((r) => (r.id === selectedRecipe.id ? { ...r, comments: [...(r.comments || []), newComment] } : r))
    );
    setSelectedRecipe((prev) => ({ ...prev, comments: [...(prev.comments || []), newComment] }));
    setRecipeCommentInput('');
    showNotification('💬 레시피 소통 댓글이 등록되었습니다!');
  };

  const handleUploadRecipe = (e) => {
    e.preventDefault();
    if (!newRecipeForm.name.trim()) return;
    const created = {
      id: `r-${Date.now()}`,
      name: newRecipeForm.name.trim(),
      author: `${userProfile.name} (@${userProfile.username})`,
      authorRole: '유학생 크리에이터',
      tags: newRecipeForm.tags.split(' ').filter(Boolean),
      time: newRecipeForm.time || '15분',
      difficulty: '초급',
      likes: 1,
      subscribers: 12,
      isSubscribed: true,
      coverIcon: '🍳',
      type: 'creator',
      desc: newRecipeForm.desc || '영국 현지 마트 재료로 쉽게 따라 할 수 있는 자취 맞춤형 레시피입니다.',
      ukMartTip: newRecipeForm.ukMartTip || '현지 마트 기본 재료로 조리 가능',
      familyTip: newRecipeForm.familyTip || '가족들과 함께 댓글로 비법을 나눠보세요!',
      steps: [
        '재료를 알맞은 크기로 손질하여 준비합니다.',
        '레시피 비율에 맞춰 양념을 넣고 조리합니다.',
        '완성된 요리를 가족 및 구독자들과 공유하고 피드백을 나눕니다!'
      ],
      comments: []
    };
    setRecipes([created, ...recipes]);
    setPiBalance((b) => +(b + 3.0).toFixed(2));
    setShowUploadRecipeModal(false);
    setNewRecipeForm({ name: '', tags: '#초간단 #자취요리', time: '15분', desc: '', ukMartTip: '', familyTip: '' });
    showNotification('🍳 HomePlate에 새 레시피가 발행되었습니다! 크리에이터 보상 +3.0 π 적립!');
  };

  const openPiPaymentSheet = ({ mode = 'U2A', title, amount, recipient }) => {
    setPaymentSheet({ mode, title, amount: +Number(amount).toFixed(2), recipient, step: 0, txid: null });
  };

  const executePiPaymentFlow = async () => {
    if (!paymentSheet) return;
    const generatedTxId = `0x${Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    setPaymentSheet((prev) => ({ ...prev, step: 1 }));
    await new Promise((r) => setTimeout(r, 450));
    setPaymentSheet((prev) => ({ ...prev, step: 2 }));
    await new Promise((r) => setTimeout(r, 450));
    setPaymentSheet((prev) => ({ ...prev, step: 3, txid: generatedTxId }));

    if (paymentSheet.mode === 'U2A') {
      setPiWalletBalance((b) => +Math.max(0, b - paymentSheet.amount).toFixed(2));
      setPiTransactions((prev) => [
        {
          id: `tx-${Date.now()}`,
          txid: generatedTxId,
          type: 'U2A',
          title: paymentSheet.title,
          amount: -paymentSheet.amount,
          counterparty: paymentSheet.recipient,
          timestamp: '방금 전',
          status: 'CONFIRMED'
        },
        ...prev
      ]);
      showNotification(`💸 [Pi.createPayment 완료] ${paymentSheet.amount} π 송금이 완료되었습니다!`);
    } else {
      setPiBalance(0);
      setPiWalletBalance((b) => +(b + paymentSheet.amount).toFixed(2));
      setPiTransactions((prev) => [
        {
          id: `tx-${Date.now()}`,
          txid: generatedTxId,
          type: 'A2U',
          title: paymentSheet.title,
          amount: paymentSheet.amount,
          counterparty: `@${userProfile.username}`,
          timestamp: '방금 전',
          status: 'CONFIRMED'
        },
        ...prev
      ]);
      showNotification(`🎉 [A2U 출금 완료] ${paymentSheet.amount} π 보상이 내 Pi 지갑으로 입금되었습니다!`);
    }
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

  const activeChatPartner = useMemo(
    () =>
      contactNodes.find((n) => n.id === activeChatPartnerId && n.id !== 'me') ||
      contactNodes.find((n) => n.id !== 'me') ||
      contactNodes[0],
    [contactNodes, activeChatPartnerId]
  );

  const APP_LAUNCHER_ITEMS = [
    {
      id: 'profile',
      name: '프로필·주소록',
      sub: '연락처관리·소통맵',
      icon: Users,
      badge: `${contactNodes.length - 1}명 연락처`,
      gradient: 'from-indigo-500 to-violet-600',
      lightBg: 'bg-indigo-500/15 text-indigo-500 border-indigo-500/30'
    },
    {
      id: 'comm',
      name: '채팅·무료통화',
      sub: '1:1메신저·시차가드',
      icon: MessageCircle,
      badge: '실시간 연동',
      gradient: 'from-emerald-500 to-teal-600',
      lightBg: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
    },
    {
      id: 'recipes',
      name: '레시피 허브',
      sub: '구독·창작·인기순위',
      icon: ChefHat,
      badge: '콘텐츠 피드',
      gradient: 'from-rose-500 to-amber-500',
      lightBg: 'bg-rose-500/15 text-rose-500 border-rose-500/30'
    },
    {
      id: 'quests',
      name: 'AI 퀘스트',
      sub: '일상·과제 보상',
      icon: Award,
      badge: `${quests.filter((q) => !q.completed).length}개 남음`,
      gradient: 'from-violet-500 to-purple-600',
      lightBg: 'bg-violet-500/15 text-violet-500 border-violet-500/30'
    },
    {
      id: 'calendar',
      name: '문화 캘린더',
      sub: '영국기념일·시간표',
      icon: CalendarIcon,
      badge: '🇬🇧/🇰🇷 공유',
      gradient: 'from-sky-500 to-blue-600',
      lightBg: 'bg-sky-500/15 text-sky-500 border-sky-500/30'
    },
    {
      id: 'analytics',
      name: '대화 패턴 분석',
      sub: '100% 온디바이스',
      icon: BarChart3,
      badge: '0 Byte 보안',
      gradient: 'from-fuchsia-500 to-pink-600',
      lightBg: 'bg-fuchsia-500/15 text-fuchsia-500 border-fuchsia-500/30'
    },
    {
      id: 'wallet',
      name: 'Pi 지갑·SDK',
      sub: 'π결제·보상출금',
      icon: Wallet,
      badge: `${piWalletBalance} π`,
      gradient: 'from-amber-500 to-orange-600',
      lightBg: 'bg-amber-500/15 text-amber-500 border-amber-500/30'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme.bg} ${theme.text} pb-24`}>
      {toastMsg && (
        <div className="fixed bottom-20 right-4 z-50 max-w-sm animate-bounce">
          <div className="bg-slate-900/95 text-white border border-amber-400/50 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs font-bold leading-snug">{toastMsg}</span>
          </div>
        </div>
      )}

      {/* 상단 헤더 */}
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
        lang={lang}
        setLang={setLang}
        userProfile={userProfile}
        piWalletBalance={piWalletBalance}
        customLogoUrl={customLogoUrl}
        logoStyle={logoStyle}
        onOpenLogoModal={() => setShowLogoModal(true)}
        onOpenVipModal={() => {
          setVipLoginNameInput(userProfile.name);
          setVipLoginHandleInput(userProfile.username);
          setShowVipModal(true);
        }}
        setActiveAppView={setActiveAppView}
      />

      {/* 메인 컨테이너 */}
      <div className={`${viewportMode === 'mobile' ? 'max-w-lg' : 'max-w-6xl'} mx-auto px-3.5 pt-3`}>
        {/* 상단 고정 듀얼 시계 & 상태 바 */}
        <DualClockBar
          theme={theme}
          t={t}
          timeInfo={timeInfo}
          simulateSummerTime={simulateSummerTime}
          setSimulateSummerTime={setSimulateSummerTime}
          timePreset={timePreset}
          onSelectTimePreset={handleSelectTimePreset}
          studentStatusId={studentStatusId}
          setStudentStatusId={setStudentStatusId}
          currentStatusObj={currentStatusObj}
          customStatusNote={customStatusNote}
          setCustomStatusNote={setCustomStatusNote}
          showNotification={showNotification}
        />

        {activeAppView === 'home' ? (
          <AppLauncherGrid
            theme={theme}
            t={t}
            viewportMode={viewportMode}
            userLevel={userLevel}
            piBalance={piBalance}
            launcherItems={APP_LAUNCHER_ITEMS}
            setActiveAppView={setActiveAppView}
            pinnedWidgets={pinnedWidgets}
            showWidgetCustomizer={showWidgetCustomizer}
            setShowWidgetCustomizer={setShowWidgetCustomizer}
            onToggleWidget={toggleWidgetEnabled}
            onMoveWidgetOrder={moveWidgetOrder}
            contactNodes={contactNodes}
            onClickContactNode={(node) => {
              setSelectedNodeId(node.id);
              setNodeActionSheet(node);
            }}
            onOpenAddContactFromHome={() => {
              setActiveAppView('profile');
              openAddContactModal();
            }}
            quests={quests}
            onToggleQuest={toggleQuest}
            recipes={recipes}
            onSelectRecipeFromHome={(r) => {
              setSelectedRecipe(r);
              setActiveAppView('recipes');
            }}
            localKeywords={localKeywords}
          />
        ) : (
          <div className="space-y-4 animate-fadeIn">
            {/* 상단 서브뷰 네비게이션 바 */}
            <div className={`p-2.5 rounded-2xl border ${theme.card} flex items-center justify-between gap-2`}>
              <button
                onClick={() => setActiveAppView('home')}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1 ${theme.accent} shrink-0`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t.backToHome}</span>
              </button>
              <div className="flex items-center gap-1 overflow-x-auto py-0.5">
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

            {activeAppView === 'profile' && (
              <ProfileAddressBook
                theme={theme}
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                contactNodes={contactNodes}
                setContactNodes={setContactNodes}
                selectedNodeId={selectedNodeId}
                setSelectedNodeId={setSelectedNodeId}
                nodeActionSheet={nodeActionSheet}
                setNodeActionSheet={setNodeActionSheet}
                showContactFormModal={showContactFormModal}
                setShowContactFormModal={setShowContactFormModal}
                editingContactId={editingContactId}
                setEditingContactId={setEditingContactId}
                contactForm={contactForm}
                setContactForm={setContactForm}
                onOpenAddContactModal={openAddContactModal}
                onOpenEditContactModal={openEditContactModal}
                onSaveContactForm={handleSaveContactForm}
                onDeleteContact={handleDeleteContact}
                onOpenChatWithNode={handleOpenChatWithNode}
                onStartCallWithNode={handleStartCallWithNode}
                onOpenPiPaymentSheet={openPiPaymentSheet}
                showNotification={showNotification}
              />
            )}

            {activeAppView === 'comm' && (
              <CommChatCallHub
                theme={theme}
                contactNodes={contactNodes}
                activeChatPartner={activeChatPartner}
                setActiveChatPartnerId={setActiveChatPartnerId}
                chatHistories={chatHistories}
                chatInputText={chatInputText}
                setChatInputText={setChatInputText}
                onSendChatMessage={handleSendChatMessage}
                onStartCallWithNode={handleStartCallWithNode}
                setActiveAppView={setActiveAppView}
              />
            )}

            {activeAppView === 'recipes' && (
              <RecipeHub
                theme={theme}
                recipes={recipes}
                selectedRecipe={selectedRecipe}
                setSelectedRecipe={setSelectedRecipe}
                onToggleSubscribe={toggleRecipeSubscribe}
                onLikeRecipe={handleLikeRecipe}
                recipeCommentInput={recipeCommentInput}
                setRecipeCommentInput={setRecipeCommentInput}
                onAddRecipeComment={handleAddRecipeComment}
                showUploadRecipeModal={showUploadRecipeModal}
                setShowUploadRecipeModal={setShowUploadRecipeModal}
                newRecipeForm={newRecipeForm}
                setNewRecipeForm={setNewRecipeForm}
                onUploadRecipe={handleUploadRecipe}
                onOpenPiPaymentSheet={openPiPaymentSheet}
              />
            )}

            {activeAppView === 'quests' && (
              <QuestBoard
                theme={theme}
                quests={quests}
                onToggleQuest={toggleQuest}
                newQuestTitle={newQuestTitle}
                setNewQuestTitle={setNewQuestTitle}
                newQuestCategory={newQuestCategory}
                setNewQuestCategory={setNewQuestCategory}
                onAddQuest={handleAddQuest}
                piBalance={piBalance}
                userProfile={userProfile}
                onOpenPiPaymentSheet={openPiPaymentSheet}
              />
            )}

            {activeAppView === 'calendar' && (
              <CulturalCalendar
                theme={theme}
                onSendStarterToChat={(starterText) => {
                  setChatInputText(starterText);
                  setActiveAppView('comm');
                }}
              />
            )}

            {activeAppView === 'analytics' && (
              <PrivacyAnalytics
                theme={theme}
                localKeywords={localKeywords}
                setActiveAppView={setActiveAppView}
              />
            )}

            {activeAppView === 'wallet' && (
              <PiWalletCenter
                theme={theme}
                userProfile={userProfile}
                piWalletBalance={piWalletBalance}
                piBalance={piBalance}
                piTransactions={piTransactions}
              />
            )}
          </div>
        )}
      </div>

      {/* 하단 플로팅 네비게이션 독 */}
      <BottomNavDock
        theme={theme}
        activeAppView={activeAppView}
        setActiveAppView={setActiveAppView}
      />

      {/* 시스템 전역 모달 (로고 설정 / 통화 시차 가드 / 실시간 통화 / Pi 결제 / VIP 로그인) */}
      <SystemModals
        theme={theme}
        timeInfo={timeInfo}
        simulateSummerTime={simulateSummerTime}
        currentStatusObj={currentStatusObj}
        customStatusNote={customStatusNote}
        showLogoModal={showLogoModal}
        setShowLogoModal={setShowLogoModal}
        customLogoUrl={customLogoUrl}
        setCustomLogoUrl={setCustomLogoUrl}
        logoStyle={logoStyle}
        setLogoStyle={setLogoStyle}
        onLogoFileUpload={handleLogoFileUpload}
        preCallModal={preCallModal}
        setPreCallModal={setPreCallModal}
        activeCall={activeCall}
        setActiveCall={setActiveCall}
        onSwitchToChatFromGuard={(contact) => {
          setPreCallModal(null);
          if (contact && contact.id) setActiveChatPartnerId(contact.id);
          setActiveAppView('comm');
        }}
        onFinishCallReward={() => {
          setActiveCall(null);
          setPiBalance((b) => +(b + 1.5).toFixed(2));
          showNotification('📞 따뜻한 안부 통화를 마쳤습니다! 소통 퀘스트 보상 +1.5 π');
        }}
        paymentSheet={paymentSheet}
        setPaymentSheet={setPaymentSheet}
        onExecutePiPaymentFlow={executePiPaymentFlow}
        showVipModal={showVipModal}
        setShowVipModal={setShowVipModal}
        vipLoginNameInput={vipLoginNameInput}
        setVipLoginNameInput={setVipLoginNameInput}
        vipLoginHandleInput={vipLoginHandleInput}
        setVipLoginHandleInput={setVipLoginHandleInput}
        vipCodeInput={vipCodeInput}
        setVipCodeInput={setVipCodeInput}
        onApplyVipLogin={() => {
          setUserProfile((prev) => ({
            ...prev,
            name: vipLoginNameInput || prev.name,
            username: vipLoginHandleInput || prev.username,
            vipCode: vipCodeInput
          }));
          setShowVipModal(false);
          showNotification(`✅ HomePlate에 [${vipLoginNameInput}] 님으로 VIP 로그인되었습니다!`);
        }}
        showNotification={showNotification}
      />
    </div>
  );
}


