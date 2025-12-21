import { useState } from "react";
import { useNavigate } from "react-router";
import { useCartStore } from "@/stores/useCartStore";
import CartItem from "@/components/molecule/CartItem";
import OrderSummary from "@/components/molecule/OrderSummary";
import Hero from "../molecule/Hero";

const CartPage = () => {
  const navigate = useNavigate();
  const { items } = useCartStore();
  const [promoCode, setPromoCode] = useState("");

  const handleApplyPromo = () => {
    if (promoCode) {
      alert(`Promo code "${promoCode}" applied!`);
      setPromoCode("");
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/catalog");
  };

  return (
    <div className="pt-7 px-2 sm:px-6 flex flex-col gap-8 bg-[#F8F7F0]">
      <Hero isHome={false} />
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 justify-between">
          {/* Cart Items Section */}
          <div className="flex-2/3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="space-y-6">
                {items.length > 0 ? (
                  items.map((item) => <CartItem key={item.id} item={item} />)
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-500 mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Add some products to get started
                    </p>
                    <button
                      onClick={handleContinueShopping}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Browse Products
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="">
            <OrderSummary
              promoCode={promoCode}
              onPromoCodeChange={setPromoCode}
              onApplyPromo={handleApplyPromo}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
