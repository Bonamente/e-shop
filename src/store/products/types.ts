export type Product = {
  id: number;
  barcode: number;
  brand: string;
  manufacturer: string;
  name: string;
  description: string;
  care_type: string[];
  size_type: 'volume' | 'weight';
  size: number;
  price: number;
  img_url: string;
};

export type ProductsState = {
  products: Product[];
  status: string;
};
