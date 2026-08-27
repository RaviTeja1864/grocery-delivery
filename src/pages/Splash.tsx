import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NectarLogo } from '../components/NectarLogo';

export const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => navigate('/onboarding', { replace: true }), 900);
    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#55b978] px-6 pb-[env(safe-area-inset-bottom)] text-white">
      <div className="flex flex-col items-center"><NectarLogo light className="text-4xl" /><p className="mt-1 text-[10px] font-semibold tracking-[0.28em] text-white/80">ONLINE GROCER</p></div>
      <div className="absolute bottom-5 h-1 w-32 rounded-full bg-white/40" aria-hidden="true" />
    </main>
  );
};
