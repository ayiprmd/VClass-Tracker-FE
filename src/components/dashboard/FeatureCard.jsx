import React from 'react';
import Icon from '../common/Icon';

export default function FeatureCard({ icon, iconColor = 'primary', title, description }) {
  const iconTheme = {
    primary: 'bg-primary-surface text-primary',
    secondary: 'bg-purple-50 text-secondary',
    tertiary: 'bg-emerald-50 text-tertiary'
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 text-left flex flex-col gap-4 border border-slate-100 group hover:-translate-y-1">
      <div className={`w-14 h-14 ${iconTheme[iconColor] || iconTheme.primary} rounded-2xl flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}>
        <Icon name={icon} size={28} />
      </div>
      <h3 className="text-section-header font-section-header text-slate-800 mt-2 font-bold group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-body font-body text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
