import { useState, useEffect } from 'react';
import type { Product } from '../types';
import { api } from '../services/api';

export const useSearchProducts = (query: string) => {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This is the core fix for "Stale Responses".
    // When the query changes, the previous useEffect run will call its cleanup function,
    // setting ignore = true for the old request.
    let ignore = false;

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = query.trim() === '' 
          ? await api.getProducts() 
          : await api.searchProducts(query);
          
        // Only update state if this request is still the most recent one
        if (!ignore) {
          setResults(data);
        } else {
          console.log(`[Stale Response Prevented] Ignored results for: "${query}"`);
        }
      } catch (err) {
        if (!ignore) {
          setError('Failed to fetch products. Please try again.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchResults();

    return () => {
      ignore = true; // Cleanup function that marks this run as stale
    };
  }, [query]);

  return { results, loading, error, setResults };
};
