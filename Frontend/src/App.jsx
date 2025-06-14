import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Categorias from './pages/categorias';
import CheckoutPage from './pages/CheckoutPage';
import Contacto from './pages/contacto';
import { CarritoProvider } from './context/carContext';
import { UsuarioProvider } from './context/userContext';
import ResultadosBusqueda from './pages/ResultadosBusqueda';
import React from 'react';
import UserProfile from './pages/perfil'; 
import DetalleProducto from './components/productos/detalleproductomodal';

import './App.css';

function App() {
  return (
    <UsuarioProvider>
      <CarritoProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/buscar" element={<ResultadosBusqueda />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/perfil" element={<UserProfile />} /> 
            <Route path="/contacto" element={<Contacto />} /> 
          </Routes>
        </Router>
      </CarritoProvider>
    </UsuarioProvider>
  );
}

export default App;
