import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';
import './BreadCrumb.scss';

export const BreadCrumb = () => {
  return (
    <Breadcrumb>
      <Link className="breadcrumb-item" to="/">Go Back</Link>
    </Breadcrumb>
  );
};
