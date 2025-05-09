import React, { useState } from 'react';
import { useCarrito } from '../context/carContext';

const Carrito = () => {
  const {
    carrito,
    total,
    vaciarCarrito,
    quitarProducto,
    aumentarCantidad,
    disminuirCantidad,
  } = useCarrito();

  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const toggleCarrito = () => setMostrarCarrito(!mostrarCarrito);

  return (
    <div>
      <button onClick={toggleCarrito} style={styles.botonCarrito}>
        🛒 Carrito ({carrito.reduce((acc, item) => acc + item.cantidad, 0)})
      </button>

      {mostrarCarrito && (
        <div style={styles.carritoContainer}>
          <h3>Carrito</h3>
          {carrito.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            <ul>
              {carrito.map((producto) => (
                <li key={producto.id} style={styles.productoItem}>
                  <div>
                    <strong>{producto.nombre}</strong>
                    <p>Precio: ${producto.precio}</p>
                    <p>Cantidad: {producto.cantidad}</p>
                    <p>Total: ${producto.precio * producto.cantidad}</p>
                  </div>
                  <div>
                    <button onClick={() => aumentarCantidad(producto.id)}>➕</button>
                    <button onClick={() => disminuirCantidad(producto.id)}>➖</button>
                    <button
                      onClick={() => quitarProducto(producto.id)}
                      style={styles.botonEliminar}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <hr />
          <p><strong>Total general: ${total}</strong></p>
          <button onClick={vaciarCarrito} style={styles.botonVaciar}>
            Vaciar Carrito
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  botonCarrito: {
    padding: '10px 20px',
    backgroundColor: '#FF5722',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  carritoContainer: {
    position: 'absolute',
    top: '50px',
    right: '10px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
  },
  productoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
  },
  botonEliminar: {
    backgroundColor: '#FF4081',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '5px',
  },
  botonVaciar: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '8px',
    marginTop: '10px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default Carrito;
