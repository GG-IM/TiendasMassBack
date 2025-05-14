// src/components/category/CategoryCard.jsx
import React from 'react';
import './CategoryCard.css'; // Importa el archivo CSS para estilos

const CategoryCard = ({ category }) => {
  return (
    <div className="category-card">
      <div className="category-image">
        <img src={category.image} alt={category.name} />
      </div>
      <div className="category-name">
        <h3>{category.name}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
