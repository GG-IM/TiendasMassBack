import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import ProductCard from '../productos/productCard';
import { useCarrito } from '../../context/carContext';  // Importa el contexto carrito
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './productCarousel.css'; // Asegúrate de que la ruta sea correcta

const ProductCarousel = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { agregarProducto } = useCarrito();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/products');
        setProductos(res.data);
      } catch (err) {
        setError('Error al cargar productos.');
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  const handleAgregar = (productoConCantidad) => {
    agregarProducto(productoConCantidad);
    // Si quieres, puedes agregar feedback visual aquí, tipo toast o mensaje
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,  
    slidesToScroll: 2,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (productos.length === 0) return <p>No hay productos para mostrar.</p>;

  return (
    <Slider {...settings}>
      {productos.map(producto => (
        <div key={producto.id} style={{ padding: '0 10px' }}>
          <ProductCard producto={producto} onAdd={handleAgregar} />
        </div>
      ))}
    </Slider>
  );
};

export default ProductCarousel;
