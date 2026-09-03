import React from 'react';
import { Outlet } from 'react-router-dom';
import DecorativeBackground from '../components/common/DecorativeBackground';
import Footer from '../components/common/Footer';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface font-body text-on-surface antialiased relative">
      <DecorativeBackground variant="login" />
      <main className="flex-1 flex flex-col items-center justify-center w-full px-margin-mobile lg:px-margin-desktop py-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
