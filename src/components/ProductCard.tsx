import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Check, Plus } from 'lucide-react';
import type { Product } from '../types';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const [imageFailed, setImageFailed] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const addedResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (addedResetTimer.current) clearTimeout(addedResetTimer.current);
  }, []);

  const handleAddToCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent navigating to detail page if clicked on button
    addItem(product);
    setJustAdded(true);
    if (addedResetTimer.current) clearTimeout(addedResetTimer.current);
    addedResetTimer.current = setTimeout(() => setJustAdded(false), 1250);
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="focus-ring group flex h-full flex-col rounded-xl border border-[#edf0ec] bg-white p-2.5 shadow-[0_3px_14px_rgba(46,78,52,0.04)] transition hover:-translate-y-0.5"
    >
      <div className="relative mb-3 flex aspect-square shrink-0 items-center justify-center overflow-hidden rounded-[18px] bg-[#f2f6ef]">
        {!imageFailed ? <img
          src={product.image} 
          alt={product.name} 
          onError={() => setImageFailed(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        /> : <span className="px-4 text-center text-xs font-bold text-[#789078]">Image unavailable</span>}
        {product.stock === 0 && (
          <div className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-[#d86f4d]">
            Sold out
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-grow">
        <p className="mb-0.5 truncate text-[10px] text-[#9ca69e]">{product.category} · {product.unit}</p>
        <h2 className="mb-3 line-clamp-2 text-[13px] font-bold leading-4 text-[#26322b]">{product.name}</h2>
        <div className="mt-auto flex items-center justify-between gap-2">
          <p className="shrink-0 text-sm font-extrabold text-[#26322b]">${product.price.toFixed(2)}</p>
          <div className="flex min-w-0 flex-1 justify-end">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              aria-label={justAdded ? `Added ${product.name} to cart` : `Add ${product.name} to cart`}
              className={`focus-ring relative flex h-8 w-full items-center justify-center overflow-hidden rounded-full bg-[#55b978] text-white transition-[max-width,transform,background-color] duration-250 ease-out hover:bg-[#429e65] active:scale-95 motion-reduce:transition-none disabled:bg-[#d7ddd8] ${justAdded ? 'max-w-full' : 'max-w-8'}`}
            >
              <span className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out motion-reduce:transition-none ${justAdded ? 'scale-75 opacity-0' : 'scale-100 opacity-100'}`} aria-hidden="true">
                <Plus size={18} />
              </span>
              <span className={`absolute inset-0 flex min-w-0 items-center justify-center gap-1.5 px-2 text-xs font-bold transition-all duration-200 ease-out motion-reduce:transition-none ${justAdded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`} aria-hidden="true">
                <Check className="shrink-0" size={16} />
                <span className="truncate">Added to Cart</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
