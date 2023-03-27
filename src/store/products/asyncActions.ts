import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from './types';
import type { RootState } from '..';

import {
  addProductsToLocalStorage,
  removeProductsFromLocalStorage,
} from '../../utils/localStorage';

// admin action
export const addProduct = createAsyncThunk<
  Product[],
  Product,
  { state: RootState }
>('products/addProduct', async (product, { getState }) => {
  const { products } = getState().products;

  const updatedProducts = [...products, product];
  addProductsToLocalStorage(updatedProducts);

  return updatedProducts;
});

export const editProduct = createAsyncThunk<
  Product[],
  Product,
  { state: RootState }
>('products/editProduct', async (editedProduct, { getState }) => {
  const { products } = getState().products;

  const filteredProducts = products.filter(
    (product) => product.id !== editedProduct.id
  );

  const updatedProducts = [...filteredProducts, editedProduct];

  addProductsToLocalStorage(updatedProducts);

  return updatedProducts;
});

// admin action
export const removeProduct = createAsyncThunk<
  Product[],
  number,
  { state: RootState }
>('products/removeProduct', async (id, { getState }) => {
  const { products } = getState().products;

  const updatedProducts = products.filter((product) => product.id !== id);
  addProductsToLocalStorage(updatedProducts);

  return updatedProducts;
});

// admin action
export const removeAllProducts = createAsyncThunk<void>(
  'products/removeAllProducts',
  async () => {
    removeProductsFromLocalStorage();
  }
);
