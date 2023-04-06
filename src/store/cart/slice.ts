/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { getCartContentFromLocalStorage } from '../../utils/localStorage';
import { CartItem, CartState } from './types';

const initialState: CartState = {
  cart: getCartContentFromLocalStorage(),
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const { id, name, description, sizeType, size, price, amount, imgUrl } =
        action.payload;

      const tempItem = state.cart.find((item: CartItem) => item.id === id);

      if (tempItem) {
        const tempCart = state.cart.map((cartItem: CartItem) => {
          if (cartItem.id === id) {
            const newAmount = cartItem.amount + amount;
            return { ...cartItem, amount: newAmount };
          }
          return cartItem;
        });

        state.cart = tempCart;
      } else {
        const newItem = {
          id,
          name,
          description,
          sizeType,
          size,
          price,
          amount,
          imgUrl,
        };

        state.cart.push(newItem);
      }
    },

    removeFromCart(state, action: PayloadAction<number>) {
      const tempCart = state.cart.filter(
        (item: CartItem) => item.id !== action.payload
      );

      state.cart = tempCart;
    },

    updateCartItemAmount(
      state,
      action: PayloadAction<{ id: number; value: 'inc' | 'dec' }>
    ) {
      const { id, value } = action.payload;

      const tempCart = state.cart.map((item: CartItem) => {
        if (item.id === id) {
          if (value === 'inc') {
            const newAmount = item.amount + 1;
            return { ...item, amount: newAmount };
          }

          if (value === 'dec') {
            let newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...item, amount: newAmount };
          }
        }

        return item;
      });

      state.cart = tempCart;
    },

    countCartTotals(state) {
      const { totalItems, totalPrice } = state.cart.reduce(
        (total: Record<string, number>, cartItem: CartItem) => {
          const { amount, price } = cartItem;

          total.totalItems += amount;
          total.totalPrice = Number(
            (total.totalPrice + price * amount).toFixed(2)
          );

          return total;
        },
        { totalItems: 0, totalPrice: 0 }
      );

      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItemAmount,
  countCartTotals,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer as Reducer<typeof initialState>;
