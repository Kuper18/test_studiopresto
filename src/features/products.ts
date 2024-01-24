/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { getAllProducts } from '../utils/fetchClient';

type ProductsState = {
  products: Product[];
  loading: boolean;
  error: string;
};

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('products/fetch', () => {
  return getAllProducts();
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = 'Something went wrong';
    });
  },
});

export default productsSlice.reducer;
export const { actions } = productsSlice;
