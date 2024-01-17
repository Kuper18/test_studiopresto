import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {
  return (
    <>
      <Header />

      <main className="main">
        <Container>
          <Outlet />
        </Container>
      </main>

      <Footer />
    </>
  );
}

export default App;
