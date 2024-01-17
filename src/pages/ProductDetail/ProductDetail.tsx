/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ModalItem } from '../../components/Modal/Modal';
import { Product } from '../../types/Product';
import { getProductById } from '../../api/fetchClient';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/products';
import { BreadCrumb } from '../../components/BreadCrumb/BreadCrumb';
import './ProductDetail.scss';

export const ProductDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedProducts, loading } = useAppSelector(
    (state) => state.products,
  );

  const [productDetails, setProductDetails] = useState<Product[]>([]);
  const [isShownModal, setIsShownModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [product] = productDetails;
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(actions.setLoading(true));

    getProductById(pathname.split('/').at(-1) || '')
      .then((data) => setProductDetails([data]))
      .catch((error) => {
        setErrorMessage('Somthing went wrong');
        throw error;
      })
      .finally(() => {
        dispatch(actions.setLoading(false));
      });
  }, [pathname, dispatch]);

  const handleClick = () => {
    if (selectedProducts.includes(product?.id)) {
      dispatch(actions.removeId(product?.id));
    } else {
      setIsShownModal(true);
      dispatch(actions.setId(product?.id));
    }
  };

  return (
    <section>
      {isShownModal && (
        <ModalItem
          isShownModal={isShownModal}
          setIsShownModal={setIsShownModal}
        >
          Product was added
        </ModalItem>
      )}

      <BreadCrumb />

      <h1 className="title">Product Details</h1>

      {loading ? (
        <Spinner animation="border" variant="primary" />
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
                  variant={
                    selectedProducts.includes(product?.id)
                      ? 'outline-primary'
                      : 'primary'
                  }
                  onClick={handleClick}
                >
                  {selectedProducts.includes(product?.id)
                    ? 'Added'
                    : 'Add to order'}
                </Button>
              </div>
            </Col>
          </Row>
        </article>
      )}
    </section>
  );
};
