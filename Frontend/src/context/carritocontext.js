import React, { createContext, useContext, useState } from 'react';

// Creamos el contexto
const CarritoContext = createContext();

// Proveedor del carrito
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  
  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => [...prevCarrito, producto]);
  };

  // Función para eliminar un producto del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter(producto => producto.id !== id));
  };

  // Función para vaciar el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Calcular el total del carrito
  const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, total }}>
      {children}
    </CarritoContext.Provider>
  );
};

// Hook para usar el contexto del carrito
export const useCarrito = () => useContext(CarritoContext);
