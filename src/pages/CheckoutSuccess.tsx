import { Link } from 'react-router-dom';
import { Check, ShoppingBag } from 'lucide-react';

export const CheckoutSuccess = () => {
  return (
    <div className="animate-rise-in mx-auto flex max-w-md flex-col items-center py-12 text-center lg:py-20">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#e4f5df] text-[#55b978]"><Check size={38} strokeWidth={3} /></div>
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-[#55b978]">Order confirmed</p>
        <h1 className="mb-3 text-3xl font-extrabold tracking-[-0.05em] text-[#26322b]">Your groceries are on the way</h1>
        <p className="mb-8 text-sm leading-6 text-[#7b867e]">Thanks for shopping with ahoum. We will prepare your order and keep you posted.</p>
        <Link 
          to="/" 
          className="focus-ring flex items-center gap-2 rounded-2xl bg-[#55b978] px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(85,185,120,0.22)] hover:bg-[#429e65]"
        ><ShoppingBag size={17} />Continue shopping
        </Link>
    </div>
  );
};
