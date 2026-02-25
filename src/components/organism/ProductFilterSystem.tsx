import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import FilterPanel from "../molecule/FilterPanel";
import SubsectionPanel from "../molecule/SubsectionPanel";
import { useFilterStore } from "@/stores/useFilterStore";
import ProductCard from "../molecule/ProductCard";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { useGetProducts } from "@/hooks/useProducts";
import { transformProducts } from "@/utils/productTransform";

const ProductFilterSystem = () => {
  const { t } = useTranslation();
  const { creators, selectedSectionId, selectedSubsectionIds, clearFilters } =
    useFilterStore();
  const storeSections = useCategoryStore((state) => state.sections);
  const backendCategories = useCategoryStore(
    (state) => state.backendCategories
  );
  const currentLanguage = useCategoryStore((state) => state.currentLanguage);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileFiltersAnimating, setMobileFiltersAnimating] = useState(false);

  // Get products from backend
  const { data: backendProducts, isLoading, error } = useGetProducts();

  // Get sections as array with id and name
  const sectionsList = storeSections.map((item) => ({
    id: item.id,
    name: item.section,
  }));

  useEffect(() => {
    // No need to set selected section state here - we'll use the store state
  }, [storeSections]);

  const allProducts = transformProducts(
    backendProducts || [],
    backendCategories,
    currentLanguage
  );

  const closeMobileFilters = () => {
    setMobileFiltersAnimating(false);
    setTimeout(() => setMobileFiltersOpen(false), 300);
  };

  const getFilteredProducts = () => {
    return allProducts.filter((product) => {
      // Filter by section (categoryId)
      const sectionMatch =
        selectedSectionId === null || product.category_id === selectedSectionId;

      // Filter by subsection (subcategoryId)
      const subsectionMatch =
        selectedSubsectionIds.length === 0 ||
        (product.subcategory_id !== null && selectedSubsectionIds.includes(product.subcategory_id));

      // Filter by creators
      const creatorMatch =
        creators.length === 0 || creators.includes(product.manufacturer);

      return sectionMatch && subsectionMatch && creatorMatch;
    });
  };

  const activeFilterCount =
    creators.length + (selectedSectionId ? 1 : 0) + selectedSubsectionIds.length;

  const filteredProducts = getFilteredProducts();

  return (
    <div className="min-h-screen lg:p-8">
      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #EFD45C;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #e5ca52;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          {/* Mobile Filter Button */}
          <button
            onClick={() => {
              setMobileFiltersOpen(true);
              setTimeout(() => setMobileFiltersAnimating(true), 10);
            }}
            className="lg:hidden bg-[#EFD45C] text-[#404A3D] px-4 py-2 rounded-full flex items-center gap-2"
          >
            {t("products.title")}
            {activeFilterCount > 0 && (
              <span className="bg-[#404A3D] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EFD45C]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-white rounded-[20px]">
            <p className="text-red-500">{t("errors.loading")}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-[#404A3D] underline hover:text-[#2d3329]"
            >
              {"Try Again"}
            </button>
          </div>
        ) : (
          <div className="flex gap-6">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-80 shrink-0 space-y-6 sticky top-8 self-start">
              {activeFilterCount > 0 ? (
                <button
                  onClick={clearFilters}
                  className="w-full bg-[#404A3D] text-white py-3 rounded-full hover:bg-[#2d3329] transition-colors"
                >
                  {t("products.clearAll")} ({activeFilterCount})
                </button>
              ) : (
                <button className="w-full py-3 opacity-0" disabled>
                  {t("products.clearAll")}
                </button>
              )}

              {/* Catalog Filter */}
              <div className="bg-white rounded-[30px] overflow-hidden">
                <FilterPanel
                  title={t("products.title")}
                  items={sectionsList}
                  category="sections"
                  onSectionSelect={(sectionId) => {
                    if (sectionId) {
                      // Store will be updated via toggleSection
                    }
                  }}
                  selectedSectionId={selectedSectionId}
                />
              </div>

              {/* Creator Filter */}
            </aside>

            {/* Mobile Filters Overlay */}
            {mobileFiltersOpen && (
              <div
                className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
                  mobileFiltersAnimating ? "bg-black/50" : "bg-black/0"
                }`}
                onClick={closeMobileFilters}
              >
                <div
                  className={`absolute right-0 top-0 bottom-0 w-full max-w-sm bg-gray-50 overflow-y-auto shadow-2xl transition-transform duration-300 ease-in-out ${
                    mobileFiltersAnimating
                      ? "translate-x-0"
                      : "translate-x-full"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4 space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-[#404A3D]">
                        {t("products.title")}
                      </h2>
                      <button
                        onClick={closeMobileFilters}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <X className="w-6 h-6 text-[#404A3D]" />
                      </button>
                    </div>

                    {activeFilterCount > 0 && (
                      <button
                        onClick={clearFilters}
                        className="w-full bg-[#404A3D] text-white py-3 rounded-full"
                      >
                        {t("products.clearAll")} ({activeFilterCount})
                      </button>
                    )}

                    {/* Catalog Filter */}
                    <div className="bg-white rounded-[30px] overflow-hidden">
                      <FilterPanel
                        title={t("products.title")}
                        items={sectionsList}
                        category="sections"
                        isMobile={true}
                        onSectionSelect={(sectionId) => {
                          if (sectionId) {
                            // Store will be updated via toggleSection
                          }
                        }}
                        selectedSectionId={selectedSectionId}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <main className="flex-1 pt-4 lg:pt-18">
              {/* Subsection Panel - Desktop */}
              <div className="hidden xl:block xl:sticky">
                {selectedSectionId && (
                  <SubsectionPanel sectionId={selectedSectionId} />
                )}
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && !isLoading && (
                <div className="text-center py-12 bg-white rounded-[20px]">
                  <p className="text-[#999999] text-lg">
                    {t("products.noResults")}
                  </p>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilterSystem;
