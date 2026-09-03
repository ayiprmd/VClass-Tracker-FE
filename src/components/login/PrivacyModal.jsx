import React, { useState } from 'react';
import Icon from '../common/Icon';

export default function PrivacyModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300">
        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm mx-auto">
          <Icon name="lock" size={24} filled />
        </div>
        <h2 className="text-xl font-bold text-slate-900 text-center mb-4">PRIVASI AKUN VCLASS</h2>
        <p className="text-sm text-slate-600 leading-relaxed text-center mb-8">
          PRIVASI AKUN VCLASS anda terjamin karena tidak tersimpan pada website ini. 
          Website ini tidak memiliki database untuk menyimpan akun vclass anda. 
          Akun akan di teruskan ke portal VClass Gunadarma langsung.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all"
        >
          Saya Mengerti
        </button>
      </div>
    </div>
  );
}
