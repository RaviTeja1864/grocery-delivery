import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react';
import { useSearchProducts } from '../hooks/useSearchProducts';
import { ProductCard } from '../components/ProductCard';

export const Search = () => {
  const [searchParams] = useSearchParams();
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '');
  const activeQuery = query;
  const { results, loading, error, retry } = useSearchProducts(activeQuery);
  const displayed = inStockOnly ? results.filter((product) => product.stock > 0) : results;
  return <div className="animate-rise-in space-y-6">
    <div className="flex items-center gap-2">
      <label className="focus-within:ring-2 focus-within:ring-[#b9e8a6] flex flex-1 items-center gap-2 rounded-xl bg-[#f2f3f1] px-4 py-3">
        <SearchIcon size={18} className="text-[#69746c]" />
        <input autoFocus aria-label="Search products" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Store" className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#9ca49d]" />
      </label>
      <button type="button" onClick={() => { setFilterOpen((current) => !current); setInStockOnly((current) => !current); }} aria-pressed={inStockOnly} aria-expanded={filterOpen} aria-label="Toggle in-stock filter" className={`focus-ring rounded-xl p-3 ${inStockOnly ? 'bg-[#55b978] text-white' : 'bg-[#f2f3f1] text-[#69746c]'}`}>
        <SlidersHorizontal size={18} />
      </button>
    </div>
    {filterOpen && <div className="animate-filter-popover relative hidden items-center justify-between overflow-hidden rounded-xl border border-[#dcefe1] bg-white px-4 py-3 shadow-[0_8px_22px_rgba(46,78,52,0.08)] ring-1 ring-[#f0f8f1] md:flex">
      <span className="absolute inset-y-0 left-0 w-1 bg-[#55b978]" aria-hidden="true" />
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#55b978]">Filters</p>
        <p className="mt-1 text-sm font-bold text-[#26322b]">Availability</p>
      </div>
      <label className="flex items-center gap-2 text-sm font-semibold text-[#4d5951]">
        <input type="checkbox" checked={inStockOnly} onChange={(event) => setInStockOnly(event.target.checked)} className="h-4 w-4 accent-[#55b978]" />
        In stock only
      </label>
    </div>}
    {loading && <div className="grid grid-cols-2 gap-3">{[1, 2, 3, 4].map((item) => <div key={item} className="h-56 animate-pulse rounded-xl bg-[#eef2ec]" />)}</div>}
    {error && <div className="rounded-xl border border-[#f4d5c9] bg-[#fff7f3] p-8 text-center text-[#c86f4e]"><p className="font-bold">Something went wrong</p><button onClick={retry} className="focus-ring mt-3 rounded-lg font-bold underline">Retry</button></div>}
    {!loading && !error && displayed.length === 0 && <div className="rounded-xl bg-white p-12 text-center text-sm text-[#7b867e]">No products found. Try another search.</div>}
    {!loading && !error && displayed.length > 0 && <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{displayed.map((product) => <ProductCard key={product.id} product={product} />)}</div>}
  </div>;
};
