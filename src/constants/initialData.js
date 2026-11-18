export const GROUP_COLORS = {
  family: 'bg-rose-500',
  uk_friend: 'bg-sky-500',
  mentor: 'bg-purple-600',
  other: 'bg-emerald-600'
};

export const GROUP_LABELS = {
  all: '전체 연락처',
  family: '👩‍👧‍👦 가족 (본가)',
  uk_friend: '🇬🇧 영국 친구',
  mentor: '🌟 멘토/선배',
  other: '🤝 지인/기타'
};

export const INITIAL_CONTACT_NODES = [
  {
    id: 'me',
    label: '나 (Yong)',
    relation: '본인 • 영국 런던 유학생',
    group: 'me',
    x: 50,
    y: 50,
    color: 'bg-indigo-600',
    icon: '🧑‍🎓',
    phone: '+44 7700 900077',
    timezone: 'UK (GMT)',
    status: '수업 및 해커톤 준비 중',
    closeness: 100,
    note: '런던 유학 2년차, HomePlate에서 자취 요리와 인공지능 해커톤에 집중하고 있습니다.'
  },
  {
    id: 'mom',
    label: '어머니',
    relation: '가족 (본가 • 파주)',
    group: 'family',
    x: 50,
    y: 15,
    color: 'bg-rose-500',
    icon: '👩‍🍳',
    phone: '+82 10-8234-1004',
    timezone: 'KR (KST)',
    status: '저녁 준비 중 • 통화 가능',
    closeness: 99,
    note: '나의 1호 레시피 멘토! 매주 새로운 집밥 꿀팁을 알려주신다.'
  },
  {
    id: 'dad',
    label: '아버지',
    relation: '가족 (본가 • 파주)',
    group: 'family',
    x: 85,
    y: 27,
    color: 'bg-emerald-600',
    icon: '👨‍💼',
    phone: '+82 10-9123-4567',
    timezone: 'KR (KST)',
    status: '퇴근 후 휴식 중 • 통화 환영',
    closeness: 96,
    note: '언제나 든든하게 응원해주시는 후원자. 주말 골든타임 영상통화 고정!'
  },
  {
    id: 'bro',
    label: '동생',
    relation: '가족 (서울 자취생)',
    group: 'family',
    x: 82,
    y: 78,
    color: 'bg-amber-500',
    icon: '👦',
    phone: '+82 10-5511-2233',
    timezone: 'KR (KST)',
    status: '계란찜 레시피 실습 중',
    closeness: 92,
    note: '서울에서 자취 중이라 내 자취 레시피를 가장 열심히 구독해준다.'
  },
  {
    id: 'james',
    label: 'James',
    relation: '영국 대학 프로젝트 단짝',
    group: 'uk_friend',
    x: 16,
    y: 27,
    color: 'bg-sky-500',
    icon: '👱‍♂️',
    phone: '+44 7911 123456',
    timezone: 'UK (GMT)',
    status: '도서관에서 코딩 중',
    closeness: 88,
    note: '컴퓨터공학 전공 스터디 파트너이자 김치볶음밥 매니아.'
  },
  {
    id: 'mentor',
    label: '런던 한인멘토',
    relation: '현지 유학생회 선배',
    group: 'mentor',
    x: 18,
    y: 78,
    color: 'bg-purple-600',
    icon: '👩‍🏫',
    phone: '+44 7800 654321',
    timezone: 'UK (GMT)',
    status: '온라인 소통 가능',
    closeness: 85,
    note: '영국 마트 할인 시간대와 자취 생활 팁을 알려주는 고마운 선배.'
  }
];

