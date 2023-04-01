import { configureStore } from '@reduxjs/toolkit';
import products from './products/slice';
import filters from './filters/slice';
import cart from './cart/slice';
import modal from './modal/slice';

export const store = configureStore({
  reducer: {
    products,
    filters,
    cart,
    modal,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
