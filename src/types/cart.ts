export interface CartItem {
    id: string | number;
    name: string;
    description: string;
    lorem1: string;
    lorem2: string;
    price: number;
    quantity: number;
    image?: string;
    category?: string;
  }
  
  export interface CartState {
    items: CartItem[];
    subtotal: number;
    discount: number;
    deliveryFee: number;
    total: number;
    clearCart: () => void;
    applyPromoCode: (code: string) => void;
    updateQuantity: (id: string | number, quantity: number) => void;
    increaseQuantity: (id: string | number) => void;
    decreaseQuantity: (id: string | number) => void;
    removeItem: (id: string | number) => void;
  }