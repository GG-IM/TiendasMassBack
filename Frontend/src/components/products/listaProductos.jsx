import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCarrito } from '../../context/carContext';
import Carrito from './carrito'; // Importa el componente del carrito

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const { agregarProducto } = useCarrito(); // Accedemos a la función de agregar al carrito

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/productos');
        setProductos(res.data);
      } catch (err) {
        console.error('Error al obtener productos:', err);
      }
    };

    fetchData();
  }, []);

  const handleAgregarAlCarrito = (producto) => {
    agregarProducto(producto); // Agrega el producto al carrito
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {productos.map((producto) => (
          <li
            key={producto.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              width: '200px',
              boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
              backgroundColor: '#fff',
            }}
          >
            <img src={producto.imagen} alt={producto.nombre} width="100%" style={{ borderRadius: '4px' }} />
            <h3>{producto.nombre}</h3>
            <p><strong>Precio:</strong> ${producto.precio}</p>
            <p>{producto.descripcion}</p>
            <p><strong>Categoría:</strong> {producto.categoria}</p>
            <p><strong>Stock:</strong> {producto.stock}</p>
            <p><strong>Estado:</strong> {producto.estado ? 'Activo' : 'Inactivo'}</p>
            <button onClick={() => handleAgregarAlCarrito(producto)} style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px' }}>
              Agregar al carrito
            </button>
          </li>
        ))}
      </ul>

      {/* Agrega el componente Carrito */}
      <Carrito />
    </div>
  );
};

export default ListaProductos;
