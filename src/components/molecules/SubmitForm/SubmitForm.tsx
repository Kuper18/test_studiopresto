import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import emailjs from '@emailjs/browser';
import {
  actions as productsToBuyActions,
} from '../../../features/productsToBuy';
import { actions as orderActions } from '../../../features/order';
import { clearLocalStorage } from '../../../utils/localStorage';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { LoaderInButton } from '../../atoms/LoaderInButton/LoaderInButton';
import { SubmitButton } from '../../atoms/Button/SubmitButton';
import { countTotalAmount } from '../../../utils/countTotalAmount';
import './SubmitForm.scss';

type Props = {
  setIsShownModal: (value: boolean) => void;
};

type FormData = {
  user_name: string;
  user_email: string;
  user_phone: string;
};

const TEMPLATE_ID = 'template_sib4u9u';
const SERVICE_ID = 'service_5tyhtar';
const PUBLIC_KEY = 'tKT5DkKartTF_r91G';

export const SubmitForm: React.FC<Props> = ({ setIsShownModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      user_name: '',
      user_email: '',
      user_phone: '',
    },
  });
  const [isLoad, setIsLoad] = useState(false);
  const dispatch = useAppDispatch();
  const { productsToBuy } = useAppSelector(state => state.productsToBuy);
  const { productQuantities } = useAppSelector(state => state.order);

  const onSubmit = async (data: FormData) => {
    const orderInfo = {
      userInfo: {
        name: data.user_name,
        email: data.user_email,
        phone: data.user_phone,
      },
      products: [...productsToBuy],
      totalAmount: countTotalAmount(productQuantities),
    };

    // eslint-disable-next-line no-console
    console.log(orderInfo);

    setIsLoad(true);
    try {
      const obj = {
        from_name: 'Sales Manager',
        user_name: data.user_name,
        user_email: data.user_email,
        user_phone: data.user_phone,
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, obj, PUBLIC_KEY);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error sending email:', error);
    } finally {
      reset();
      setIsShownModal(true);
      setIsLoad(false);
      dispatch(productsToBuyActions.removeAllIds());
      dispatch(orderActions.deleteAll());
      dispatch(productsToBuyActions.deleteAll([]));
      clearLocalStorage('ids', []);
      clearLocalStorage('quantity', [{}]);
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-3" style={{ flexDirection: 'column', gap: '20px' }}>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Control
            type="text"
            placeholder="Name"
            className={cn({
              'is-invalid': !!errors.user_name,
              'is-valid': !errors.user_name && !!getValues().user_name,
            })}
            {...register('user_name', { required: 'Name is required' })}
          />
          <span className="error-message">{errors.user_name?.message}</span>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Control
            type="text"
            placeholder="Email"
            className={cn({
              'is-invalid': !!errors.user_email,
              'is-valid': !errors.user_email && !!getValues().user_email,
            })}
            {...register('user_email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              },
            })}
          />
          <span className="error-message">{errors.user_email?.message}</span>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Control
            type="text"
            placeholder="Phone number"
            className={cn({
              'is-invalid': !!errors.user_phone,
              'is-valid': !errors.user_phone && !!getValues().user_phone,
            })}
            {...register('user_phone', {
              required: 'Phone number is required',
              pattern: {
                value: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                message: 'Invalid phone number',
              },
            })}
          />
          <span className="error-message">{errors.user_phone?.message}</span>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom04">
          <SubmitButton isLoad={isLoad}>
            {isLoad
              ? <LoaderInButton />
              : 'Submit'}
          </SubmitButton>
        </Form.Group>
      </Row>
    </Form>
  );
};
