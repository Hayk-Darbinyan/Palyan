import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FilterState {
  // ID-based filtering
  selectedSectionId: number | null;
  selectedSubsectionIds: number[];
  creators: string[];
  
  // Methods
  toggleSection: (sectionId: number) => void;
  toggleSubsection: (subsectionId: number) => void;
  toggleCreator: (creatorName: string) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      selectedSectionId: null,
      selectedSubsectionIds: [],
      creators: [],

      toggleSection: (sectionId) =>
        set((state) => {
          // If clicking the same section, deselect it
          if (state.selectedSectionId === sectionId) {
            return {
              selectedSectionId: null,
              selectedSubsectionIds: [],
            };
          }
          
          // Select new section and clear subsections
          return {
            selectedSectionId: sectionId,
            selectedSubsectionIds: [],
          };
        }),

      toggleSubsection: (subsectionId) =>
        set((state) => {
          const newSubsectionIds = state.selectedSubsectionIds.includes(subsectionId)
            ? state.selectedSubsectionIds.filter((id) => id !== subsectionId)
            : [...state.selectedSubsectionIds, subsectionId];
            
          return {
            selectedSubsectionIds: newSubsectionIds,
          };
        }),

      toggleCreator: (creatorName) =>
        set((state) => {
          const newCreators = state.creators.includes(creatorName)
            ? state.creators.filter((name) => name !== creatorName)
            : [...state.creators, creatorName];
            
          return { creators: newCreators };
        }),

      clearFilters: () =>
        set({
          selectedSectionId: null,
          selectedSubsectionIds: [],
          creators: [],
        }),
    }),
    {
      name: "product-filters-storage",
    }
  )
);
