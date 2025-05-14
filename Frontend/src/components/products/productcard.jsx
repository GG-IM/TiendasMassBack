// src/components/product/ProductCard.jsx
import React from 'react';
import './ProductCard.css'; // Importa el archivo CSS para estilos

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h4 className="product-name">{product.name}</h4>
        <p className="product-price">S/ {product.price}</p>
        <button className="add-to-cart-btn">Agregar</button>
      </div>
    </div>
  );
};

export default ProductCard;
