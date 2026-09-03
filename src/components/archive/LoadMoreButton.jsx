import React from 'react';
import Icon from '../common/Icon';

export default function LoadMoreButton({ onClick, hasMore = true }) {
  return (
    <div className="w-full flex justify-center mt-stack-sm">
      <button
        type="button"
        onClick={onClick}
        className="px-6 py-3 bg-slate-100/90 hover:bg-slate-200/90 rounded-full text-label-sm font-bold text-slate-700 hover:text-slate-900 transition-all flex items-center gap-2 group shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer border border-slate-200/60"
      >
        <span>Muat Arsip Tugas Terdahulu</span>
        <Icon
          name="arrow_downward"
          size={18}
          className="group-hover:translate-y-0.5 transition-transform duration-200 text-slate-500"
        />
      </button>
    </div>
  );
}
