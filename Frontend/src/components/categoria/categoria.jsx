// src/components/categoria/categoria.jsx
import React, { useState } from 'react';
import './categoria.css';

const categoriasSimuladas = [
  {
    id: 1,
    name: 'Congelados',
    subcategories: [],
  },
  {
    id: 2,
    name: 'Abarrotes',
    subcategories: [], // ya no contiene subcategorías
  },
  {
    id: 3,
    name: 'Lácteos y Huevos',
    subcategories: [],
    subsubcategories: ['Leche', 'Yogurt', 'Huevos', 'Mantequilla y Margarina'],
  },
  {
    id: 4,
    name: 'Carnes, Aves y Pescados',
    subcategories: [],
    subsubcategories: ['Carne de res', 'Pollo', 'Pescado'],
  },
  {
    id: 5,
    name: 'Frutas y Verduras',
    subcategories: [],
    subsubcategories: ['Plátano', 'Manzana', 'Papa', 'Zanahoria'],
  },
  {
    id: 6,
    name: 'Bebidas',
    subcategories: [],
    subsubcategories: ['Gaseosas', 'Jugos', 'Agua embotellada'],
  },
  {
    id: 7,
    name: 'Vinos, Licores y Cervezas',
    subcategories: [],
    subsubcategories: ['Vino tinto', 'Cerveza', 'Pisco'],
  },
  {
    id: 8,
    name: 'Quesos y Fiambres',
    subcategories: [],
    subsubcategories: ['Queso fresco', 'Jamón', 'Salame'],
  },
  {
    id: 9,
    name: 'Limpieza',
    subcategories: [],
    subsubcategories: ['Detergente', 'Jabón', 'Desinfectantes'],
  },
  {
    id: 10,
    name: 'Cuidado Personal y Salud',
    subcategories: [],
    subsubcategories: ['Shampoo', 'Pasta dental', 'Medicinas básicas'],
  },
  {
    id: 11,
    name: 'Bebé e Infantil',
    subcategories: [],
    subsubcategories: ['Pañales', 'Leche infantil', 'Toallitas húmedas'],
  },
  {
    id: 12,
    name: 'Mascotas',
    subcategories: [],
    subsubcategories: ['Comida para perros', 'Arena para gatos'],
  },
  {
    id: 13,
    name: 'Desayunos',
    subcategories: [],
    subsubcategories: ['Café', 'Pan', 'Mermeladas'],
  },
  {
    id: 14,
    name: 'Panadería y Pastelería',
    subcategories: [],
    subsubcategories: ['Pan francés', 'Tortas', 'Pasteles'],
  },
  {
    id: 15,
    name: 'Decohogar',
    subcategories: [],
    subsubcategories: ['Velas', 'Cuadros decorativos', 'Platos y vasos'],
  },
  {
    id: 16,
    name: 'Librería y Oficina',
    subcategories: [],
    subsubcategories: ['Cuadernos', 'Lápices', 'Carpetas'],
  },
  {
    id: 17,
    name: 'Electrohogar',
    subcategories: [],
    subsubcategories: ['Licuadora', 'Microondas', 'Plancha'],
  },
  {
    id: 18,
    name: 'Muebles',
    subcategories: [],
    subsubcategories: ['Sillas', 'Mesas', 'Estantes'],
  },
  {
    id: 19,
    name: 'Deportes',
    subcategories: [],
    subsubcategories: ['Pelotas', 'Ropa deportiva', 'Pesas'],
  },
];

const Categoria = ({ onSelect }) => {
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const [subcategoriaActiva, setSubcategoriaActiva] = useState(null);
  const [tabActiva, setTabActiva] = useState('categorias');

  const toggleCategoria = (id) => {
    setCategoriaActiva(categoriaActiva === id ? null : id);
    setSubcategoriaActiva(null); // reset subcategoría cuando cambia categoría
    if (onSelect) {
      const cat = categoriasSimuladas.find(c => c.id === id);
      onSelect(cat);
    }
  };

  const toggleSubcategoria = (id) => {
    setSubcategoriaActiva(subcategoriaActiva === id ? null : id);
  };

  return (
    <div className="categoria-container">
      <div className="tabs">
        <button
          className={`tab ${tabActiva === 'categorias' ? 'active' : ''}`}
          onClick={() => setTabActiva('categorias')}
        >
          Categorías
        </button>
        <button
          className={`tab ${tabActiva === 'filtros' ? 'active' : ''}`}
          onClick={() => setTabActiva('filtros')}
        >
          Filtros
        </button>
      </div>

      {tabActiva === 'categorias' && (
        <div className="category-list">
          {categoriasSimuladas.map((cat) => (
            <div
              key={cat.id}
              className={`category-item ${categoriaActiva === cat.id ? 'active' : ''}`}
            >
              <div className="category-header" onClick={() => toggleCategoria(cat.id)}>
                <span className="category-title">{cat.name}</span>
                {cat.subcategories.length > 0 && (
                  <span className="toggle-icon">{categoriaActiva === cat.id ? '−' : '+'}</span>
                )}
              </div>
              {categoriaActiva === cat.id && cat.subcategories.length > 0 && (
                <ul className="subcategory-list">
                  {cat.subcategories.map((subcat) => (
                    <li key={subcat.id} className="subcategory-item">
                      <div className="subcategory-header" onClick={() => toggleSubcategoria(subcat.id)}>
                        <span>{subcat.name}</span>
                        {subcat.subsubcategories.length > 0 && (
                          <span className="toggle-icon">{subcategoriaActiva === subcat.id ? '−' : '+'}</span>
                        )}
                      </div>
                      {subcategoriaActiva === subcat.id && subcat.subsubcategories.length > 0 && (
                        <ul className="subsubcategory-list">
                          {subcat.subsubcategories.map((variedad, idx) => (
                            <li key={idx} className="subsubcategory-item">{variedad}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {tabActiva === 'filtros' && (
        <div className="filters-content">
          <p>Contenido de filtros (a implementar)</p>
        </div>
      )}
    </div>
  );
};

export default Categoria;
