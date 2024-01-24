/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { Card, CloseButton } from 'react-bootstrap';
import { Product } from '../../../types/Product';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { actions as orderActions } from '../../../features/order';
import {
  actions as productsToBuyActions,
} from '../../../features/productsToBuy';
import { setItemToLocalStorage } from '../../../utils/localStorage';
import { Button } from '../../atoms/Button/Button';
import './OrderCard.scss';

type Props = {
  product: Product;
};

export const OrderCard: React.FC<Props> = ({ product }) => {
  const {
    title, image, id, price,
  } = product;
  const { productQuantities } = useAppSelector((state) => state.order);
  const { amount = 0, quantity = 0 } = productQuantities[id] || {};
  const dispatch = useAppDispatch();

  const removeCard = (idItem: number) => {
    setItemToLocalStorage('ids', idItem);
    setItemToLocalStorage('quantity', idItem);
    dispatch(productsToBuyActions.deleteProduct(idItem));
    dispatch(orderActions.deleteItem(idItem));
    dispatch(productsToBuyActions.removeId(idItem));
  };

  const changeQuantity = (
    idItem: number,
    priceItem: number,
    action: string,
  ) => {
    const { amount } = productQuantities[idItem];
    const { quantity } = productQuantities[idItem];
    const updatedQuantity = {
      ...productQuantities,
      [idItem]: {
        quantity,
        amount,
      },
    };

    switch (true) {
      case action === '+':
        updatedQuantity[idItem].quantity += 1;
        updatedQuantity[idItem].amount += priceItem;
        break;

      case action === '-' && quantity > 1:
        updatedQuantity[idItem].quantity -= 1;
        updatedQuantity[idItem].amount -= priceItem;
        break;

      default:
        break;
    }

    setItemToLocalStorage('quantity', updatedQuantity);
    dispatch(orderActions.updateProductQuantities(updatedQuantity));
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
            isPrimary={!false}
            onClick={() => changeQuantity(id, price, '-')}
          >
            <i className="fa-solid fa-minus" />
          </Button>

          <p className="quantity">{quantity}</p>

          <Button
            isPrimary={!false}
            onClick={() => changeQuantity(id, price, '+')}
          >
            <i className="fa-solid fa-plus" />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
