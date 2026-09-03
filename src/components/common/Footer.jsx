import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full py-stack-lg border-t border-slate-200/80 mt-auto bg-white/50">
      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-stack-md text-center md:text-left">
        <span className="text-caption font-caption text-on-surface-variant">
          © {new Date().getFullYear()} VClass Tracker Deadline - By Ayiprmd
        </span>
        <div className="flex items-center gap-gutter">
          <a
            href="#support"
            onClick={(e) => e.preventDefault()}
            className="text-caption font-caption text-on-surface-variant hover:text-primary transition-colors"
          >
            Support Me
          </a>
        </div>
      </div>
    </footer>
  );
}
