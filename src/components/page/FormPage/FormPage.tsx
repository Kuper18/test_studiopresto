import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { OrderList } from '../../organisms/OrderList/OrderLisr';
import { BreadCrumb } from '../../atoms/BreadCrumb/BreadCrumb';
import * as productsToByActions from '../../../features/productsToBuy';
import './FormPage.scss';
import { Modal } from '../../atoms/Modal/Modal';
import { Loader } from '../../atoms/Loader/Loader';
import { SubmitForm } from '../../molecules/SubmitForm/SubmitForm';

export const FormPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isShownModal, setIsShownModal] = useState(false);
  const { productsToBuy, loading, error } = useAppSelector(
    (state) => state.productsToBuy,
  );

  useEffect(() => {
    if (!productsToBuy.length) {
      dispatch(productsToByActions.init());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <section>
      <BreadCrumb />

      {isShownModal && (
        <Modal isShownModal={isShownModal} setIsShownModal={setIsShownModal}>
          Order was submited
          <Link to="/" className="submit-button btn btn-primary">
            Go home
          </Link>
        </Modal>
      )}
      <div className="card-box">
        <h1>Contact us</h1>

        {loading && <Loader />}
        {error ? (
          <p>{error}</p>
        ) : (
          <>
            <OrderList />
            <SubmitForm setIsShownModal={setIsShownModal} />
          </>
        )}
      </div>
    </section>
  );
};
