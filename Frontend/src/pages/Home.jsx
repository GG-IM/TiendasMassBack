import React from 'react';
import Carrito from '../components/car/Carrito'; // Si lo necesitas para el carrito, sigue importándolo
import './Home.css';
import Footer from '../components/footer/footer'; // Asegúrate de que la ruta sea correcta
import Navbar from '../components/navbar/navbar'; // Asegúrate de que la ruta sea correcta
import Banner from '../components/carousel/banner'; // Asegúrate de que la ruta sea correcta
const Home = () => {
  return (
    <div className="home-page">
      <Navbar/>
      {/* Banners principales */}
      <Banner />

      {/* Texto destacado con fondo azul */}
      <section className="bg-azul-personalizado py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2>¡LOS MEJORES PRECIOS DEL BARRIO!</h2>
              <p>
                Caser@, a mi nadie me gana, yo tengo siempre los{' '}
                <strong>mejores precios</strong>, y además, estoy{' '}
                <strong>cerca a tu hogar</strong>.
              </p>

              <p>
                ¡No te pierdas los mejores precios del barrio aquí!{' '}
                
              </p>

              <a href="/precios-mass" className="btn btn-light mt-3">
                QUIERO VER
              </a>
            </div>
            <div className="col-md-6 text-center">
              <img
                className="img-fluid"
                src="https://www.tiendasmass.com.pe/wp-content/uploads/2023/06/mano-catalogos.webp"
                alt="Catálogo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Productos destacados con fondo claro */}
      <section className="bg-light-custom py-5">
        <div className="container">
          <h2 className="text-center mb-4 text-primary">PRECIOS MÁS MASS</h2>
          <div className="row text-center">
            <div className="col-6 col-md-4 mb-4">
              <img
                src="https://www.tiendasmass.com.pe/wp-content/uploads/2025/04/Carrusel_Producto1.png"
                alt="Producto"
                className="img-fluid"
              />
              <p>S/ 3.70</p>
            </div>
            <div className="col-6 col-md-4 mb-4">
              <img
                src="https://www.tiendasmass.com.pe/wp-content/uploads/2025/04/Carrusel_Producto2.png"
                alt="Producto"
                className="img-fluid"
              />
              <p>S/ 4.60</p>
            </div>
            <div className="col-6 col-md-4 mb-4">
              <img
                src="https://www.tiendasmass.com.pe/wp-content/uploads/2025/04/Carrusel_Producto3.png"
                alt="Producto"
                className="img-fluid"
              />
              <p>S/ 1.00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer al final */}
      <Footer />
    </div>
  );
};

export default Home;
