export interface CartProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface CartItem {
  id: number;
  product: CartProduct;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  
  // Methods
  addItem: (product: CartProduct, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  recalculateTotals: (items: CartItem[], discount: number, deliveryFee: number) => { subtotal: number, total: number };
}