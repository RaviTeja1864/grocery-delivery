import { useEffect, useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { api } from '../services/api';
import { useCartStore } from '../store/cartStore';
import { useFavoritesStore } from '../store/favoritesStore';
import { ProductCard } from '../components/ProductCard';

export const Favorites = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const favoriteIds = useFavoritesStore((state) => state.productIds);
  const addItem = useCartStore((state) => state.addItem);
  useEffect(() => { api.getProducts().then((items) => setProducts(items.filter((item) => favoriteIds.includes(item.id)))); }, [favoriteIds]);
  const favorites = products.filter((product) => favoriteIds.includes(product.id));
  return <div className="animate-rise-in space-y-6"><div className="flex items-center justify-between"><h1 className="text-2xl font-extrabold tracking-[-0.04em] text-[#26322b]">Favourite</h1>{favorites.length > 0 && <button onClick={() => favorites.forEach(addItem)} className="focus-ring flex items-center gap-2 rounded-xl bg-[#55b978] px-4 py-3 text-xs font-bold text-white"><ShoppingCart size={16} />Add all to cart</button>}</div>{favorites.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{favorites.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="rounded-xl bg-white px-6 py-14 text-center"><Heart className="mx-auto mb-3 text-[#55b978]" size={32} /><h2 className="font-bold text-[#26322b]">Nothing here yet</h2><p className="mt-1 text-sm text-[#7b867e]">Save products you love to find them quickly.</p><Link to="/" className="focus-ring mt-5 inline-block rounded-xl bg-[#55b978] px-5 py-3 text-xs font-bold text-white">Start shopping</Link></div>}</div>;
};
