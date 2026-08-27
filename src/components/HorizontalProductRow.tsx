import type { Product } from '../types';
import { ProductCard } from './ProductCard';

interface HorizontalProductRowProps {
  products: Product[];
  loading?: boolean;
}

export const HorizontalProductRow = ({ products, loading = false }: HorizontalProductRowProps) => {
  if (loading) return <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-2">{[1, 2, 3].map((item) => <div key={item} className="h-60 w-[158px] shrink-0 animate-pulse rounded-xl bg-[#eef2ec]" />)}</div>;
  if (products.length === 0) return <p className="rounded-xl bg-white p-6 text-center text-xs text-[#89948c]">No products available right now.</p>;
  return <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible">{products.map((product) => <div key={product.id} className="w-[158px] shrink-0 md:w-auto"><ProductCard product={product} /></div>)}</div>;
};
