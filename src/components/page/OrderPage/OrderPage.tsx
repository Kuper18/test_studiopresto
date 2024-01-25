import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { actions as orderActions } from '../../../features/order';
import * as productsToByActions from '../../../features/productsToBuy';
import { setItemToLocalStorage } from '../../../utils/localStorage';
import { BreadCrumb } from '../../atoms/BreadCrumb/BreadCrumb';
import { OrderList } from '../../organisms/OrderList/OrderLisr';
import { Loader } from '../../atoms/Loader/Loader';
import { countTotalAmount } from '../../../utils/countTotalAmount';
import './OrderPage.scss';

export const OrderPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { productsToBuy, loading, error } = useAppSelector(
    (state) => state.productsToBuy,
  );
  const { productQuantities } = useAppSelector((state) => state.order);

  useEffect(() => {
    if (!productsToBuy.length) {
      dispatch(productsToByActions.init());
    }
  }, [dispatch, productsToBuy.length]);

  useEffect(() => {
    const quantity = productsToBuy.reduce((acc, product) => {
      return {
        [product.id]: {
          quantity: 1,
          amount: product.price,
        },
        ...acc,
      };
    }, productQuantities);

    setItemToLocalStorage('quantity', quantity);
    dispatch(orderActions.updateProductQuantities(quantity));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, productsToBuy.length]);

  return (
    <section>
      <BreadCrumb />

      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1>{productsToBuy.length ? 'Order' : "You don't have prducts"}</h1>

          {error && <p>{error}</p>}

          <div className="card-box">
            <OrderList />

            {!!productsToBuy.length && (
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
        </div>
      )}
    </section>
  );
};
