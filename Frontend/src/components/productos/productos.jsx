import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCarrito } from '../../context/carContext';
import { useUsuario } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const Productos = ({ categoriaId }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const { agregarProducto, carrito } = useCarrito();
  const { usuario } = useUsuario();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = categoriaId
          ? `http://localhost:3000/api/productos?categoriaId=${categoriaId}`
          : 'http://localhost:3000/api/productos';
        const res = await axios.get(url);
        setProductos(res.data);
      } catch (err) {
        console.error('Error al obtener productos:', err);
        setError('Error al cargar productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [categoriaId]);

  const handleAgregar = (producto) => {
    agregarProducto(producto);
    setMensaje(`Agregado "${producto.nombre}" al carrito`);
    setTimeout(() => setMensaje(null), 3000);
  };

  const handleRealizarPago = () => {
    if (!usuario) {
      alert('Debes iniciar sesión para realizar el pago.');
      return;
    }
    navigate('/checkout');
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (productos.length === 0) return <p>No hay productos para esta categoría.</p>;

  return (
    <div className="productos-container">
      <h2>Productos</h2>

      {mensaje && (
        <div
          style={{
            backgroundColor: '#4caf50',
            color: 'white',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '12px',
            fontWeight: '600',
            maxWidth: '300px',
          }}
        >
          {mensaje}
        </div>
      )}

      <ul className="productos-grid">
        {productos.map((producto) => (
          <li key={producto.id}>
            <img
              src={producto.imagen || 'placeholder.jpg'}
              alt={producto.nombre}
            />
            <h3>{producto.nombre}</h3>
            <p><strong>Precio:</strong> ${producto.precio}</p>
            <p>{producto.descripcion}</p>
            <button
              onClick={() => handleAgregar(producto)}
              className="btn-agregar-carrito"
              aria-label={`Agregar ${producto.nombre} al carrito`}
            >
              Agregar al carrito
            </button>
          </li>
        ))}
      </ul>

      {carrito.length > 0 && (
        <button
          onClick={handleRealizarPago}
          style={{
            marginTop: '20px',
            padding: '12px 20px',
            fontSize: '1rem',
            backgroundColor: '#0033a0',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            width: '100%',
            maxWidth: '300px',
          }}
          aria-label="Realizar pago"
        >
          Realizar Pago
        </button>
      )}
    </div>
  );
};

export default Productos;
