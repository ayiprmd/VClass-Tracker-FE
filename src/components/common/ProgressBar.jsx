import React from 'react';

/**
 * Reusable Progress Bar
 * @param {number} value - 0 to 100
 * @param {string} color - 'primary' | 'secondary' | 'tertiary' | 'error' | 'amber'
 * @param {string} height - 'h-1' | 'h-1.5' | 'h-2'
 * @param {string} className
 */
export default function ProgressBar({
  value = 0,
  color = 'primary',
  height = 'h-1.5',
  className = ''
}) {
  const colorMap = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary',
    error: 'bg-error',
    amber: 'bg-amber-500',
    slate: 'bg-on-surface-variant'
  };

  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={`w-full bg-surface-container rounded-full overflow-hidden ${height} ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${colorMap[color] || 'bg-primary'}`}
        style={{ width: `${clampedValue}%` }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
  );
}
