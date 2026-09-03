import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable Button component adhering to design.md specification
 * @param {'primary' | 'secondary' | 'card' | 'outline' | 'ghost' | 'danger'} variant
 * @param {'sm' | 'md' | 'lg'} size
 * @param {string} to - If provided, renders as react-router Link
 * @param {React.ReactNode} children
 * @param {string} className
 * @param {React.ReactNode} iconLeft
 * @param {React.ReactNode} iconRight
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  children,
  className = '',
  iconLeft,
  iconRight,
  type = 'button',
  onClick,
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variantStyles = {
    primary: 'bg-primary hover:bg-blue-700 text-white shadow-md hover:shadow-lg rounded-full font-semibold',
    secondary: 'bg-surface-container-high hover:bg-surface-variant text-on-surface shadow-sm rounded-full font-medium',
    outline: 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-sm rounded-full',
    card: 'w-full bg-surface-container-high hover:bg-surface-variant text-on-surface rounded-xl text-label-sm font-label-sm py-2 group-hover:bg-primary group-hover:text-white transition-colors',
    danger: 'bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium shadow-sm',
    ghost: 'hover:bg-surface-container text-on-surface-variant hover:text-on-surface rounded-lg'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-label-sm gap-1.5',
    md: 'px-6 py-3 text-label-sm gap-2',
    lg: 'px-8 py-4 text-body font-bold gap-2.5'
  };

  const combinedClass = `${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${variant !== 'card' ? sizeStyles[size] || sizeStyles.md : ''} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClass} {...props}>
        {iconLeft}
        <span>{children}</span>
        {iconRight}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClass}
      {...props}
    >
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </button>
  );
}
