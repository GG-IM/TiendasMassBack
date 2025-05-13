// src/components/checkout/Checkout.jsx
import React, { useState } from 'react';
import { useCarrito } from '../../context/carContext';
import { useUsuario } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { carrito, total } = useCarrito();
  const { usuario } = useUsuario();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Función para realizar el pago
  const handleRealizarPago = async () => {
    // Verificar si el usuario está logueado
    if (!usuario) {
      alert('Debes iniciar sesión para realizar el pago.');
      return;
    }

    // Crear el objeto pedido a enviar al backend
    const pedido = {
      usuarioId: usuario.id,
      items: carrito.map(item => ({
        id: item.id,
        cantidad: item.cantidad,
        precio: item.precio,
      })),
      total: total,
    };

    setLoading(true);

    try {
      // Enviar la solicitud al backend
      const response = await fetch('http://localhost:3000/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedido),
      });

      // Comprobar si la respuesta es exitosa
      if (!response.ok) {
        // Si la respuesta no es ok, leer el cuerpo del error
        const errorData = await response.json();
        console.error('Error en el servidor:', errorData);
        alert(`Error al procesar el pedido: ${errorData.error || 'Error desconocido'}`);
      } else {
        // Si la respuesta es exitosa, leer los datos de la respuesta
        const data = await response.json();
        alert('¡Compra realizada exitosamente!');
        navigate('/confirmacion');  // Redirigir a la página de confirmación
      }
    } catch (error) {
      // Si ocurre un error en la solicitud (por ejemplo, servidor no disponible)
      console.error('Error al realizar el pago:', error);
      alert('Error al realizar la solicitud. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.checkoutContainer}>
      <h2>Confirmar Pedido</h2>
      <ul>
        {carrito.map((producto) => (
          <li key={producto.id} style={styles.productoItem}>
            <div>
              <strong>{producto.nombre}</strong>
              <p>Precio: ${producto.precio}</p>
              <p>Cantidad: {producto.cantidad}</p>
              <p>Total: ${producto.precio * producto.cantidad}</p>
            </div>
          </li>
        ))}
      </ul>
      <hr />
      <p><strong>Total a pagar: ${total}</strong></p>
      <button 
        onClick={handleRealizarPago} 
        style={styles.botonPagar}
        disabled={loading}
      >
        {loading ? 'Procesando...' : 'Realizar Pago'}
      </button>
    </div>
  );
};

const styles = {
  checkoutContainer: {
    width: '80%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    marginTop: '50px',
  },
  productoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
  },
  botonPagar: {
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '8px',
    marginTop: '10px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '16px',
  },
};

export default Checkout;
