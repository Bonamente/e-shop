import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { Product } from '../products/types';
import { Filters, FilterState, Sort } from './types';

import {
  compareByNameAscending,
  compareByNameDescending,
  compareByPriceLowest,
  compareByPriceHighest,
} from '../../utils/comparators';

const initialState: FilterState = {
  allProducts: [],
  filteredProducts: [],
  sort: 'name-a',
  initMinPrice: 0,
  initMaxPrice: 0,
  filters: {
    searchValue: '',
    manufacturers: [],
    careType: '',
    minPrice: 0,
    maxPrice: 0,
  },

  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    loadAllProducts(state, action: PayloadAction<Product[]>) {
      const prices = action.payload.map((product) => product.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      state.allProducts = action.payload;
      state.filteredProducts = action.payload;
      state.filters.minPrice = minPrice;
      state.initMinPrice = minPrice;
      state.filters.maxPrice = maxPrice;
      state.initMaxPrice = maxPrice;
    },

    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },

    updateSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },

    sortProducts(state) {
      const { sort, filteredProducts } = state;
      let sorted: Product[] = [];

      switch (sort) {
        case 'name-a':
          sorted = filteredProducts.sort(compareByNameAscending);
          break;
        case 'name-z':
          sorted = filteredProducts.sort(compareByNameDescending);
          break;
        case 'price-lowest':
          sorted = filteredProducts.sort(compareByPriceLowest);
          break;
        case 'price-highest':
          sorted = filteredProducts.sort(compareByPriceHighest);
          break;
        default:
          throw new Error(`invalid sort parameter value: ${sort}`);
      }

      state.filteredProducts = sorted;
    },

    updateFilter: <K extends keyof Filters>(
      state: FilterState,
      action: PayloadAction<{ name: K; value: Filters[K] }>
    ) => {
      const { name, value } = action.payload;
      state.filters[name] = value;
    },

    filterProducts(state) {
      const { allProducts } = state;
      const { searchValue, manufacturers, careType, minPrice, maxPrice } =
        state.filters;

      let products: Product[] = [...allProducts];

      // filter by search input value (manufacturer's name)
      if (searchValue) {
        products = products.filter((product) =>
          product.manufacturer
            .toLowerCase()
            .startsWith(searchValue.toLowerCase())
        );
      }

      // filter by manufacturers (checkboxes)
      if (manufacturers.length > 0) {
        products = products.filter((product) =>
          manufacturers.includes(product.manufacturer)
        );
      }

      // filter by care type
      if (careType) {
        products = products.filter((product) =>
          product.careType.includes(careType)
        );
      }

      // filter by price
      products = products.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );

      state.filteredProducts = products;
      state.currentPage = 1;
    },

    clearFilters(state) {
      return {
        ...state,
        filters: {
          searchValue: '',
          manufacturers: [],
          careType: '',
          minPrice: state.initMinPrice,
          maxPrice: state.initMaxPrice,
        },
        currentPage: 1,
      };
    },
  },
});

export const {
  loadAllProducts,
  updateSort,
  updateFilter,
  sortProducts,
  filterProducts,
  clearFilters,
  setCurrentPage,
} = filterSlice.actions;

export default filterSlice.reducer as Reducer<typeof initialState>;
