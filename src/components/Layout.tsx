
import { Outlet, Link, NavLink } from 'react-router-dom';
import { ShoppingCart, UserRound } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { MobileBottomNav } from './MobileBottomNav';
import { NectarLogo } from './NectarLogo';

export const Layout = () => {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fcfdfb] text-[#1d2922]">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 pb-3 pt-5 lg:px-8 lg:pt-8">
        <Link to="/" className="focus-ring rounded-xl text-xl"><NectarLogo /></Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-[#758078] md:flex" aria-label="Desktop navigation">
          <NavLink to="/" end className={({ isActive }) => `focus-ring rounded-lg ${isActive ? 'text-[#55b978]' : 'hover:text-[#55b978]'}`}>Shop</NavLink>
          <NavLink to="/explore" className={({ isActive }) => `focus-ring rounded-lg ${isActive ? 'text-[#55b978]' : 'hover:text-[#55b978]'}`}>Explore</NavLink>
          <NavLink to="/favorites" className={({ isActive }) => `focus-ring rounded-lg ${isActive ? 'text-[#55b978]' : 'hover:text-[#55b978]'}`}>Favourite</NavLink>
          <NavLink to="/account" aria-label="Account" className={({ isActive }) => `focus-ring flex items-center gap-1 rounded-lg ${isActive ? 'text-[#55b978]' : 'hover:text-[#55b978]'}`}><UserRound size={17} />Account</NavLink>
        </nav>
        <Link to="/cart" className="focus-ring relative rounded-lg p-2 text-[#26322b]" aria-label={`Cart with ${totalItems} items`}>
          <ShoppingCart size={21} />
          {totalItems > 0 && <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#55b978] px-1 text-[9px] font-bold text-white">{totalItems}</span>}
        </Link>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-28 pt-2 lg:px-8 lg:pb-10 lg:pt-6">
        <Outlet />
      </main>
      <MobileBottomNav />
    </div>
  );
};
