/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductQuantities } from '../types/ProductQuantities';

const quantity = JSON.parse(localStorage.getItem('quantity') || '[]');

const initialState = {
  productQuantities: quantity[0] || {},
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateProductQuantities: (
      state,
      action: PayloadAction<ProductQuantities>,
    ) => {
      state.productQuantities = action.payload;
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      delete state.productQuantities[action.payload];
    },
    deleteAll: (state) => {
      state.productQuantities = {};
    },
  },
});

export default orderSlice.reducer;
export const { actions } = orderSlice;
