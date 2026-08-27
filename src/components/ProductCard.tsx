import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to detail page if clicked on button
    addItem(product);
    // In a real app we might show a toast notification here
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-lg hover:border-green-300 transition-all bg-white flex flex-col h-full group focus-visible:ring-2 focus-visible:ring-green-500 outline-none"
    >
      <div className="relative overflow-hidden rounded-xl mb-4 bg-gray-50 flex-shrink-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Out of Stock
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-grow">
        <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{product.category}</p>
        <h2 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">{product.name}</h2>
        <div className="mt-auto flex items-center justify-between">
          <p className="font-bold text-xl text-gray-900">${product.price.toFixed(2)}</p>
          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500 outline-none disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
      </div>
    </Link>
  );
};
