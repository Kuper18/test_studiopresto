import { HashRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import App from './App';
import { OrderPage } from './components/page/OrderPage/OrderPage';
import { HomePage } from './components/page/HomePage/HomePage';
import store from './app/store';
import { ProductDetail } from './components/page/ProductDetail/ProductDetail';
import { FormPage } from './components/page/FormPage/FormPage';
import { NotFoundPage } from './components/page/NotFound/NotFoundPage';

export const Root = () => (
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="poductDetails/:productId" element={<ProductDetail />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="order/form" element={<FormPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </Provider>
);
