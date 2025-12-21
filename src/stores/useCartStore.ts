import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, CartState } from '@/types/cart';

const initialItems: CartItem[] = [
  {
    id: 1,
    name: "Lorem Ipsum dolor sit amet",
    description: "Product description here",
    lorem1: "Lorem: ipsum",
    lorem2: "lorem: ipsum",
    price: 145,
    quantity: 1,
    image: "/api/placeholder/80/80"
  },
  {
    id: 2,
    name: "Lorem Ipsum dolor sit amet",
    description: "Product description here",
    lorem1: "Lorem: ipsum",
    lorem2: "lorem: ipsum",
    price: 145,
    quantity: 1,
    image: "/api/placeholder/80/80"
  },
  {
    id: 3,
    name: "Lorem Ipsum dolor sit amet",
    description: "Product description here",
    lorem1: "Lorem: ipsum",
    lorem2: "lorem: ipsum",
    price: 145,
    quantity: 1,
    image: "/api/placeholder/80/80"
  }
];

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: initialItems,
      subtotal: 435,
      discount: 87,
      deliveryFee: 15,
      total: 363,

      // Calculate derived values
      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      // Add item to cart
      addItem: (item: Omit<CartItem, 'quantity' | 'id'> & { id?: string | number }) => {
        const items = get().items;
        const existingItem = items.find(i => i.id === item.id);
        
        if (existingItem) {
          // Increase quantity if item exists
          return set({
            items: items.map(i => 
              i.id === item.id 
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          });
        } else {
          // Add new item
          return set({
            items: [...items, { ...item, quantity: 1, id: item.id || Date.now() }]
          });
        }
      },

      // Remove item from cart
      removeItem: (id: string | number) => {
        set({
          items: get().items.filter(item => item.id !== id)
        });
      },

      // Update item quantity
      updateQuantity: (id: string | number, quantity: number) => {
        if (quantity < 1) {
          get().removeItem(id);
          return;
        }

        set({
          items: get().items.map(item => 
            item.id === id 
              ? { ...item, quantity }
              : item
          )
        });
      },

      // Increase quantity by 1
      increaseQuantity: (id: string | number) => {
        const items = get().items;
        set({
          items: items.map(item => 
            item.id === id 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        });
      },

      // Decrease quantity by 1
      decreaseQuantity: (id: string | number) => {
        const items = get().items;
        set({
          items: items.map(item => 
            item.id === id 
              ? { ...item, quantity: Math.max(1, item.quantity - 1) }
              : item
          )
        });
      },

      // Clear entire cart
      clearCart: () => {
        set({ items: [] });
      },

      // Apply promo code (simplified)
      applyPromoCode: (code: string) => {
        if (code.toLowerCase() === "discount20") {
          set({ discount: 87 });
        }
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);