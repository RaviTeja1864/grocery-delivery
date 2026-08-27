import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product } from '../types';
import { api } from '../services/api';
import { useCartStore } from '../store/cartStore';

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (!id) return;
    
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await api.getProductById(id);
        if (data) {
          setProduct(data);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 flex flex-col md:flex-row gap-8 animate-pulse">
        <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded-2xl"></div>
        <div className="w-full md:w-1/2 flex flex-col gap-4 pt-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-12 bg-gray-200 rounded w-1/3 my-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-12 bg-gray-200 rounded w-full mt-6"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{error}</h2>
        <Link to="/" className="text-green-600 hover:underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-green-600 mb-6 transition-colors">
        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Catalog
      </Link>
      
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2 relative rounded-2xl overflow-hidden bg-gray-50">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover max-h-[500px]"
          />
          {product.stock === 0 && (
            <div className="absolute top-4 right-4 bg-red-500 text-white font-bold px-4 py-2 rounded-full shadow-md">
              Out of Stock
            </div>
          )}
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <p className="text-green-600 font-semibold uppercase tracking-wider mb-2">{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="text-4xl font-extrabold text-gray-900 mb-6">
            ${product.price.toFixed(2)}
          </div>
          
          <div className="prose text-gray-600 mb-8">
            <p className="text-lg leading-relaxed">{product.description}</p>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 bg-gray-50 p-4 rounded-xl">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{product.stock > 0 ? `${product.stock} items available in stock` : 'Currently unavailable'}</span>
          </div>

          <button 
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
            className="w-full bg-green-600 text-white text-lg font-semibold py-4 rounded-xl hover:bg-green-700 transition-colors focus:ring-4 focus:ring-green-200 outline-none disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg disabled:shadow-none"
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};
