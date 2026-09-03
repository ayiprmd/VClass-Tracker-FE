import React from 'react';
import Icon from '../common/Icon';

export default function MateriCard({ materi }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-xs hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-slate-200/80 flex items-center justify-between">
      {/* Left: Info */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
          <Icon name="description" size={24} className="text-slate-600" />
        </div>
        <div className="min-w-0">
          <h4 className="text-label-sm font-label-sm text-slate-900 font-bold mb-1 truncate">
            {materi.title}
          </h4>
          <p className="text-caption font-caption text-slate-500 truncate">
            {materi.course} {materi.courseCode ? `(${materi.courseCode})` : ''}
          </p>
        </div>
      </div>

      {/* Right: Action Button */}
      <a
        href={materi.vclassUrl || 'https://v-class.gunadarma.ac.id'}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-600 hover:text-white text-slate-700 text-label-sm font-semibold transition-all duration-200 flex items-center gap-1.5 shrink-0 shadow-2xs hover:scale-105 active:scale-95"
      >
        <span>Buka</span>
        <Icon name="arrow_forward" size={16} />
      </a>
    </div>
  );
}
