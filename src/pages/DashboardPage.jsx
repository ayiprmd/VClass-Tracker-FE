import React from 'react';
import DecorativeBackground from '../components/common/DecorativeBackground';
import HeroSection from '../components/dashboard/HeroSection';
import DeadlinePreviewSection from '../components/dashboard/DeadlinePreviewSection';
import FeaturesSection from '../components/dashboard/FeaturesSection';
import CTABanner from '../components/dashboard/CTABanner';

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full relative">
      <DecorativeBackground variant="dashboard" />
      <HeroSection />
      <DeadlinePreviewSection />
      <FeaturesSection />
      <CTABanner />
    </div>
  );
}
