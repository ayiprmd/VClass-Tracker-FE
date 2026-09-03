import React from 'react';

export default function ArchiveListHeader() {
  return (
    <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 text-label-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200/80 mb-1">
      <div className="col-span-6 lg:col-span-5">Tugas / Penugasan</div>
      <div className="col-span-3 lg:col-span-3">Mata Kuliah</div>
      <div className="col-span-2 lg:col-span-2">Diselesaikan</div>
      <div className="col-span-1 lg:col-span-2 text-right">Status</div>
    </div>
  );
}
