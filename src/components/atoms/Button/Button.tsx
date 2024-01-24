import React from 'react';
import cn from 'classnames';
import { Button as CustomButton } from 'react-bootstrap';

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  isPrimary?: boolean;
};

export const Button: React.FC<Props> = ({
  onClick,
  children,
  isPrimary = false,
}) => (
  <CustomButton
    variant={isPrimary ? 'outline-primary' : 'primary'}
    className={cn({
      'd-lg-none': children === 'Categories',
    })}
    onClick={onClick}
  >
    {children}
  </CustomButton>
);
