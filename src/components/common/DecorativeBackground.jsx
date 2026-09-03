import React from 'react';

/**
 * Ambient background blur glow decoration
 * @param {'login' | 'dashboard' | 'subtle'} variant
 */
export default function DecorativeBackground({ variant = 'dashboard' }) {
  if (variant === 'login') {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 flex items-center justify-center">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-200/50 mix-blend-multiply blur-[100px] opacity-40 translate-x-1/2 -translate-y-1/4 animate-pulse duration-1000" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-purple-200/50 mix-blend-multiply blur-[120px] opacity-30 -translate-x-1/3 translate-y-1/4 animate-pulse duration-700" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[100px]" />
      <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[100px]" />
    </div>
  );
}
