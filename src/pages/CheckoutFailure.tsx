import { Link } from 'react-router-dom';
import { CircleAlert, RotateCcw } from 'lucide-react';

export const CheckoutFailure = () => (
  <div className="mx-auto flex max-w-md flex-col items-center py-12 text-center lg:py-20">
    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#fff0e9] text-[#e07852]"><CircleAlert size={38} /></div>
    <p className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-[#e07852]">Payment unsuccessful</p>
    <h1 className="mb-3 text-3xl font-extrabold tracking-[-0.04em] text-[#26322b]">We couldn't place your order</h1>
    <p className="mb-8 text-sm leading-6 text-[#7b867e]">Your payment was not completed. Check your details and try again.</p>
    <Link to="/checkout" className="focus-ring flex items-center gap-2 rounded-2xl bg-[#55b978] px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(85,185,120,0.22)] hover:bg-[#429e65]"><RotateCcw size={17} />Try again</Link>
  </div>
);