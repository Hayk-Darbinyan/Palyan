import { useState, useEffect } from "react";
import { X } from "lucide-react";
import FilterPanel from "../molecule/FilterPanel";
import SubsectionPanel from "../molecule/SubsectionPanel";
import { useFilterStore } from "@/stores/useFilterStore";
import ProductCard from "../molecule/ProductCard";
import { sections as catalogData } from "@/constants/catalog";

const ProductFilterSystem = () => {
  const { creators, sections, subsections, clearFilters, setCatalog } = useFilterStore();
  
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileFiltersAnimating, setMobileFiltersAnimating] = useState(false);

  const sectionsList = catalogData.map((item) => item.section);

  useEffect(() => {
    setCatalog(catalogData);

    const firstSectionWithSubsections = catalogData.find(
      (s) => s.subsections.length > 0
    );
    if (firstSectionWithSubsections) {
      setSelectedSection(firstSectionWithSubsections.section);
    }
  }, [setCatalog]);

  const products = [
    {
      id: 1,
      name: "Antibiotic Pro Vet",
      creator: "Intervet",
      animal: "ԽԵԿ",
      section: "Անասնաբուժական դեղամիջոցներ",
      subsection: "Հակաբիոտիկներ",
      price: 15000,
      image:
        "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=300&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Vaccine Plus",
      creator: "Apicenna",
      animal: "ՄԵԿ",
      section: "Բիոպրեպարատներ",
      subsection: "Պատվաստանյութեր",
      price: 8500,
      image:
        "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=300&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Disinfectant Pro",
      creator: "Chemsol",
      animal: "Թռչուններ",
      section: "Դեզինֆեկցիա, դերատիզացիա, դեզինսեկցիա",
      subsection: "Դեզինֆեկտանտներ",
      price: 6500,
      image:
        "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&h=300&fit=crop",
    },
    {
      id: 4,
      name: "Milk Replacer Premium",
      creator: "Intervet",
      animal: "Խոզեր",
      section: "Կաթի փոխարինիչներ, պրեմիքսներ, կերային հավելումներ",
      subsection: "Կաթի փոխարինիչներ",
      price: 12000,
      image:
        "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=300&h=300&fit=crop",
    },
    {
      id: 5,
      name: "Veterinary Syringes Set",
      creator: "Socorex",
      animal: "Բոլորը",
      section: "Անասնաբուժական սարքավորումներ",
      subsection: "Ներարկիչներ",
      price: 3500,
      image:
        "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=300&h=300&fit=crop",
    },
    {
      id: 6,
      name: "Premium Horse Food",
      creator: "Intervet",
      animal: "Ձիեր",
      section: "Կերեր",
      subsection: "",
      price: 25000,
      image:
        "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=300&h=300&fit=crop",
    },
    {
      id: 7,
      name: "Aquarium Pro 100L",
      creator: "Apicenna",
      animal: "Ձկներ",
      section: "Ակվարիումներ",
      subsection: "",
      price: 45000,
      image:
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop",
    },
    {
      id: 8,
      name: "Pet Care Set",
      creator: "Chemsol",
      animal: "Տնային մանր կենդանիներ",
      section: "Պահվածք և խնամք",
      subsection: "",
      price: 7500,
      image:
        "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=300&h=300&fit=crop",
    },
  ];

  const closeMobileFilters = () => {
    setMobileFiltersAnimating(false);
    setTimeout(() => setMobileFiltersOpen(false), 300);
  };

  const getFilteredProducts = () => {
    return products.filter((product) => {
      const creatorMatch =
        creators.length === 0 || creators.includes(product.creator);

      const sectionMatch =
        sections.length === 0 || sections.includes(product.section);

      let subsectionMatch = true;
      if (product.section && subsections[product.section]) {
        subsectionMatch = subsections[product.section].includes(
          product.subsection
        );
      }

      return creatorMatch && sectionMatch && subsectionMatch;
    });
  };

  const activeFilterCount =
    creators.length +
    sections.length +
    Object.values(subsections).flat().length;

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
        <div className="mb-6 flex items-center justify-end">
          {/* Mobile Filter Button */}
          <button
            onClick={() => {
              setMobileFiltersOpen(true);
              setTimeout(() => setMobileFiltersAnimating(true), 10);
            }}
            className="lg:hidden bg-[#EFD45C] text-[#404A3D] px-4 py-2 rounded-full flex items-center gap-2"
          >
            Ֆիլտրեր
            {activeFilterCount > 0 && (
              <span className="bg-[#404A3D] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-6">
          <aside className="hidden lg:block w-80 shrink-0 space-y-6 sticky top-8 self-start">
            {activeFilterCount > 0 ? (
              <button
                onClick={clearFilters}
                className="w-full bg-[#404A3D] text-white py-3 rounded-full hover:bg-[#2d3329] transition-colors"
              >
                Մաքրել բոլորը ({activeFilterCount})
              </button>
            ) : (
              <button className="w-full py-3 opacity-0" disabled>
                Մաքրել բոլորը
              </button>
            )}

            <div className="bg-white rounded-[30px] overflow-hidden">
              <FilterPanel
                title="Կատալոգ"
                items={sectionsList}
                category="sections"
                onSectionSelect={setSelectedSection}
                selectedSection={selectedSection}
              />
            </div>
          </aside>

          {mobileFiltersOpen && (
            <div
              className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
                mobileFiltersAnimating ? "bg-black/50" : "bg-black/0"
              }`}
              onClick={closeMobileFilters}
            >
              <div
                className={`absolute right-0 top-0 bottom-0 w-full max-w-sm bg-gray-50 overflow-y-auto shadow-2xl transition-transform duration-300 ease-in-out ${
                  mobileFiltersAnimating ? "translate-x-0" : "translate-x-full"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#404A3D]">
                      Ֆիլտրեր
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
                      Մաքրել բոլորը ({activeFilterCount})
                    </button>
                  )}

                  <div className="bg-white rounded-[30px] overflow-hidden">
                    <FilterPanel
                      title="Կատալոգ"
                      items={sectionsList}
                      category="sections"
                      isMobile={true}
                      onSectionSelect={setSelectedSection}
                      selectedSection={selectedSection}
                    />
                  </div>

                  <button
                    onClick={closeMobileFilters}
                    className="w-full bg-[#EFD45C] text-[#404A3D] py-3 rounded-full font-medium sticky bottom-0"
                  >
                    Ցույց տալ {filteredProducts.length} ապրանք
                  </button>
                </div>
              </div>
            </div>
          )}

          <main className="flex-1 pt-4 lg:pt-18">
            <div className="hidden xl:block xl:sticky">
              {selectedSection && (
                <SubsectionPanel sectionName={selectedSection} />
              )}
            </div>

            <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-[20px]">
                <p className="text-[#999999] text-lg">
                  Ապրանքներ չեն գտնվել ընտրված ֆիլտրերով
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-[#404A3D] underline hover:text-[#2d3329]"
                >
                  Մաքրել ֆիլտրերը
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductFilterSystem;
