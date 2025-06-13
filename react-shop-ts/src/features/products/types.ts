export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
  status: LoadingStatus;
  error: string | null;
  categories: string[],
  selectedCategory: string
}

export interface Review {
  id: string;       
  productId: number; 
  author: string;    
  rating: number;    
  text: string;      
  date: string;      
}

export type LoadingStatus =  'idle' | 'loading' | 'succeeded' | 'failed'