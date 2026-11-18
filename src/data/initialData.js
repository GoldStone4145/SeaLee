import { BookOpen, Moon, BellOff, Utensils } from 'lucide-react';

export const THEMES = {
  white: {
    id: 'white',
    name: '화이트',
    desc: '깔끔하고 선명한 모던 데이라이트',
    bg: 'bg-slate-50',
    text: 'text-slate-900',
    subtext: 'text-slate-500',
    card: 'bg-white border-slate-200/80 shadow-sm',
    cardHover: 'hover:border-indigo-300 hover:shadow-md',
    header: 'bg-white/85 border-slate-200/80 backdrop-blur-xl',
    accent: 'bg-indigo-600 text-white',
    accentSoft: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    accentText: 'text-indigo-600',
    input: 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400',
    divider: 'border-slate-100',
    badge: 'bg-slate-100 text-slate-700'
  },
  dark: {
    id: 'dark',
    name: '다크',
    desc: '눈이 편안한 딥 옵시디언 & 네온',
    bg: 'bg-slate-950',
    text: 'text-slate-100',
    subtext: 'text-slate-400',
    card: 'bg-slate-900/90 border-slate-800 shadow-xl',
    cardHover: 'hover:border-violet-500/50',
    header: 'bg-slate-900/80 border-slate-800 backdrop-blur-xl',
    accent: 'bg-violet-600 text-white',
    accentSoft: 'bg-violet-950/80 text-violet-300 border-violet-800/60',
    accentText: 'text-violet-400',
    input: 'bg-slate-800/90 border-slate-700 text-slate-100 placeholder-slate-500',
    divider: 'border-slate-800',
    badge: 'bg-slate-800 text-slate-300'
  },
  warm: {
    id: 'warm',
    name: '웜톤',
    desc: '집밥처럼 포근한 테라코타 & 크림',
    bg: 'bg-[#FDF8F3]',
    text: 'text-[#3D2C24]',
    subtext: 'text-[#8C6D5D]',
    card: 'bg-[#FFFDF9] border-[#EFE3D5] shadow-sm',
    cardHover: 'hover:border-amber-400 hover:shadow-md',
    header: 'bg-[#FFFDF9]/90 border-[#EFE3D5] backdrop-blur-xl',
    accent: 'bg-[#D96B43] text-white',
    accentSoft: 'bg-[#FCEEE7] text-[#B8502B] border-[#F5D3C4]',
    accentText: 'text-[#D96B43]',
    input: 'bg-[#F7EFE6] border-[#E6D5C3] text-[#3D2C24] placeholder-[#A88E7F]',
    divider: 'border-[#F2E8DC]',
    badge: 'bg-[#F5EBE1] text-[#6E5041]'
  },
  cool: {
    id: 'cool',
    name: '쿨톤',
    desc: '청량한 노르딕 아이스 블루 & 슬레이트',
    bg: 'bg-[#F0F7FF]',
    text: 'text-[#0F2942]',
    subtext: 'text-[#527394]',
    card: 'bg-white/95 border-[#D6E8FA] shadow-sm',
    cardHover: 'hover:border-sky-400 hover:shadow-md',
    header: 'bg-white/85 border-[#D6E8FA] backdrop-blur-xl',
    accent: 'bg-[#0284C7] text-white',
    accentSoft: 'bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]',
    accentText: 'text-[#0284C7]',
    input: 'bg-[#E6F2FF] border-[#C7E0FA] text-[#0F2942] placeholder-[#6B8EAD]',
    divider: 'border-[#E1EFFD]',
    badge: 'bg-[#E6F2FF] text-[#1E4E79]'
  },
  custom: {
    id: 'custom',
    name: '사용자맞춤형',
    desc: '나만의 오로라 배경 & 글래스모피즘',
    bg: 'bg-gradient-to-br from-indigo-950 via-purple-900 to-rose-900',
    text: 'text-white',
    subtext: 'text-purple-200/80',
    card: 'bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl',
    cardHover: 'hover:border-pink-400/60 hover:bg-white/15',
    header: 'bg-black/25 border-white/15 backdrop-blur-2xl',
    accent: 'bg-gradient-to-r from-pink-500 to-amber-500 text-white',
    accentSoft: 'bg-white/15 text-amber-200 border-white/20',
    accentText: 'text-amber-300',
    input: 'bg-white/10 border-white/20 text-white placeholder-purple-200/50',
    divider: 'border-white/10',
    badge: 'bg-white/15 text-white'
  }
};

