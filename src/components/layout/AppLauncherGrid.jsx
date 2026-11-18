import React from 'react';
import { LayoutGrid, Coins } from 'lucide-react';

export default function AppLauncherGrid({
  theme,
  t,
  piBalance,
  userLevel,
  launcherItems,
  setActiveAppView
}) {
  return (
    <section className={`p-4 rounded-3xl border ${theme.card}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <LayoutGrid className="w-4 h-4 text-amber-500" />
          <h2 className="font-extrabold text-sm">{t.launcherTitle}</h2>
          <span className={`text-[11px] ${theme.subtext}`}>{t.launcherSub}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-500">
          <Coins className="w-3.5 h-3.5" />
          <span>{piBalance} π</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${theme.badge}`}>Lv.{userLevel}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
        {launcherItems.map((app) => {
          const IconComponent = app.icon;
          return (
            <button
              key={app.id}
              onClick={() => setActiveAppView(app.id)}
              className={`group p-3 rounded-2xl border ${theme.card} ${theme.cardHover} flex flex-col items-center text-center transition-all hover:-translate-y-0.5 relative`}
            >
              <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border mb-2 ${app.lightBg}`}>
                {app.badge}
              </span>
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${app.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition mb-2`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-xs tracking-tight">{app.name}</span>
              <span className={`text-[10px] ${theme.subtext} mt-0.5 line-clamp-1`}>{app.sub}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
