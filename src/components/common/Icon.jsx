import React from 'react';

/**
 * Reusable Material Symbols Outlined Icon
 * @param {string} name - Material symbol name
 * @param {string} className - Extra Tailwind classes
 * @param {boolean} filled - Whether icon is solid/filled
 * @param {number} size - Font size in px
 */
export default function Icon({ name, className = '', filled = false, size }) {
  const style = {
    fontVariationSettings: filled ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
    ...(size ? { fontSize: `${size}px` } : {})
  };

  return (
    <span
      className={`material-symbols-outlined select-none inline-flex items-center justify-center leading-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