export const CUSTOM_AURA_PRESETS = [
  { id: 'aurora', name: '런던 오로라 나이트', gradient: 'from-indigo-950 via-purple-900 to-rose-900' },
  { id: 'sunset', name: '템즈강 선셋 글로우', gradient: 'from-slate-900 via-rose-950 to-amber-900' },
  { id: 'forest', name: '옥스퍼드 라이브러리', gradient: 'from-emerald-950 via-teal-900 to-slate-900' },
  { id: 'cyber', name: '코지 런던 카페', gradient: 'from-stone-900 via-amber-950 to-rose-950' }
];

export const STUDENT_STATUS_MODES = [
  {
    id: 'lecture',
    label: '수업 중',
    icon: BookOpen,
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
    dot: 'bg-amber-500',
    autoMessage: '현재 수업 중입니다. 급한 용건이 아니면 나중에 전화 달라는 메시지를 남겨주세요.',
    guardLevel: 'warning'
  },
  {
    id: 'sleeping',
    label: '수면 모드 (시차 보호)',
    icon: Moon,
    color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
    dot: 'bg-indigo-500',
    autoMessage: '영국은 지금 늦은 밤/새벽 수면 시간입니다. 기상 후 바로 연락드릴게요!',
    guardLevel: 'critical'
  },
  {
    id: 'dnd',
    label: '방해 금지 (과제 집중)',
    icon: BellOff,
    color: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
    dot: 'bg-rose-500',
    autoMessage: '현재 파이 해커톤 및 중요 과제 집중(방해 금지) 시간입니다. 안심 메시지를 남겨주세요!',
    guardLevel: 'critical'
  },
  {
    id: 'available',
    label: '소통 가능 (통화 환영)',
    icon: Utensils,
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
    dot: 'bg-emerald-500',
    autoMessage: '지금 기숙사에서 요리 및 휴식 중이에요! 편하게 영상/음성 통화 주세요.',
    guardLevel: 'safe'
  }
];

export const INITIAL_PINNED_WIDGETS = [
  { id: 'mini_wallet', title: '👛 Pi 브라우저 지갑 & 리워드 요약', desc: '연동된 Pi 지갑 잔액과 출금 가능한 퀘스트·크리에이터 보상 현황', enabled: true, targetApp: 'wallet' },
  { id: 'mini_quests', title: '⚡ 오늘의 필수 퀘스트 미니뷰', desc: '미루기 쉬운 일상 할 일 2가지를 홈에서 바로 체크', enabled: true, targetApp: 'quests' },
  { id: 'mini_recipes', title: '🔥 실시간 급상승 레시피 호가창 TOP 3', desc: '지금 가장 핫한 자취 요리 키워드와 등락률 요약', enabled: true, targetApp: 'recipes' },
  { id: 'mini_calls', title: '👨‍👩‍👦 가족 원클릭 안심 통화 핫키', desc: '시차 가드가 적용된 본가 부모님·동생 빠른 연결', enabled: false, targetApp: 'calls' },
  { id: 'mini_calendar', title: '🗓️ 오늘의 수업 & 영국 기념일 브리핑', desc: '내 다음 수업 시간과 가족에게 공유된 현지 문화 카드', enabled: false, targetApp: 'calendar' },
  { id: 'mini_analytics', title: '💬 온디바이스 가족 소통 온도 요약', desc: '외부 유출 0% 로컬 AI가 분석한 주간 대화 다정함 지수', enabled: false, targetApp: 'analytics' }
];

export const INITIAL_PI_TRANSACTIONS = [
  { id: 'tx-101', txid: '0x8f4d2c9a...71e3b904', type: 'A2U', title: 'AI 주간 생활 퀘스트 클리어 보상 수령', amount: 3.5, counterparty: 'Pi-Bridge Reward Pool', timestamp: '오늘 14:20', network: 'Pi Testnet', status: 'CONFIRMED' },
  { id: 'tx-102', txid: '0x3a91e7b0...44c12d8f', type: 'U2A', title: '어머니표 차돌 된장찌개 비법 레시피 후원', amount: -0.5, counterparty: '@paju_mom_mentor', timestamp: '어제 21:15', network: 'Pi Testnet', status: 'CONFIRMED' },
  { id: 'tx-103', txid: '0x6c20f19d...99a04e12', type: 'A2U', title: '내 자취 레시피 구독 수익 정산 입금', amount: 4.2, counterparty: 'Pi-Bridge Creator Vault', timestamp: '11월 16일', network: 'Pi Testnet', status: 'CONFIRMED' }
];

