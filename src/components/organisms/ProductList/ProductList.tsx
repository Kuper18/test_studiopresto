import React from 'react';
import { Product } from '../../../types/Product';
import { ProductCard } from '../../molecules/ProductCard/ProductCard';

import './ProductList.scss';

type Props = {
  currentProducts: Product[];
};

export const ProductList: React.FC<Props> = ({ currentProducts }) => {
  return (
    <div className="cards">
      {currentProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
