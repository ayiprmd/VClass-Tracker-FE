import React from 'react';
import Icon from '../common/Icon';

export default function StatsWidget({ completed = 0, total = 0, materialOnly = false, forumOnly = false, message }) {
  const days = [
    { name: 'Senin', height: '40%', active: false },
    { name: 'Selasa', height: '70%', active: false },
    { name: 'Rabu (Hari ini)', height: '100%', active: true },
    { name: 'Kamis', height: '15%', active: false },
    { name: 'Jumat', height: '20%', active: false },
    { name: 'Sabtu', height: '10%', active: false }
  ];

  return (
    <div className="bg-primary text-white rounded-2xl p-6 relative overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300">
      <div className="absolute -right-8 -bottom-8 opacity-15 pointer-events-none transition-transform group-hover:scale-110">
        <Icon name="verified" size={140} />
      </div>

      <div className="relative z-10">
        <h4 className="text-label-sm font-label-sm text-blue-200 uppercase tracking-widest mb-2 font-bold">
          Produktivitas Kamu
        </h4>
        <div className="text-display font-display font-extrabold mb-1 tracking-tight leading-none">
          {materialOnly || forumOnly ? total : `${completed}/${total}`}
        </div>
        <p className="text-body font-body text-sm text-blue-100 font-medium">
          {message || (materialOnly ? 'Materi tersedia untuk di baca.' : forumOnly ? 'Total Forum tersedia.' : 'Tugas selesai. Tetap semangat!')}
        </p>

        <div className="mt-6 flex gap-1.5 h-10 items-end">
          {days.map((day, index) => (
            <div
              key={index}
              className={`flex-1 rounded-t-md transition-all duration-300 cursor-pointer ${
                day.active ? 'bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]' : 'bg-white/30 hover:bg-white/50'
              }`}
              style={{ height: day.height }}
              title={day.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
