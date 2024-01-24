import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products';
import orderReducer from '../features/order';
import productsToBuyReducer from '../features/productsToBuy';

const store = configureStore({
  reducer: {
    products: productsReducer,
    order: orderReducer,
    productsToBuy: productsToBuyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
