import React from 'react';
import Icon from '../common/Icon';
import MockupTaskItem from './MockupTaskItem';
import FloatingWidget from './FloatingWidget';
import { useAuth } from '../../context/AuthContext';
import { heroMockupTasks } from '../../data dummy/deadlines';

export default function MacOSMockup() {
  const { deadlines } = useAuth();

  // If we have active deadlines, map them to the mockup, otherwise fallback to default mock tasks
  const hasRealDeadlines = Array.isArray(deadlines) && deadlines.length > 0;
  const displayTasks = hasRealDeadlines
    ? deadlines.slice(0, 3).map(task => ({
        id: task.id,
        type: task.type,
        course: task.title, // Use title for richer visual representation of actual task
        timeBadge: task.time_left,
        urgency: task.urgency === 'expired' ? 'urgent' : task.urgency // normalize expired to urgent for view
      }))
    : heroMockupTasks;

  return (
    <div className="flex-1 relative w-full perspective-1000">
      <div className="relative transform md:-rotate-y-6 md:rotate-x-2 shadow-2xl rounded-2xl bg-white border border-slate-200/80 overflow-hidden transition-all duration-500 hover:rotate-0 hover:shadow-2xl">
        {/* macOS Window Header */}
        <div className="h-10 bg-slate-100/90 backdrop-blur-md flex items-center px-4 gap-2 border-b border-slate-200/70">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
          <span className="text-[11px] text-slate-400 ml-2 font-mono">vclass-tracker.local</span>
        </div>

        {/* Mockup Content */}
        <div className="p-6 bg-white flex flex-col gap-3">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-card-title font-card-title text-slate-800 font-bold">
              Prioritas Hari Ini
            </h3>
            <span className="text-slate-400 hover:text-slate-600 cursor-pointer">
              <Icon name="filter_list" size={20} />
            </span>
          </div>

          {displayTasks.map((task) => (
            <MockupTaskItem
              key={task.id}
              type={task.type}
              course={task.course}
              timeBadge={task.timeBadge}
              urgency={task.urgency}
            />
          ))}
        </div>
      </div>

      {/* Floating Widget badge */}
      <FloatingWidget />
    </div>
  );
}
