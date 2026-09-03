import React from 'react';
import FeatureCard from './FeatureCard';

export default function FeaturesSection() {
  const features = [
    {
      id: 'feat-1',
      icon: 'sort',
      iconColor: 'primary',
      title: 'Sorting Mata Kuliah',
      description:
        'Kelompokkan dan filter tugas berdasarkan mata kuliah spesifik. Dapatkan pandangan jernih tentang apa yang perlu diselesaikan per subjek, mengurangi kebingungan dan overload kognitif.'
    },
    {
      id: 'feat-2',
      icon: 'priority_high',
      iconColor: 'secondary',
      title: 'Prioritas Deadline',
      description:
        'Sistem cerdas yang otomatis menyoroti tugas paling mendesak. Indikator warna intuitif membantu Anda mengalokasikan waktu ke tempat yang paling membutuhkannya hari ini.'
    }
  ];

  return (
    <section className="w-full relative overflow-hidden py-24">
      {/* Abstract background shape */}
      <div className="absolute -right-20 top-0 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl -z-10" />
      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop text-center">
        <h2 className="text-headline-lg font-headline-lg text-slate-800 mb-4 max-w-2xl mx-auto font-bold tracking-tight">
          Didesain untuk Melihat Tugas Terdekat
        </h2>
        <p className="text-body font-body text-slate-500 max-w-xl mx-auto mb-12">
          Fitur-fitur yang membantu mahasiswa melihat deadline tugas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {features.map((feat) => (
            <FeatureCard
              key={feat.id}
              icon={feat.icon}
              iconColor={feat.iconColor}
              title={feat.title}
              description={feat.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
