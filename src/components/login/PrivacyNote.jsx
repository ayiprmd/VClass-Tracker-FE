import React from 'react';
import Icon from '../common/Icon';

export default function PrivacyNote() {
  return (
    <div className="bg-slate-50 rounded-2xl p-4 flex gap-3 items-start mt-2 border border-slate-200/60">
      <span className="text-emerald-600 mt-0.5 shrink-0">
        <Icon name="lock" size={20} filled />
      </span>
      <p className="text-caption font-caption text-slate-600 leading-relaxed text-[12px]">
        <strong className="text-slate-800 font-semibold">Privasi Terjamin:</strong> Kredensial kamu langsung diteruskan ke portal VClass tanpa disimpan secara permanen di database kami.
      </p>
    </div>
  );
}
