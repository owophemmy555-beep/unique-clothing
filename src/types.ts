export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  isNew?: boolean;
  colors?: string[];
  sizes?: string[];
  description?: string;
  rating?: number;
  reviewsCount?: number;
}

export interface CollectionItem {
  id: string;
  title: string;
  category: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface VideoPreset {
  id: string;
  title: string;
  url: string;
  poster: string;
  tag: string;
}

export type NavTab = 'home' | 'shop' | 'collections' | 'about' | 'lookbook';
