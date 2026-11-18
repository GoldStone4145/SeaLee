import React from 'react';
import {
  Home,
  Users,
  MessageCircle,
  ChefHat,
  Award,
  Calendar as CalendarIcon,
  BarChart3
} from 'lucide-react';

export default function BottomNavDock({ theme, activeAppView, setActiveAppView }) {
  const navItems = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'profile', label: '주소록', icon: Users },
    { id: 'comm', label: '채팅·통화', icon: MessageCircle },
    { id: 'recipes', label: '레시피', icon: ChefHat },
    { id: 'quests', label: '퀘스트', icon: Award },
    { id: 'calendar', label: '캘린더', icon: CalendarIcon },
    { id: 'analytics', label: '대화분석', icon: BarChart3 }
  ];

  return (
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[96%] max-w-lg">
      <div className={`px-2 py-2 rounded-2xl border shadow-2xl ${theme.header} flex items-center justify-around`}>
        {navItems.map((item) => {
          const IconComp = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveAppView(item.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-[10px] font-bold transition ${
                activeAppView === item.id ? theme.accent : theme.subtext
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
