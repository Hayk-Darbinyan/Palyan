import React, { useState, useEffect, useRef } from "react";
import logo from "@/assets/images/logoWhite.svg";
import { Card, CardContent } from "../atom/Card";
import { navigationItems } from "@/constants/headerMenu";
import Sidebar from "./Sidebar";
import { useLocation, useNavigate } from "react-router";
import { useFilterStore } from "@/stores/useFilterStore";
import LanguageSelector from "../molecule/LanguageSelector";
import { useTranslation } from "react-i18next";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { PhoneCall, Search, X } from "lucide-react";
import { debounce } from "@/utils/debounce";

const Header = () => {
  const [showMenus, setShowMenus] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const { toggleSection, toggleSubsection, search, setSearch } = useFilterStore();
  const { t } = useTranslation();
  
  const [localSearchTerm, setLocalSearchTerm] = useState(search);
  const skipSync = useRef(false);

  // Use a debounced function instead of a hook to break the loop
  const debouncedSetSearch = React.useMemo(
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
    }
  };

  const handleClearSearch = () => {
    skipSync.current = true;
    setLocalSearchTerm("");
    setSearch("");
  };

  // Get sections from the store (already computed from backend data)
  const sections = useCategoryStore((state) => state.sections);

  const handleCatalogHover = (show: boolean) => {
    setShowMenus(show);
    if (!show) {
      setHoveredCategory(null);
    }
  };

  const handleCategoryHover = (index: number) => {
    if (sections[index]?.subsections.length > 0) {
      setHoveredCategory(index);
    } else {
      setHoveredCategory(null);
    }
  };

  const handleNavigation = (route: string) => {
    navigate(route);
    setShowMenus(false);
  };

  const handleCategoryClick = (section: (typeof sections)[0]) => {
    if (section.subsections.length === 0) {
      setShowMenus(false);
    }
    navigate("/catalog");
    toggleSection(section.id);
  };

  const handleSubsectionClick = (
    _section: (typeof sections)[0], 
    subsection: { id: number; name: string }
  ) => {
    navigate("/catalog");
    setShowMenus(false);
    toggleSubsection(subsection.id);
  };

  const isActive = (route: string) => {
    if (route === "/") {
      return pathname === "/";
    }

    // catalog page + catalog/:id
    if (route === "/catalog") {
      return pathname.startsWith("/catalog");
    }

    return pathname === route;
  };

  return (
    <>
      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
      `}</style>

      <div className="w-full h-[100px] flex items-center justify-between relative px-6">
        {/* Mobile Search Overlay */}
        {isMobileSearchOpen && (
          <div className="absolute inset-0 bg-[#404A3D] z-50 flex items-center px-4 animate-slide-down">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                autoFocus
                value={localSearchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={t("products.searchPlaceholder") || "Search products..."}
                className="w-full pl-10 pr-10 py-2 rounded-full bg-white text-[#404A3D] focus:outline-none"
              />
              {localSearchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setIsMobileSearchOpen(false)}
              className="ml-4 text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}

        <div className="flex items-center">
          <div
            className="w-[139px] h-[45px] mx-6 cursor-pointer shrink-0"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Palyan" className="w-full h-full object-contain" />
          </div>

          <div className="hidden xl:flex justify-center items-center">
            <nav>
              <div className="flex items-center h-full gap-5">
                {navigationItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <button
                      className="h-[25px] font-normal text-sm text-center tracking-[0] whitespace-nowrap flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
                      onMouseEnter={() =>
                        item.hasMenu && handleCatalogHover(true)
                      }
                      onMouseLeave={() =>
                        item.hasMenu && handleCatalogHover(false)
                      }
                      onClick={() => handleNavigation(item.route)}
                    >
                      <span
                        className={
                          isActive(item.route) ? "text-[#efd45c]" : "text-white"
                        }
                      >
                        {t(item.text)}
                      </span>
                    </button>
                    {index < navigationItems.length - 1 && (
                      <div className="w-1.5 h-1.5 bg-[#efd45c] rounded-[3px]" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </nav>
          </div>

          <div
            className="hidden xl:block"
            onMouseEnter={() => handleCatalogHover(true)}
            onMouseLeave={() => handleCatalogHover(false)}
          >
            {/* Main Categories Menu */}
            <Card
              className={`absolute z-9999 top-[79px] left-[16.79%] w-[17.10%] bg-white rounded-[10px] border-t-[3px] border-solid border-[#efd45c] transition-all duration-300 ${
                showMenus
                  ? "opacity-100 visible animate-slide-down"
                  : "opacity-0 invisible"
              }`}
              style={{ boxShadow: "0px 0px 60px #35394526" }}
            >
              <CardContent className="p-0">
                {sections.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <button
                      className={`w-full px-[15px] py-3 text-left hover:bg-gray-50 transition-colors ${
                        hoveredCategory === index && item.subsections.length > 0
                          ? "bg-gray-50"
                          : ""
                      }`}
                      onMouseEnter={() => handleCategoryHover(index)}
                      onClick={() => handleCategoryClick(item)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-normal text-[13px] text-[#999999]">
                          {item.section}
                        </span>
                      </div>
                    </button>
                    {index < sections.length - 1 && (
                      <div className="border-b border-solid border-[#eeeeee]" />
                    )}
                  </React.Fragment>
                ))}
              </CardContent>
            </Card>

            {hoveredCategory !== null &&
              sections[hoveredCategory]?.subsections.length > 0 && (
                <Card
                  className={`absolute z-9999 top-[79px] left-[33.95%] w-[17.11%] bg-white rounded-[10px] border-t-[3px] border-solid border-[#efd45c] transition-all duration-300 ${
                    showMenus && hoveredCategory !== null
                      ? "opacity-100 visible animate-slide-down"
                      : "opacity-0 invisible"
                  }`}
                  style={{ boxShadow: "0px 0px 60px #35394526" }}
                >
                  <CardContent className="p-0">
                    {sections[hoveredCategory].subsections.map(
                      (subsection, index) => (
                        <React.Fragment key={subsection.id}>
                          <button
                            className="w-full px-[15px] py-3 text-left hover:bg-gray-50 transition-colors"
                            onClick={() =>
                              handleSubsectionClick(
                                sections[hoveredCategory],
                                subsection
                              )
                            }
                          >
                            <div className="font-normal text-[#999999] text-[13px]">
                              {subsection.name}
                            </div>
                          </button>
                          {index <
                            sections[hoveredCategory].subsections.length -
                              1 && (
                            <div className="border-b border-solid border-[#eeeeee]" />
                          )}
                        </React.Fragment>
                      )
                    )}
                  </CardContent>
                </Card>
              )}
          </div>
        </div>

        {/* Desktop Search Bar - Positioned for better layout */}
        <div className="hidden xl:flex items-center mx-4 flex-1 max-w-[200px] 2xl:max-w-xs">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={localSearchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={t("products.searchPlaceholder") || "Search..."}
              className="w-full pl-9 pr-8 py-1.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all text-sm"
            />
            {localSearchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 xl:mr-[236px] 2xl:mr-[236px]">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsMobileSearchOpen(true)}
            className="xl:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <Search className="w-6 h-6" />
          </button>

          <div className="hidden xl:flex h-[43px] gap-4">
            <LanguageSelector variant="desktop" />

            <div className="flex gap-4">
              <div className="w-[35px] h-[33px]">
                <PhoneCall className="text-[#efd45c] w-full h-full stroke-1" />
              </div>

              <div className="whitespace-nowrap">
                <p className="font-medium text-base leading-[100%] text-white">
                  {t("header.contact.call")} <br />
                  +37441802020
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(true)}
            className="xl:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            <span className="w-6 h-0.5 bg-white rounded-full"></span>
            <span className="w-6 h-0.5 bg-white rounded-full"></span>
            <span className="w-6 h-0.5 bg-white rounded-full"></span>
          </button>
        </div>
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;