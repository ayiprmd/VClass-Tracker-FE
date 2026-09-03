import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FilterBar from '../components/deadline/FilterBar';
import AlertBar from '../components/deadline/AlertBar';
import SectionHeader from '../components/deadline/SectionHeader';
import UrgentTaskCard from '../components/deadline/UrgentTaskCard';
import SoonTaskCard from '../components/deadline/SoonTaskCard';
import SafeTaskItem from '../components/deadline/SafeTaskItem';
import StatsWidget from '../components/deadline/StatsWidget';
import Icon from '../components/common/Icon';
import { useAuth } from '../context/AuthContext';

export default function DeadlinePage() {
  const { user, deadlines, stats, isGuest, syncError, lastSyncTime, refreshDashboardData } = useAuth();
  const [showSyncBanner, setShowSyncBanner] = useState(true);
  const [isManualToggle, setIsManualToggle] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (!isManualToggle && showSyncBanner) {
      const timer = setTimeout(() => {
        setShowSyncBanner(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSyncBanner, isManualToggle]);

  const handleToggleBanner = () => {
    setShowSyncBanner(!showSyncBanner);
    setIsManualToggle(true);
  };

  const handleSyncUlang = async () => {
    setIsSyncing(true);
    try {
      await refreshDashboardData();
    } finally {
      setIsSyncing(false);
    }
  };

  // Filter tasks - only show Kuis & Tugas
  const filteredTasks = useMemo(() => {
    let tasks = Array.isArray(deadlines) ? [...deadlines] : [];
    return tasks.filter((task) => ['kuis', 'tugas'].includes((task.type || '').toLowerCase()));
  }, [deadlines]);

  // Group tasks by urgency
  const urgentTasks = filteredTasks.filter((t) => t.urgency === 'urgent');
  const soonTasks = filteredTasks.filter((t) => t.urgency === 'soon');
  const safeTasks = filteredTasks.filter((t) => t.urgency === 'safe');

  const productivity = useMemo(() => {
    return { completed: stats?.completed_task_quiz ?? 0, total: stats?.total_task_quiz ?? 0 };
  }, [stats]);

  const scrollToUrgent = () => {
    const el = document.getElementById('urgent-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    

      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop w-full py-stack-md flex flex-col gap-stack-lg">
        
        {/* Sync Status Row: Banner + Toggle Button */}
        {!isGuest && user && (
          <div className="flex items-center justify-between gap-3">
            {/* Banner (Left side, grows) */}
            {showSyncBanner && (
              <div className="flex-1 min-w-0 bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Icon name="cloud_done" size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-label-sm font-bold text-emerald-950 truncate">
                      Terhubung ke VClass Gunadarma
                    </p>
                    <p className="text-caption font-medium text-emerald-800 text-xs truncate">
                      Akun: <strong className="text-emerald-900">{user.name || user.npm}</strong> ({user.npm}) {lastSyncTime ? `• ${lastSyncTime} WIB` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleSyncUlang}
                    disabled={isSyncing}
                    className="px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-label-sm font-bold transition-colors flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Icon name="sync" size={16} className={isSyncing ? "animate-spin" : ""} />
                    <span>{isSyncing ? "Sync..." : "Sync Ulang"}</span>
                  </button>
                  <button
                    onClick={handleToggleBanner}
                    className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-700 transition-colors"
                    title="Sembunyikan status"
                  >
                    <Icon name="close" size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Toggle Button (Right side, visible only when banner hidden) */}
            {!showSyncBanner && (
              <button
                onClick={handleToggleBanner}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-all shrink-0 flex items-center gap-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700"
                title="Tampilkan status"
              >
                <Icon name="cloud_done" size={18} />
              </button>
            )}
          </div>
        )}
        
        {/* Guest Preview Notice */}
        {isGuest && (
          <div className="w-full bg-blue-50/90 border border-blue-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                <Icon name="preview" size={20} />
              </div>
              <div>
                <p className="text-label-sm font-bold text-slate-800">
                  Mode Guest Preview
                </p>
                <p className="text-caption text-slate-600 text-xs">
                  Kamu sedang melihat data simulasi contoh. Masuk dengan akun VClass kamu untuk sinkronisasi tugas real-time.
                </p>
              </div>
            </div>

            <Link
              to="/login"
              className="px-4 py-2 rounded-xl bg-primary hover:bg-blue-700 text-white text-label-sm font-bold transition-all shadow-xs self-start sm:self-auto flex items-center gap-1.5"
            >
              <Icon name="login" size={16} />
              <span>Login & Sync</span>
            </Link>
          </div>
        )}

        {/* Sync Error Banner if any */}
        {syncError && (
          <div className="w-full bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-center justify-between gap-3 text-red-800">
            <div className="flex items-center gap-3">
              <Icon name="error" size={22} className="text-red-600 shrink-0" filled />
              <div>
                <p className="text-label-sm font-bold text-red-950">Gagal Memperbarui Data VClass</p>
                <p className="text-caption text-red-800 text-xs">{syncError}</p>
              </div>
            </div>
            <Link
              to="/login"
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shrink-0"
            >
              Coba Lagi
            </Link>
          </div>
        )}

        {/* Top Alert Bar (If urgent tasks exist) */}
        {urgentTasks.length > 0 && (
          <AlertBar count={urgentTasks.length} onActionClick={scrollToUrgent} />
        )}

        {/* Stats Widget - Mobile Only (above Kritis) */}
        <div className="block lg:hidden">
          <StatsWidget completed={productivity.completed} total={productivity.total} />
        </div>

        {/* Main Content Layout - Always show Kuis & Tugas */}
        <div className="flex flex-col lg:flex-row gap-gutter relative">
          {/* Left: Urgent & Soon Tasks */}
          <div className="w-full lg:w-2/3 flex flex-col gap-stack-lg">
            {/* URGENT */}
            <section id="urgent-section" className="flex flex-col gap-4">
              <SectionHeader title="Kritis (Tenggat Hari Ini)" count={urgentTasks.length} urgency="urgent" />
              {urgentTasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {urgentTasks.map((task) => (<UrgentTaskCard key={task.id} task={task} />))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 text-center text-slate-400 border border-dashed border-slate-200">
                  <Icon name="check_circle" size={32} className="text-emerald-400 mb-2" />
                  <p className="font-semibold text-slate-600">Tidak ada tugas kritis hari ini</p>
                </div>
              )}
            </section>
            
            {/* SOON */}
            <section className="flex flex-col gap-4">
              <SectionHeader title="Mendekat (1-3 Hari)" count={soonTasks.length} urgency="soon" />
              {soonTasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {soonTasks.map((task) => (<SoonTaskCard key={task.id} task={task} />))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 text-center text-slate-400 border border-dashed border-slate-200">
                  <p className="font-medium text-slate-500">Tidak ada tugas mendekat dalam kategori ini.</p>
                </div>
              )}
            </section>
          </div>
          
          {/* Right: Stats & Safe Tasks */}
          <div className="w-full lg:w-1/3 flex-col gap-stack-md hidden lg:flex">
            <StatsWidget completed={productivity.completed} total={productivity.total} />
          </div>
        </div>
      </div>
  );
}





