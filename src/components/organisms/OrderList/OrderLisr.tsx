import React from 'react';
import { OrderCard } from '../../molecules/OrderCard/OrderCard';
import { useAppSelector } from '../../../app/hooks';
import './OrderList.scss';

export const OrderList: React.FC = () => {
  const { productsToBuy } = useAppSelector((state) => state.productsToBuy);

  return (
    <div className="order-list">
      {productsToBuy.map((product) => {
        return <OrderCard key={product.id} product={product} />;
      })}
    </div>
  );
};
