import { Link } from 'react-router-dom';

export const CheckoutSuccess = () => {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center">
      <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 flex flex-col items-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 mb-8 max-w-md">
          Thank you for shopping with Ahoum Grocery. Your order has been successfully placed and will be processed shortly.
        </p>
        <Link 
          to="/" 
          className="bg-green-600 text-white font-semibold py-3 px-8 rounded-xl hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};
