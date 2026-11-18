import { BookOpen, Moon, BellOff, Utensils } from 'lucide-react';

export const THEMES = {
  white: {
    id: 'white',
    name: '화이트',
    bg: 'bg-slate-50',
    text: 'text-slate-900',
    subtext: 'text-slate-500',
    card: 'bg-white border-slate-200/80 shadow-sm',
    cardHover: 'hover:border-indigo-300 hover:shadow-md',
    header: 'bg-white/85 border-slate-200/80 backdrop-blur-xl',
    accent: 'bg-indigo-600 text-white',
    accentSoft: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    accentText: 'text-indigo-600',
    input: 'bg-slate-100 border-slate-200 text-slate-900',
    badge: 'bg-slate-100 text-slate-700'
  },
  dark: {
    id: 'dark',
    name: '다크',
    bg: 'bg-slate-950',
    text: 'text-slate-100',
    subtext: 'text-slate-400',
    card: 'bg-slate-900/90 border-slate-800 shadow-xl',
    cardHover: 'hover:border-violet-500/50',
    header: 'bg-slate-900/80 border-slate-800 backdrop-blur-xl',
    accent: 'bg-violet-600 text-white',
    accentSoft: 'bg-violet-950/80 text-violet-300 border-violet-800/60',
    accentText: 'text-violet-400',
    input: 'bg-slate-800/90 border-slate-700 text-slate-100',
    badge: 'bg-slate-800 text-slate-300'
  },
  warm: {
    id: 'warm',
    name: '웜톤',
    bg: 'bg-[#FDF8F3]',
    text: 'text-[#3D2C24]',
    subtext: 'text-[#8C6D5D]',
    card: 'bg-[#FFFDF9] border-[#EFE3D5] shadow-sm',
    cardHover: 'hover:border-amber-400 hover:shadow-md',
    header: 'bg-[#FFFDF9]/90 border-[#EFE3D5] backdrop-blur-xl',
    accent: 'bg-[#D96B43] text-white',
    accentSoft: 'bg-[#FCEEE7] text-[#B8502B] border-[#F5D3C4]',
    accentText: 'text-[#D96B43]',
    input: 'bg-[#F7EFE6] border-[#E6D5C3] text-[#3D2C24]',
    badge: 'bg-[#F5EBE1] text-[#6E5041]'
  },
  cool: {
    id: 'cool',
    name: '쿨톤',
    bg: 'bg-[#F0F7FF]',
    text: 'text-[#0F2942]',
    subtext: 'text-[#527394]',
    card: 'bg-white/95 border-[#D6E8FA] shadow-sm',
    cardHover: 'hover:border-sky-400 hover:shadow-md',
    header: 'bg-white/85 border-[#D6E8FA] backdrop-blur-xl',
    accent: 'bg-[#0284C7] text-white',
    accentSoft: 'bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]',
    accentText: 'text-[#0284C7]',
    input: 'bg-[#E6F2FF] border-[#C7E0FA] text-[#0F2942]',
    badge: 'bg-[#E6F2FF] text-[#1E4E79]'
  },
  custom: {
    id: 'custom',
    name: '사용자맞춤형',
    bg: 'bg-gradient-to-br from-indigo-950 via-purple-900 to-rose-900',
    text: 'text-white',
    subtext: 'text-purple-200/80',
    card: 'bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl',
    cardHover: 'hover:border-pink-400/60',
    header: 'bg-black/25 border-white/15 backdrop-blur-2xl',
    accent: 'bg-gradient-to-r from-pink-500 to-amber-500 text-white',
    accentSoft: 'bg-white/15 text-amber-200 border-white/20',
    accentText: 'text-amber-300',
    input: 'bg-white/10 border-white/20 text-white placeholder-purple-200/60',
    badge: 'bg-white/15 text-white'
  }
};

export const CUSTOM_AURA_PRESETS = [
  { id: 'aurora', name: '런던 오로라 나이트', gradient: 'from-indigo-950 via-purple-900 to-rose-900' },
  { id: 'sunset', name: '템즈강 선셋 글로우', gradient: 'from-slate-900 via-rose-950 to-amber-900' },
  { id: 'forest', name: '옥스퍼드 라이브러리', gradient: 'from-emerald-950 via-teal-900 to-slate-900' },
  { id: 'cafe', name: '코지 런던 카페', gradient: 'from-stone-900 via-amber-950 to-rose-950' }
];

export const STUDENT_STATUS_MODES = [
  {
    id: 'lecture',
    label: '수업 중',
    icon: BookOpen,
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
    dot: 'bg-amber-500',
    autoMessage: '현재 수업 중입니다. 급한 용건이 아니면 나중에 전화 달라는 메시지를 남겨주세요.'
  },
  {
    id: 'sleeping',
    label: '수면 모드',
    icon: Moon,
    color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
    dot: 'bg-indigo-500',
    autoMessage: '영국은 지금 늦은 밤/새벽 수면 시간입니다. 기상 후 바로 연락드릴게요!'
  },
  {
    id: 'dnd',
    label: '방해 금지',
    icon: BellOff,
    color: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
    dot: 'bg-rose-500',
    autoMessage: '현재 파이 해커톤 및 중요 과제 집중 시간입니다. 안심 메시지를 남겨주세요!'
  },
  {
    id: 'available',
    label: '소통 가능',
    icon: Utensils,
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
    dot: 'bg-emerald-500',
    autoMessage: '지금 기숙사에서 요리 및 휴식 중이에요! 편하게 영상/음성 통화 주세요.'
  }
];
