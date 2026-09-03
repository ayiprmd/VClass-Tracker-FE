import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import Badge from '../common/Badge';

export default function DeadlinePreviewCard({ item }) {
  const urgencyBorder = {
    urgent: 'border-red-500',
    soon: 'border-amber-500',
    safe: 'border-emerald-500'
  };

  const badgeVariants = {
    urgent: 'urgent',
    soon: 'soon',
    safe: 'safe'
  };

  const typeDots = {
    Kuis: 'bg-purple-600',
    Forum: 'bg-blue-600',
    Materi: 'bg-slate-500'
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group border border-slate-100 hover:-translate-y-1">
      {/* Accent left line */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${urgencyBorder[item.urgency]}`} />

      {/* Header: Type & Time Badge */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${typeDots[item.type] || 'bg-primary'}`} />
          <span className="text-caption font-caption text-slate-500 uppercase tracking-wider font-semibold">
            {item.type}
          </span>
        </div>
        <Badge variant={badgeVariants[item.urgency]} size="pill">
          {item.timeLeft}
        </Badge>
      </div>

      {/* Course Title */}
      <h3 className="text-section-header font-section-header text-slate-800 mb-2 group-hover:text-primary transition-colors line-clamp-2 min-h-[56px]">
        {item.course}
      </h3>

      {/* Date info */}
      <div className="flex items-center text-caption font-caption text-slate-500 mb-6 gap-2">
        <Icon name="calendar_today" size={16} className="text-slate-400" />
        <span>{item.deadline}</span>
      </div>

      {/* Action button */}
      <Link
        to="/deadlines"
        className="w-full bg-slate-100 hover:bg-primary hover:text-white text-slate-700 text-label-sm font-semibold py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 group/btn"
      >
        <span>Kerjakan</span>
        <Icon name="arrow_forward" size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}
