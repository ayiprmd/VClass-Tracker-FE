import React from 'react';

/**
 * Reusable Badge component complying with design.md color tokens
 * @param {string} variant - 'urgent' | 'soon' | 'safe' | 'quiz' | 'forum' | 'material' | 'neutral' | 'blue'
 * @param {string} size - 'sm' | 'md'
 * @param {React.ReactNode} children
 * @param {string} className
 * @param {boolean} dot
 */
export default function Badge({
  variant = 'neutral',
  size = 'md',
  children,
  className = '',
  dot = false,
  dotColor
}) {
  const variantStyles = {
    // Urgensi Status
    urgent: 'bg-red-50 text-red-600 border border-red-200/50',
    soon: 'bg-amber-50 text-amber-700 border border-amber-200/50',
    safe: 'bg-emerald-50 text-emerald-700 border border-emerald-200/50',
    
    // Kategori
    quiz: 'bg-purple-50 text-purple-700',
    forum: 'bg-blue-50 text-blue-700',
    material: 'bg-slate-100 text-slate-700',
    
    // General
    primary: 'bg-primary-surface text-primary font-medium',
    neutral: 'bg-surface-container text-on-surface-variant',
    high: 'bg-surface-container-high text-on-surface-variant font-bold',
    success: 'bg-emerald-50 text-emerald-700'
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[11px] font-bold rounded-full',
    md: 'px-3 py-1 text-caption font-medium rounded-full',
    pill: 'px-2.5 py-1 text-[11px] font-bold rounded-full'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap ${variantStyles[variant] || variantStyles.neutral} ${sizeStyles[size] || sizeStyles.md} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            dotColor ||
            (variant === 'urgent'
              ? 'bg-red-500 animate-pulse'
              : variant === 'soon'
              ? 'bg-amber-500'
              : variant === 'safe'
              ? 'bg-emerald-500'
              : 'bg-primary')
          }`}
        />
      )}
      {children}
    </span>
  );
}
