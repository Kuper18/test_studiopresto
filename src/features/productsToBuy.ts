/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { getAllProducts } from '../utils/fetchClient';

type ProductsToBuyState = {
  productsToBuy: Product[];
  selectedId: number[];
  loading: boolean;
  error: string;
};

const idsFromLocalStorage = JSON.parse(localStorage.getItem('ids') || '[]');

const initialState: ProductsToBuyState = {
  productsToBuy: [],
  selectedId: idsFromLocalStorage,
  loading: false,
  error: '',
};

export const init = createAsyncThunk('productsToBuy/fetch', async () => {
  return getAllProducts();
});

const productsToBuySlice = createSlice({
  name: 'productsToBuy',
  initialState,
  reducers: {
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.productsToBuy = state.productsToBuy.filter(
        (product) => product.id !== action.payload,
      );
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.productsToBuy.push(action.payload);
    },
    deleteAll: (state, action: PayloadAction<Product[]>) => {
      state.productsToBuy = action.payload;
    },
    setId: (state, action: PayloadAction<number>) => {
      state.selectedId.push(action.payload);
    },
    removeId: (state, action: PayloadAction<number>) => {
      state.selectedId = state.selectedId.filter((id) => id !== action.payload);
    },
    removeAllIds: (state) => {
      state.selectedId = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.loading = false;
      state.productsToBuy = action.payload
        .filter((product) => state.selectedId.includes(product.id));
    });
    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = 'Something went wrong';
    });
  },
});

export const { actions } = productsToBuySlice;
export default productsToBuySlice.reducer;
