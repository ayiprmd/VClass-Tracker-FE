import React from 'react';
import Icon from '../common/Icon';

/**
 * Top Alert Bar warning the student of imminent deadlines
 * @param {number} count
 * @param {function} onActionClick
 */
export default function AlertBar({ count = 3, onActionClick }) {
  return (
    <div className="w-full rounded-2xl bg-red-50/80 border border-red-200/70 p-4 sm:p-5 flex items-start sm:items-center gap-4 relative overflow-hidden group hover:bg-red-50 transition-colors shadow-xs">
      <div className="absolute -right-12 -top-12 w-32 h-32 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-colors" />

      {/* Warning Icon */}
      <div className="w-10 h-10 shrink-0 rounded-xl bg-red-100 flex items-center justify-center text-red-600 relative z-10 shadow-2xs">
        <Icon name="warning" size={22} filled />
      </div>

      {/* Text Info */}
      <div className="flex-1 relative z-10">
        <h2 className="text-card-title font-card-title text-red-950 font-bold">
          {count} Tugas Perlu Perhatian Segera
        </h2>
        <p className="text-body font-body text-red-800/80 text-sm mt-0.5">
          Disarankan untuk menyelesaikannya hari ini sebelum pukul 23:59 WIB.
        </p>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={onActionClick}
        className="hidden sm:inline-flex shrink-0 px-4 py-2.5 rounded-xl bg-red-600 text-white text-label-sm font-bold hover:bg-red-700 active:scale-95 transition-all relative z-10 shadow-sm"
      >
        Kerjakan Sekarang
      </button>
    </div>
  );
}
