import React from 'react';
import SortDropdown from './SortDropdown';

/**
 * FilterBar with Category Filter Pills and Sort Dropdown
 * @param {'all' | 'activities' | 'Forum' | 'Materi'} activeCategory
 * @param {function} onCategoryChange
 * @param {string} sortBy
 * @param {function} onSortChange
 */
export default function FilterBar({
  activeCategory = 'activities',
  onCategoryChange,
  sortBy = 'asc',
  onSortChange
}) {
  const categories = [
    { id: 'activities', label: 'Kuis & Tugas', dot: 'bg-purple-600' }
  ];

  return (
    <div className="sticky top-16 z-30 bg-white/85 backdrop-blur-md pb-stack-sm pt-stack-sm w-full border-b border-slate-200/60 shadow-2xs">
      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop flex items-center justify-between">
        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onCategoryChange?.(cat.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-label-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-2xs ${
                  isActive
                    ? 'bg-primary text-white shadow-sm scale-102'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {cat.dot && <span className={`w-2 h-2 rounded-full ${cat.dot}`} />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

