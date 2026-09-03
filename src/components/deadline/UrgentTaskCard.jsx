import React, { useState, useEffect } from 'react';
import Icon from '../common/Icon';
import { calculateTimeLeft } from '../../utils/timeUtils';

export default function UrgentTaskCard({ task }) {
  const [timeLeft, setTimeLeft] = useState(task.timeLeft);
  
  const categoryDots = {
    Kuis: 'bg-purple-600',
    Forum: 'bg-blue-600',
    Materi: 'bg-slate-500'
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
    <div className="relative group bg-white rounded-2xl p-5 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-slate-200/80 flex flex-col justify-between">
      {/* Accent left indicator */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500" />

      <div>
        {/* Card Header: Time Left & Category */}
        <div className="flex justify-between items-start mb-3 pl-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-[11px] font-bold flex items-center gap-1 border border-red-200/50">
              <Icon name="timer" size={14} className="text-red-500" />
              <span>{timeLeft}</span>
            </span>
            <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200/50">
              <span className={`w-1.5 h-1.5 rounded-full ${categoryDots[task.type] || 'bg-primary'}`} />
              <span className="text-caption font-caption text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                {task.type}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-lg hover:bg-slate-50"
            aria-label="Opsi lainnya"
          >
            <Icon name="more_horiz" size={20} />
          </button>
        </div>

        {/* Card Title & Course Name */}
        <div className="pl-1 mb-4">
          <h4 className="text-card-title font-card-title text-slate-900 font-bold mb-1 group-hover:text-primary transition-colors line-clamp-2">
            {task.title}
          </h4>
          <p className="text-body font-body text-slate-500 text-sm line-clamp-1">
            Mata Kuliah: {task.course} {task.courseCode ? `(${task.courseCode})` : ''}
          </p>
        </div>
      </div>

      {/* Card Footer: Status & Action */}
      <div className="flex justify-between items-center pt-2 pl-1 border-t border-slate-100 mt-auto">
        {task.collaborators && task.collaborators.length > 0 ? (
          <div className="flex items-center">
            <div className="flex -space-x-2 overflow-hidden">
              {task.collaborators.map((c, i) => (
                <img
                  key={i}
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover shadow-2xs"
                  src={c.avatar}
                  alt={c.name}
                  loading="lazy"
                />
              ))}
              {task.collaboratorsExtra > 0 && (
                <div className="h-7 w-7 rounded-full ring-2 ring-white bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-bold shadow-2xs">
                  +{task.collaboratorsExtra}
                </div>
              )}
            </div>
            <span className="text-[11px] text-slate-400 ml-2 font-medium">Mahasiswa aktif</span>
          </div>
        ) : (
          <span className="text-caption font-caption text-slate-500 font-medium">
            {task.statusText || 'Belum dimulai'}
          </span>
        )}

        <a
          href={task.vclassUrl || 'https://v-class.gunadarma.ac.id'}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-1.5 rounded-xl bg-slate-100 group-hover:bg-primary group-hover:text-white text-label-sm font-semibold text-slate-700 transition-all duration-200 flex items-center gap-1.5 shadow-2xs hover:scale-105 active:scale-95"
        >
          <span>{task.type === 'Kuis' ? 'Mulai Kuis' : 'Buka VClass'}</span>
          <Icon name="arrow_forward" size={16} />
        </a>
      </div>
    </div>
  );
}
