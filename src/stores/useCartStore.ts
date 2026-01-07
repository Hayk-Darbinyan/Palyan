import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartProduct, CartItem, CartState } from "@/types/cart";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      discount: 0,
      deliveryFee: 15, // Fixed delivery fee
      total: 0,

      // Helper to recalculate totals
      recalculateTotals: (
        items: CartItem[],
        discount: number,
        deliveryFee: number
      ) => {
        const subtotal = items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        const total = subtotal - discount + deliveryFee;
        return { subtotal, total };
      },

      // Get total item count
      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      // Add item to cart
      addItem: (product: CartProduct, quantity: number = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.product.id === product.id
          );

          let newItems: CartItem[];

          if (existingItemIndex > -1) {
            // Update quantity if item exists
            newItems = state.items.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            // Add new item
            const newItem: CartItem = {
              id: product.id,
              product: {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
              },
              quantity,
            };
            newItems = [...state.items, newItem];
          }

          const { subtotal, total } = get().recalculateTotals(
            newItems,
            state.discount,
            state.deliveryFee
          );

          return {
            items: newItems,
            subtotal,
            total,
          };
        });
      },

      // Remove item from cart
      removeItem: (productId: number) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== productId);
          const { subtotal, total } = get().recalculateTotals(
            newItems,
            state.discount,
            state.deliveryFee
          );

          return {
            items: newItems,
            subtotal,
            total,
          };
        });
      },

      // Update item quantity
      updateQuantity: (productId: number, quantity: number) => {
        if (quantity < 1) {
          get().removeItem(productId);
          return;
        }

        set((state) => {
          const newItems = state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          );

          const { subtotal, total } = get().recalculateTotals(
            newItems,
            state.discount,
            state.deliveryFee
          );

          return {
            items: newItems,
            subtotal,
            total,
          };
        });
      },

      // Increase quantity by 1
      increaseQuantity: (productId: number) => {
        set((state) => {
          const newItems = state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );

          const { subtotal, total } = get().recalculateTotals(
            newItems,
            state.discount,
            state.deliveryFee
          );

          return {
            items: newItems,
            subtotal,
            total,
          };
        });
      },

      // Decrease quantity by 1
      decreaseQuantity: (productId: number) => {
        set((state) => {
          const item = state.items.find((item) => item.id === productId);
          if (!item) return state;

          if (item.quantity <= 1) {
            // Remove the item by filtering it out
            const newItems = state.items.filter(
              (item) => item.id !== productId
            );
            const { subtotal, total } = get().recalculateTotals(
              newItems,
              state.discount,
              state.deliveryFee
            );

            return {
              items: newItems,
              subtotal,
              total,
            };
          }

          const newItems = state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );

          const { subtotal, total } = get().recalculateTotals(
            newItems,
            state.discount,
            state.deliveryFee
          );

          return {
            items: newItems,
            subtotal,
            total,
          };
        });
      },

      // Clear entire cart
      clearCart: () => {
        set({
          items: [],
          subtotal: 0,
          discount: 0,
          total: 0,
        });
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            // Recalculate totals after rehydration
            const subtotal = state.items.reduce(
              (sum, item) => sum + item.product.price * item.quantity,
              0
            );
            const total = subtotal - state.discount + state.deliveryFee;
            state.subtotal = subtotal;
            state.total = total;
          }
        };
      },
    }
  )
);
