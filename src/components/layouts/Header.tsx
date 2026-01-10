import React, { useState } from "react";
import logo from "@/assets/images/logoWhite.svg";
import { Card, CardContent } from "../atom/Card";
import { navigationItems } from "@/constants/headerMenu";
import Sidebar from "./Sidebar";
import { useLocation, useNavigate } from "react-router";
import { useFilterStore } from "@/stores/useFilterStore";
import LanguageSelector from "../molecule/LanguageSelector";
import { useTranslation } from "react-i18next";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { PhoneCall } from "lucide-react";

const Header = () => {
  const [showMenus, setShowMenus] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const { toggleSection, toggleSubsection } = useFilterStore();
  const { t } = useTranslation();
  
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

      <div className="w-full h-[100px] flex items-center justify-between">
        <div className="flex">
          <div
            className="w-[139px] h-[45px] mx-6 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Palyan" className="w-full h-full" />
          </div>

          <div className="hidden xl:flex justify-center items-center">
            <nav>
              <div className="flex items-center h-full gap-5">
                {navigationItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <button
                      className="h-[25px] font-normal text-sm text-center tracking-[0] leading-[100px] whitespace-nowrap flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
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
            className="hidden xl:block "
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

        <div className="hidden xl:flex h-[43px] gap-4 mr-[236px]">
          <LanguageSelector variant="desktop" />

          <div className="flex gap-4">
            <div className="w-[35px] h-[33px]">
              <PhoneCall className="text-[#efd45c] w-full h-full stroke-1" />
            </div>

            <div>
              <p className="font-medium text-base leading-[100%] text-white">
                {t("header.contact.call")} <br />
                +374(00)000-000
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(true)}
          className="xl:hidden mr-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Open menu"
        >
          <span className="w-6 h-0.5 bg-white rounded-full"></span>
          <span className="w-6 h-0.5 bg-white rounded-full"></span>
          <span className="w-6 h-0.5 bg-white rounded-full"></span>
        </button>
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;