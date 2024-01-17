/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product } from '../types/Product';

type ProductsState = {
  products: Product[];
  selectedProducts: number[];
  loading: boolean;
  error: string;
};

const initialState: ProductsState = {
  products: [],
  selectedProducts: [],
  loading: false,
  error: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setId: (state, action: PayloadAction<number>) => {
      state.selectedProducts.push(action.payload);
    },
    removeId: (state, action: PayloadAction<number>) => {
      state.selectedProducts = state.selectedProducts.filter(
        (id) => id !== action.payload,
      );
    },
    removeAllIds: (state) => {
      state.selectedProducts = [];
    },
  },
});

export const { actions } = productsSlice;
export default productsSlice.reducer;
