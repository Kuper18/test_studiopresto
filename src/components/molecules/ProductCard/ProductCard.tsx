import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Product } from '../../../types/Product';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { actions as orderActions } from '../../../features/order';
import {
  actions as productsToBuyActions,
} from '../../../features/productsToBuy';
import { setItemToLocalStorage } from '../../../utils/localStorage';
import './ProductCard.scss';
import { Modal } from '../../atoms/Modal/Modal';
import { Button } from '../../atoms/Button/Button';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { selectedId } = useAppSelector((state) => state.productsToBuy);
  const [isShownModal, setIsShownModal] = useState(false);

  const handleClick = () => {
    setItemToLocalStorage('ids', product.id);

    if (selectedId.includes(product.id)) {
      dispatch(productsToBuyActions.removeId(product.id));
      dispatch(orderActions.deleteItem(product.id));
      dispatch(productsToBuyActions.deleteProduct(product.id));
      setItemToLocalStorage('quantity', product.id);
    } else {
      setIsShownModal(true);
      dispatch(productsToBuyActions.setId(product.id));
      dispatch(productsToBuyActions.addProduct(product));
    }
  };

  return (
    <div className="card-wrapper d-flex">
      {isShownModal && (
        <Modal isShownModal={isShownModal} setIsShownModal={setIsShownModal}>
          Product was added
        </Modal>
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
            isPrimary={selectedId.includes(product?.id)}
            onClick={handleClick}
          >
            {selectedId.includes(product?.id) ? 'Added' : 'Add to order'}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
