// src/components/carousel/Banner.jsx
import React from 'react';
import './banner.css'; // Importa el archivo CSS para estilos

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-text">
        <h2>¡Los mejores precios!</h2>
        <p>Compra online y recibe en tu casa. Envío gratis en compras mayores a S/50</p>
        <button className="banner-button">Ver ofertas</button>
      </div>
      <div className="banner-image">
        <img src="path-to-your-image.jpg" alt="Oferta especial" />
      </div>
    </div>
  );
};

export default Banner;
