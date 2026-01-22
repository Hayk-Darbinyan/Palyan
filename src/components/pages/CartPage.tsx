import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import { useCartStore } from "@/stores/useCartStore";
import CartItem from "@/components/molecule/CartItem";
import OrderSummary from "@/components/molecule/OrderSummary";
import { EMAILJS_CONFIG } from "@/config/emailjsConfig";

const CartPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCheckout = async (userEmail: string) => {
    setCheckoutLoading(true);
    setCheckoutMessage(null);

    try {
      // Initialize EmailJS if not already initialized
      if (
        EMAILJS_CONFIG.publicKey &&
        EMAILJS_CONFIG.publicKey !== "YOUR_PUBLIC_KEY_HERE"
      ) {
        emailjs.init(EMAILJS_CONFIG.publicKey);

        // Prepare cart data
        const cartContent = items
          .map(
            (item) =>
              `${item.product.name}\nPrice: $${item.product.price}\nQuantity: ${
                item.quantity
              }\nSubtotal: $${(item.product.price * item.quantity).toFixed(2)}`,
          )
          .join("\n\n");

        const totalPrice = items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0,
        );

        // Prepare email parameters with all fields
        const templateParams = {
          // Email routing
          to_email: "sales@palyan.am",
          from_name: "Palyan Store",

          // Subject line (if using variable in template)
          subject: `New Order - ${items.length} items - $${totalPrice.toFixed(
            2,
          )}`,

          // Template variables
          order_date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          items_count: items.length,
          total_price: totalPrice.toFixed(2),
          cart_items: cartContent,
          user_email: userEmail,

          // Additional info (optional)
          message: `Order received on ${new Date().toLocaleString()}\n\nCustomer Email: ${userEmail}`,
        };
        // Send email
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.confirmationTemplateId,
          templateParams,
        );

        setCheckoutMessage({
          type: "success",
          text: t("contact.checkoutSuccess"),
        });

        // Clear cart after successful order
        clearCart();

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } else {
        setCheckoutMessage({
          type: "error",
          text: t("contact.errorConfig"),
        });
      }
    } catch (error) {
      console.error("Error sending checkout email:", error);
      setCheckoutMessage({
        type: "error",
        text: t("contact.checkoutError"),
      });
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleContinueShopping = () => {
    navigate("/catalog");
  };

  return (
    <div className="pt-7 px-2 sm:px-6 flex flex-col gap-8 bg-[#F8F7F0] min-h-screen">
      <main className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 justify-between">
          {/* Cart Items Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm p-1 lg:p-6">
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
                    <h3 className="text-xl font-medium text-gray-500 mb-10">
                      {t("cart.emptyTitle")}
                    </h3>
                    <button
                      onClick={handleContinueShopping}
                      className="bg-[#0E99A2] text-white px-6 py-3 rounded-full hover:bg-[#0d8a92] transition-colors"
                    >
                      {t("cart.browseProducts")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-1/3">
            {checkoutMessage && (
              <div
                className={`mb-4 p-4 rounded-lg ${
                  checkoutMessage.type === "success"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <p
                  className={
                    checkoutMessage.type === "success"
                      ? "text-green-700"
                      : "text-red-700"
                  }
                >
                  {checkoutMessage.text}
                </p>
              </div>
            )}
            <OrderSummary
              onCheckout={handleCheckout}
              isLoading={checkoutLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