export const INITIAL_QUESTS = [
  { id: 'q1', title: '설거지 및 싱크대 물기 정리하기', category: '생활', xp: 50, piReward: 0.5, completed: false, streak: 5, timeEstimate: '10분', aiTip: '식사 직후 따뜻한 물로 바로 헹구면 세제 사용량을 40% 줄일 수 있어요!' },
  { id: 'q2', title: '방 청소 및 창문 열고 10분 환기하기', category: '생활', xp: 80, piReward: 0.8, completed: true, streak: 12, timeEstimate: '10분', aiTip: '런던의 흐린 날에도 하루 10분 환기는 실내 CO2 농도를 낮춰 집중력을 높여줍니다.' },
  { id: 'q3', title: '본가에 안부 전화 또는 짧은 영상 남기기', category: '소통', xp: 120, piReward: 1.5, completed: false, streak: 8, timeEstimate: '5분', aiTip: '현재 한국은 저녁 식사 시간대입니다! 오늘 만든 자취 요리 사진을 함께 공유해보세요.' },
  { id: 'q4', title: '전공 알고리즘 과제 제출 및 깃허브 커밋', category: '학업', xp: 200, piReward: 2.0, completed: false, streak: 3, timeEstimate: '45분', aiTip: '마감 3시간 전 제출 시 보너스 성실도 +20 XP가 추가 지급됩니다.' }
];

export const INITIAL_RECIPES = [
  {
    id: 'r1', rank: 1, name: '10분 김치참치 마요 덮밥', keyword: '#초간단 #자취필수', change: 18.4, isUp: true, badge: '폭주', views: '4,820',
    author: '런던자취왕 (유학생 크리에이터)', category: 'custom', time: '10분', difficulty: '초급',
    ukMartTip: 'Tesco 통조림 참치(Sunflower Oil)와 한인마트 숙성 김치 반 컵이면 끝!',
    familyTip: '어머니 팁: 김치를 볶을 때 설탕 반 스푼을 넣어야 신맛이 잡히고 감칠맛이 산단다!',
    steps: [
      '팬에 참기름 1큰술을 두르고 잘게 썬 김치와 설탕 0.5큰술을 볶습니다.',
      '기름기를 뺀 참치 1캔을 넣고 중불에서 2분간 함께 볶아줍니다.',
      '따뜻한 밥 위에 볶은 김치참치를 올리고 마요네즈와 김가루를 듬뿍 뿌려 완성!'
    ],
    sparkline: [35, 42, 58, 63, 75, 89, 100], piPrice: '무료 구독', likes: 942
  },
  {
    id: 'r2', rank: 2, name: '영국 마트(Tesco) 삼겹살 김치찜', keyword: '#영국마트재료 #집밥그리울때', change: 12.1, isUp: true, badge: '인기', views: '3,510',
    author: '파주어머니 (가족 공식 멘토)', category: 'family', time: '35분', difficulty: '중급',
    ukMartTip: 'Tesco나 Sainsbury’s에서 "Pork Belly Slices"를 고르면 한국 삼겹살과 가장 비슷해요.',
    familyTip: '파주 어머니 음성메모 변환: "영국 양파는 수분이 많으니 바닥에 양파를 두껍게 깔고 고기를 올리렴. 쌀뜨물 대신 물에 된장 반 스푼 풀면 잡내가 싹 사라진다!"',
    steps: [
      '냄비 바닥에 영국산 양파 1개를 두껍게 썰어 깔아줍니다.',
      '신김치 반 포기와 Pork Belly(삼겹살) 300g을 켜켜이 쌓아 올립니다.',
      '물 2컵, 고춧가루 2큰술, 다진마늘 1큰술, 된장 0.5큰술을 넣고 중약불에서 25분간 푹 끓입니다.'
    ],
    sparkline: [50, 55, 60, 58, 72, 80, 92], piPrice: '가족 전용 (Win-Win)', likes: 1280
  },
  {
    id: 'r3', rank: 3, name: '전자레인지 3분 폭탄 계란찜', keyword: '#설거지제로 #아침식사', change: 9.5, isUp: true, badge: '꾸준', views: '2,890',
    author: '맨체스터공대생 (유학생 크리에이터)', category: 'custom', time: '5분', difficulty: '초급',
    ukMartTip: 'Aldi Free-range 계란 3알 + 소금 약간(또는 치킨스톡 1/4조각) 활용',
    familyTip: '아버지 팁: 계란과 물 비율을 1:1로 맞추고 참기름 한 방울 떨어뜨리면 식당 맛 그대로다!',
    steps: [
      '전자레인지용 머그컵이나 깊은 그릇에 계란 3개를 곱게 풀어줍니다.',
      '물 150ml와 소금 반 티스푼을 넣고 골고루 섞은 뒤 랩을 씌워 포크로 구멍 3개를 뚫습니다.',
      '전자레인지(800W 기준)에 3분 30초 돌리면 부들부들한 계란찜 완성!'
    ],
    sparkline: [40, 45, 48, 52, 60, 68, 75], piPrice: '0.2 π 팁 후원 가능', likes: 615
  },
  {
    id: 'r4', rank: 4, name: '기숙사 원팬 갈릭 알리오 올리오', keyword: '#가성비 #시험기간', change: -2.3, isUp: false, badge: '보합', views: '2,140',
    author: '킹스컬리지셰프', category: 'creator', time: '15분', difficulty: '초급',
    ukMartTip: 'Lidl 엑스트라 버진 올리브유와 Peperoncino(크러쉬드 레드페퍼) 조합 추천',
    familyTip: '누나 팁: 면수를 버리지 말고 국자로 한 스푼 넣어서 기름이랑 유화(에멀전)시키는 게 핵심이야!',
    steps: [
      '소금물에 파스타 면을 7분간 삶고 면수 반 컵을 따로 덜어둡니다.',
      '올리브유에 편마늘 8쪽과 페퍼론치노를 넣고 노릇해질 때까지 약불에 볶습니다.',
      '삶은 면과 면수를 넣고 센 불에서 1분간 빠르게 섞어 코팅합니다.'
    ],
    sparkline: [80, 78, 75, 79, 72, 70, 68], piPrice: '구독자 전용', likes: 530
  },
  {
    id: 'r5', rank: 5, name: '어머니표 차돌 된장찌개 밀키트 비법', keyword: '#엄마손맛 #급상승', change: 24.8, isUp: true, badge: '급상승', views: '5,120',
    author: '파주어머니 (가족 공식 멘토)', category: 'family', time: '15분', difficulty: '초급',
    ukMartTip: 'Sainsbury’s의 얇은 Beef Shabu/Brisket 슬라이스와 영국 주키니 호박(Courgette) 활용!',
    familyTip: '어머니 팁: 영국 애호박(Courgette)은 한국 호박보다 단단하니까 2분 먼저 넣어서 끓여야 부드럽단다.',
    steps: [
      '냄비에 차돌박이(또는 얇은 소고기)를 먼저 볶아 고기 기름을 냅니다.',
      '물 350ml와 된장 1.5큰술, 고추장 0.5큰술을 풀고 주키니 호박과 감자를 넣습니다.',
      '보글보글 끓어오르면 두부와 대파, 다진마늘을 넣고 3분 더 끓여 완성합니다.'
    ],
    sparkline: [20, 32, 45, 60, 78, 91, 100], piPrice: '가족 전용 (Win-Win)', likes: 1640
  }
];

