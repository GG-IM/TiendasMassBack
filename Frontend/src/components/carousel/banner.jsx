// src/components/carousel/Banner.jsx
import React from 'react';
import './banner.css'; // Importa el archivo CSS para estilos

const Banner = () => {
  return (
     <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="Frontend/src/assets/banner/BANNER-WEB.png" class="d-block w-100" alt="banner1" />
          </div>
          <div class="carousel-item">
            <img src="Frontend\src\assets\banner\banner2.png" class="d-block w-100" alt="banner2" />
          </div>
          <div class="carousel-item">
            <img src="Frontend\src\assets\banner\banner3.png" class="d-block w-100" alt="banner3" />
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
  );
};

export default Banner;
