import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUsuario } from '../context/userContext';

const CarritoContext = createContext();


export const CarritoProvider = ({ children }) => {
  const { usuario } = useUsuario();
  const [carrito, setCarrito] = useState([]);

  // Cargar carrito del usuario al cambiar de usuario
  useEffect(() => {
    const savedCart = localStorage.getItem(`carrito_${usuario?.id || 'anonimo'}`);
    setCarrito(savedCart ? JSON.parse(savedCart) : []);
  }, [usuario]);

  // Guardar carrito del usuario en localStorage
  useEffect(() => {
    if (usuario?.id) {
      localStorage.setItem(`carrito_${usuario.id}`, JSON.stringify(carrito));
    }
  }, [carrito, usuario]);


  const agregarProducto = (producto) => {
    setCarrito(prev => {
      const existente = prev.find(p => p.id === producto.id);
      if (existente) {
        return prev.map(p =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const quitarProducto = (id) => {
    setCarrito(prev => prev.filter(p => p.id !== id));
  };

  const aumentarCantidad = (id) => {
    setCarrito(prev =>
      prev.map(p => (p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p))
    );
  };

  const disminuirCantidad = (id) => {
    setCarrito(prev =>
      prev
        .map(p =>
          p.id === id && p.cantidad > 1
            ? { ...p, cantidad: p.cantidad - 1 }
            : p
        )
        .filter(p => p.cantidad > 0)
    );
  };

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        quitarProducto,
        aumentarCantidad,
        disminuirCantidad,
        total,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);
