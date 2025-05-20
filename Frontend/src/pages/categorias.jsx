import React, { useState } from 'react';
import Categoria from '../components/categoria/categoria';
import Productos from '../components/productos/productos';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import Banner from '../components/carousel/banner';
import '../styles/categorias.css';

const Categorias = () => {
  const [categoriaActiva, setCategoriaActiva] = useState(null);

  return (
    <div className="categorias-page">
      <header className="header">
        <Navbar />
        <Banner />
      </header>

      <main className="layout-contenido">
        <div className="layout-columnas">
          <aside className="sidebar-categorias">
           
            <Categoria onSelect={setCategoriaActiva} />
          </aside>

          <section className="productos-grid-container">
            <Productos categoriaId={categoriaActiva?.id} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Categorias;
