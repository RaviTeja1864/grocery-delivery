import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  syncCart: (freshProducts: Product[]) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      
      addItem: (product) => 
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
                  : item
              ),
            };
          }
          if (product.stock > 0) {
            return { items: [...state.items, { ...product, quantity: 1 }] };
          }
          return state;
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === productId) {
              const newQuantity = Math.max(1, Math.min(quantity, item.stock));
              return { ...item, quantity: newQuantity };
            }
            return item;
          }),
        })),

      clearCart: () => set({ items: [] }),

      // This function fixes the cart using fresh data from the server
      syncCart: (freshProducts) => 
        set((state) => {
          const validItems: CartItem[] = [];

          for (const cartItem of state.items) {
            const freshProduct = freshProducts.find(p => p.id === cartItem.id);
            
            // 1. If product no longer exists, skip it (removes from cart)
            // 3. If stock became 0, skip it (removes from cart)
            if (!freshProduct || freshProduct.stock === 0) continue;

            // 2. Price changes (take fresh price)
            // 4. Quantity exceeds stock (cap it)
            const syncedItem: CartItem = {
              ...freshProduct,
              quantity: Math.min(cartItem.quantity, freshProduct.stock)
            };

            validItems.push(syncedItem);
          }

          return { items: validItems };
        })
    }),
    {
      name: 'ahoum-cart-storage', // name of the item in localStorage
    }
  )
);