export const INITIAL_CHAT_HISTORIES = {
  mom: [
    { id: 'm1', sender: 'them', text: '아들~ 오늘 런던 날씨가 많이 흐리다던데 감기 조심하고 밥은 꼭 챙겨 먹었니?', time: '오후 5:10 (KST)' },
    { id: 'm2', sender: 'me', text: '네 어머니! HomePlate에 올려주신 Tesco 삼겹살 김치찜 레시피대로 끓였는데 진짜 맛있어요 🍲', time: '오전 8:12 (UK)' },
    { id: 'm3', sender: 'them', text: '기특하네! 양파 바닥에 깔고 된장 반 스푼 넣었지? 수업 끝나고 편할 때 무료 통화하자~', time: '오후 5:14 (KST)' }
  ],
  dad: [
    { id: 'd1', sender: 'them', text: '내일부터 파이 해커톤 시작이라지? HomePlate 프로젝트 화이팅이다!', time: '오후 7:30 (KST)' },
    { id: 'd2', sender: 'me', text: '감사해요 아버지! 이번 주말 골든타임에 영상통화로 시연 화면 보여드릴게요!', time: '오전 10:32 (UK)' }
  ],
  bro: [
    { id: 'b1', sender: 'them', text: '형! 형이 HomePlate에 올린 10분 김치참치 마요 덮밥 레시피 보고 따라 해 먹었는데 완전 꿀맛ㅋㅋ', time: '오후 8:05 (KST)' },
    { id: 'b2', sender: 'me', text: '오 잘했네ㅋㅋ 설탕 반 스푼 넣는 거 잊지 마라!', time: '오전 11:06 (UK)' }
  ],
  james: [
    { id: 'j1', sender: 'them', text: 'Hey Yong! Are we meeting at the library at 3 PM for the AI algorithm assignment?', time: '10:00 AM (UK)' },
    { id: 'j2', sender: 'me', text: 'Yes! Right after my CS302 lecture. I will bring some Korean snacks.', time: '10:05 AM (UK)' }
  ],
  mentor: [
    { id: 'mt1', sender: 'them', text: 'Yong님, 오늘 저녁 7시 이후에 Sainsbury’s 정육 코너 노란 딱지 할인 많이 붙어요!', time: '어제 (UK)' },
    { id: 'mt2', sender: 'me', text: '꿀팁 감사합니다 선배님! 이따 저녁 재료 사러 들러야겠어요.', time: '어제 (UK)' }
  ]
};

export const INITIAL_PINNED_WIDGETS = [
  { id: 'mini_profile', title: '📇 내 주소록(연락처) & 빠른 소통', desc: '연락처를 눌러 가족·친구와 즉시 채팅/통화 연결', enabled: true },
  { id: 'mini_quests', title: '⚡ 오늘의 필수 AI 퀘스트', desc: '설거지·청소·안부전화 미루지 않고 클리어', enabled: true },
  { id: 'mini_recipes', title: '🍲 구독 레시피 & 실시간 인기 키워드', desc: '자취생·가족 상호작용 레시피 콘텐츠 피드', enabled: true },
  { id: 'mini_calendar', title: '🗓️ 영국/한국 기념일 & 공유 시간표', desc: '현지 문화 설명 카드와 내 수업 시간표', enabled: true },
  { id: 'mini_analytics', title: '🔒 온디바이스 대화 패턴 요약', desc: '외부 유출 0 Byte 로컬 AI 키워드 리포트', enabled: true }
];

export const INITIAL_QUESTS = [
  { id: 'q1', title: '설거지 및 싱크대 물기 정리하기', category: '생활', xp: 50, piReward: 0.5, completed: false, streak: 5, timeEstimate: '10분', aiTip: '식사 직후 따뜻한 물로 바로 헹구면 세제 사용량을 40% 줄일 수 있어요!' },
  { id: 'q2', title: '방 청소 및 창문 열고 10분 환기하기', category: '생활', xp: 80, piReward: 0.8, completed: true, streak: 12, timeEstimate: '10분', aiTip: '런던의 흐린 날에도 하루 10분 환기는 실내 CO2 농도를 낮춰 집중력을 높여줍니다.' },
  { id: 'q3', title: '본가에 안부 전화 또는 짧은 메시지 남기기', category: '소통', xp: 120, piReward: 1.5, completed: false, streak: 8, timeEstimate: '5분', aiTip: '현재 한국은 저녁 시간대입니다! 주소록에서 어머니를 눌러 안부를 전해보세요.' },
  { id: 'q4', title: '전공 알고리즘 과제 제출 및 깃허브 커밋', category: '학업', xp: 200, piReward: 2.0, completed: false, streak: 3, timeEstimate: '45분', aiTip: '마감 3시간 전 제출 시 보너스 성실도 +20 XP가 추가 지급됩니다.' }
];

