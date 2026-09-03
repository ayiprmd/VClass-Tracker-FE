import React from 'react';
import Icon from '../common/Icon';

export default function ArchiveListItem({ item }) {
  const typeBadgeStyles = {
    'Tugas Kelompok': 'bg-purple-50 text-purple-700',
    'Kuis': 'bg-blue-50 text-primary',
    'Tugas Individu': 'bg-slate-100 text-slate-700',
    'Praktikum': 'bg-emerald-50 text-emerald-700',
    'Makalah': 'bg-purple-50 text-purple-700'
  };

  const typeDots = {
    'Tugas Kelompok': 'bg-purple-600',
    'Kuis': 'bg-primary',
    'Tugas Individu': 'bg-slate-500',
    'Praktikum': 'bg-emerald-600',
    'Makalah': 'bg-purple-600'
  };

  return (
    <div className="group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-2xl shadow-2xs hover:shadow-lg transition-all duration-200 items-center border border-slate-200/70 border-l-4 border-l-emerald-500 hover:border-l-emerald-600 hover:-translate-y-0.5">
      {/* Col 1: Title & Category */}
      <div className="col-span-1 md:col-span-6 lg:col-span-5 flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${typeDots[item.type] || 'bg-slate-500'}`} />
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${typeBadgeStyles[item.type] || 'bg-slate-100 text-slate-700'} truncate`}>
            {item.type}
          </span>
        </div>
        <h3 className="text-card-title font-card-title text-slate-900 line-clamp-1 group-hover:text-primary transition-colors font-bold">
          {item.title}
        </h3>
      </div>

      {/* Col 2: Course & Code */}
      <div className="col-span-1 md:col-span-3 lg:col-span-3 flex flex-col gap-0.5 min-w-0">
        <span className="md:hidden text-[11px] uppercase tracking-wider font-bold text-slate-400">Mata Kuliah</span>
        <span className="text-body font-body text-slate-800 font-medium truncate text-sm">
          {item.course}
        </span>
        <span className="text-caption font-caption text-slate-400 truncate">
          {item.courseCode}
        </span>
      </div>

      {/* Col 3: Completed Date & Time */}
      <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col gap-0.5 min-w-0">
        <span className="md:hidden text-[11px] uppercase tracking-wider font-bold text-slate-400">Diselesaikan</span>
        <span className="text-body font-body text-slate-800 font-medium truncate text-sm">
          {item.completedDate}
        </span>
        <span className="text-caption font-caption text-slate-400 truncate">
          {item.completedTime}
        </span>
      </div>

      {/* Col 4: Status Pill */}
      <div className="col-span-1 md:col-span-1 lg:col-span-2 flex justify-start md:justify-end items-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200/50 shadow-2xs">
          <Icon name="check_circle" size={16} filled className="text-emerald-600" />
          <span className="text-label-sm font-bold text-emerald-700">
            {item.status || 'Selesai'}
          </span>
        </div>
      </div>
    </div>
  );
}
