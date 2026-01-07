export interface ProductFeatures {
  id: string;
  title: {
    hy: string;
    ru: string;
    en: string;
  }
  description: {
    hy: string;
    ru: string;
    en: string;
  }
}

export interface Product {
  id: string;
  name: {
    hy: string;
    ru: string;
    en: string;
  }
  price: number;
  description: {
    hy: string;
    ru: string;
    en: string;
  }
  manufacturer: string;
  image: string;
  features: ProductFeatures[];
  createdAt: string;
  updatedAt: string;
}

export interface NewsFeatures {
  id: string;
  title: {
    hy: string;
    ru: string;
    en: string;
  }
  description: {
    hy: string;
    ru: string;
    en: string;
  }
}

export interface NewsAuthor {
  name: {
    hy: string;
    ru: string;
    en: string;
  }
  position: {
    hy: string;
    ru: string;
    en: string;
    
  },
  bio: {
    hy: string;
    ru: string;
    en: string;
  }
  image: string;
}

export interface News {
  id: string;
  title: {
    hy: string;
    ru: string;
    en: string;
  }
  image: string;
  author: NewsAuthor;
  date: string;
  features: NewsFeatures[];
  createdAt: string;
  updatedAt: string;
}