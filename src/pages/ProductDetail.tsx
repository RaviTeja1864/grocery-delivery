import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import type { Product } from '../types';
import { api } from '../services/api';
import { useCartStore } from '../store/cartStore';
import { useFavoritesStore } from '../store/favoritesStore';

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const cartItem = useCartStore((state) => state.items.find((item) => item.id === id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => id ? state.productIds.includes(id) : false);

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
      } catch {
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
    <div className="mx-auto max-w-5xl">
      <div className="mb-4 flex items-center justify-between"><Link to="/" className="focus-ring rounded-lg p-2 text-[#26322b]" aria-label="Back to shop"><ArrowLeft size={20} /></Link><button onClick={() => id && toggleFavorite(id)} className={`focus-ring rounded-full p-2 ${isFavorite ? 'text-[#55b978]' : 'text-[#7d8980]'}`} aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}><Heart size={21} fill={isFavorite ? 'currentColor' : 'none'} /></button></div>
      <div className="overflow-hidden rounded-2xl border border-[#edf0ec] bg-white md:grid md:grid-cols-2">
        <div className="relative aspect-square bg-[#f2f6ef]">
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-cover"
          />
          {product.stock === 0 && (
            <div className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#d86f4d] shadow-sm">
              Out of Stock
            </div>
          )}
        </div>
        
        <div className="flex flex-col p-5 sm:p-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#55b978]">{product.category}</p>
          <h1 className="mb-2 text-3xl font-extrabold leading-tight tracking-[-0.05em] text-[#26322b]">{product.name}</h1>
          <p className="mb-4 text-xs text-[#89948c]">{product.unit}</p>
          <div className="mb-5 flex items-center justify-between text-2xl font-extrabold text-[#26322b]">
            ${product.price.toFixed(2)}
            <div className="flex items-center rounded-xl border border-[#e2eae0] text-sm"><button onClick={() => cartItem && updateQuantity(product.id, cartItem.quantity - 1)} className="focus-ring rounded-l-xl p-2 text-[#77827a]" aria-label="Decrease quantity"><Minus size={15} /></button><span className="w-7 text-center">{cartItem?.quantity ?? 1}</span><button onClick={() => cartItem ? updateQuantity(product.id, cartItem.quantity + 1) : addItem(product)} disabled={cartItem?.quantity === product.stock} className="focus-ring rounded-r-xl p-2 text-[#55b978] disabled:opacity-40" aria-label="Increase quantity"><Plus size={15} /></button></div>
          </div>
          
          <div className="mb-8 text-[#7b867e]">
            <p className="text-sm leading-6">{product.description}</p>
          </div>
          
          <div className="mb-6 flex items-center gap-3 rounded-2xl bg-[#f2f8ef] p-4 text-sm text-[#718075]">
            <Check className="text-[#55b978]" size={19} />
            <span>{product.stock > 0 ? `${product.stock} items available in stock` : 'Currently unavailable'}</span>
          </div>

          <button
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
            className="focus-ring flex w-full items-center justify-center gap-2 rounded-2xl bg-[#55b978] py-4 text-sm font-bold text-white shadow-[0_8px_18px_rgba(85,185,120,0.2)] hover:bg-[#429e65] disabled:bg-[#d7ddd8] disabled:shadow-none"
          >
            <ShoppingCart size={18} />{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};
