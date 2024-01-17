import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { ModalItem } from '../../components/Modal/Modal';
import { SubmitForm } from '../../components/SubmitForm/SubmitForm';
import { useAppSelector } from '../../app/hooks';
import { OrderList } from '../../components/OrderList/OrderLisr';
import { BreadCrumb } from '../../components/BreadCrumb/BreadCrumb';
import './FormPage.scss';

export const FormPage: React.FC = () => {
  const [isShownModal, setIsShownModal] = useState(false);
  const { products, selectedProducts } = useAppSelector(
    (state) => state.products,
  );
  const productsToByu = products.filter((product) => {
    return selectedProducts.includes(product.id);
  });

  return (
    <section>
      <BreadCrumb />

      {isShownModal && (
        <ModalItem
          isShownModal={isShownModal}
          setIsShownModal={setIsShownModal}
        >
          Order was submited
          <Link to="/" className="submit-button btn btn-primary">
            Go home
          </Link>
        </ModalItem>
      )}
      <div className="card-box">
        <h1>Contact us</h1>

        <OrderList productsToByu={productsToByu} />
        <SubmitForm setIsShownModal={setIsShownModal} />
      </div>
    </section>
  );
};
