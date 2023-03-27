import { createSlice, Reducer } from '@reduxjs/toolkit';
import { getProductsFromLocalStorage } from '../../utils/localStorage';

import { ProductsState } from './types';
import {
  removeAllProducts,
  addProduct,
  editProduct,
  removeProduct,
} from './asyncActions';

import productsData from '../../productsData.json';

const localStorageProducts = getProductsFromLocalStorage();
const products = localStorageProducts || productsData;

const initialState: ProductsState = {
  products,
  status: 'idle',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.products = payload;
      })
      .addCase(addProduct.rejected, (state, { payload }) => {
        state.status = 'error';
        console.log(payload); // Refactor
      })
      .addCase(editProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editProduct.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.products = payload;
      })
      .addCase(editProduct.rejected, (state, { payload }) => {
        state.status = 'error';
        console.log(payload); // Refactor
      })
      .addCase(removeProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeProduct.fulfilled, (state, { payload }) => {
        if (payload.length < 1) {
          state.products = products;
        } else {
          state.products = payload;
        }

        state.status = 'idle';
      })
      .addCase(removeProduct.rejected, (state, { payload }) => {
        state.status = 'error';
        console.log(payload); // Refactor
      })
      .addCase(removeAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeAllProducts.fulfilled, (state) => {
        state.status = 'idle';
        state.products = products;
      })
      .addCase(removeAllProducts.rejected, (state, { payload }) => {
        state.status = 'error';
        console.log(payload); // Refactor
      });
  },
});

export default productsSlice.reducer as Reducer<typeof initialState>;
