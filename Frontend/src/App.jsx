import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/navbar/Navbar'; // Navbar
import Home from './pages/Home'; // Página de inicio
import LoginPage from './pages/LoginPage'; // Página de login
import Categoria from './components/categoria/categoria'; // Categorías
import Productos from './components/productos/productos'; // Productos
import { CarritoProvider } from './context/carContext';
import { useState } from 'react';
import './App.css';
import { UsuarioProvider } from '../src/context/userContext'; 
function App() {
  const [categoriaActiva, setCategoriaActiva] = useState(null);

  const handleCategoriaSelect = (categoria) => {
    setCategoriaActiva(categoria);
  };

  return (
    // Envuelve la app en UsuarioProvider para que el contexto funcione
    <UsuarioProvider>
      <CarritoProvider>
       
      <Router>
        <div>
          <Routes>
            <Route
              path="/"
              element={<Home categoriaActiva={categoriaActiva} />}
            />
            <Route
              path="/categorias"
              element={
                <div className="layout-categorias-productos">
                  <div className="sidebar">
                    <Categoria onSelect={handleCategoriaSelect} />
                  </div>
                  <div className="main-content">
                    <Productos />
                  </div>
                </div>
              }
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
      </CarritoProvider>
    </UsuarioProvider>
  );
}

export default App;
