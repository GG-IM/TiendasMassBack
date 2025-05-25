import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Categorias from './pages/categorias';
import CheckoutPage from './pages/CheckoutPage';
import Contacto from './pages/contacto';// 👈 nuevo
import { CarritoProvider } from './context/carContext';
import { UsuarioProvider } from './context/userContext';
import './App.css';

function App() {
  return (
    <UsuarioProvider>
      <CarritoProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/contacto" element={<Contacto />} /> {/* 👈 nueva ruta */}
          </Routes>
        </Router>
      </CarritoProvider>
    </UsuarioProvider>
  );
}

export default App;
