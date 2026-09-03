import React from 'react';

/**
 * Task item row inside macOS Window Mockup
 * @param {'Kuis' | 'Forum' | 'Materi'} type
 * @param {string} course
 * @param {string} timeBadge
 * @param {'urgent' | 'soon' | 'safe'} urgency
 */
export default function MockupTaskItem({ type, course, timeBadge, urgency }) {
  const borderColors = {
    urgent: 'border-red-500',
    soon: 'border-amber-500',
    safe: 'border-emerald-500'
  };

  const badgeStyles = {
    urgent: 'bg-red-50 text-red-600',
    soon: 'bg-amber-50 text-amber-700',
    safe: 'bg-emerald-50 text-emerald-700'
  };

  const dotColors = {
    Kuis: 'bg-purple-600',
    Forum: 'bg-blue-600',
    Materi: 'bg-slate-500'
  };

  return (
    <div
      className={`bg-slate-50 hover:bg-slate-100/80 text-on-surface p-4 rounded-xl shadow-xs border-l-4 ${borderColors[urgency]} flex justify-between items-center transition-all`}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${dotColors[type] || 'bg-primary'}`} />
          <span className="text-caption font-caption text-slate-500 uppercase tracking-wider font-semibold">
            {type}
          </span>
        </div>
        <span className="text-body font-body font-medium text-slate-800 line-clamp-1">
          {course}
        </span>
      </div>
      <div
        className={`${badgeStyles[urgency]} text-caption font-caption px-3 py-1 rounded-full font-bold shadow-xs whitespace-nowrap`}
      >
        {timeBadge}
      </div>
    </div>
  );
}
