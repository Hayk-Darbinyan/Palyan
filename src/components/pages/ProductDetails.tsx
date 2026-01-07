import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { ShoppingCart } from "lucide-react";
import Hero from "../molecule/Hero";
import slogan from "@/assets/images/slogan.jpg";
import life from "@/assets/icons/life.svg";
import phone from "@/assets/icons/phone.svg";
import FilterPanel from "../molecule/FilterPanel";
import { useGetProducts } from "@/hooks/useProducts";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { useCartStore } from "@/stores/useCartStore";
import { useFilterStore } from "@/stores/useFilterStore";
import { transformProducts } from "@/utils/productTransform";
import { toast } from "sonner";
import type { Product } from "@/types/product";

const ProductDetails = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCartStore();
  const { clearFilters, toggleSection } = useFilterStore();
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);

  // Get data from hooks
  const { data: backendProducts, isLoading: productsLoading } =
    useGetProducts();
  const backendCategories = useCategoryStore(
    (state) => state.backendCategories
  );
  const currentLanguage = i18n.language as "hy" | "ru" | "en";
  const sections = useCategoryStore((state) => state.sections);

  useEffect(() => {
    if (backendProducts && backendCategories && id) {
      const foundProduct = backendProducts.find((p: Product) => p.id === parseInt(id));

      if (foundProduct) {
        const transformedProducts = transformProducts(
          [foundProduct],
          backendCategories,
          currentLanguage
        );

        setProduct(transformedProducts[0]);

        // Auto-select the product's category
        const productCategory = backendCategories.find(
          (cat) => cat.id === foundProduct.category_id
        );

        if (productCategory) {
          setSelectedSectionId(productCategory.id);
        }
      }

      setLoading(false);
    }
  }, [backendProducts, backendCategories, id, currentLanguage]);

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

  const handleCategoryClick = (categoryId: number) => {
    clearFilters();
    toggleSection(categoryId);
    navigate("/catalog");
  };

  if (loading || productsLoading) {
    return (
      <div className="min-h-screen bg-[#F8F7F0] pt-7 px-2 sm:px-4 lg:px-6">
        <Hero isHome={false} />
        <div className="max-w-7xl mx-auto py-6 lg:py-8">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EFD45C]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F8F7F0] pt-7 px-2 sm:px-4 lg:px-6">
        <Hero isHome={false} />
        <div className="max-w-7xl mx-auto py-6 lg:py-8">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-[#404A3D] mb-4">
              {t("errors.productNotFound")}
            </h2>
            <button
              onClick={() => navigate("/catalog")}
              className="bg-[#404A3D] text-white py-2 px-6 rounded-full hover:bg-[#2d3329] transition-colors"
            >
              {t("actions.backToCatalog")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const rawProduct = product.rawProduct;
  return (
    <div className="min-h-screen bg-[#F8F7F0] pt-7 px-2 sm:px-4 lg:px-6">
      <Hero isHome={false} />

      <div className="max-w-7xl mx-auto py-6 lg:py-8">
        {/* Mobile Back Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="lg:hidden mb-6 flex items-center gap-2 text-[#404A3D] hover:text-[#2d3329] transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>{t("actions.back")}</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Sidebar - Filter Panel & Slogan */}
          <aside className="lg:w-80 lg:shrink-0 space-y-6">
            {/* Filter Panel */}
            <div className="bg-white rounded-2xl lg:rounded-[30px] shadow-sm lg:shadow-none">
              <FilterPanel
                title={t("catalog.title")}
                items={sections.map((s) => ({ id: s.id, name: s.section }))}
                category="sections"
                onSectionSelect={setSelectedSectionId}
                selectedSectionId={selectedSectionId}
                details={true}
                onCategoryClick={handleCategoryClick}
              />
            </div>

            {/* Slogan Card - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:block">
              <div
                className="relative h-86 rounded-[30px] flex flex-col items-center justify-center p-6 text-center overflow-hidden"
                style={{
                  backgroundImage: `url(${slogan})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="w-16 h-16 rounded-full bg-[#0E99A2] flex items-center justify-center mb-4">
                  <img src={life} alt="Life" className="w-8 h-8" />
                </div>
                <h3 className="text-xl text-white mb-3 font-medium">
                  {t("footer.slogan")}
                </h3>
                <div className="flex items-center gap-2">
                  <img src={phone} alt="Phone" className="w-5 h-5" />
                  <p className="text-white text-sm lg:text-base font-medium">
                    +374 55 55 55 55
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Product Image & Info */}
            <div className="bg-white rounded-2xl lg:rounded-[30px] p-6 lg:p-8 shadow-sm">
              {/* Top Row: Image and Quick Info */}
              <div className="flex flex-col lg:flex-row gap-8 mb-8">
                {/* Product Image */}
                <div className="lg:w-2/5">
                  <div className="aspect-square rounded-2xl overflow-hidden flex items-center justify-center p-4 lg:p-8 bg-gray-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Quick Product Info */}
                <div className="lg:w-3/5">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1">
                      <h1 className="text-2xl lg:text-3xl font-bold text-[#404A3D] mb-3">
                        {product.name}
                      </h1>
                      <div className="text-2xl font-bold text-[#404A3D]">
                        ${product.price.toFixed(2)}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      className="w-full lg:w-auto bg-[#404A3D] hover:bg-[#2d3329] text-white py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-all duration-200 font-medium group"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>ԳՆԵԼ ՀԻՄԱ</span>
                    </button>
                  </div>

                  {/* Short Description */}
                  <div className="mt-6 lg:mt-0 pt-6 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed">
                      {rawProduct.description[currentLanguage] ||
                        rawProduct.description.hy}
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Features */}
              {rawProduct.features &&
                rawProduct.features.length > 0 &&
                rawProduct.features.map((feature: Product["features"][0]) => (
                  <div
                    key={feature.id}
                    className="pt-8 border-t border-gray-100"
                  >
                    <h3 className="text-xl lg:text-2xl font-semibold text-[#404A3D] mb-4">
                      {feature.title[currentLanguage] || feature.title.hy}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description[currentLanguage] ||
                        feature.description.hy}
                    </p>
                  </div>
                ))}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile CTA Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={handleAddToCart}
          className={`w-14 h-14 rounded-full ${
            product.stock > 0
              ? "bg-[#404A3D] hover:bg-[#2d3329]"
              : "bg-gray-400 cursor-not-allowed"
          } text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200`}
        >
          <ShoppingCart className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
