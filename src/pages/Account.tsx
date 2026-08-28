import { ClipboardList, Heart, MapPin, ShieldCheck, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
  { label: 'Track your orders', icon: ClipboardList },
  { label: 'Save your favourites', icon: Heart },
  { label: 'Manage delivery addresses', icon: MapPin },
];

export const Account = () => (
  <div className="animate-rise-in mx-auto max-w-2xl space-y-6">
    <section className="overflow-hidden rounded-2xl bg-[#eaf7e6] px-6 py-8 sm:px-10 sm:py-10">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#55b978] shadow-sm">
        <UserRound size={27} strokeWidth={1.8} />
      </div>
      <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.12em] text-[#55a66b]">Nectar account</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-[#26382b]">Everything you love, in one place.</h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-[#718075]">Log in to make checkout faster and keep your grocery list close.</p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
           <Link to="/signin" state={{ fromAccount: true }} className="focus-ring flex items-center justify-center rounded-xl bg-[#55b978] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#429e65]">Log in to your account</Link>
           <Link to="/signin" state={{ fromAccount: true }} className="focus-ring flex items-center justify-center rounded-xl border border-[#cce5c6] bg-white px-6 py-3.5 text-sm font-bold text-[#429e65] hover:bg-[#f7fcf5]">Sign up for an account</Link>
      </div>
    </section>

    <section className="rounded-2xl border border-[#e5eee2] bg-white px-6 py-6 sm:px-8">
      <div className="flex items-center gap-2">
        <ShieldCheck size={18} className="text-[#55b978]" />
        <h2 className="text-base font-extrabold text-[#26322b]">Why create an account?</h2>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {benefits.map(({ label, icon: Icon }) => (
          <div key={label} className="flex items-center gap-3 text-xs font-semibold text-[#69746c] sm:block">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef8e9] text-[#55b978] sm:mb-3"><Icon size={17} /></span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  </div>
);
