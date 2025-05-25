import React, { useState } from 'react';
import Checkout from '../components/checkout/Checkout'; // ajusta la ruta si la carpeta se llama distinto

const CheckoutPage = () => {
  // Paso activo (1 = Envío, 2 = Pago, 3 = Confirmación)
  const [activeStep, setActiveStep] = useState(1);

  // Datos de formulario compartidos entre ShippingForm y PaymentForm
  const [formData, setFormData] = useState({
    deliveryType: 'delivery',
    fullName: '',
    email: '',
    phone: '',
    selectedStore: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: ''
  });

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <Checkout
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        formData={formData}
        setFormData={setFormData}
      />
    </main>
  );
};

export default CheckoutPage;
