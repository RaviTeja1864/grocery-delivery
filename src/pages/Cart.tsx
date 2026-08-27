import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added any groceries to your cart yet. Browse our catalog to find fresh products.</p>
          <Link 
            to="/" 
            className="bg-green-600 text-white font-semibold py-3 px-8 rounded-xl hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      {/* Cart Items List */}
      <div className="w-full lg:w-2/3">
        <div className="flex justify-between items-end mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <button 
            onClick={clearCart}
            className="text-red-500 text-sm font-medium hover:text-red-700 transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {items.map((item) => (
              <li key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Link to={`/product/${item.id}`} className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="hover:text-green-600 transition-colors">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                  </Link>
                  <p className="text-gray-500 text-sm mb-2">{item.category}</p>
                  <p className="font-bold text-gray-900">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end mt-4 sm:mt-0">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 transition-colors focus-visible:ring-2 focus-visible:ring-green-500 focus:outline-none"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                    </button>
                    <span className="w-10 text-center font-medium text-gray-900" aria-label={`Quantity is ${item.quantity}`}>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-green-500 focus:outline-none"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                    aria-label="Remove item"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Order Summary */}
      <div className="w-full lg:w-1/3">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6 text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal ({totalItems} items)</span>
              <span className="font-medium text-gray-900">${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span className="font-medium text-gray-900">Calculated at checkout</span>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Estimated Total</span>
              <span className="text-2xl font-extrabold text-gray-900">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
          
          <Link 
            to="/checkout"
            className="w-full block text-center bg-green-600 text-white font-semibold py-4 rounded-xl hover:bg-green-700 transition-colors focus:ring-4 focus:ring-green-200 outline-none shadow-md hover:shadow-lg"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};
