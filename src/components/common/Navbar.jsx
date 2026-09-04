import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Icon from './Icon';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isGuest, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Dashboard', end: true },
    { to: '/deadlines', label: 'Deadlines' },
    { to: '/courses', label: 'Courses' },
    { to: '/archive', label: 'Completed' },
  ];

  const handleLogout = async () => {
    await logout();
    // replace: hindari kembali ke halaman sesi aktif lewat tombol Back/Undo
    navigate('/login', { replace: true });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 transition-all">
      <div className="h-16 max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop flex items-center justify-between gap-3">
        
        {/* Left: Brand & Desktop Navigation */}
        <div className="flex items-center gap-3 lg:gap-12 min-w-0">
          <Link
            to="/"
            className="text-card-title font-card-title tracking-tight font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shrink-0"
            style={{ color: '#245AE2', fontFamily: 'K2D, sans-serif' }}
          >
            <span>VClass Tracker</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.slice(1).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `px-3.5 py-2 text-label-sm rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-primary font-semibold bg-primary-surface'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-slate-100/60 font-medium'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
         </div>



          {!isGuest && user ? (
            /* Logged in state with user badge & logout */
            <div className="flex items-center gap-2 min-w-0">
               <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 pl-2 pr-2 sm:pr-3 py-1 rounded-full shadow-2xs min-w-0 max-w-[150px] sm:max-w-none">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                  <div className="flex flex-col text-left min-w-0">
                  <span className="text-[12px] font-bold text-emerald-900 leading-tight truncate max-w-[110px] sm:max-w-none">
                    {user.npm || 'Mahasiswa'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="text-slate-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                title="Keluar / Ganti Akun"
              >
                <Icon name="logout" size={20} />
              </button>
            </div>
          ) : (
            /* Guest / Login Link */
            <Link
              to="/login"
              className="flex items-center gap-2 pl-2 pr-2 sm:pr-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors group shrink-0 border border-slate-200 shadow-sm"
              title="Masuk ke Akun VClass"
            >
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <Icon name="person" size={18} />
              </div>
              <span className="text-label-sm font-semibold text-slate-700 group-hover:text-primary">
                Login VClass
              </span>
            </Link>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden shrink-0 p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Buka Menu"
          >
            <Icon name={mobileMenuOpen ? 'close' : 'menu'} size={24} />
          </button>
        </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 px-margin-mobile py-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-body font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? 'text-primary font-semibold bg-primary-surface'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                <span>{link.label}</span>
                <Icon name="chevron_right" size={18} className="text-slate-400" />
              </NavLink>
            ))}

            {!isGuest && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="mt-2 w-full px-4 py-3 rounded-xl text-body font-semibold text-red-600 bg-red-50 hover:bg-red-100 flex items-center justify-between transition-colors"
              >
                <span>Keluar ({user?.npm})</span>
                <Icon name="logout" size={18} />
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
