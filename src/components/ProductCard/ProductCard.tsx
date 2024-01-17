import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Product } from '../../types/Product';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as productsActions } from '../../features/products';
import { actions as orderActions } from '../../features/order';
import { ModalItem } from '../Modal/Modal';
import './ProductCard.scss';

type Props = {
  product: Product;
  // isShownDescription?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { selectedProducts } = useAppSelector((state) => state.products);
  const [isShownModal, setIsShownModal] = useState(false);

  const handleClick = () => {
    if (selectedProducts.includes(product?.id)) {
      dispatch(productsActions.removeId(product?.id));
      dispatch(orderActions.deleteItem(product?.id));
    } else {
      setIsShownModal(true);
      dispatch(productsActions.setId(product?.id));
    }
  };

  return (
    <div className="card-wrapper d-flex">
      {isShownModal && (
        <ModalItem
          isShownModal={isShownModal}
          setIsShownModal={setIsShownModal}
        >
          Product was added
        </ModalItem>
      )}
      <Card className="card">
        <Link
          to={`/poductDetails/${product?.id}`}
          className="card__image-wrapper"
        >
          <Card.Img
            className="card__image"
            variant="top"
            src={product?.image}
          />
        </Link>

        <Card.Body>
          <Card.Title as="h3">{product?.title}</Card.Title>
          <Card.Text>
            <span className="card__key">Category:</span>
            <span className="card__value">{product?.category}</span>
          </Card.Text>

          <Card.Text>
            <span className="card__key">Pice:</span>
            <span className="card__value">{`$${product?.price}`}</span>
          </Card.Text>

          <Button
            variant={
              selectedProducts.includes(product?.id)
                ? 'outline-primary'
                : 'primary'
            }
            onClick={handleClick}
          >
            {selectedProducts.includes(product?.id) ? 'Added' : 'Add to order'}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
