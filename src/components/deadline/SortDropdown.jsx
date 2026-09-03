import React, { useState, useRef, useEffect } from 'react';
import Icon from '../common/Icon';

/**
 * Sort Dropdown toggle supporting Ascending/Descending deadline sorting
 * @param {'asc' | 'desc' | 'course'} sortBy
 * @param {function} onSortChange
 */
export default function SortDropdown({ sortBy = 'asc', onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options = [
    { value: 'asc', label: 'Tenggat Terdekat' },
    { value: 'desc', label: 'Tenggat Terlama' },
    { value: 'course', label: 'Mata Kuliah' }
  ];

  const currentLabel = options.find((opt) => opt.value === sortBy)?.label || 'Tenggat Terdekat';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-label-sm font-semibold flex items-center gap-2 transition-colors border border-slate-200/50 shadow-xs"
        aria-expanded={isOpen}
      >
        <Icon name="sort" size={18} className="text-primary" />
        <span>Urutkan: {currentLabel}</span>
        <Icon
          name="expand_more"
          size={18}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
          {options.map((option) => {
            const isSelected = sortBy === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onSortChange?.(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-label-sm font-medium flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-primary-surface text-primary font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <Icon name="check" size={16} className="text-primary" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
