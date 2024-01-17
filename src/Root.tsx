import { HashRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import App from './App';
import { Order } from './pages/Order/Order';
import { HomePage } from './pages/HomePage/HomePage';
import store from './app/store';
import { ProductDetail } from './pages/ProductDetail/ProductDetail';
import { FormPage } from './pages/FormPage/FormPage';

export const Root = () => (
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          {/* <Route path='home' element={<Navigate to='/' />} /> */}
          <Route path="poductDetails/:productId" element={<ProductDetail />} />

          <Route path="order" element={<Order />} />
          <Route path="order/form" element={<FormPage />} />

          <Route path="*" element={<h1>Page is not found</h1>} />
        </Route>
      </Routes>
    </HashRouter>
  </Provider>
);
