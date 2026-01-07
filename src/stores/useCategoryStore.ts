import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { BackendCategory, CatalogType, Language } from "@/types/catalog";

interface CategoryState {
  backendCategories: BackendCategory[];
  currentLanguage: Language;
  activeCategory: number | null;
  sections: CatalogType[];
  setBackendCategories: (categories: BackendCategory[]) => void;
  setLanguage: (language: Language) => void;
  toggleCategory: (categoryId: number) => void;
  setActiveCategory: (categoryId: number | null) => void;
}

const convertToSections = (
  categories: BackendCategory[],
  language: Language,
  activeId: number | null
): CatalogType[] => {
  console.log(categories, language)
  return categories.map((category) => ({
    id: category.id,
    section: category.name[language],
    active: category.id === activeId,
    subsections: category.subcategories.map((sub) => ({
      id: sub.id,
      name: sub.name[language],
    })),
  }));
};

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set, get) => ({
      backendCategories: [],
      currentLanguage: "hy",
      activeCategory: null,
      sections: [],

      setBackendCategories: (categories) => {
        const { currentLanguage, activeCategory } = get();
        set({
          backendCategories: categories,
          sections: convertToSections(
            categories,
            currentLanguage,
            activeCategory
          ),
        });
      },

      setLanguage: (language) => {
        const { backendCategories, activeCategory } = get();
        set({
          currentLanguage: language,
          sections: convertToSections(
            backendCategories,
            language,
            activeCategory
          ),
        });
      },

      toggleCategory: (categoryId) => {
        const { activeCategory, backendCategories, currentLanguage } = get();
        const newActiveId = activeCategory === categoryId ? null : categoryId;
        set({
          activeCategory: newActiveId,
          sections: convertToSections(
            backendCategories,
            currentLanguage,
            newActiveId
          ),
        });
      },

      setActiveCategory: (categoryId) => {
        const { backendCategories, currentLanguage } = get();
        set({
          activeCategory: categoryId,
          sections: convertToSections(
            backendCategories,
            currentLanguage,
            categoryId
          ),
        });
      },
    }),
    {
      name: "category-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentLanguage: state.currentLanguage,
        activeCategory: state.activeCategory,
      }),
    }
  )
);