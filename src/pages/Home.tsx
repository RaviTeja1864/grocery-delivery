import { useMemo, useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { useSearchProducts } from '../hooks/useSearchProducts';
import { HorizontalProductRow } from '../components/HorizontalProductRow';
import { SectionHeader } from '../components/SectionHeader';
import { CategoryTile } from '../components/CategoryTile';

const groceryCategories = [
  { name: 'Pulses', category: 'Pantry', image: '/products/pulses.jpg', tone: 'bg-[#fff0df]' },
  { name: 'Rice', category: 'Pantry', image: '/products/rice.jpg', tone: 'bg-[#e9f4e7]' },
  { name: 'Fresh Produce', category: 'Produce', image: '/products/carrots.jpg', tone: 'bg-[#fbe8df]' },
];

export const Home = () => {
  const [query, setQuery] = useState('');
  const { results, loading, error, retry } = useSearchProducts(query);

  const products = useMemo(() => results.filter((product) => product.stock > 0), [results]);
  const exclusive = products.filter((product) => ['Organic Bananas', 'Natural Red Apple', 'Bell Pepper Red', 'Ginger'].includes(product.name));
  const bestSelling = products.filter((product) => ['Natural Red Apple', 'Organic Bananas', 'Mutton', 'Broiler Chicken', 'Fresh Organic Milk'].includes(product.name));
  const groceries = products.filter((product) => ['Mutton', 'Broiler Chicken', 'Rice', 'Pulses'].includes(product.name));
  const produce = products.filter((product) => product.category === 'Produce');
  const dairy = products.filter((product) => ['Dairy', 'Eggs'].includes(product.category));
  const beverages = products.filter((product) => product.category === 'Beverages');
  const bakery = products.filter((product) => ['Bakery', 'Snacks'].includes(product.category));

  return (
    <div className="animate-rise-in space-y-7">
      <section>
        <p className="flex items-center justify-center gap-1 text-[11px] font-semibold text-[#6d786f]"><MapPin size={13} fill="currentColor" />Dhaka, Banassree</p>
        <label className="focus-within:ring-2 focus-within:ring-[#b9e8a6] mt-4 flex items-center gap-2 rounded-xl bg-[#f2f3f1] px-4 py-3"><Search size={18} className="text-[#69746c]" /><input aria-label="Search Store" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Store" className="min-w-0 flex-1 bg-transparent text-xs text-[#26322b] outline-none placeholder:text-[#9ca49d]" /></label>
      </section>

      <section className="relative min-h-32 overflow-hidden rounded-xl bg-[#eef8e9] px-5 py-4">
        <div className="relative z-10 max-w-[58%]"><p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#55a66b]">Fresh picks</p><h1 className="mt-1 text-xl font-extrabold leading-6 text-[#26382b]">Get up to 40% off</h1><p className="mt-1 text-[10px] text-[#718075]">On selected fruits and vegetables</p></div>
        <img src="/products/carrots.jpg" alt="Fresh vegetables" className="absolute -bottom-5 -right-2 h-32 w-40 rounded-full object-cover" />
      </section>

      <section>
        <SectionHeader title="Exclusive Offer" to="/category/Produce" />
        <HorizontalProductRow products={exclusive} loading={loading} />
      </section>

      <section><SectionHeader title="Best Selling" to="/search" /><HorizontalProductRow products={bestSelling} loading={loading} /></section>

      <section>
        <SectionHeader title="Groceries" to="/explore" />
        <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-3">{groceryCategories.map((category) => <CategoryTile key={category.name} {...category} />)}</div>
        <HorizontalProductRow products={groceries} loading={loading} />
      </section>

      <section><SectionHeader title="Fresh Produce" to="/category/Produce" /><HorizontalProductRow products={produce} loading={loading} /></section>
      <section><SectionHeader title="Dairy & Eggs" to="/category/Dairy" /><HorizontalProductRow products={dairy} loading={loading} /></section>
      <section><SectionHeader title="Beverages" to="/category/Beverages" /><HorizontalProductRow products={beverages} loading={loading} /></section>
      <section><SectionHeader title="Bakery & Snacks" to="/category/Bakery" /><HorizontalProductRow products={bakery} loading={loading} /></section>

      {error && <div className="rounded-xl border border-[#f4d5c9] bg-[#fff7f3] p-6 text-center text-[#c86f4e]"><p className="font-bold">Something went wrong</p><button onClick={retry} className="focus-ring mt-2 rounded-lg font-bold underline">Retry</button></div>}
      {!loading && !error && products.length === 0 && <div className="rounded-xl border border-dashed border-[#dce6da] bg-white px-5 py-12 text-center"><Search className="mx-auto mb-3 text-[#b6c1b8]" size={34} /><h3 className="font-extrabold text-[#26322b]">No products found</h3><p className="mt-1 text-sm text-[#8a958d]">Try another search.</p></div>}
    </div>
  );
};
