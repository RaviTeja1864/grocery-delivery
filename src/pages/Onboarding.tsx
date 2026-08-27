import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NectarLogo } from '../components/NectarLogo';

export const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#26382b] text-white">
      <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85" alt="Fresh vegetables at a grocery market" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(20,45,27,0.05)_25%,rgba(20,45,27,0.88)_82%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col justify-end px-6 pb-10 pt-12">
        <NectarLogo light className="mb-5 text-2xl" />
        <h1 className="max-w-xs text-4xl font-extrabold leading-[1.05] tracking-[-0.06em]">Welcome<br />to our store</h1>
        <p className="mt-4 max-w-xs text-sm leading-6 text-white/80">Get your groceries delivered fresh and fast, right to your door.</p>
        <button onClick={() => navigate('/signin')} className="focus-ring mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#55b978] py-4 text-sm font-bold text-white hover:bg-[#429e65]">Get Started <ArrowRight size={17} /></button>
        <div className="mx-auto mt-8 h-1 w-32 rounded-full bg-white/50" aria-hidden="true" />
      </div>
    </main>
  );
};
