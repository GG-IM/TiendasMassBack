import React, { useState } from 'react';
import Productos from '../components/productos/productos';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/footer';
import Banner from '../components/carousel/banner';
import '../styles/categorias.css';

// Ajusta esto al nombre/case correcto de tu archivo:
import CategoryCarousel from '../components/carousel/categoriacarousel';

const Categorias = () => {
  const [categoriaActiva, setCategoriaActiva] = useState(null);

  // ① Define el handler que pasa la categoría al estado
  const handleSelectCategoria = (cat) => {
    setCategoriaActiva(cat);
  };

  return (
    <div className="categorias-page">
      <header className="header">
        <Navbar />
        <Banner />
      </header>

      <main className="layout-contenido">
        {/* ② Pasa tu handler al carousel */}
        <section className="categorias-grid-container">
        <h2 className='sub'>CATEGORÍAS</h2>
        <CategoryCarousel onSelect={handleSelectCategoria} />
        </section>
        <h2 className='sub'>PRODUCTOS</h2>
        {/* Productos ahora filtrados por la categoría activa */}
        <section className="productos-grid-container">

          <Productos categoriaId={categoriaActiva?.id} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Categorias;
