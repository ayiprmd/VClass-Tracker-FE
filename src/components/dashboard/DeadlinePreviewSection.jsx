import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import DeadlinePreviewCard from './DeadlinePreviewCard';
import { useAuth } from '../../context/AuthContext';

export default function DeadlinePreviewSection() {
  const { deadlines } = useAuth();
  
  // Only show the top 3 nearest upcoming deadlines on the dashboard overview
  const previewItems = Array.isArray(deadlines) ? deadlines.slice(0, 3) : [];

  return (
    <section className="w-full bg-slate-50/70 border-y border-slate-200/60 py-20">
      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop">
        {/* Section Header with "Lihat Semua" link */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-stack-md gap-4">
          <div>
            <h2 className="text-headline-lg font-headline-lg text-slate-800 tracking-tight">
              Deadline Tugas Terdekat
            </h2>
            <p className="text-body font-body text-slate-500 mt-1">
              Pantau terus tugasnya, Jangan sampe kendor!
            </p>
          </div>
          <Link
            to="/deadlines"
            className="text-label-sm font-semibold text-primary hover:text-blue-700 flex items-center gap-1 transition-colors self-start sm:self-auto group"
          >
            <span>Lihat Semua</span>
            <Icon name="arrow_forward" size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-Column Card Grid */}
        {previewItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewItems.map((item) => (
              <DeadlinePreviewCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center text-slate-400 border border-dashed border-slate-200">
            <Icon name="check_circle" size={36} className="text-emerald-400 mb-2" />
            <p className="font-semibold text-slate-600">Tidak ada tugas yang mendekati deadline</p>
            <p className="text-xs text-slate-400 mt-0.5">Semua tugas udah selesai, Selesai karena dikumpulin atau lupa ngumpulin ya?</p>
          </div>
        )}
      </div>
    </section>
  );
}