export const CULTURAL_CALENDAR_EVENTS = [
  {
    id: 'c1', date: '11월 5일', country: 'UK', flag: '🇬🇧',
    title: 'Guy Fawkes Night (가이 포크스 데이 / 본파이어 나이트)', type: 'cultural',
    shortDesc: '영국 전역에서 모닥불을 피우고 불꽃놀이를 즐기는 전통 기념일',
    familyCard: {
      headline: '부모님을 위한 영국 문화 한 조각 🇬🇧',
      explanation: '1605년 영국 의사당 폭파 미수 사건을 기념하며 매년 11월 5일 밤 영국 전역에서 화려한 불꽃놀이(Fireworks)와 모닥불을 피우는 날이에요. 밤늦게 기숙사 밖에서 폭죽 소리가 크게 들릴 수 있답니다!',
      conversationStarter: '"오늘 영국은 가이 포크스 데이라 밤에 불꽃놀이 많이 한다던데, 기숙사 창문으로 구경했니?"'
    }
  },
  {
    id: 'c2', date: '11월 19일', country: 'GLOBAL', flag: '🚀',
    title: '2026 Pi Hackathon 공식 개막 & 프로젝트 제출 주간', type: 'academic',
    shortDesc: '유학생 맞춤형 소통/퀘스트/레시피 플랫폼 개발 집중 주간',
    familyCard: {
      headline: '자녀의 중요 일정 알림 💻',
      explanation: '오늘부터 그동안 준비해온 파이 해커톤이 본격적으로 진행되는 날입니다! 밤샘 코딩이나 발표 준비로 바쁠 수 있으니 따뜻한 응원 메시지를 남겨주시면 큰 힘이 됩니다.',
      conversationStarter: '"드디어 오늘부터 파이 해커톤 시작이네! 밥 꼭 챙겨 먹고 준비한 대로 멋지게 화이팅해라!"'
    }
  },
  {
    id: 'c3', date: '11월 22일', country: 'KR', flag: '🇰🇷',
    title: '소설 (小雪) & 한국 김장 시즌', type: 'cultural',
    shortDesc: '살얼음이 얼기 시작하는 절기이자 본가 김장 주간',
    familyCard: {
      headline: '유학생을 위한 한국 본가 소식 🇰🇷',
      explanation: '한국은 첫눈이 내린다는 절기인 소설을 맞아 날씨가 부쩍 추워졌고, 본가에서는 김장 준비가 한창인 시기입니다.',
      conversationStarter: '"어머니, 한국 날씨가 많이 추워졌다는데 김장하시느라 허리 안 아프세요? 저도 여기서 김치찜 해 먹었어요!"'
    }
  },
  {
    id: 'c4', date: '11월 30일', country: 'UK', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    title: "St. Andrew's Day (세인트 앤드류스 데이 - Bank Holiday)", type: 'holiday',
    shortDesc: '스코틀랜드 수호성인 기념일 및 공식 뱅크 홀리데이',
    familyCard: {
      headline: '부모님을 위한 영국 휴일 안내 🇬🇧',
      explanation: '영국(특히 스코틀랜드 지역)의 공식 휴일(Bank Holiday)이자 전통 무용인 케일리(Ceilidh)와 축제가 열리는 날입니다. 은행이나 일부 관공서가 쉬는 날이에요.',
      conversationStarter: '"이번 주에 세인트 앤드류스 데이 기념일이라던데 학교 주변 분위기는 어떠니?"'
    }
  }
];

