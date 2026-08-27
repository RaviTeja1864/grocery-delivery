import { useState, type FormEvent } from 'react';
import { ArrowLeft, LockKeyhole, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSessionStore } from '../store/sessionStore';
import { NectarLogo } from '../components/NectarLogo';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = useSessionStore((state) => state.signIn);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn();
    navigate('/', { replace: true });
  };

  return (
    <main className="min-h-screen bg-[#fcfdfb] px-6 pb-[env(safe-area-inset-bottom)] pt-7 text-[#26322b]">
      <div className="mx-auto flex min-h-[calc(100vh-1.75rem)] w-full max-w-md flex-col">
        <button onClick={() => navigate('/onboarding')} className="focus-ring -ml-2 flex w-fit items-center gap-2 rounded-lg p-2 text-sm font-semibold text-[#69746c]" aria-label="Back to onboarding"><ArrowLeft size={18} />Back</button>
        <div className="mt-12 text-center"><NectarLogo className="text-2xl" /><h1 className="mt-5 text-2xl font-extrabold tracking-[-0.04em]">Welcome back</h1><p className="mt-2 text-xs text-[#89948c]">Log in to continue shopping fresh.</p></div>
        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          <label className="block text-xs font-semibold text-[#69746c]">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="focus-ring mt-2 w-full rounded-xl border border-[#e2eae0] bg-white px-4 py-3 text-sm outline-none focus:border-[#55b978]" /></label>
          <label className="block text-xs font-semibold text-[#69746c]">Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="focus-ring mt-2 w-full rounded-xl border border-[#e2eae0] bg-white px-4 py-3 text-sm outline-none focus:border-[#55b978]" /></label>
          <button type="submit" className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl bg-[#55b978] py-4 text-sm font-bold text-white hover:bg-[#429e65]">Log In</button>
        </form>
        <div className="my-7 flex items-center gap-3 text-[10px] text-[#a4ada6]"><span className="h-px flex-1 bg-[#edf1eb]" />or continue with<span className="h-px flex-1 bg-[#edf1eb]" /></div>
        <div className="grid grid-cols-2 gap-3"><button type="button" className="focus-ring flex items-center justify-center gap-2 rounded-xl border border-[#e2eae0] bg-white py-3 text-xs font-semibold"><Mail size={15} />Google</button><button type="button" className="focus-ring flex items-center justify-center gap-2 rounded-xl border border-[#e2eae0] bg-white py-3 text-xs font-semibold"><LockKeyhole size={15} />Facebook</button></div>
        <p className="mt-auto pb-5 pt-10 text-center text-xs text-[#89948c]">Don't have an account? <Link to="/login" className="font-bold text-[#55b978]">Sign up</Link></p>
      </div>
    </main>
  );
};
