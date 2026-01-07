import { type Product, type TransformedProduct } from "@/types/product";
import type { BackendCategory } from "@/types/catalog";

export const transformProducts = (
  products: Product[],
  categories: BackendCategory[],
  currentLanguage: "hy" | "ru" | "en" = "hy"
): TransformedProduct[] => {
  return products.map((product) => {
    const category = categories.find(c => c.id === product.category_id);
    const subcategory = category?.subcategories.find(s => s.id === product.subcategory_id);
    
    const productName = product.name[currentLanguage] || product.name.hy;
    const categoryName = category?.name[currentLanguage] || category?.name.hy || "";
    const subcategoryName = subcategory?.name[currentLanguage] || subcategory?.name.hy || "";
    
    return {
      id: product.id,
      name: productName,
      section: categoryName,
      subsection: subcategoryName,
      price: product.price,
      image: product.image_url || "/placeholder-product.jpg",
      manufacturer: product.manufacturer,
      category_id: product.category_id,
      subcategory_id: product.subcategory_id,
      rawProduct: product
    };
  });
};

export const transformProduct = (
  product: Product,
  categories: BackendCategory[],
  currentLanguage: "hy" | "ru" | "en" = "hy"
): TransformedProduct => {
  return transformProducts([product], categories, currentLanguage)[0];
};