import React, { useState } from 'react';
import LoginCard from '../components/login/LoginCard';
import PrivacyModal from '../components/login/PrivacyModal';

export default function LoginPage() {
  const [showPrivacy, setShowPrivacy] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[60vh] py-12">
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
      <div className="text-[32px] font-extrabold text-primary text-center mb-8 tracking-tight flex items-center gap-2">
        <span>VClass Tracker</span>
      </div>
      <LoginCard />
    </div>
  );
}
