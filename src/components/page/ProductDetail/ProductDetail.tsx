/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Product } from '../../../types/Product';
import { getProductById } from '../../../utils/fetchClient';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  actions as productsToBuyActions,
} from '../../../features/productsToBuy';
import { BreadCrumb } from '../../atoms/BreadCrumb/BreadCrumb';
import { Modal } from '../../atoms/Modal/Modal';
import { Loader } from '../../atoms/Loader/Loader';
import { Button } from '../../atoms/Button/Button';
import './ProductDetail.scss';

export const ProductDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedId } = useAppSelector((state) => state.productsToBuy);

  const [productDetails, setProductDetails] = useState<Product[]>([]);
  const [isShownModal, setIsShownModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoad, setIsLoad] = useState(false);

  const [product] = productDetails;
  const { pathname } = useLocation();

  useEffect(() => {
    setIsLoad(true);

    getProductById(pathname.split('/').at(-1) || '')
      .then((data) => setProductDetails([data]))
      .catch((error) => {
        setErrorMessage('Somthing went wrong');
        throw error;
      })
      .finally(() => {
        setIsLoad(false);
      });
  }, [pathname]);

  const handleClick = () => {
    if (selectedId.includes(product?.id)) {
      dispatch(productsToBuyActions.removeId(product?.id));
    } else {
      setIsShownModal(true);
      dispatch(productsToBuyActions.setId(product?.id));
      dispatch(productsToBuyActions.setId(product?.id));
    }
  };

  return (
    <section>
      {isShownModal && (
        <Modal isShownModal={isShownModal} setIsShownModal={setIsShownModal}>
          Product was added
        </Modal>
      )}

      <BreadCrumb />

      <h1 className="title">Product Details</h1>

      {isLoad ? (
        <Loader />
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <article className="product">
          <Row>
            <Col lg={4} md={12}>
              <img
                className="product__image"
                src={product?.image}
                alt="Product"
              />
            </Col>
            <Col lg={6} md={12}>
              <div className="product__description">
                <h2>{product?.title}</h2>

                <p className="product__info">
                  <span className="product__value">{product?.description}</span>
                </p>

                <p className="product__info">
                  <span className="product__key">Category:</span>
                  <span className="product__value">{product?.category}</span>
                </p>

                <p className="product__info">
                  <span className="product__key">Rate:</span>
                  <span className="product__value">{product?.rating.rate}</span>
                </p>

                <p className="product__info">
                  <span className="product__key">Price:</span>
                  <span className="product__value">{`$${product?.price}`}</span>
                </p>

                <Button
                  isPrimary={selectedId.includes(product?.id)}
                  onClick={handleClick}
                >
                  {selectedId.includes(product?.id) ? 'Added' : 'Add to order'}
                </Button>
              </div>
            </Col>
          </Row>
        </article>
      )}
    </section>
  );
};
