import type { Product } from '../types';
import productsData from '../data/products.json';

// Helper to simulate network latency between 200ms and 1200ms
const delay = (min = 200, max = 1200) => {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const api = {
  // Fetch all products
  getProducts: async (): Promise<Product[]> => {
    await delay();
    return productsData as Product[];
  },

  // Fetch a single product by ID
  getProductById: async (id: string): Promise<Product | undefined> => {
    await delay();
    return (productsData as Product[]).find(p => p.id === id);
  },

  // Search products by name or category
  searchProducts: async (query: string): Promise<Product[]> => {
    await delay(); // Simulates the network request
    const lowerQuery = query.toLowerCase();
    
    return (productsData as Product[]).filter(
      p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.category.toLowerCase().includes(lowerQuery)
    );
  }
};
