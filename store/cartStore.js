import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (item) => {
        const existing = get().cartItems.find(p => p.id === item.id);
        if (existing) {
          set({
            cartItems: get().cartItems.map(p =>
              p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
            ),
          });
        } else {
          set({
            cartItems: [...get().cartItems, { ...item, quantity: 1 }],
          });
        }
      },

      removeFromCart: (id) => {
        set({
          cartItems: get().cartItems.filter(item => item.id !== id),
        });
      },

      updateQuantity: (id, qty) => {
        set({
          cartItems: get().cartItems.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
          ),
        });
      },

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: 'cart-storage',
      getStorage: () => localStorage,
    }
  )
);