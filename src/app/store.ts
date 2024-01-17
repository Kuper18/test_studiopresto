import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products';
import orderReducer from '../features/order';

const store = configureStore({
  reducer: {
    products: productsReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
