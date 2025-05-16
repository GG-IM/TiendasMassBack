import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar'; // Asegúrate de que el Navbar esté bien importado
import Home from './pages/Home'; // Página de inicio
import LoginPage from './pages/LoginPage'; // Página de login
import Categoria from './components/categoria/categoria'; // Página de categorías
import { useState } from 'react';

function App() {
  const [categoriaActiva, setCategoriaActiva] = useState(null);

  const handleCategoriaSelect = (categoria) => {
    setCategoriaActiva(categoria);
  };

  return (
    <Router>
      {/* Navbar está fuera de Routes, para que no se recargue */}
      <Navbar />
      {/* El contenido cambia dinámicamente dentro de Routes */}
      <div >
        <Routes>
          {/* Solo el contenido cambia dentro de Routes */}
          <Route path="/" element={<Home categoriaActiva={categoriaActiva} />} />
          <Route path="/categorias" element={<Categoria onSelect={handleCategoriaSelect} />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>


      {/* El pie de página permanece estático, al igual que el navbar */}
      <footer className="text-center py-4 bg-light">
        <p>© Tiendas Mass 2025 - Compañía Hard Discount S.A.C</p>
      </footer>
    </Router>
  );
}

export default App;
