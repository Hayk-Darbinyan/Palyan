import React, { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/stores/useCartStore';
import { useTranslation } from 'react-i18next';

interface CartItemProps {
  item: {
    id: number;
    product: {
      id: number;
      name: string;
      price: number;
      image: string;
    };
    quantity: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { t } = useTranslation();
  const { removeItem, increaseQuantity, decreaseQuantity, updateQuantity } = useCartStore();
  const [isRemoving, setIsRemoving] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(item.quantity.toString());

  const handleIncrease = () => {
    increaseQuantity(item.product.id);
    setLocalQuantity((item.quantity + 1).toString());
  };

  const handleDecrease = () => {
    decreaseQuantity(item.product.id);
    setLocalQuantity((item.quantity - 1).toString());
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuantity(value);
    
    const newQuantity = parseInt(value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      updateQuantity(item.product.id, newQuantity);
    } else if (value === '') {
      // Allow empty input temporarily
    } else {
      setLocalQuantity(item.quantity.toString());
    }
  };

  const handleBlur = () => {
    if (localQuantity === '' || parseInt(localQuantity) < 1) {
      setLocalQuantity('1');
      updateQuantity(item.product.id, 1);
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeItem(item.product.id);
    }, 300);
  };

  const subtotal = item.product.price * item.quantity;

  return (
    <div className={`flex gap-4 p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-all duration-300 ${
      isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
    }`}>
      {/* Product Image */}
      <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
        <img 
          src={item.product.image || '/placeholder-product.jpg'} 
          alt={item.product.name} 
          className="w-20 h-20 object-contain rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        {/* Header with title and delete */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl text-black">
            {item.product.name}
          </h3>
          <button
            onClick={handleRemove}
            className="text-[#FF3333] hover:text-red-700 transition-colors ml-4"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {/* Lorem details (if you have them) */}
        <div className="space-y-1 mb-4">
          {/* You can add product description here if available */}
        </div>

        {/* Price and Quantity Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-bold text-black">
              ${subtotal.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">
              (${item.product.price.toFixed(2)} {t('cart.each')})
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 py-3 bg-[#F0F0F0] rounded-full px-5">
              <button
                onClick={handleDecrease}
                className="w-5 h-5 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={item.quantity <= 1}
                aria-label={t('cart.decrease')}
              >
                <Minus className="w-4 h-4 text-black" />
              </button>
              
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={localQuantity}
                  onChange={handleQuantityChange}
                  onBlur={handleBlur}
                  className="w-16 text-center bg-transparent border-none outline-none text-sm font-medium text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <div className="absolute inset-0 -z-10 bg-transparent"></div>
              </div>
              
              <button
                onClick={handleIncrease}
                className="w-5 h-5 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors"
                aria-label={t('cart.increase')}
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