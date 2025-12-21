import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CatalogItem {
  section: string;
  subsections: string[];
}

interface FilterState {
  creators: string[];
  sections: string[];
  subsections: Record<string, string[]>;

  catalog: CatalogItem[];

  toggleFilter: (
    category: "creators" | "sections" | "subsections",
    value: string,
    sectionName?: string
  ) => void;
  clearFilters: () => void;
  setCatalog: (catalog: CatalogItem[]) => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      creators: [],
      sections: [],
      subsections: {},
      catalog: [],

      toggleFilter: (category, value, sectionName) =>
        set((state) => {
          if (category === "subsections" && sectionName) {
            const currentSubsections = state.subsections[sectionName] || [];
            const newSubsections = currentSubsections.includes(value)
              ? currentSubsections.filter((v) => v !== value)
              : [...currentSubsections, value];

            return {
              subsections: {
                ...state.subsections,
                [sectionName]: newSubsections,
              },
            };
          }

          if (category === "sections") {
            const newSections = state.sections.includes(value) ? [] : [value];
            return {
              ...state,
              [category]: newSections,
            };
          }

          const currentArray = state[category] as string[];
          const newArray = currentArray.includes(value)
            ? currentArray.filter((v) => v !== value)
            : [...currentArray, value];

          return { [category]: newArray };
        }),

      clearFilters: () =>
        set({
          creators: [],
          sections: [],
          subsections: {},
        }),

      setCatalog: (catalog) => set({ catalog }),
    }),
    {
      name: "product-filters-storage",
    }
  )
);
