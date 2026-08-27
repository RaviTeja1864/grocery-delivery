import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export const Checkout = () => {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate an API call for checkout (variable latency)
    setTimeout(() => {
      setLoading(false);
      // Simulate a random failure (10% chance) just to show the error state
      if (Math.random() < 0.1) {
        navigate('/checkout/failure');
      } else {
        clearCart();
        navigate('/checkout/success');
      }
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <Link to="/" className="text-green-600 font-semibold hover:underline">
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#91a098]">Almost there</p><h1 className="mt-1 text-3xl font-extrabold tracking-[-0.05em] text-[#26322b]">Checkout</h1><p className="mt-2 text-sm text-[#7b867e]">Complete your order securely.</p>
      </div>

      <div className="rounded-[26px] border border-[#e6eee3] bg-white p-5 shadow-[0_8px_30px_rgba(46,78,52,0.05)] sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 flex items-start gap-3">
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <h2 className="border-b border-[#edf2eb] pb-3 text-lg font-extrabold text-[#26322b]">Shipping information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-bold text-[#657269]">First name</label>
                  <input required type="text" className="focus-ring w-full rounded-xl border border-[#dfe9dc] px-4 py-3 text-sm outline-none focus:border-[#55b978]" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-[#657269]">Last name</label>
                  <input required type="text" className="focus-ring w-full rounded-xl border border-[#dfe9dc] px-4 py-3 text-sm outline-none focus:border-[#55b978]" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input required type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
              <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" />
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-100">
            <h2 className="mb-4 text-lg font-extrabold text-[#26322b]">Payment</h2>
            <div className="rounded-2xl border border-[#e6eee3] bg-[#f7faf6] p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Total to pay</span>
                <span className="text-2xl font-bold text-gray-900">${totalAmount.toFixed(2)}</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Credit Card Number</label>
                <input required type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none mb-3" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input required type="text" placeholder="MM/YY" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input required type="text" placeholder="123" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" />
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="focus-ring flex w-full items-center justify-center gap-2 rounded-2xl bg-[#55b978] py-4 text-sm font-bold text-white shadow-[0_8px_18px_rgba(85,185,120,0.2)] hover:bg-[#429e65] disabled:bg-[#bfc9c0]"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              `Pay $${totalAmount.toFixed(2)}`
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
