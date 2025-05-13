// src/pages/CheckoutPage.jsx
import React from 'react';
import Checkout from '../components/checkout/Checkout'; // Ruta donde guardas el componente Checkout

const CheckoutPage = () => {
  return (
    <div>
      <h1>Finalizar Compra</h1>
      <Checkout />
    </div>
  );
};

export default CheckoutPage;
