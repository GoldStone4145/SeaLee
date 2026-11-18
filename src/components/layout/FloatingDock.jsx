import React from 'react';
import { Home, Wallet, Award, ChefHat, Phone, Calendar as CalendarIcon } from 'lucide-react';

export default function FloatingDock({ theme, t, activeAppView, setActiveAppView }) {
  const dockItems = [
    { id: 'home', label: t.dockHome, icon: Home },
    { id: 'wallet', label: t.dockWallet, icon: Wallet },
    { id: 'quests', label: t.dockQuests, icon: Award },
    { id: 'recipes', label: t.dockRecipes, icon: ChefHat },
    { id: 'calls', label: t.dockCalls, icon: Phone },
    { id: 'calendar', label: t.dockCalendar, icon: CalendarIcon }
  ];

  return (
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-md">
      <div className={`px-2.5 py-2 rounded-2xl border shadow-2xl ${theme.header} flex items-center justify-around`}>
        {dockItems.map((item) => {
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

