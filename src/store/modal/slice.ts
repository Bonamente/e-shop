import { createSlice, Reducer } from '@reduxjs/toolkit';
import { ModalState } from './types';

const initialState: ModalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(state) {
      state.isOpen = true;
    },

    hideModal(state) {
      state.isOpen = false;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer as Reducer<typeof initialState>;
