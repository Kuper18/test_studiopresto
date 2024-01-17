/* eslint-disable no-restricted-syntax */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ProductQuantities } from '../../types/ProductQuantities';
import { actions as orderActions } from '../../features/order';
import { OrderList } from '../../components/OrderList/OrderLisr';
import { BreadCrumb } from '../../components/BreadCrumb/BreadCrumb';
import './Order.scss';

function countTotalAmount(productQuantities: ProductQuantities): string {
  let amount = 0;

  // eslint-disable-next-line guard-for-in
  for (const key in productQuantities) {
    amount += productQuantities[key].amount;
  }

  return amount.toFixed(2);
}

export const Order: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, selectedProducts } = useAppSelector(
    (state) => state.products,
  );
  const { productQuantities } = useAppSelector((state) => state.order);
  const productsToByu = products.filter((product) => {
    return selectedProducts.includes(product.id);
  });

  useEffect(() => {
    dispatch(
      orderActions.updateProductQuantities(
        productsToByu.reduce((acc, product) => {
          return {
            [product.id]: {
              quantity: 1,
              amount: product.price,
            },
            ...acc,
          };
        }, productQuantities),
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, products, selectedProducts]);

  return (
    <section>
      <BreadCrumb />

      <h1>{productsToByu.length ? 'Order' : "You don't have prducts"}</h1>

      <div className="card-box">
        <OrderList productsToByu={productsToByu} />

        {!!productsToByu.length && (
          <div>
            <Card
              style={{ width: '18rem', margin: '0' }}
              bg="dark"
              data-bs-theme="dark"
            >
              <Card.Body>
                <Card.Title>
                  {`Total Amount: $${countTotalAmount(productQuantities)}`}
                </Card.Title>

                <Card.Text />
                <Link to="/order/form" className="btn btn-primary">
                  Order
                </Link>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};
