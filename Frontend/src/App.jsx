// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Solo BrowserRouter y Routes
import { UsuarioProvider } from './context/userContext';
import { CarritoProvider } from './context/carContext';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import CheckoutPage from './pages/CheckoutPage'; // Añadí CheckoutPage

function App() {
  return (
    <UsuarioProvider>
      <CarritoProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/checkout" element={<CheckoutPage />} /> 
          </Routes>
        </Router>
      </CarritoProvider>
    </UsuarioProvider>
  );
}

export default App;
