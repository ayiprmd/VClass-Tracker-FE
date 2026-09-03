import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import { useAuth } from '../../context/AuthContext';

export default function CTABanner() {
  const { isGuest } = useAuth();

  // Hanya tampil untuk guest; hilang setelah login VClass
  if (!isGuest) return null;

  return (
    <section className="w-full py-16 md:py-24 bg-surface">
      <div className="max-w-5xl mx-auto px-margin-mobile lg:px-margin-desktop">
        <div className="bg-primary relative overflow-hidden rounded-3xl shadow-xl py-16 px-8 md:px-16 text-center text-white">
          {/* Decorative glow background blobs */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <h2 className="text-headline-lg font-headline-lg text-white mb-4 max-w-2xl mx-auto font-bold tracking-tight">
              Siap melihat semua deadline tugas VClass kamu dalam satu tempat?
            </h2>
            <p className="text-body font-body text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Hubungkan akun V - Class kamu sekarang untuk mulai sinkronisasi jadwal kuis dan forum secara otomatis.
            </p>
            <div className="flex justify-center">
              <Link
                to="/login"
                className="bg-white text-primary font-bold px-8 py-4 rounded-full hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2.5 text-label-sm"
              >
                <Icon name="login" size={20} />
                <span>Masuk dengan Akun VClass</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
