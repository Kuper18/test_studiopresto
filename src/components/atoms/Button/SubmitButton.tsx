import React from 'react';
import { Button } from 'react-bootstrap';

type Props = {
  isLoad: boolean;
  children: React.ReactNode;
};

export const SubmitButton: React.FC<Props> = ({ isLoad, children }) => (
  <Button className="submit-button" type="submit" disabled={isLoad}>
    {children}
  </Button>
);
