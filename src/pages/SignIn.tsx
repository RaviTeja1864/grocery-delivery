import { ArrowLeft, ArrowRight, Mail, UsersRound } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSessionStore } from '../store/sessionStore';
import { NectarLogo } from '../components/NectarLogo';

export const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const signIn = useSessionStore((state) => state.signIn);
  const continueWithSocial = () => { signIn(); navigate('/', { replace: true }); };

  const fromAccount = Boolean((location.state as { fromAccount?: boolean } | null)?.fromAccount);
  return <main className="min-h-screen bg-[#fcfdfb] px-6 pb-[env(safe-area-inset-bottom)] pt-7 text-[#26322b]"><div className="mx-auto flex min-h-[calc(100vh-1.75rem)] w-full max-w-md flex-col">{!fromAccount && <button onClick={() => navigate('/onboarding')} className="focus-ring -ml-2 flex w-fit items-center gap-2 rounded-lg p-2 text-sm font-semibold text-[#69746c]" aria-label="Back to onboarding"><ArrowLeft size={18} />Back</button>}<div className="mt-10 text-center"><NectarLogo className="text-2xl" /><h1 className="mt-5 text-2xl font-extrabold tracking-[-0.04em]">Get your groceries<br />with nectar</h1></div><button onClick={() => navigate('/phone')} className="focus-ring mt-10 flex w-full items-center justify-between rounded-xl border border-[#e2eae0] bg-white px-4 py-4 text-sm font-semibold"><span className="flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8f5e4] text-[#55b978]">+91</span>Continue with mobile</span><ArrowRight size={18} className="text-[#55b978]" /></button><div className="my-8 flex items-center gap-3 text-[10px] text-[#a4ada6]"><span className="h-px flex-1 bg-[#edf1eb]" />Or connect with social media<span className="h-px flex-1 bg-[#edf1eb]" /></div><div className="space-y-3"><button onClick={continueWithSocial} className="focus-ring flex w-full items-center justify-center gap-3 rounded-xl bg-[#557fe5] py-4 text-sm font-bold text-white"><Mail size={17} />Continue with Google</button><button onClick={continueWithSocial} className="focus-ring flex w-full items-center justify-center gap-3 rounded-xl bg-[#4f6fb7] py-4 text-sm font-bold text-white"><UsersRound size={17} />Continue with Facebook</button></div><p className="mt-auto pb-5 pt-10 text-center text-xs text-[#89948c]">Already have an account? <button onClick={() => navigate('/login')} className="focus-ring rounded font-bold text-[#55b978]">Login</button> · <button onClick={() => navigate('/signup')} className="focus-ring rounded font-bold text-[#55b978]">Sign Up</button></p></div></main>;
};
