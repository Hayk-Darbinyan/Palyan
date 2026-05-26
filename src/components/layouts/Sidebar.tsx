import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { navigationItems } from "@/constants/headerMenu";
import { useFilterStore } from "@/stores/useFilterStore";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../molecule/LanguageSelector";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { Search, X } from "lucide-react";
import { debounce } from "@/utils/debounce";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [showCatalog, setShowCatalog] = useState(false);
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const { toggleSection: toggleSectionFilter, toggleSubsection, search, setSearch } = useFilterStore();
  const { t } = useTranslation();
  
  const [localSearchTerm, setLocalSearchTerm] = useState(search);
  const skipSync = useRef(false);

  // Use a debounced function instead of a hook to break the loop
  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setSearch(value), 500),
    [setSearch]
  );

  // Sync local search with store search (when updated externally or on navigation)
  useEffect(() => {
    if (!pathname.startsWith("/catalog")) {
      setLocalSearchTerm("");
    } else if (!skipSync.current) {
      setLocalSearchTerm(search);
    }
    skipSync.current = false;
  }, [search, pathname]);

  const handleSearchChange = (value: string) => {
    skipSync.current = true;
    setLocalSearchTerm(value);
    debouncedSetSearch(value);
    if (value && !pathname.startsWith("/catalog")) {
      navigate("/catalog");
      onClose();
    }
  };

  const handleClearSearch = () => {
    skipSync.current = true;
    setLocalSearchTerm("");
    setSearch("");
  };

  // Get sections from the store
  const sections = useCategoryStore((state) => state.sections);

  const toggleCatalog = () => {
    setShowCatalog(!showCatalog);
    if (showCatalog) {
      setExpandedSection(null);
    }
  };

  const toggleSectionUI = (index: number) => {
    if (sections[index]?.subsections.length > 0) {
      setExpandedSection(expandedSection === index ? null : index);
    } else {
      onClose();
    }
  };

  const handleCategoryClick = (section: (typeof sections)[0]) => {
    navigate("/catalog");
    toggleSectionFilter(section.id);
    onClose();
  };

  const handleSubsectionClick = (
    _section: (typeof sections)[0], 
    subsection: { id: number; name: string }
  ) => {
    navigate("/catalog");
    toggleSubsection(subsection.id);
    onClose();
  };

  const handleNavigationClick = (route: string) => {
    navigate(route);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#404A3D]">{t("footer.menu")}</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-[#404A3D]" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="overflow-y-auto h-[calc(100%-80px)]">
          {/* Search in Sidebar */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={localSearchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={t("products.searchPlaceholder") || "Search products..."}
                className="w-full pl-10 pr-10 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-[#EFD45C] focus:ring-1 focus:ring-[#EFD45C] transition-all"
              />
              {localSearchTerm && (localSearchTerm !== "") && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <div className="p-6 border-b border-gray-200">
            {navigationItems.map((item, index) => (
              <div key={index}>
                {item.hasMenu ? (
                  <button className="w-full flex items-center justify-between py-3 text-left font-medium text-[#404A3D] hover:text-[#0E99A2] transition-colors cursor-pointer">
                    <span onClick={() => handleNavigationClick(item.route)}>
                      {t(item.text)}
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      className={`transform transition-transform ${
                        showCatalog ? "rotate-180" : ""
                      }`}
                      onClick={toggleCatalog}
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavigationClick(item.route)}
                    className="w-full py-3 text-left font-medium text-[#404A3D] hover:text-[#0E99A2] transition-colors cursor-pointer"
                  >
                    {t(item.text)}
                  </button>
                )}

                {/* Sections (Categories) Menu Expansion */}
                {item.hasMenu && showCatalog && (
                  <div className="pl-4 mt-2 space-y-2">
                    {sections.map((section, sectionIndex) => (
                      <div key={section.id}>
                        <button
                          className={`w-full flex items-center justify-between py-2 text-left text-sm transition-colors cursor-pointer ${
                            section.active
                              ? "text-[#0079a6] font-medium"
                              : "text-[#999999] hover:text-[#404A3D]"
                          }`}
                        >
                          <span onClick={() => handleCategoryClick(section)}>
                            {section.section}
                          </span>
                          {section.subsections.length > 0 && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                              className={`transform transition-transform ${
                                expandedSection === sectionIndex
                                  ? "rotate-180"
                                  : ""
                              }`}
                              onClick={() => toggleSectionUI(sectionIndex)}
                            >
                              <path
                                d="M5 7.5L10 12.5L15 7.5"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>

                        {/* Subsections Menu */}
                        {section.subsections.length > 0 &&
                          expandedSection === sectionIndex && (
                            <div className="pl-4 mt-2 space-y-2">
                              {section.subsections.map(
                                (subsection) => (
                                  <button
                                    key={subsection.id}
                                    onClick={() =>
                                      handleSubsectionClick(
                                        section,
                                        subsection
                                      )
                                    }
                                    className="w-full py-2 text-left text-sm text-[#999999] hover:text-[#404A3D] transition-colors cursor-pointer"
                                  >
                                    {subsection.name}
                                  </button>
                                )
                              )}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#404A3D"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-[#999999]">{t("header.contact.call")}</p>
                <p className="text-base font-medium text-[#404A3D]">
                  +37441802020
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <LanguageSelector variant="mobile" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;