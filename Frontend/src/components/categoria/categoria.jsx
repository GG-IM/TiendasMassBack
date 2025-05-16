// src/components/categoria/categoria.jsx
import React, { useState } from 'react';
import './categoria.css';

const categoriasSimuladas = [
  { id: 1, name: 'Electrónica' },
  { id: 2, name: 'Ropa' },
  { id: 3, name: 'Hogar' },
  { id: 4, name: 'Deportes' },
  { id: 5, name: 'Juguetes' },
];

const Categoria = ({ onSelect }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const handleSelect = (categoria) => {
    setCategoriaSeleccionada(categoria.id);
    if (onSelect) onSelect(categoria);
  };

  return (
    <div className="sidebar-categoria">
      {categoriasSimuladas.map((cat) => (
        <button
          key={cat.id}
          className={`categoria-btn ${categoriaSeleccionada === cat.id ? 'selected' : ''}`}
          onClick={() => handleSelect(cat)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default Categoria;
