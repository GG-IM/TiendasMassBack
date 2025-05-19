import React from 'react';
import { useCarrito } from '../../context/carContext';
import { useUsuario } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import './car.css';  // Importa el CSS

const Carrito = () => {
  const {
    carrito,
    total,
    vaciarCarrito,
    quitarProducto,
    aumentarCantidad,
    disminuirCantidad,
  } = useCarrito();

  const { usuario } = useUsuario();
  const navigate = useNavigate();

  const handlePagar = () => {
    if (!usuario) {
      alert('Debes iniciar sesión para realizar el pago.');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="carrito-container">
      <h3 className="carrito-titulo">Carrito</h3>
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul className="carrito-lista">
          {carrito.map((producto) => (
            <li key={producto.id} className="carrito-producto-item">
              <div className="info-producto">
                <strong className="nombre-producto">{producto.nombre}</strong>
                <p className="precio-producto">Precio: ${producto.precio}</p>
                <p>Cantidad: {producto.cantidad}</p>
                <p>Total: ${producto.precio * producto.cantidad}</p>
              </div>
              <div className="acciones-producto">
                <button
                  className="boton-cantidad"
                  onClick={() => aumentarCantidad(producto.id)}
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
                <button
                  className="boton-cantidad"
                  onClick={() => disminuirCantidad(producto.id)}
                  aria-label="Disminuir cantidad"
                >
                  –
                </button>
                <button
                  className="boton-eliminar"
                  onClick={() => quitarProducto(producto.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="total-general">
        Total general: ${total.toFixed(2)}
      </p>
      <button
        className="boton-vaciar"
        onClick={vaciarCarrito}
      >
        Vaciar Carrito
      </button>
      {carrito.length > 0 && (
        <button
          className="boton-pagar"
          onClick={handlePagar}
        >
          Realizar Pago
        </button>
      )}
    </div>
  );
};

export default Carrito;
