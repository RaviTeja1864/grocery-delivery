
import { Outlet, Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export const Layout = () => {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-green-600 flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-green-500 outline-none rounded-lg p-1">
            <span className="bg-green-600 text-white p-1.5 rounded-lg">
              <ShoppingCart className="w-5 h-5" />
            </span>
            Ahoum Grocery
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-gray-600 font-medium hover:text-green-600 transition-colors focus-visible:ring-2 focus-visible:ring-green-500 outline-none rounded px-2 py-1">
              Home
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-green-600 transition-colors relative flex items-center p-2 focus-visible:ring-2 focus-visible:ring-green-500 outline-none rounded-lg" aria-label={`Cart with ${totalItems} items`}>
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-green-600 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};