export const STUDENT_TIMETABLE = [
  { time: '02:00 - 07:30 (UK)', krTime: '11:00 - 16:30 (KR)', title: '취침 시간 (시차 보호 모드 자동 작동)', status: 'sleeping' },
  { time: '09:00 - 11:00 (UK)', krTime: '18:00 - 20:00 (KR)', title: 'CS302 인공지능 시스템 전공 강의', status: 'lecture' },
  { time: '12:30 - 14:00 (UK)', krTime: '21:30 - 23:00 (KR)', title: '점심 자취 요리 & 본가 통화 골든타임 ★', status: 'available' },
  { time: '15:00 - 18:00 (UK)', krTime: '00:00 - 03:00 (KR)', title: '도서관 해커톤 팀 프로젝트 & 과제', status: 'studying' },
  { time: '19:00 - 21:00 (UK)', krTime: '04:00 - 06:00 (KR)', title: '저녁 식사 및 휴식 (레시피 업로드)', status: 'available' }
];

export const LOCAL_KEYWORDS = [
  { word: '집밥 & 김치찜 레시피', count: 42, trend: '+28%', category: '요리/생활', sentiment: 'warm' },
  { word: '해커톤 & 전공 과제 응원', count: 35, trend: '+45%', category: '학업/격려', sentiment: 'positive' },
  { word: '런던 날씨 & 감기 조심', count: 29, trend: '+12%', category: '건강/안부', sentiment: 'caring' },
  { word: '수업 시간표 & 시차 확인', count: 24, trend: '+19%', category: '소통/배려', sentiment: 'helpful' },
  { word: '비타민 & 영양제 챙겨먹기', count: 18, trend: '+8%', category: '건강/안부', sentiment: 'caring' }
];

export const CONTACTS = [
  { id: 'mom', name: '어머니 (본가 • 파주)', role: '가족 레시피 멘토', location: '한국 (KST)', avatar: '👩‍🍳', statusText: '저녁 준비 중 • 통화 가능', isFamily: true },
  { id: 'dad', name: '아버지 (본가 • 파주)', role: '든든한 후원자', location: '한국 (KST)', avatar: '👨‍💼', statusText: '퇴근 후 휴식 중 • 통화 환영', isFamily: true },
  { id: 'bro', name: '동생 (서울 자취생)', role: '레시피 구독자', location: '한국 (KST)', avatar: '🧑‍🎓', statusText: '계란찜 레시피 따라하는 중', isFamily: true }
];

