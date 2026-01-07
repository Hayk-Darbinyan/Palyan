import { useFilterStore } from "@/stores/useFilterStore";
import { useCategoryStore } from "@/stores/useCategoryStore";
import leaf from "@/assets/icons/leaf.svg";

interface SubsectionPanelProps {
  sectionId: number;
}

const SubsectionPanel = ({ sectionId }: SubsectionPanelProps) => {
  const { selectedSubsectionIds, toggleSubsection } = useFilterStore();
  const sections = useCategoryStore((state) => state.sections);

  // Find the section by ID
  const selectedSection = sections.find((item) => item.id === sectionId);

  if (!selectedSection || !selectedSection.subsections.length) {
    return null;
  }

  return (
    <div className="bg-white rounded-[30px] p-7.5 flex flex-col gap-4 mb-6">
      <div className="hidden xl:flex items-center gap-3">
        <div className="w-6 h-6 flex items-center justify-center">
          <img src={leaf} alt="" className="w-6 h-6" />
        </div>
        <p className="text-2xl leading-8.5 text-[#404A3D]">{selectedSection.section}</p>
      </div>

      <div className="xl:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
        {selectedSection.subsections.map((subsection) => (
          <div
            key={subsection.id}
            className="border-b border-[#EFEFEF] py-3 flex items-center gap-3"
          >
            <div className="w-[7px] h-[7px] rounded-full bg-[#EFD45C] shrink-0"></div>
            <button
              onClick={() => toggleSubsection(subsection.id)}
              className={`leading-5.5 text-left transition-colors ${
                selectedSubsectionIds.includes(subsection.id)
                  ? "text-[#0E99A2]"
                  : "text-[#999999]"
              } cursor-pointer`}
            >
              {subsection.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubsectionPanel;