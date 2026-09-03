import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../common/Icon';

export default function CourseCard({ course }) {
  const navigate = useNavigate();
  const themeStyles = {
    primary: {
      progressColor: 'primary',
      percentText: 'text-primary'
    },
    secondary: {
      progressColor: 'secondary',
      percentText: 'text-secondary'
    },
    tertiary: {
      progressColor: 'tertiary',
      percentText: 'text-tertiary'
    },
    slate: {
      progressColor: 'slate',
      percentText: 'text-slate-700'
    }
  };

  const theme = themeStyles[course.themeColor] || themeStyles.primary;

  return (
    <div 
      className="group relative bg-white rounded-2xl p-4 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-start gap-3 overflow-hidden cursor-pointer border border-slate-200/80 hover:-translate-y-1 min-h-[160px]" 
      onClick={() => navigate(`/courses/${course.id}`)}
    >
      {/* Background Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Content Section */}
      <div className="relative z-10 flex-1">
        <h2 className="font-section-header text-section-header text-slate-900 font-bold mb-1 group-hover:text-primary transition-colors line-clamp-1">
          {course.name}
        </h2>
        <p className="font-body text-body text-slate-500 text-sm mb-3">
          {course.instructor}
        </p>

        {course.activeDeadlines > 0 ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 font-bold text-[10px] border border-red-200/50 shadow-2xs w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>{course.activeDeadlines} Deadline Aktif</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-500 font-medium text-[10px] w-fit">
            0 Deadline Aktif
          </span>
        )}
      </div>

      {/* Footer Section */}
      <div className="relative z-10 pt-3 border-t border-slate-100 flex justify-between items-center text-caption font-caption text-slate-400">
        <span className="text-[11px]">Diperbarui {course.lastUpdated}</span>
        <span className="text-slate-400 group-hover:text-primary transition-colors transform group-hover:translate-x-1 duration-300">
          <Icon name="arrow_forward" size={18} />
        </span>
      </div>
      </div>
  );
}
