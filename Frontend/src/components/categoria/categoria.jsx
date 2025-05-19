import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../categoria/categoria.css'; // Asegúrate de que la ruta sea correcta

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
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="categoria-container">
      <h3>Categorías</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li
          style={{ cursor: 'pointer', fontWeight: categoriaActiva === null ? 'bold' : 'normal' }}
          onClick={() => handleSelect(null)}
        >
          Todas
        </li>
        {categorias.map((cat) => (
          <li
            key={cat.id}
            style={{
              cursor: 'pointer',
              fontWeight: categoriaActiva?.id === cat.id ? 'bold' : 'normal',
              padding: '5px 0',
            }}
            onClick={() => handleSelect(cat)}
          >
            {cat.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categoria;
