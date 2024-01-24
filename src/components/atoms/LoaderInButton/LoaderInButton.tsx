import React from 'react';
import { Spinner } from 'react-bootstrap';

export const LoaderInButton: React.FC = () => {
  return <Spinner animation="border" variant="light" size="sm" />;
};
