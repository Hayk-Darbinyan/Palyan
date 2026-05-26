import { useState, useEffect, useMemo, useRef } from "react";
import { X, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import FilterPanel from "../molecule/FilterPanel";
import SubsectionPanel from "../molecule/SubsectionPanel";
import { useFilterStore } from "@/stores/useFilterStore";
import ProductCard from "../molecule/ProductCard";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { useGetProducts } from "@/hooks/useProducts";
import { transformProducts } from "@/utils/productTransform";
import Pagination from "../atom/Pagination";
import { debounce } from "@/utils/debounce";

const ProductFilterSystem = () => {
  const { t } = useTranslation();
  const { 
    creators, 
    selectedSectionId, 
    selectedSubsectionIds, 
    search,
    setSearch,
    clearFilters 
  } = useFilterStore();
  const storeSections = useCategoryStore((state) => state.sections);
  const backendCategories = useCategoryStore(
    (state) => state.backendCategories
  );
  const currentLanguage = useCategoryStore((state) => state.currentLanguage);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileFiltersAnimating, setMobileFiltersAnimating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Local search term for the input
  const [localSearchTerm, setLocalSearchTerm] = useState(search);
  const skipSync = useRef(false);

  // Use a debounced function instead of a hook to break the loop
  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setSearch(value), 500),
    [setSearch]
  );

  // Sync local search with store search (e.g. when filters are cleared)
  useEffect(() => {
    if (!skipSync.current && search !== localSearchTerm) {
      setLocalSearchTerm(search);
    }
    skipSync.current = false;
  }, [search]);

  const handleSearchChange = (value: string) => {
    skipSync.current = true;
    setLocalSearchTerm(value);
    debouncedSetSearch(value);
  };

  const filters = useMemo(() => ({
    category_id: selectedSectionId,
    subcategory_id: selectedSubsectionIds,
    manufacturers: creators,
    search: search,
  }), [selectedSectionId, selectedSubsectionIds, creators, search]);

  // Get products from backend
  const { data: response, isLoading, isFetching, error } = useGetProducts(currentPage, filters);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const backendProducts = response?.data || [];
  const pagination = response?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 24,
  };

  // Get sections as array with id and name
  const sectionsList = storeSections.map((item) => ({
    id: item.id,
    name: item.section,
  }));

  useEffect(() => {
    // Reset to page 1 when filters change
    setCurrentPage(1);
  }, [creators, selectedSectionId, selectedSubsectionIds, search]);

  const allProducts = transformProducts(
    backendProducts,
    backendCategories,
    currentLanguage
  );

  const closeMobileFilters = () => {
    setMobileFiltersAnimating(false);
    setTimeout(() => setMobileFiltersOpen(false), 300);
  };

  const activeFilterCount =
    creators.length + (selectedSectionId ? 1 : 0) + selectedSubsectionIds.length;

  // Since filtering is now done by the backend, we use allProducts directly
  const filteredProducts = allProducts;

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
        <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Mobile Filter Button */}
            <button
              onClick={() => {
                setMobileFiltersOpen(true);
                setTimeout(() => setMobileFiltersAnimating(true), 10);
              }}
              className="lg:hidden bg-[#EFD45C] text-[#404A3D] px-4 py-2 rounded-full flex items-center gap-2 whitespace-nowrap"
            >
              {t("products.title")}
              {activeFilterCount > 0 && (
                <span className="bg-[#404A3D] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Search Input */}
            <div className="relative flex-1 md:w-80 lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={localSearchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={t("products.searchPlaceholder") || "Search products..."}
                className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-[#EFD45C] focus:ring-1 focus:ring-[#EFD45C] transition-all bg-white shadow-sm"
              />
              {localSearchTerm && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
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
              {activeFilterCount > 0 || search ? (
                <button
                  onClick={clearFilters}
                  className="w-full bg-[#404A3D] text-white py-3 rounded-full hover:bg-[#2d3329] transition-colors"
                >
                  {t("products.clearAll")} ({activeFilterCount + (search ? 1 : 0)})
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

                    {(activeFilterCount > 0 || search) && (
                      <button
                        onClick={clearFilters}
                        className="w-full bg-[#404A3D] text-white py-3 rounded-full"
                      >
                        {t("products.clearAll")} ({activeFilterCount + (search ? 1 : 0)})
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
            <main className="flex-1 pt-4 lg:pt-0 relative">
              {/* Subtle Loading Overlay for grid when fetching new data */}
              {isFetching && !isLoading && (
                <div className="absolute top-0 right-0 p-4 z-10">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#EFD45C]"></div>
                </div>
              )}

              {/* Subsection Panel - Desktop */}
              <div className="hidden xl:block xl:sticky">
                {selectedSectionId && (
                  <SubsectionPanel sectionId={selectedSectionId} />
                )}
              </div>

              {/* Pagination at top */}
              {pagination.totalPages > 1 && (
                <div className={`w-full mb-6 transition-opacity duration-300 ${isFetching ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalItems={pagination.totalItems}
                    itemsPerPage={pagination.itemsPerPage}
                    onPageChange={(page) => setCurrentPage(page)}
                    isLoading={isLoading}
                  />
                </div>
              )}

              {/* Products Grid with transition effect */}
              <div 
                className={`grid grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-6 transition-opacity duration-300 ${
                  isFetching ? "opacity-50" : "opacity-100"
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && !isLoading && !isFetching && (
                <div className="text-center py-12 bg-white rounded-[20px]">
                  <p className="text-[#999999] text-lg">
                    {t("products.noResults")}
                  </p>
                </div>
              )}

              {/* Show a skeleton-like space or minimal loader when no products and fetching */}
              {filteredProducts.length === 0 && isFetching && (
                <div className="flex justify-center items-center py-24">
                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EFD45C]"></div>
                </div>
              )}

              {/* Pagination at bottom */}
              {pagination.totalPages > 1 && (
                <div className={`w-full mt-6 transition-opacity duration-300 ${isFetching ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalItems={pagination.totalItems}
                    itemsPerPage={pagination.itemsPerPage}
                    onPageChange={(page) => setCurrentPage(page)}
                    isLoading={isLoading}
                  />
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