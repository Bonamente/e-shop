import { createAsyncThunk } from '@reduxjs/toolkit';
import { addProductsToLocalStorage } from '../../utils/localStorage';
import { Product } from './types';
import type { RootState } from '..';

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
