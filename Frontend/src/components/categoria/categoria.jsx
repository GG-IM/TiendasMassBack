import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './categoria.css'; // Asume que está en la misma carpeta

const Categoria = ({ onSelect }) => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoriaActiva, setCategoriaActiva] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('http://localhost:3000/api/categorias');
        setCategorias(res.data);
      } catch (err) {
        console.error('Error al obtener categorías:', err);
        setError('Error al cargar categorías');
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  const handleSelect = (categoria) => {
    setCategoriaActiva(categoria);
    if (onSelect) onSelect(categoria);
  };

  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="categoria-container">
      <h3 className="categoria-title">Categorías</h3>
      <div className="categoria-list">
        <button
          className={`categoria-item ${categoriaActiva === null ? 'active' : ''}`}
          onClick={() => handleSelect(null)}
          aria-pressed={categoriaActiva === null}
        >
          Todas
        </button>
        {categorias.map((cat) => (
          <button
            key={cat.id}
            className={`categoria-item ${categoriaActiva?.id === cat.id ? 'active' : ''}`}
            onClick={() => handleSelect(cat)}
            aria-pressed={categoriaActiva?.id === cat.id}
          >
            {cat.nombre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categoria;
