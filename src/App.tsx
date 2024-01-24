import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Header } from './components/organisms/Header/Header';
import { Footer } from './components/organisms/Footer/Footer';
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
