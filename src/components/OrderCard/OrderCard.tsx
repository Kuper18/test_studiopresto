/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { Button, Card, CloseButton } from 'react-bootstrap';
import { Product } from '../../types/Product';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as productsActions } from '../../features/products';
import { actions as orderActions } from '../../features/order';
import './OrderCard.scss';

type Props = {
  product: Product;
};

export const OrderCard: React.FC<Props> = ({ product }) => {
  const {
    title,
    image,
    id,
    price,
  } = product;
  const { productQuantities } = useAppSelector((state) => state.order);
  const { amount = 0, quantity = 0 } = productQuantities[id] || {};
  const dispatch = useAppDispatch();

  const removeCard = (idItem: number) => {
    dispatch(orderActions.deleteItem(idItem));
    dispatch(productsActions.removeId(idItem));
  };

  const increaseQuantity = (idItem: number, priceItem: number) => {
    const { amount } = productQuantities[idItem];
    const { quantity } = productQuantities[idItem];

    dispatch(
      orderActions.updateProductQuantities({
        ...productQuantities,
        [idItem]: {
          quantity: quantity + 1,
          amount: amount + priceItem,
        },
      }),
    );
  };

  const decreaseQuantity = (idItem: number, priceItem: number) => {
    const { amount } = productQuantities[idItem];
    const { quantity } = productQuantities[idItem];

    if (quantity < 2) {
      return;
    }

    dispatch(
      orderActions.updateProductQuantities({
        ...productQuantities,
        [idItem]: {
          quantity: quantity - 1,
          amount: amount - priceItem,
        },
      }),
    );
  };

  return (
    <Card style={{ width: '18rem', margin: '0' }}>
      <Card.Body className="card_body">
        <Card.Img variant="top" src={image} style={{ width: '50px' }} />
        <Card.Title>{title}</Card.Title>
        <CloseButton className="close-button" onClick={() => removeCard(id)} />
      </Card.Body>

      <Card.Body className="card_body">
        <Card.Text className="card-price">{`$${amount.toFixed(2)}`}</Card.Text>

        <div className="card-text">
          <Button
            variant="outline-primary"
            onClick={() => decreaseQuantity(id, price)}
          >
            <i className="fa-solid fa-minus" />
          </Button>

          <p className="quantity">{quantity}</p>

          <Button
            variant="outline-primary"
            onClick={() => increaseQuantity(id, price)}
          >
            <i className="fa-solid fa-plus" />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
