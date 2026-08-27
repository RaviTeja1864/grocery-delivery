import { useState, useEffect, useRef, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check } from 'lucide-react';
import type { Product } from '../types';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const [imageFailed, setImageFailed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAddToCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent navigating to detail page if clicked on button
    addItem(product);
    setExpanded(true);
    // Clear any existing timer so rapid clicks reset the collapse delay
    if (collapseTimer.current) clearTimeout(collapseTimer.current);
    collapseTimer.current = setTimeout(() => setExpanded(false), 1400);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (collapseTimer.current) clearTimeout(collapseTimer.current);
    };
  }, []);

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
          <p className="text-sm font-extrabold text-[#26322b]">${product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            aria-label={expanded ? `${product.name} added to cart` : `Add ${product.name} to cart`}
            style={{
              width: expanded ? 110 : 32,
              borderRadius: expanded ? 10 : 9999,
              transform: expanded ? 'scale(1)' : undefined,
              transition: 'width 250ms cubic-bezier(.4,0,.2,1), border-radius 250ms cubic-bezier(.4,0,.2,1), transform 120ms ease',
            }}
            className="focus-ring flex h-8 shrink-0 items-center justify-center gap-1 overflow-hidden bg-[#55b978] text-white hover:bg-[#429e65] disabled:bg-[#d7ddd8] active:scale-90"
          >
            {expanded ? (
              <>
                <Check size={14} strokeWidth={3} className="shrink-0" />
                <span className="whitespace-nowrap text-[11px] font-semibold">Added to Cart</span>
              </>
            ) : (
              <Plus size={18} />
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};
