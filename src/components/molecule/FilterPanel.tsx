import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronDown, ChevronUp } from "lucide-react";
import leaf from "@/assets/icons/leaf.svg";
import { useFilterStore } from "@/stores/useFilterStore";
import { useCategoryStore } from "@/stores/useCategoryStore";
import SubsectionPanel from "./SubsectionPanel";

type FilterCategory = "creators" | "sections";

interface FilterPanelProps {
  title: string;
  items: Array<{ id: number; name: string }>;
  category: FilterCategory;
  isMobile?: boolean;
  onSectionSelect?: (sectionId: number | null) => void;
  selectedSectionId?: number | null;
  details?: boolean;
  onCategoryClick?: (categoryId: number) => void;
}

const FilterPanel = ({
  title,
  items,
  category,
  isMobile = false,
  onSectionSelect,
  selectedSectionId,
  details,
  onCategoryClick,
}: FilterPanelProps) => {
  const [expanded, setExpanded] = useState(true);
  const { selectedSectionId: storeSelectedSectionId, toggleSection, toggleCreator } = useFilterStore();
  const sections = useCategoryStore((state) => state.sections);
  const navigate = useNavigate();

  const currentSectionId = selectedSectionId ?? storeSelectedSectionId;

  const handleItemClick = (itemId: number, itemName?: string) => {
    if (category === "sections") {
      const isCurrentlySelected = currentSectionId === itemId;
      onSectionSelect?.(isCurrentlySelected ? null : itemId);

      if (onCategoryClick && details) {
        onCategoryClick(itemId);
        return;
      } else if (!details) {
        toggleSection(itemId);
      }
    } else if (category === "creators") {
      toggleCreator(itemName || "");
    }

    if (details) {
      navigate("/catalog");
    }
  };

  const isSelected = (itemId: number) => {
    if (category === "sections") {
      return currentSectionId === itemId;
    }
    return false;
  };

  const getSubsectionCount = (sectionId: number) => {
    const section = sections.find((s) => s.id === sectionId);
    return section ? section.subsections.length : 0;
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
            {items.map((item) => (
              <div key={item.id} className="flex flex-col">
                <div className="border-b border-[#EFEFEF] py-3 flex justify-between items-center group hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-[7px] h-[7px] rounded-full bg-[#EFD45C] shrink-0"></div>
                    <button
                      onClick={() => handleItemClick(item.id, item.name)}
                      className={`leading-5.5 text-left transition-colors ${
                        isSelected(item.id)
                          ? "text-[#0E99A2] font-medium"
                          : "text-[#999999]"
                      } group-hover:text-[#404A3D] cursor-pointer`}
                    >
                      {item.name}
                    </button>
                  </div>
                  {category === "sections" && (
                    <div className="shrink-0 min-w-5 h-5 px-1.5 bg-[#0E99A2] rounded-full flex items-center justify-center font-medium text-[11px] leading-0.5 text-[#FFFFFF]">
                      {getSubsectionCount(item.id)}
                    </div>
                  )}
                </div>

                {category === "sections" && currentSectionId === item.id && !details && (
                  <div className="block xl:hidden">
                    <SubsectionPanel sectionId={item.id} />
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
