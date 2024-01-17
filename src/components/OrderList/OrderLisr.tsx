import React from 'react';
import { OrderCard } from '../OrderCard/OrderCard';
import { Product } from '../../types/Product';

import './OrderList.scss';

type Props = {
  productsToByu: Product[];
};

export const OrderList: React.FC<Props> = ({ productsToByu }) => {
  return (
    <div className="order-list">
      {productsToByu.map((product) => {
        return <OrderCard key={product.id} product={product} />;
      })}
    </div>
  );
};
