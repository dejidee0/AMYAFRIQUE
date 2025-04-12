// src/store/cartStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (item) => {
        set((state) => {
          const existingItem = state.cartItems.find((i) => i.id === item.id);
          if (existingItem) {
            return state; // If already in cart, do nothing
          }
          return { cartItems: [...state.cartItems, { ...item, quantity: 1 }] };
        });
      },
      removeFromCart: (itemId) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== itemId),
        }));
      },

      getTotal: () => {
        return get().cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },
      // In cartStore.js
      adjustQuantity: (itemId, newQuantity) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          ),
        }));
      },
      clearCart: () => {
        set({ cartItems: [] });
      },
    }),
    {
      name: "cart-storage",
      getStorage: () => localStorage,
    }
  )
);
