import { Compass, Heart, Home as HomeIcon, ShoppingCart, UserRound } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

const items = [
  { to: '/', label: 'Shop', icon: HomeIcon },
  { to: '/explore', label: 'Explore', icon: Compass },
  { to: '/cart', label: 'Cart', icon: ShoppingCart },
  { to: '/favorites', label: 'Favourite', icon: Heart },
  { to: '/account', label: 'Account', icon: UserRound },
] as const;

const matchesDestination = (pathname: string, destination: string) => {
  if (destination === '/') return pathname === '/' || pathname.startsWith('/product/');
  if (destination === '/explore') return pathname === '/explore' || pathname.startsWith('/category/') || pathname === '/search';
  return pathname === destination || pathname.startsWith(`${destination}/`);
};

export const MobileBottomNav = () => {
  const pathname = useLocation().pathname;
  const totalItems = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex h-[74px] items-center justify-around border-t border-[#edf1eb] bg-white px-3 shadow-[0_-4px_18px_rgba(46,78,52,0.04)] md:hidden" aria-label="Primary navigation">
      {items.map(({ to, label, icon: Icon }) => {
        const isActive = matchesDestination(pathname, to);
        return <NavLink key={to} to={to} end={to === '/'} aria-current={isActive ? 'page' : undefined} className={`focus-ring relative flex min-w-12 flex-col items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-semibold ${isActive ? 'text-[#55b978]' : 'text-[#4d5951]'}`}><Icon size={19} strokeWidth={isActive ? 2.2 : 1.8} />{label}{to === '/cart' && totalItems > 0 && <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#55b978] px-1 text-[9px] font-bold text-white">{totalItems}</span>}</NavLink>;
      })}
    </nav>
  );
};
