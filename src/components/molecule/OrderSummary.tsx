import React from 'react';
import { Tag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/stores/useCartStore';

interface OrderSummaryProps {
  promoCode: string;
  onPromoCodeChange: (code: string) => void;
  onApplyPromo: () => void;
  onCheckout: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  promoCode,
  onPromoCodeChange,
  onApplyPromo,
  onCheckout,
}) => {
  const { items, deliveryFee } = useCartStore();

  const calculatedSubtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const calculatedDiscount = calculatedSubtotal * 0.2;
  const calculatedTotal = calculatedSubtotal - calculatedDiscount + deliveryFee;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
      <h2 className="text-2xl  leading-[100%] text-black mb-6">Order Summary</h2>
      
      {/* Order Details */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-[20px] leading-[100%] text-[#00000099]">Subtotal</span>
          <span className="font-bold text-xl leading-[100%] text-black">${calculatedSubtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-[20px] leading-[100%] text-[#00000099]">Discount (-20%)</span>
          <span className="font-bold text-xl leading-[100%] text-green-600">-${calculatedDiscount.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-[20px] leading-[100%] text-[#00000099]">Delivery Fee</span>
          <span className="font-bold text-xl leading-[100%] text-black">${deliveryFee.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-xl leading-[100%] text-black">Total</span>
            <span className="font-bold text-2xl leading-[100%] text-black">
              ${calculatedTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Promo Code Input */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Tag className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Add promo code</span>
        </div>
        <div className="flex gap-2 h-12">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => onPromoCodeChange(e.target.value)}
            placeholder="Enter promo code"
            className="flex-1 px-3 py-4 rounded-[20px] focus:outline-none focus:ring-2 bg-[#F0F0F0]"
          />
          <button
            onClick={onApplyPromo}
            className="bg-[#0E99A2] rounded-[20px] py-3 px-4 font-medium text-base leading-[100%] text-white"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="w-full bg-[#0E99A2] rounded-[20px] flex justify-center items-center gap-2 py-4 font-medium text-base leading-[100%] text-white"
      >
        Go to Checkout
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default OrderSummary;