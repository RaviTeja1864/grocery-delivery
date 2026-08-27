import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import type { Product } from '../types';
import { api } from '../services/api';
import { ProductCard } from '../components/ProductCard';

export const CategoryListing = () => {
  const { category = 'Produce' } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [loadedCategory, setLoadedCategory] = useState('');

  useEffect(() => {
    let active = true;
    api.getProducts().then((items) => {
      if (active) {
        setProducts(items.filter((item) => category.toLowerCase() === 'dairy' ? ['dairy', 'eggs'].includes(item.category.toLowerCase()) : item.category.toLowerCase() === category.toLowerCase()));
        setLoadedCategory(category);
      }
    }).catch(() => {
      if (active) {
        setError(true);
        setLoadedCategory(category);
      }
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, [category, retryCount]);

  const title = category === 'Produce' ? 'Fresh Fruits & Vegetables' : category;
  const pending = loading || loadedCategory !== category;
  return <div className="animate-rise-in space-y-6"><div className="flex items-center gap-3"><Link to="/explore" className="focus-ring rounded-lg p-2 text-[#26322b]" aria-label="Back to Explore"><ArrowLeft size={20} /></Link><h1 className="text-xl font-extrabold text-[#26322b]">{title}</h1></div>{pending ? <div className="grid grid-cols-2 gap-3">{[1, 2, 3, 4].map((item) => <div key={item} className="h-56 animate-pulse rounded-xl bg-[#eef2ec]" />)}</div> : error ? <div className="rounded-xl border border-[#f4d5c9] bg-[#fff7f3] p-10 text-center text-sm text-[#c86f4e]"><p className="font-bold">Something went wrong</p><button onClick={() => { setLoading(true); setError(false); setRetryCount((count) => count + 1); }} className="focus-ring mt-3 rounded-lg font-bold underline">Retry</button></div> : products.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="rounded-xl bg-white p-10 text-center text-sm text-[#7b867e]">No products in this category yet.</div>}</div>;
};
