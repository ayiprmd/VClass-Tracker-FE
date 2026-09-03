import React from 'react';

/**
 * TabToggle component for switching between Active, Completed, and Archived courses
 * @param {'active' | 'completed' | 'archived'} activeTab
 * @param {function} onTabChange
 */
export default function TabToggle({ activeTab = 'active', onTabChange }) {
  const tabs = [
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'archived', label: 'Archived' }
  ];

  return (
    <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-full shadow-2xs border border-slate-200/60">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange?.(tab.id)}
            className={`font-label-sm text-label-sm px-5 py-2 rounded-full transition-all duration-200 cursor-pointer font-semibold ${
              isActive
                ? 'bg-primary text-white shadow-sm scale-102'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
