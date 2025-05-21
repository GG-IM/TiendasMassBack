import React from 'react';
import '../styles/Home.css'; // Asegúrate de que la ruta sea correcta
import Footer from '../components/footer/footer'; // Asegúrate de que la ruta sea correcta
import Navbar from '../components/navbar/Navbar'; // Asegúrate de que la ruta sea correcta
import ProductCarousel from '../components/carousel/productCarousel'; // Asegúrate de que la ruta sea correcta
import WhatsAppButton from '../button/whatsappbutton'; // Asegúrate de que la ruta sea correcta
import Banner from '../components/carousel/banner'; // Asegúrate de que la ruta sea correcta

const Home = () => {
  return (
    <div className="home-page">
      <Navbar/>
      {/* Banners principales */}
      <div className="banner-container">
      <Banner />
      </div>

      {/* Texto destacado con fondo azul */}
    <div className="blue-container">
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
    </div>

      {/* Productos destacados con fondo claro */}
      <div className="productos-container">
      <section className="bg-light-custom py-5">
        <div className="container-fluid px-5">
          <h2 className="sub text-left mb-4 text-primary">PRECIOS MÁS MASS</h2>
          <ProductCarousel/>
          
        </div>
      </section>
      </div>

      {/* Productos destacados con fondo claro */}
      <div className="productos-container">
      <section className="bg-light-custom2 py-5">
        <div className="container-fluid px-5">
          <h2 className="sub text-left mb-4 text-primary">MENOR PRECIO, MASS CALIDAD</h2>
          <ProductCarousel/>
          
        </div>
      </section>
      </div>
      {/* ubicame */}
      <WhatsAppButton/>
      

      {/* Footer al final */}
      <Footer />
    </div>
  );
};

export default Home;
