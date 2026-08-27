import { useState, type FormEvent } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { CategoryTile } from '../components/CategoryTile';
const categories = [
  { name: 'Fresh Fruits & Vegetables', category: 'Produce', image: '/products/carrots.jpg', tone: 'bg-[#e6f5e9]' },
  { name: 'Cooking Oil & Ghee', category: 'Pantry', image: '/products/cooking-oil.jpg', tone: 'bg-[#fff1df]' },
  { name: 'Meat & Fish', category: 'Meat', image: '/products/beef-bone.jpg', tone: 'bg-[#ffe7e2]' },
  { name: 'Bakery & Snacks', category: 'Bakery', image: '/products/bread.jpg', tone: 'bg-[#f2e6f8]' },
  { name: 'Dairy & Eggs', category: 'Dairy', image: '/products/egg-chicken-white.jpg', tone: 'bg-[#fff5d9]' },
  { name: 'Beverages', category: 'Beverages', image: '/products/sprite.jpg', tone: 'bg-[#e3f3f8]' },
];

export const Explore = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`);
  };

  return <div className="animate-rise-in space-y-6">
    <div>
      <h1 className="text-2xl font-extrabold tracking-[-0.04em] text-[#26322b]">Find Products</h1>
      <form onSubmit={submitSearch} className="focus-within:ring-2 focus-within:ring-[#b9e8a6] mt-5 flex items-center gap-2 rounded-xl bg-[#f2f3f1] px-4 py-3"><Search size={18} className="text-[#69746c]" /><input aria-label="Search products" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Store" className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#9ca49d]" /></form>
    </div>
    <section>
      <h2 className="mb-4 text-lg font-extrabold text-[#26322b]">Shop by category</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => <CategoryTile key={category.category} {...category} />)}
      </div>
    </section>
  </div>;
};
