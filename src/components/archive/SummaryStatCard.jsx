import React from 'react';

/**
 * SummaryStatCard for Archive page
 * @param {'total' | 'rate' | 'quote'} type
 * @param {number|string} value
 * @param {string} label
 */
export default function SummaryStatCard({ type = 'total', value, label }) {
  if (type === 'quote') {
    return (
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 shadow-xs relative overflow-hidden group hover:shadow-md transition-all flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-3">
          <p className="text-label-sm font-label-sm text-slate-500 uppercase tracking-wider font-bold">
            Julukan Anda
          </p>
          <p className="text-xl font-bold text-slate-800">
            "{value.main}"
          </p>
          <span className="text-sm text-slate-500 block">
            {value.sub}
          </span>
        </div>
      </div>
    );
  }

  if (type === 'rate') {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs relative overflow-hidden group hover:shadow-md transition-all flex items-center gap-6">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
            <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="text-primary transition-all duration-1000 ease-out" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-primary text-sm">
            {value}%
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-label-sm font-label-sm text-slate-500 uppercase tracking-wider font-bold">
            Tingkat Penyelesaian
          </span>
          <span className="text-display font-display font-extrabold text-slate-900 leading-none">
            {value}%
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs relative overflow-hidden group hover:shadow-md transition-all">
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
      <div className="flex flex-col gap-2 relative z-10">
        <span className="text-label-sm font-label-sm text-slate-500 uppercase tracking-wider font-bold">
          Total Completed
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-display font-display font-extrabold text-primary leading-none">
            {value || '142'}
          </span>
          <span className="text-caption font-caption text-slate-400 font-medium">tugas</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-3">
          <div className="h-full bg-primary w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
