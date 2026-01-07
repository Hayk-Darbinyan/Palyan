import type { BackendCategory } from "@/types/catalog";

export const mapCatalog = (
  data: BackendCategory[],
  lang: "hy" | "ru" | "en"
) => {
  return data.map((cat) => ({
    id: cat.id,
    title: cat.name[lang],
    active: false,
    subsections: cat.subcategories.map((sub) => ({
      id: sub.id,
      title: sub.name[lang],
    })),
  }));
};
