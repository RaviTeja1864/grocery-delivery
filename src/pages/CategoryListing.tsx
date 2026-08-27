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

  useEffect(() => {
    api.getProducts().then((items) => setProducts(items.filter((item) => category.toLowerCase() === 'dairy' ? ['dairy', 'eggs'].includes(item.category.toLowerCase()) : item.category.toLowerCase() === category.toLowerCase()))).finally(() => setLoading(false));
  }, [category]);

  const title = category === 'Produce' ? 'Fresh Fruits & Vegetables' : category;
  return <div className="animate-rise-in space-y-6"><div className="flex items-center gap-3"><Link to="/explore" className="focus-ring rounded-lg p-2 text-[#26322b]" aria-label="Back to Explore"><ArrowLeft size={20} /></Link><h1 className="text-xl font-extrabold text-[#26322b]">{title}</h1></div>{loading ? <div className="grid grid-cols-2 gap-3">{[1, 2, 3, 4].map((item) => <div key={item} className="h-56 animate-pulse rounded-xl bg-[#eef2ec]" />)}</div> : products.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="rounded-xl bg-white p-10 text-center text-sm text-[#7b867e]">No products in this category yet.</div>}</div>;
};
