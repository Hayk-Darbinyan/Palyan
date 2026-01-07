export interface BackendCategory {
  id: number;
  name: {
    en: string;
    hy: string;
    ru: string;
  };
  subcategories: Array<{
    id: number;
    name: {
      en: string;
      hy: string;
      ru: string;
    };
  }>;
}

export interface CatalogType {
  id: number;
  section: string;
  active: boolean;
  subsections: Array<{
    id: number;
    name: string;
  }>;
}

export type Language = 'en' | 'hy' | 'ru';