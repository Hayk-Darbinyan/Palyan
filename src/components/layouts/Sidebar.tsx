import { useState } from "react";
import { useNavigate } from "react-router";
import { navigationItems } from "@/constants/headerMenu";
import { sections } from "@/constants/catalog";
import { useFilterStore } from "@/stores/useFilterStore";
import type { CatalogType } from "@/types/catalog";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [showCatalog, setShowCatalog] = useState(false);
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const navigate = useNavigate();
  const { toggleFilter } = useFilterStore();

  const toggleCatalog = () => {
    setShowCatalog(!showCatalog);
    if (showCatalog) {
      setExpandedSection(null);
    }
  };

  const toggleSection = (index: number) => {
    if (sections[index].subsections.length > 0) {
      setExpandedSection(expandedSection === index ? null : index);
    } else {
      onClose();
    }
  };

  const handleCategoryClick = (section: CatalogType) => {
    navigate("/catalog");
    toggleFilter("sections", section.section);
    onClose();
  };

  const handleSubsectionClick = (section: string, subsection: string) => {
    navigate("/catalog");
    toggleFilter("subsections", subsection, section);
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
          <h2 className="text-xl font-semibold text-[#404A3D]">Մենյու</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="overflow-y-auto h-[calc(100%-80px)]">
          {/* Navigation Items */}
          <div className="p-6 border-b border-gray-200">
            {navigationItems.map((item, index) => (
              <div key={index}>
                {item.hasMenu ? (
                  <button className="w-full flex items-center justify-between py-3 text-left font-medium text-[#404A3D] hover:text-[#0E99A2] transition-colors">
                    <span onClick={() => handleNavigationClick(item.route)}>
                      {item.text}
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
                    className="w-full py-3 text-left font-medium text-[#404A3D] hover:text-[#0E99A2] transition-colors"
                  >
                    {item.text}
                  </button>
                )}

                {/* Sections (Categories) Menu Expansion */}
                {item.hasMenu && showCatalog && (
                  <div className="pl-4 mt-2 space-y-2">
                    {sections.map((section, sectionIndex) => (
                      <div key={sectionIndex}>
                        <button
                          className={`w-full flex items-center justify-between py-2 text-left text-sm transition-colors ${
                            section.active
                              ? "text-[#0079a6] font-medium"
                              : "text-[#999999] hover:text-[#404A3D]"
                          }`}
                        >
                          <span
                          onClick={() => handleCategoryClick(section)}
                          >{section.section}</span>
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
                              onClick={() => toggleSection(sectionIndex)}
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
                                (subsection, subIndex) => (
                                  <button
                                    key={subIndex}
                                    onClick={() =>
                                      handleSubsectionClick(
                                        section.section,
                                        subsection
                                      )
                                    }
                                    className="w-full py-2 text-left text-sm text-[#999999] hover:text-[#404A3D] transition-colors"
                                  >
                                    {subsection}
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
                <p className="text-xs text-[#999999]">Զանգահարել</p>
                <p className="text-base font-medium text-[#404A3D]">
                  +374(00)000-000
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="20" fill="#0E99A2" />
                  <text
                    x="20"
                    y="26"
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="600"
                  >
                    ՀԱՅ
                  </text>
                </svg>
              </div>
              <div className="w-10 h-10">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="20" fill="#0E99A2" />
                  <text
                    x="20"
                    y="26"
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="600"
                  >
                    EN
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
