import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '@/types/cart';
import { useCartStore } from '@/stores/useCartStore';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCartStore();

  const handleIncrease = () => increaseQuantity(item.id);
  const handleDecrease = () => decreaseQuantity(item.id);
  const handleRemove = () => removeItem(item.id);

  return (
    <div className="flex gap-4 p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
      {/* Product Image */}
      <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-20 h-20 object-cover rounded-lg"
          />
        ) : (
          <div className="w-20 h-20 bg-linear-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-300">P</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1">
        {/* Header with title and delete */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl text-black">
            {item.name}
          </h3>
          <button
            onClick={handleRemove}
            className="text-[#FF3333]"
            aria-label="Remove item"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {/* Lorem details */}
        <div className="space-y-1 mb-4">
          <p className="text-[#00000099] text-sm">{item.lorem1}</p>
          <p className="text-[#00000099] text-sm">{item.lorem2}</p>
        </div>

        {/* Price and Quantity Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-2xl font-bold text-black">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 py-3 bg-[#F0F0F0] rounded-full px-5">
              <button
                onClick={handleDecrease}
                className="w-5 h-5 flex items-center justify-center"
                disabled={item.quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4 text-black" />
              </button>
              
              <span className="text-center text-sm font-medium leading-[100%] text-black">
                {item.quantity}
              </span>
              
              <button
                onClick={handleIncrease}
                className="w-5 h-5 flex items-center justify-center"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;