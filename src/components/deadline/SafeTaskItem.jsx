import React from 'react';

export default function SafeTaskItem({ task }) {
  return (
    <div className="bg-white hover:bg-slate-50 p-4 rounded-xl flex items-center justify-between gap-4 transition-all duration-200 cursor-pointer group shadow-2xs border border-slate-200/70 hover:border-emerald-300/80 hover:shadow-sm">
      <div className="w-1 h-8 bg-emerald-500 rounded-full shrink-0 group-hover:scale-y-110 transition-transform" />
      
      <div className="flex-1 min-w-0">
        <h4 className="text-label-sm font-label-sm text-slate-800 font-semibold truncate group-hover:text-primary transition-colors">
          {task.title}
        </h4>
        <p className="text-caption font-caption text-slate-500 truncate">
          {task.course}
        </p>
      </div>

      <div className="text-right shrink-0">
        <span className="block text-label-sm font-bold text-emerald-600">
          {task.timeLeft}
        </span>
        <span className="text-[11px] text-slate-400 font-medium">
          {task.dateFormatted || task.deadline}
        </span>
      </div>
    </div>
  );
}