export const INITIAL_RECIPES = [
  {
    id: 'r1',
    name: '영국 마트(Tesco) 삼겹살 김치찜',
    author: '파주어머니 (가족 공식 멘토)',
    authorRole: '가족 멘토',
    tags: ['#엄마손맛', '#영국마트재료', '#집밥그리울때'],
    time: '35분',
    difficulty: '중급',
    likes: 1280,
    subscribers: 450,
    isSubscribed: true,
    coverIcon: '🍲',
    type: 'family',
    desc: 'Tesco나 Sainsbury’s의 Pork Belly Slices를 활용해 한국 본가 김치찜 맛을 그대로 재현하는 어머니의 비법 레시피입니다.',
    ukMartTip: 'Tesco에서 "Pork Belly Slices"를 고르면 한국 삼겹살과 식감이 가장 비슷해요.',
    familyTip: '어머니 음성 팁: "영국 양파는 수분이 많으니 냄비 바닥에 양파를 두껍게 깔고 고기를 올리렴. 된장 반 스푼을 풀면 잡내가 싹 사라진다!"',
    steps: [
      '냄비 바닥에 영국산 양파 1개를 두껍게 썰어 깔아줍니다.',
      '신김치 반 포기와 Pork Belly(삼겹살) 300g을 켜켜이 쌓아 올립니다.',
      '물 2컵, 고춧가루 2큰술, 다진마늘 1큰술, 된장 0.5큰술을 넣고 중약불에서 25분간 푹 끓입니다.'
    ],
    comments: [
      { id: 'cm1', user: 'Yong (영국 유학생)', text: '어머니 레시피대로 양파 깔고 했더니 기숙사 친구들이 다 맛있대요!' },
      { id: 'cm2', user: '동생 (서울 자취생)', text: '나도 오늘 저녁에 이거 따라 해봐야겠다 ㅎㅎ' }
    ]
  },
  {
    id: 'r2',
    name: '10분 김치참치 마요 덮밥',
    author: '런던자취왕 (유학생 크리에이터)',
    authorRole: '유학생 크리에이터',
    tags: ['#초간단', '#자취필수', '#10분컷'],
    time: '10분',
    difficulty: '초급',
    likes: 942,
    subscribers: 310,
    isSubscribed: false,
    coverIcon: '🍚',
    type: 'creator',
    desc: '과제 마감 직전 10분 만에 든든하게 챙겨 먹을 수 있는 유학생 부동의 1위 소울푸드 덮밥입니다.',
    ukMartTip: 'Tesco 통조림 참치(Sunflower Oil)와 한인마트 숙성 김치 반 컵이면 충분해요!',
    familyTip: '어머니 조언: "김치를 볶을 때 설탕 반 스푼을 먼저 넣어야 신맛이 잡히고 감칠맛이 살아난단다."',
    steps: [
      '팬에 참기름 1큰술을 두르고 잘게 썬 김치와 설탕 0.5큰술을 볶습니다.',
      '기름기를 뺀 참치 1캔을 넣고 중불에서 2분간 함께 볶아줍니다.',
      '따뜻한 밥 위에 볶은 김치참치를 올리고 마요네즈와 김가루를 듬뿍 뿌려 완성!'
    ],
    comments: [
      { id: 'cm3', user: '맨체스터공대생', text: '설탕 반 스푼 팁 진짜 신의 한 수네요!' }
    ]
  },
  {
    id: 'r3',
    name: '전자레인지 3분 폭탄 계란찜',
    author: '맨체스터공대생 (유학생 크리에이터)',
    authorRole: '유학생 크리에이터',
    tags: ['#설거지제로', '#아침식사', '#단백질'],
    time: '5분',
    difficulty: '초급',
    likes: 615,
    subscribers: 195,
    isSubscribed: true,
    coverIcon: '🥚',
    type: 'creator',
    desc: '냄비 태울 걱정 없이 머그컵 하나로 끝내는 초간단 부들부들 계란찜입니다.',
    ukMartTip: 'Aldi Free-range 계란 3알 + 치킨스톡 1/4조각을 활용해보세요.',
    familyTip: '아버지 조언: "계란과 물 비율을 1:1로 맞추고 마지막에 참기름 한 방울 떨어뜨리면 식당 맛 그대로다!"',
    steps: [
      '전자레인지용 깊은 머그컵에 계란 3개를 곱게 풀어줍니다.',
      '물 150ml와 소금 반 티스푼을 넣고 섞은 뒤 랩을 씌워 포크로 구멍 3개를 뚫습니다.',
      '전자레인지(800W 기준)에 3분 30초 돌리면 완성!'
    ],
    comments: []
  }
];

export const POPULAR_RECIPE_KEYWORDS = [
  { rank: 1, keyword: '#영국마트삼겹살김치찜', status: 'HOT', change: '+18.4%' },
  { rank: 2, keyword: '#10분김치참치마요', status: 'UP', change: '+12.1%' },
  { rank: 3, keyword: '#전자레인지계란찜', status: 'UP', change: '+9.5%' },
  { rank: 4, keyword: '#기숙사원팬파스타', status: 'NEW', change: '+6.2%' },
  { rank: 5, keyword: '#엄마표된장찌개비법', status: 'HOT', change: '+24.8%' }
];

