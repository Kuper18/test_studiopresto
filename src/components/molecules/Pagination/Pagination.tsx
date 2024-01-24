import React from 'react';
import { Pagination as CostumPagination } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../utils/searchHelper';
import { PRODUCTS_PER_PAGE } from '../../../types/ProductsPerPage';
import { scrollToTop } from '../../../utils/scrollToTop';

type Props = {
  productsLength: number;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  productsLength,
  currentPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paginate = (pageNumber: number) => {
    const newParams = getSearchWith(searchParams, { page: pageNumber || null });

    setSearchParams(newParams);
  };

  return (
    <CostumPagination className="d-flex justify-content-center">
      <CostumPagination.First
        onClick={() => {
          paginate(1);
          scrollToTop();
        }}
      />
      <CostumPagination.Prev
        onClick={() => {
          paginate(currentPage - 1);
          scrollToTop();
        }}
        disabled={currentPage === 1}
      />
      {Array.from({
        length: Math.ceil(productsLength / PRODUCTS_PER_PAGE),
      }).map((_, index) => (
        <CostumPagination.Item
          // eslint-disable-next-line react/no-array-index-key
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => {
            paginate(index + 1);
            scrollToTop();
          }}
        >
          {index + 1}
        </CostumPagination.Item>
      ))}
      <CostumPagination.Next
        onClick={() => {
          paginate(currentPage + 1);
          scrollToTop();
        }}
        disabled={currentPage === Math.ceil(productsLength / PRODUCTS_PER_PAGE)}
      />
      <CostumPagination.Last
        onClick={() => {
          paginate(Math.ceil(productsLength / PRODUCTS_PER_PAGE));
          scrollToTop();
        }}
      />
    </CostumPagination>
  );
};
