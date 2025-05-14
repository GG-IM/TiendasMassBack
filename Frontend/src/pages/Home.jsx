import React from 'react';
import Navbar from './Navbar'; // Ajusta la ruta si es necesario


const Home = () => {
  return (

    
    <div className="home-page">
      {/* Logo y navegación */}
      <header className="navbar-principal container-fluid">
        <div className="container d-flex justify-content-between align-items-center py-3">
          <img
            src="https://www.tiendasmass.com.pe/wp-content/themes/mass/img/mass_logo.webp"
            alt="Logo"
            style={{ maxWidth: 150 }}
          />
          <nav className="d-none d-lg-block">
            <a href="/conoceme" className="mx-2">
              Conóceme
            </a>
            <a href="/precios-mass" className="mx-2">
              Precios Mass
            </a>
            <a href="/ubicame" className="mx-2">
              Ubícame
            </a>
            <a href="/productos" className="mx-2">
              Productos
            </a>
            <a
              href="https://linktr.ee/MassTrabajaConmigo?utm_source=qr_code"
              className="mx-2"
              target="_blank"
              rel="noreferrer"
            >
              Trabaja conmigo
            </a>
          </nav>
        </div>
      </header>

      {/* Banners principales */}
      <section className="banner-section text-center">
        <img className="img-fluid" src="https://www.tiendasmass.com.pe/wp-content/uploads/2023/10/BANNER-WEB.png" alt="Banner" />
      </section>

      {/* Texto destacado */}
      <section className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <h2>¡LOS MEJORES PRECIOS DEL BARRIO!</h2>
            <p>
              Caser@, a mi nadie me gana, yo tengo siempre los <strong>mejores precios</strong>,
              y además, estoy <strong>cerca a tu hogar</strong>.
            </p>
            <a href="/precios-mass" className="btn btn-primary mt-3">QUIERO VER</a>
          </div>
          <div className="col-md-6 text-center">
            <img className="img-fluid" src="https://www.tiendasmass.com.pe/wp-content/uploads/2023/06/mano-catalogos.webp" alt="Catálogo" />
          </div>
        </div>
      </section>

      {/* Productos destacados (muestra solo 3 de ejemplo) */}
      <section className="container my-5">
        <h2 className="text-center mb-4">PRECIOS MÁS MASS</h2>
        <div className="row text-center">
          <div className="col-6 col-md-4 mb-4">
            <img src="https://www.tiendasmass.com.pe/wp-content/uploads/2025/04/Carrusel_Producto1.png" alt="Producto" className="img-fluid" />
            <p>S/ 3.70</p>
          </div>
          <div className="col-6 col-md-4 mb-4">
            <img src="https://www.tiendasmass.com.pe/wp-content/uploads/2025/04/Carrusel_Producto2.png" alt="Producto" className="img-fluid" />
            <p>S/ 4.60</p>
          </div>
          <div className="col-6 col-md-4 mb-4">
            <img src="https://www.tiendasmass.com.pe/wp-content/uploads/2025/04/Carrusel_Producto3.png" alt="Producto" className="img-fluid" />
            <p>S/ 1.00</p>
          </div>
        </div>
      </section>

      {/* Pie de página */}
      <footer className="text-center py-4 bg-light">
        <p>© Tiendas Mass 2025 - Compañía Hard Discount S.A.C</p>
      </footer>
    </div>
  );
};

export default Home;
