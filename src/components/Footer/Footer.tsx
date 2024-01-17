import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export const Footer: React.FC = () => {
  return (
    <footer>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Shop</Navbar.Brand>
        </Container>
      </Navbar>
    </footer>
  );
};
