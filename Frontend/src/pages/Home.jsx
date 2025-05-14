// src/pages/HomePage.jsx
import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Banner from '../components/carousel/banner';
import CategoryCard from '../components/category/CategoryCard';
import ProductCard from '../components/product/ProductCard';

const Home = () => {
  const categories = [
    { name: 'Abarrotes', image: 'path-to-image' },
    { name: 'Limpieza', image: 'path-to-image' },
    { name: 'Cuidado personal', image: 'path-to-image' },
    { name: 'Bebidas', image: 'path-to-image' },
  ];

  const products = [
    { name: 'Arroz Familiar', price: 18.50, image: 'path-to-image' },
    { name: 'Azúcar rubia', price: 12.90, image: 'path-to-image' },
    { name: 'Aceite vegetal', price: 9.50, image: 'path-to-image' },
    { name: 'Leche evaporada', price: 3.90, image: 'path-to-image' },
  ];

  return (
    <div>
      <Navbar />
      <Banner />
      <h2>Categorías populares</h2>
      <div className="category-container">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
      <h2>Productos destacados</h2>
      <div className="product-container">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
