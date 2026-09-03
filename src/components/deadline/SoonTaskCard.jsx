import React, { useState, useEffect } from 'react';
import { calculateTimeLeft } from '../../utils/timeUtils';

export default function SoonTaskCard({ task }) {
  const [timeLeft, setTimeLeft] = useState(task.timeLeft);
  
  const categoryDots = {
    Kuis: 'bg-purple-600',
    Forum: 'bg-blue-600',
    Materi: 'bg-emerald-600'
  };

  useEffect(() => {
    const updateTime = () => {
      const { text } = calculateTimeLeft(task.deadlineIso);
      setTimeLeft(text);
    };

    updateTime();
    const interval = setInterval(updateTime, 3600000);
    return () => clearInterval(interval);
  }, [task.deadlineIso]);

  return (
    <div className="relative group bg-white rounded-2xl p-5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-slate-200/80 hover:-translate-y-1 overflow-hidden">
      {/* Amber left indicator */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-500" />

      <div>
        {/* Header: Time pill & Category dot */}
        <div className="flex justify-between items-start mb-3 pl-1">
          <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200/60">
            {timeLeft}
          </span>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${categoryDots[task.type] || 'bg-amber-500'}`} />
            <span className="text-[10px] uppercase font-bold text-slate-400">
              {task.type}
            </span>
          </div>
        </div>

        {/* Title & Subject */}
        <div className="pl-1 mb-4">
          <h4 className="text-label-sm font-label-sm text-slate-900 font-bold mb-1.5 group-hover:text-primary transition-colors line-clamp-2 min-h-[38px]">
            {task.title}
          </h4>
          <p className="text-caption font-caption text-slate-500 line-clamp-1">
            {task.course}
          </p>
        </div>
      </div>
    </div>
  );
}
