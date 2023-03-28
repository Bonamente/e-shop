import { Product } from '../store/products/types';

export const addProductsToLocalStorage = (products: Product[]) => {
  localStorage.setItem('products', JSON.stringify(products));
};

export const getProductsFromLocalStorage = () => {
  const result = localStorage.getItem('products');
  return result ? JSON.parse(result) : null;
};

export const removeProductsFromLocalStorage = () => {
  localStorage.removeItem('products');
};
