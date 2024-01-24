import React from 'react';
import { BreadCrumb } from '../../atoms/BreadCrumb/BreadCrumb';

export const NotFoundPage: React.FC = () => {
  return (
    <section>
      <BreadCrumb />

      <div className="card-box">
        <h1>Not Found</h1>
      </div>
    </section>
  );
};