export const CULTURAL_CALENDAR_EVENTS = [
  {
    id: 'c1',
    date: '11월 5일',
    country: 'UK',
    flag: '🇬🇧',
    title: 'Guy Fawkes Night (가이 포크스 데이 / 본파이어 나이트)',
    shortDesc: '영국 전역에서 모닥불을 피우고 불꽃놀이를 즐기는 전통 기념일',
    familyCard: {
      headline: '부모님을 위한 영국 문화 한 조각 🇬🇧',
      explanation: '1605년 영국 의사당 폭파 미수 사건을 기념하며 매년 11월 5일 밤 영국 전역에서 화려한 불꽃놀이(Fireworks)와 모닥불을 피우는 날이에요. 밤늦게 기숙사 밖에서 폭죽 소리가 들릴 수 있답니다!',
      conversationStarter: '"오늘 영국은 가이 포크스 데이라 밤에 불꽃놀이 많이 한다던데, 기숙사 창문으로 구경했니?"'
    }
  },
  {
    id: 'c2',
    date: '11월 19일',
    country: 'GLOBAL',
    flag: '🚀',
    title: '2026 Pi Hackathon 공식 개막 & HomePlate 출품 주간',
    shortDesc: '유학생 맞춤형 소통/퀘스트/레시피 플랫폼 HomePlate 개발 집중 주간',
    familyCard: {
      headline: '자녀의 중요 일정 알림 💻',
      explanation: '내일부터 그동안 준비해온 파이 해커톤이 본격적으로 진행되는 날입니다! 따뜻한 응원 메시지를 남겨주시면 큰 힘이 됩니다.',
      conversationStarter: '"드디어 내일부터 파이 해커톤 시작이네! 밥 꼭 챙겨 먹고 HomePlate 준비한 대로 멋지게 화이팅해라!"'
    }
  },
  {
    id: 'c3',
    date: '11월 22일',
    country: 'KR',
    flag: '🇰🇷',
    title: '소설 (小雪) & 한국 본가 김장 시즌',
    shortDesc: '살얼음이 얼기 시작하는 절기이자 본가 김장 주간',
    familyCard: {
      headline: '유학생을 위한 한국 본가 소식 🇰🇷',
      explanation: '한국은 첫눈이 내린다는 절기인 소설을 맞아 날씨가 부쩍 추워졌고, 본가에서는 김장 준비가 한창인 시기입니다.',
      conversationStarter: '"어머니, 한국 날씨가 많이 추워졌다는데 김장하시느라 허리 안 아프세요? 저도 여기서 김치찜 해 먹었어요!"'
    }
  },
  {
    id: 'c4',
    date: '11월 30일',
    country: 'UK',
    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    title: "St. Andrew's Day (세인트 앤드류스 데이 - Bank Holiday)",
    shortDesc: '스코틀랜드 수호성인 기념일 및 공식 뱅크 홀리데이',
    familyCard: {
      headline: '부모님을 위한 영국 휴일 안내 🇬🇧',
      explanation: '영국(특히 스코틀랜드 지역)의 공식 휴일(Bank Holiday)이자 전통 무용과 축제가 열리는 날입니다. 일부 은행이나 관공서가 쉬는 날이에요.',
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

export const INITIAL_LOCAL_KEYWORDS = [
  { word: '집밥 & 김치찜 레시피', count: 42, trend: '+28%', category: '요리/생활' },
  { word: '해커톤 & 전공 과제 응원', count: 35, trend: '+45%', category: '학업/격려' },
  { word: '런던 날씨 & 감기 조심', count: 29, trend: '+12%', category: '건강/안부' },
  { word: '수업 시간표 & 시차 확인', count: 24, trend: '+19%', category: '소통/배려' },
  { word: '비타민 & 영양제 챙겨먹기', count: 18, trend: '+8%', category: '건강/안부' }
];

export const INITIAL_PI_TRANSACTIONS = [
  { id: 'tx-101', txid: '0x8f4d2c9a...71e3b904', type: 'A2U', title: 'HomePlate 주간 생활 퀘스트 보상 수령', amount: 3.5, counterparty: 'HomePlate Reward Pool', timestamp: '오늘 14:20', status: 'CONFIRMED' },
  { id: 'tx-102', txid: '0x3a91e7b0...44c12d8f', type: 'U2A', title: '어머니표 삼겹살 김치찜 레시피 후원', amount: -0.5, counterparty: '@paju_mom_mentor', timestamp: '어제 21:15', status: 'CONFIRMED' }
];
