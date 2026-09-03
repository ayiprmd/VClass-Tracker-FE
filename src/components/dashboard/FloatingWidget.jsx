import React from 'react';
import Icon from '../common/Icon';

export default function FloatingWidget() {
  return (
    <div
      className="absolute -bottom-6 left-2 sm:left-6 md:-left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/60 flex items-center gap-3 animate-bounce"
      style={{ animationDuration: '4s' }}
    >
      <div className="w-10 h-10 rounded-full bg-blue-50 text-primary flex items-center justify-center shadow-xs">
        <Icon name="trending_up" size={22} />
      </div>
      <div>
        <div className="text-card-title font-card-title text-slate-800 font-bold">
          Meningkatkan Produktivitas
        </div>
      </div>
    </div>
  );
}
