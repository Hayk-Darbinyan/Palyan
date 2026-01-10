import React, { useState } from "react";
import { Tag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface OrderSummaryProps {
  onCheckout: (email: string) => void | Promise<void>;
  isLoading?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ onCheckout, isLoading = false }) => {
  const { t } = useTranslation();
  const { items, subtotal, deliveryFee, total } = useCartStore();
  const [email, setEmail] = useState("");

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error(t("cart.emptyCart"));
      return;
    }

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    onCheckout(email);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl leading-[100%] text-black">
          {t("cart.orderSummary")}
        </h2>
      </div>

      {/* Order Summary Details */}
      <div className="space-y-4 mb-6">
        {/* Items Count */}
        <div className="flex justify-between items-center">
          <span className="text-[20px] leading-[100%] text-[#00000099]">
            {t("cart.items")} ({itemCount})
          </span>
          <span className="font-bold text-xl leading-[100%] text-black">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {/* Delivery Fee */}
        <div className="flex justify-between items-center">
          <span className="text-[20px] leading-[100%] text-[#00000099]">
            {t("cart.deliveryFee")}
          </span>
          <span className="font-bold text-xl leading-[100%] text-black">
            ${deliveryFee.toFixed(2)}
          </span>
        </div>

        {/* Total */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-xl leading-[100%] text-black">
              {t("cart.total")}
            </span>
            <span className="font-bold text-2xl leading-[100%] text-black">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Tag className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">
            {t("cart.enterEmail")}
          </span>
        </div>
        <div className="flex gap-2">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F0F0F0]"
          />
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={items.length === 0 || isLoading}
        className="w-full bg-[#0E99A2] disabled:bg-gray-400 disabled:cursor-not-allowed rounded-[20px] flex justify-center items-center gap-2 py-4 font-medium text-base leading-[100%] text-white hover:bg-[#0d8a92] transition-colors"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          <>
            {t("cart.goToCheckout")}
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </div>
  );
};

export default OrderSummary;
