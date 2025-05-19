import React, { useState } from 'react';
import Categoria from '../components/categoria/categoria';
import Productos from '../components/productos/productos';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import Banner from '../components/carousel/banner';
import '../styles/categorias.css'; // Ruta a estilos

const Categorias = () => {
  const [categoriaActiva, setCategoriaActiva] = useState(null);

  return (
    <div className="page-container">
      <header>
        <Navbar />
        <Banner />
      </header>

      <div className="layout-categorias-productos">
        <aside className="sidebar">
          <Categoria onSelect={setCategoriaActiva} />
        </aside>
        <main className="main-content">
          <Productos categoriaId={categoriaActiva?.id} />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Categorias;
