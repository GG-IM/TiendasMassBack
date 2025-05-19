import React from 'react';
import './productos.css';

const productosSimulados = [
  {
    id: 1,
    nombre: 'Horno Microondas Oster POGGE3702',
    imagen: 'Frontend\src\assets\imagenes\hola.png', // reemplaza con URL real
    precioOnline: 279.00,
    precioRegular: 309.00,

    etiquetas: ['Delivery Gratis'],
  },
  {
    id: 2,
    nombre: 'Cocina de Piso a Gas 60cm Silver Mabe CMP6014AG1',
    imagen: 'Frontend\src\assets\imagenes\hola.png',
    precioOnline: 679.00,
    precioRegular: 909.00,
 
    etiquetas: ['Delivery Gratis'],
  },
  // agrega más productos aquí...
];

const Productos = () => {
  return (
    <div className="productos-container">
      <h2>Resultado de búsqueda: {productosSimulados.length} PRODUCTOS</h2>
      <div className="productos-grid">
        {productosSimulados.map(producto => (
          <div key={producto.id} className="producto-card">
            {producto.descuento && (
              <div className="producto-descuento">-{producto.descuento}%</div>
            )}
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="producto-imagen"
            />
            <div className="producto-nombre">{producto.nombre}</div>
            <div className="producto-precios">
              <span className="precio-online">S/ {producto.precioOnline.toFixed(2)}</span>
              <span className="precio-regular">S/ {producto.precioRegular.toFixed(2)}</span>
            </div>
            <button className="producto-boton">AGREGAR</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
