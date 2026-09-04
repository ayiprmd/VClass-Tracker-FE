import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import Icon from '../common/Icon';
import MacOSMockup from './MacOSMockup';

export default function HeroSection() {
  const { user } = useAuth();
  return (
    <section className="w-full max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col lg:flex-row items-center gap-stack-lg py-16 md:py-24">
      {/* Kolom Kiri: Copywriting & Actions */}
      <div className="flex-1 flex flex-col gap-6 items-start">
        <div className="bg-blue-50 border border-blue-200/60 text-primary text-label-sm font-semibold px-4 py-1.5 rounded-full shadow-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <span>VClass Tracker</span>
        </div>

        <h1 className="text-display font-display text-slate-800 tracking-tight leading-tight">
          Jangan Sampe Lupa Buat Kerjain Tugas Setelah Ada Website Ini!
        </h1>

        <p className="text-body font-body text-slate-600 max-w-xl leading-relaxed">
          Bingung cari tugas yang deadlinenya hari ini? Pusing ngecek satu persatu matkul? Pake VClass Tracker aja, Tinggal cek halaman deadline dan BAMM!
        </p>

        {!user && (
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <Button
              to="/login"
              variant="primary"
              size="md"
              iconRight={<Icon name="arrow_forward" size={18} />}
            >
              Cobain Yuks
            </Button>
          </div>
        )}
      </div>

      {/* Kolom Kanan: MacOS Flying Mockup */}
      <MacOSMockup />
    </section>
  );
}
