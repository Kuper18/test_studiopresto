import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAppSelector } from '../../app/hooks';
import './Header.scss';

export const Header: React.FC = () => {
  const { selectedProducts } = useAppSelector((state) => state.products);

  return (
    <header>
      <Navbar fixed="top" bg="dark" data-bs-theme="dark">
        <Container>
          <Link to="/" className="navbar-brand">
            Shop
          </Link>

          <Nav className="me-auto">
            <Link className="nav-link basket" to="/order">
              <i className="fa-solid fa-basket-shopping basket-icon">
                {!!selectedProducts.length && (
                  <span className="basket-icon__quantity">
                    {selectedProducts.length}
                  </span>
                )}
              </i>
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};
