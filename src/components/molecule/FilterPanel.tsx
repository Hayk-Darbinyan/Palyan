import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronDown, ChevronUp } from "lucide-react";
import leaf from "@/assets/icons/leaf.svg";
import { useFilterStore } from "@/stores/useFilterStore";
import SubsectionPanel from "./SubsectionPanel";

type FilterCategory = "creators" | "sections";

interface FilterPanelProps {
  title: string;
  items: string[];
  category: FilterCategory;
  isMobile?: boolean;
  onSectionSelect?: (section: string) => void;
  selectedSection?: string;
  details?: boolean;
}

const FilterPanel = ({
  title,
  items,
  category,
  isMobile = false,
  onSectionSelect,
  selectedSection,
  details,
}: FilterPanelProps) => {
  const [expanded, setExpanded] = useState(true);
  const { creators, sections, subsections, toggleFilter } = useFilterStore();

  const getCurrentFilters = () => {
    switch (category) {
      case "creators":
        return creators;
      case "sections":
        return sections;
      default:
        return [];
    }
  };

  const currentFilters = getCurrentFilters();
  const navigate = useNavigate();

  const handleItemClick = (item: string) => {
    if (category === "sections" && onSectionSelect) {
      const isCurrentlySelected = currentFilters.includes(item);
      onSectionSelect(isCurrentlySelected ? "" : item);
    }
    toggleFilter(category, item);

    if (details) {
      navigate("/catalog");
    }
  };

  const isSelected = (item: string) => {
    if (category === "sections") {
      return currentFilters.length > 0 && currentFilters[0] === item;
    }
    return currentFilters.includes(item);
  };

  return (
    <div className="bg-white rounded-[30px] p-7.5 flex flex-col gap-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full"
        aria-label={expanded ? "Collapse filter panel" : "Expand filter panel"}
      >
        <div className="flex items-center gap-3">
          <img src={leaf} alt="" className="w-6 h-6" />
          <p className="text-2xl leading-8.5 text-[#404A3D]">{title}</p>
        </div>
        <div>
          {expanded ? (
            <ChevronUp className="text-[#404A3D] w-5 h-5" />
          ) : (
            <ChevronDown className="text-[#404A3D] w-5 h-5" />
          )}
        </div>
      </button>

      {expanded && (
        <div
          className={`${
            isMobile ? "max-h-[400px] overflow-y-auto scrollbar-thin" : ""
          }`}
        >
          <div className="flex flex-col">
            {items.map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="border-b border-[#EFEFEF] py-3 flex justify-between items-center group hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-[7px] h-[7px] rounded-full bg-[#EFD45C] shrink-0"></div>
                    <button
                      onClick={() => handleItemClick(item)}
                      className={`leading-5.5 text-left transition-colors ${
                        isSelected(item)
                          ? "text-[#0E99A2] font-medium"
                          : category === "sections" && selectedSection === item
                          ? "text-[#404A3D] font-medium"
                          : "text-[#999999]"
                      } group-hover:text-[#404A3D]`}
                    >
                      {item}
                    </button>
                  </div>
                  {subsections[item] && subsections[item].length > 0 ? (
                    <div className="shrink-0 min-w-5 h-5 px-1.5 bg-[#0E99A2] rounded-full flex items-center justify-center font-medium text-[11px] leading-0.5 text-[#FFFFFF]">
                      {subsections[item].length}
                    </div>
                  ) : (
                    <div className="w-5 h-5 shrink-0 rounded-full bg-transparent"></div>
                  )}
                </div>

                {/* Conditionally render SubsectionPanel */}
                {category === "sections" &&
                  selectedSection === item &&
                  subsections[item]?.length > 0 && (
                    <div className="block xl:hidden">
                      <SubsectionPanel sectionName={item} />
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
