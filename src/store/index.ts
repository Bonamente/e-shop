import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import products from './products/slice';
import filters from './filters/slice';
import cart from './cart/slice';
import modal from './modal/slice';

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  products,
  filters,
  cart,
  modal,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
