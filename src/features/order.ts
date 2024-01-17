/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductQuantities } from '../types/ProductQuantities';

const initialState = {
  productQuantities: {} as ProductQuantities,
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
      // eslint-disable-next-line guard-for-in
      for (const key in state.productQuantities) {
        delete state.productQuantities[key];
      }
    },
  },
});

export default orderSlice.reducer;
export const { actions } = orderSlice;
