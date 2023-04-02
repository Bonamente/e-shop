export type Product = {
  id: number;
  barcode: number;
  brand: string;
  manufacturer: string;
  name: string;
  description: string;
  careType: string[];
  sizeType: 'volume' | 'weight';
  size: number;
  price: number;
  imgUrl: string;
};

export type ProductsState = {
  products: Product[];
  status: string;
};
