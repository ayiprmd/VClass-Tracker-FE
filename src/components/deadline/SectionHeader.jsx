import React from 'react';
import Badge from '../common/Badge';

/**
 * Section header with colored indicator dot and task count badge
 * @param {string} title
 * @param {number} count
 * @param {'urgent' | 'soon' | 'safe'} urgency
 */
export default function SectionHeader({ title, count, urgency = 'urgent' }) {
  const dotColors = {
    urgent: 'bg-red-500 animate-pulse',
    soon: 'bg-amber-500',
    safe: 'bg-emerald-500'
  };

  const badgeVariants = {
    urgent: 'urgent',
    soon: 'soon',
    safe: 'safe'
  };

  return (
    <div className="flex items-center gap-3 mb-2">
      <div className={`w-3 h-3 rounded-full ${dotColors[urgency] || 'bg-primary'}`} />
      <h3 className="text-section-header font-section-header text-slate-800 font-bold">
        {title}
      </h3>
      {typeof count === 'number' && (
        <Badge variant={badgeVariants[urgency]} size="sm">
          {count} Tugas
        </Badge>
      )}
    </div>
  );
}
