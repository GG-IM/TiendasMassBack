import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar'; // Navbar
import Home from './pages/Home'; // Página de inicio
import LoginPage from './pages/LoginPage'; // Página de login
import Categoria from './components/categoria/categoria'; // Categorías
import Productos from './components/productos/productos'; // Productos
import { useState } from 'react';
import './App.css';


function App() {
  const [categoriaActiva, setCategoriaActiva] = useState(null);

  const handleCategoriaSelect = (categoria) => {
    setCategoriaActiva(categoria);
  };

  return (
    <Router>
      {/* Navbar está fuera de Routes, para que no se recargue */}
      <Navbar />

      {/* Contenido dinámico */}
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
          <Route
            path="/login"
            element={<LoginPage />}
          />
        </Routes>
      </div>

      {/* Pie de página */}
      <footer className="text-center py-4 bg-light">
        <p>© Tiendas Mass 2025 - Compañía Hard Discount S.A.C</p>
      </footer>
    </Router>
  );
}

export default App;
