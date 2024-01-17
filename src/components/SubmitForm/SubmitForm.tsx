import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import emailjs from '@emailjs/browser';
import { useAppDispatch } from '../../app/hooks';
import { actions as productsActions } from '../../features/products';
import { actions as orderActions } from '../../features/order';
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
  const onSubmit = async (data: FormData) => {
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
      dispatch(productsActions.removeAllIds());
      dispatch(orderActions.deleteAll());
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-3" style={{ flexDirection: 'column', gap: '20px' }}>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Control
            {...register('user_name', { required: 'Name is required' })}
            type="text"
            placeholder="Name"
            className={cn({
              'is-invalid': !!errors.user_name,
              'is-valid': !errors.user_name && !!getValues().user_name,
            })}
          />
          <span className="error-message">{errors.user_name?.message}</span>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Control
            {...register('user_email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              },
            })}
            type="text"
            placeholder="Email"
            className={cn({
              'is-invalid': !!errors.user_email,
              'is-valid': !errors.user_email && !!getValues().user_email,
            })}
          />
          <span className="error-message">{errors.user_email?.message}</span>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Control
            {...register('user_phone', {
              required: 'Phone number is required',
              pattern: {
                value: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                message: 'Invalid phone number',
              },
            })}
            type="text"
            placeholder="Phone number"
            className={cn({
              'is-invalid': !!errors.user_phone,
              'is-valid': !errors.user_phone && !!getValues().user_phone,
            })}
          />
          <span className="error-message">{errors.user_phone?.message}</span>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom04">
          <Button className="submit-button" type="submit" disabled={isLoad}>
            {isLoad ? (
              <Spinner animation="border" variant="light" size="sm" />
            ) : (
              'Submit'
            )}
          </Button>
        </Form.Group>
      </Row>
    </Form>
  );
};
