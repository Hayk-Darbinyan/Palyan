import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useCartStore } from "@/stores/useCartStore";
import CartItem from "@/components/molecule/CartItem";
import OrderSummary from "@/components/molecule/OrderSummary";
import Hero from "../molecule/Hero";

const CartPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items } = useCartStore();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/catalog");
  };

  return (
    <div className="pt-7 px-2 sm:px-6 flex flex-col gap-8 bg-[#F8F7F0] min-h-screen">
      <Hero isHome={false} />
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 justify-between">
          {/* Cart Items Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm p-4 lg:p-6">
              <div className="space-y-6">
                {items.length > 0 ? (
                  items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))
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
                    <h3 className="text-xl font-medium text-gray-500 mb-10">
                      {t('cart.emptyTitle')}
                    </h3>
                    <button
                      onClick={handleContinueShopping}
                      className="bg-[#0E99A2] text-white px-6 py-3 rounded-full hover:bg-[#0d8a92] transition-colors"
                    >
                      {t('cart.browseProducts')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-1/3">
            <OrderSummary
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;