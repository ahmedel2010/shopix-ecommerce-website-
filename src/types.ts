export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  thumbnail?: string;
  images?: string[];
  rating: number;
  reviews: number;
  description: string;
  isNew?: boolean;
  brand?: string;
  stock?: number;
  discountPercentage?: number;
  colors?: string[];
  specifications?: Record<string, string>;
  features?: { title: string; description: string }[];
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'In Transit' | 'Processing';
  total: number;
  items: CartItem[];
}
