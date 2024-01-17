import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useLocation, useSearchParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {
  Button,
  Col,
  ListGroup,
  Offcanvas,
  Row,
  Spinner,
} from 'react-bootstrap';
import { getSearchWith } from '../../utils/searchHelper';
import { ProductList } from '../../components/ProductList/ProductList';
import { Product } from '../../types/Product';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PRODUCTS_PER_PAGE } from '../../types/ProductsPerPage';
import { getAllProducts, getcategories } from '../../api/fetchClient';
import { actions } from '../../features/products';
import { PaginationButtons } from '../../components/Pagination/Pagination';
import './HomePage.scss';

interface SearchParams {
  [key: string]: string;
}

function getCurrentPage(url: string) {
  const pageValue = url
    .split('&')
    .filter((item) => item.includes('page'))
    .join('');

  return +[...pageValue.split('=')][1] || 1;
}

function filterProducts(products: Product[], params: SearchParams): Product[] {
  let filteredProduct = products;
  const { query, category } = params;

  if (query) {
    filteredProduct = filteredProduct.filter((product) => {
      return product.title.toLowerCase().includes(query.toLowerCase().trim());
    });
  }

  if (category) {
    filteredProduct = filteredProduct.filter(
      (product) => product.category === category,
    );
  }

  return filteredProduct;
}

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);
  const { search } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(getCurrentPage(search));
  const [categories, setCategories] = useState<string[] | null>(null);
  const [isShowOffcanvas, setIsShowOffcanvas] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const title = searchParams.get('category') || 'All products';
  const query = searchParams.get('query') || '';
  const category = searchParams.get('category') || '';
  const page = searchParams.get('page') || 1;

  const filteredProducts = filterProducts([...products], { query, category });

  const indexOfLastProduct = filteredProducts.length <= PRODUCTS_PER_PAGE
    ? PRODUCTS_PER_PAGE
    : currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = filteredProducts.length <= PRODUCTS_PER_PAGE
    ? 0
    : indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  // #region handleFunctions
  const handleCloseOffcanvas = () => setIsShowOffcanvas(false);
  const handleShowOffcanvas = () => setIsShowOffcanvas(true);

  const handleLinkClick = (categoryItem: string) => {
    if (isShowOffcanvas) {
      handleCloseOffcanvas();
    }

    const validateCategory = categoryItem.includes('all') ? null : categoryItem;
    const newParams = getSearchWith(searchParams, {
      category: validateCategory,
      page: 1,
    });

    setSearchParams(newParams);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = getSearchWith(searchParams, {
      query: event.target.value || null,
    });

    setSearchParams(newParams);
  };
  // #endregion

  // #region useEffect
  useEffect(() => {
    getcategories()
      .then((data) => setCategories(['all products', ...data]))
      .catch((error) => {
        setErrorMessage('Somethig went wrong');
        throw error;
      })
      .finally();
  }, []);

  useEffect(() => {
    dispatch(actions.setLoading(true));

    getAllProducts()
      .then((data) => dispatch(actions.setProducts(data)))
      .catch((error) => {
        setErrorMessage('Somethig went wrong');
        throw error;
      })
      .finally(() => {
        dispatch(actions.setLoading(false));
      });
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(+page);
  }, [page]);
  // #endregion

  return (
    <>
      <div className="d-flex justify-content-between home-top">
        <h1 className="title">
          {title.replace(title[0], title[0].toUpperCase())}
        </h1>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={query}
            onChange={handleQueryChange}
          />
        </Form>
      </div>

      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Row style={{ alignItems: 'start' }} className="custom-row">
          {errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <>
              <Col as="aside" className="col" lg={2} md={2} sm="auto" xs="auto">
                <Button
                  variant="primary"
                  className="d-lg-none"
                  onClick={handleShowOffcanvas}
                >
                  Categories
                </Button>

                <Offcanvas
                  style={{ top: '56px' }}
                  show={isShowOffcanvas}
                  onHide={handleCloseOffcanvas}
                  responsive="lg"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Categories</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <ListGroup as="ul">
                      {categories?.map((categoryItem) => {
                        const normalizeValue = categoryItem.replace(
                          categoryItem[0],
                          categoryItem[0].toUpperCase(),
                        );

                        return (
                          <button
                            type="button"
                            key={categoryItem}
                            className={cn('list-group-item', {
                              active: categoryItem === category
                              || (category === '' && categoryItem
                                .includes('all')),
                            })}
                            onClick={() => handleLinkClick(categoryItem)}
                          >
                            {normalizeValue}
                          </button>
                        );
                      })}
                    </ListGroup>
                  </Offcanvas.Body>
                </Offcanvas>
              </Col>

              <Col lg={10} md={10} sm="auto" xs="auto">
                <ProductList currentProducts={currentProducts} />
                <PaginationButtons
                  productsLength={filteredProducts.length}
                  currentPage={currentPage}
                />
              </Col>
            </>
          )}
        </Row>
      )}
    </>
  );
};
