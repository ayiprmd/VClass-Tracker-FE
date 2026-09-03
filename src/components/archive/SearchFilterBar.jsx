import React from 'react';
import Icon from '../common/Icon';

export default function SearchFilterBar({
  searchQuery = '',
  onSearchChange,
  selectedCourse = 'All Courses',
  onCourseChange,
  courseOptions = []
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 w-full">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon name="search" size={20} />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Cari arsip tugas..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-100/80 hover:bg-slate-100 focus:bg-white rounded-full text-label-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 border border-slate-200/60 transition-all"
        />
      </div>

      {/* Filter by Course & Action */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <select
            value={selectedCourse}
            onChange={(e) => onCourseChange?.(e.target.value)}
            className="px-4 py-2.5 bg-slate-100/80 hover:bg-slate-100 rounded-full text-label-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/40 appearance-none pr-10 border border-slate-200/60 cursor-pointer transition-colors"
          >
            {courseOptions.length > 0 ? (
              courseOptions.map((course, idx) => (
                <option key={idx} value={course}>
                  {course === 'All Courses' ? 'Semua Mata Kuliah' : course}
                </option>
              ))
            ) : (
              <>
                <option value="All Courses">Semua Mata Kuliah</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Advanced Algorithms">Advanced Algorithms</option>
                <option value="Data Structures">Data Structures</option>
                <option value="Basis Data">Basis Data</option>
                <option value="Arsitektur Komputer">Arsitektur Komputer</option>
              </>
            )}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <Icon name="expand_more" size={18} />
          </span>
        </div>

        <button
          type="button"
          className="px-4 py-2.5 bg-slate-100/80 hover:bg-slate-100 rounded-full text-label-sm font-semibold text-slate-700 hover:text-slate-900 border border-slate-200/60 transition-colors flex items-center gap-2"
        >
          <Icon name="filter_list" size={18} />
          <span>Filter</span>
        </button>
      </div>
    </div>
  );
}
