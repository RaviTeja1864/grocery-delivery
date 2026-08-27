import { useState, useMemo } from 'react';
import { useSearchProducts } from '../hooks/useSearchProducts';
import { api } from '../services/api';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { results, loading, error, setResults } = useSearchProducts(query);
  const [demoStatus, setDemoStatus] = useState<string>('');

  // Extract unique categories from results
  const categories = useMemo(() => {
    const cats = new Set(results.map(p => p.category));
    return Array.from(cats);
  }, [results]);

  // Filter results by category if one is selected
  const displayedResults = useMemo(() => {
    if (!selectedCategory) return results;
    return results.filter(p => p.category === selectedCategory);
  }, [results, selectedCategory]);

  const runStaleResponseDemo = async () => {
    setDemoStatus('Running Demo... Check the console and UI.');
    const slowPromise = new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("❌ SLOW request finished (milk). In a broken app, this would overwrite the screen!");
        resolve();
      }, 1500);
    });

    setTimeout(async () => {
      const fastData = await api.searchProducts('bread');
      console.log("✅ FAST request finished first (bread). Screen updates to bread.");
      setResults(fastData); 
      setDemoStatus('Demo complete. Screen correctly shows Bread, and Milk was ignored!');
    }, 200);

    await slowPromise;
  };

  return (
    <div className="w-full">
      {/* Header and Demo */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fresh Groceries</h1>
          <p className="text-gray-500 mt-1">Delivered directly to your door.</p>
        </div>
        <button 
          onClick={runStaleResponseDemo}
          className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors focus:ring-2 focus:ring-red-500 focus:outline-none"
        >
          Run Stale Response Demo
        </button>
      </div>

      {demoStatus && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 mb-6 rounded-xl shadow-sm">
          {demoStatus}
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full md:flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input 
            type="text"
            placeholder="Search for milk, bananas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
        </div>
        
        {/* Category Pills */}
        <div className="w-full md:w-auto flex overflow-x-auto pb-2 md:pb-0 gap-2 hide-scrollbar">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-green-500 outline-none ${
              selectedCategory === null 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-green-500 outline-none ${
                selectedCategory === cat 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* States: Loading, Error, Empty */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="animate-pulse bg-white border border-gray-100 rounded-2xl p-4 h-80 flex flex-col">
              <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="mt-auto flex justify-between">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center">
          <p className="font-medium text-lg">{error}</p>
          <button 
            onClick={() => setQuery(query)} // trigger re-render/fetch
            className="mt-4 bg-red-100 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && displayedResults.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="text-gray-400 mb-2">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-1">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or category filter.</p>
        </div>
      )}

      {/* Product Grid */}
      {!loading && !error && displayedResults.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
