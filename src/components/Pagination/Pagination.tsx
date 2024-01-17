import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { PRODUCTS_PER_PAGE } from '../../types/ProductsPerPage';
import { scrollToTop } from '../../utils/scrollToTop';

type Props = {
  productsLength: number;
  currentPage: number;
};

export const PaginationButtons: React.FC<Props> = ({
  productsLength,
  currentPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paginate = (pageNumber: number) => {
    const newParams = getSearchWith(searchParams, { page: pageNumber || null });

    setSearchParams(newParams);
  };

  return (
    <Pagination className="d-flex justify-content-center">
      <Pagination.First
        onClick={() => {
          paginate(1);
          scrollToTop();
        }}
      />
      <Pagination.Prev
        onClick={() => {
          paginate(currentPage - 1);
          scrollToTop();
        }}
        disabled={currentPage === 1}
      />
      {Array.from({
        length: Math.ceil(productsLength / PRODUCTS_PER_PAGE),
      }).map((_, index) => (
        <Pagination.Item
          // eslint-disable-next-line react/no-array-index-key
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => {
            paginate(index + 1);
            scrollToTop();
          }}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => {
          paginate(currentPage + 1);
          scrollToTop();
        }}
        disabled={currentPage === Math.ceil(productsLength / PRODUCTS_PER_PAGE)}
      />
      <Pagination.Last
        onClick={() => {
          paginate(Math.ceil(productsLength / PRODUCTS_PER_PAGE));
          scrollToTop();
        }}
      />
    </Pagination>
  );
};
