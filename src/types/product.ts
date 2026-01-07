export interface ProductFeature {
  id: number;
  product_id: number;
  title: {
    en: string;
    ru: string;
    hy: string;
  };
  description: {
    en: string;
    ru: string;
    hy: string;
  };
}

export interface Product {
  id: number;
  name: {
    en: string;
    ru: string;
    hy: string;
  };
  price: number;
  stock: number;
  manufacturer: string;
  image_url: string;
  is_new: boolean;
  created_at: string;
  types_id: number;
  category_id: number;
  subcategory_id: number | null;
  description: {
    en: string;
    ru: string;
    hy: string;
  };
  features: ProductFeature[];

  dosage?: string;
  composition?: string;
  usage?: string;
  storage_instructions?: string;
  packaging?: string;
  shelf_life?: string;
}

export interface TransformedProduct {
  id: number;
  name: string;
  section: string;
  subsection: string;
  price: number;
  image: string;
  manufacturer: string;
  category_id: number;
  subcategory_id: number | null;
  rawProduct: Product;
}
