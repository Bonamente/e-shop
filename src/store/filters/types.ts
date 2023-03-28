import { Product } from '../products/types';

export type Sort = 'name-a' | 'name-z' | 'price-lowest' | 'price-highest';

export type Filters = {
  searchValue: string;
  manufacturers: string[];
  careType: string;
  minPrice: number;
  maxPrice: number;
};

export type FilterState = {
  allProducts: Product[];
  filteredProducts: Product[];
  sort: Sort;
  filters: Filters;
  currentPage: number;
};
