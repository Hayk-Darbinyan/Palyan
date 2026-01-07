import { useNavigate } from "react-router";
import { ShoppingBasket } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import shape from "@/assets/images/productShape.png";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/atom/Tooltip";
import { useCartStore } from "@/stores/useCartStore";
import type { TransformedProduct } from "@/types/product";

interface ProductCardProps extends TransformedProduct {}

const ProductCard = ({ product }: { product: ProductCardProps }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image:
        product.image ||
        "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=300&h=300&fit=crop",
    };

    addItem(cartProduct, 1);
    toast.success(t("cart.added"));
  };
  const currentLanguage = i18n.language as "hy" | "ru" | "en";
  return (
    <div
      className="relative bg-no-repeat bg-center bg-cover rounded-2xl overflow-hidden w-full h-full flex flex-col transition-all duration-300 shadow-sm hover:shadow-md"
      style={{
        backgroundImage: `url(${shape})`,
      }}
    >
      <div className="flex flex-col items-center p-4 sm:p-6 lg:p-8 rounded-2xl gap-2">
        {/* Icon and Title */}
        <div
          className="w-full aspect-square max-w-[180px] sm:max-w-60 flex justify-center items-center shrink-0 transition-transform duration-500 group-hover:scale-105 cursor-pointer"
          onClick={() => navigate(`/catalog/${product.id}`)}
        >
          <img
            src={product.image}
            alt={product.rawProduct?.name[currentLanguage]}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="w-full flex flex-col items-start gap-2 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#EFD45C] shrink-0"></div>
            <p className="text-xs sm:text-sm leading-6 text-[#999999]">
              {product.section}
            </p>
          </div>
          <div className="w-full flex flex-col sm:flex-row justify-between items-center">
            <h3 className="text-xl sm:text-2xl leading-8 text-[#404A3D]">
              {product.rawProduct?.name[currentLanguage]}
            </h3>
            <div className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-lg">
              <span className="text-[#404A3D] font-bold text-lg">
                ${product.price}
              </span>
            </div>{" "}
          </div>
          <div className="w-full border-t border-[#404A3D1A] pt-5">
            <p className="text-xs leading-5 text-[#666666]">
              {product.subsection}
            </p>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Tooltip>
        <TooltipTrigger>
          <div
            className="absolute bottom-0 right-0 bg-[#EFD45C] flex justify-center items-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-tl-2xl transition-colors hover:bg-[#e6c94a] cursor-pointer"
            onClick={handleAddToCart}
          >
            <ShoppingBasket className="text-[#404A3D]" />
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={10}
          className="bg-white px-2 py-1 rounded shadow-md"
        >
          <p className="text-xs leading-5 text-[#404A3D]">
            {t("cart.addToCart")}
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default ProductCard;
