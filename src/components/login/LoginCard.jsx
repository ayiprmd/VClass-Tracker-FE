import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../common/Icon';
import { useAuth } from '../../context/AuthContext';

export default function LoginCard() {
  const [npm, setNpm] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { user, isGuest, loginAndSync, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const res = await loginAndSync(npm, password);

    setIsLoading(false);
    if (res.success) {
      navigate('/deadlines', { replace: true });
    } else {
      setErrorMessage(res.error || 'Terjadi kesalahan saat menghubungkan ke portal VClass.');
    }
  };

  const handleDemoSync = async () => {
    setNpm('demo');
    setPassword('password');
    setIsLoading(true);
    setErrorMessage('');
    const res = await loginAndSync('demo', 'password');
    setIsLoading(false);
    if (res.success) {
      navigate('/deadlines', { replace: true });
    }
  };

  const handleGuestPreview = () => {
    navigate('/deadlines');
  };

  // If already logged in, show active session card
  if (!isGuest && user) {
    return (
      <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-xl p-6 md:p-8 flex flex-col gap-4 relative z-10 border border-slate-100 text-center animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs border border-emerald-100">
          <Icon name="verified_user" size={32} />
        </div>

        <div>
          <h2 className="text-headline-lg-mobile font-bold text-slate-900">
            Sesi VClass Aktif
          </h2>
          <p className="text-sm font-medium text-slate-500 text-sm mt-1">
            Terhubung sebagai <span className="text-emerald-700 font-bold">{user.name || user.npm}</span> ({user.npm})
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            to="/deadlines"
            className="w-full bg-primary hover:bg-blue-700 text-white text-xs font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Buka My Deadlines</span>
            <Icon name="arrow_forward" size={18} />
          </Link>

          <button
            type="button"
            onClick={async () => {
              await logout();
              navigate('/login', { replace: true });
            }}
            className="w-full bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 text-xs font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Icon name="logout" size={18} />
            <span>Keluar / Ganti Akun</span>
          </button>
        </div>

        <PrivacyNote />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-xl p-6 md:p-8 flex flex-col gap-4 relative z-10 border border-slate-100 transition-all duration-300 hover:shadow-2xl">
      {/* Top Header Section */}
      <div className="flex flex-col gap-2 text-center items-center">
        <div className="w-full flex flex-col gap-4">
          <Link
            to="/"
            className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors flex items-center gap-1.5 self-start group"
          >
            <Icon name="arrow_back" size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Dashboard</span>
          </Link>
        </div>

        {/* Hub / Logo Icon */}
        <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-2 shadow-xs border border-blue-100/60">
          <Icon name="hub" size={32} />
        </div>

        <h1 className="text-headline-lg-mobile font-headline-lg-mobile text-slate-900 font-bold tracking-tight">
          Masuk ke LMS Tracker
        </h1>
        <p className="text-sm font-body text-slate-500 text-sm leading-relaxed">
          Masukkan akun VClass kamu untuk sinkronisasi deadline otomatis.
        </p>
      </div>

      {/* Prominent Error Alert if scraping or auth failed */}
      {errorMessage && (
        <div className="bg-red-50 border-2 border-red-200 text-red-800 p-4 rounded-2xl text-caption font-medium flex flex-col gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex items-center gap-2 font-bold text-red-900">
            <Icon name="error" size={20} className="text-red-600 shrink-0" filled />
            <span>Gagal Sinkronisasi VClass</span>
          </div>
          <p className="text-slate-700 text-xs pl-7 leading-relaxed">{errorMessage}</p>
        </div>
      )}

      {/* Login Form */}
      <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
        {/* NPM / Username */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700 ml-1" htmlFor="npm">
            Username / NPM
          </label>
          <div className="relative">
            <input
              id="npm"
              type="text"
              required
              value={npm}
              onChange={(e) => setNpm(e.target.value)}
              placeholder="Contoh: 10121xxx"
              className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-sm font-body text-slate-900 placeholder:text-slate-400 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40 border border-slate-200/60 transition-all"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700 ml-1" htmlFor="password">
            Password
          </label>
          <div className="relative w-full">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password VClass"
              className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-sm font-body text-slate-900 placeholder:text-slate-400 rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-primary/40 border border-slate-200/60 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100"
              aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
            >
              <Icon name={showPassword ? 'visibility_off' : 'visibility'} size={20} />
            </button>
          </div>
        </div>

        {/* Remember me & Forgot password */}
        <div className="flex items-center justify-between mt-1 mb-2">
          <label className="flex items-center gap-2 cursor-pointer group select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-primary bg-slate-100 border-slate-300 focus:ring-0 cursor-pointer accent-primary"
            />
            <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
              Ingat saya
            </span>
          </label>
          <a
            href="#lupa-password"
            onClick={(e) => {
              e.preventDefault();
              alert('Silakan reset password Anda langsung melalui portal Student Site / VClass Gunadarma.');
            }}
            className="text-xs font-semibold text-primary hover:text-blue-700 transition-colors"
          >
            Lupa Password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Icon name="sync" size={20} className="animate-spin" />
              <span>Menghubungkan ke VClass...</span>
            </>
          ) : (
            <>
              <span>Hubungkan & Sync VClass</span>
              <Icon name="sync" size={18} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
