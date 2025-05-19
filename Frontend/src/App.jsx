import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/navbar/Navbar'; // Navbar
import Home from './pages/Home'; // Página de inicio
import LoginPage from './pages/LoginPage'; // Página de login
import Categorias from './pages/categorias'; // Página de categorías
import { CarritoProvider } from './context/carContext';
import { UsuarioProvider } from '../src/context/userContext'; 
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
          </Routes>
        </Router>
      </CarritoProvider>
    </UsuarioProvider>
  );
}

export default App;
