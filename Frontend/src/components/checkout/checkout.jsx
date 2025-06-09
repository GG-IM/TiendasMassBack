import React, { useState, useEffect } from 'react';
import { FaTruck, FaCreditCard, FaCheck, FaShieldAlt, FaLock } from "react-icons/fa";
import { IoReloadCircle } from "react-icons/io5";
import { MapPin, User, Mail, Phone, Truck, Store } from 'lucide-react';
import { useCarrito } from '../../context/carContext';
import { useUsuario } from '../../context/userContext';
import './checkout.css';

export default function Checkout({ activeStep, setActiveStep, formData, setFormData, onChange }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [pedidoCreado, setPedidoCreado] = useState(null);
  const [error, setError] = useState('');
  const [metodosPago, setMetodosPago] = useState([]);

  // CORREGIDO: Usar las funciones correctas del contexto
  const {
    carrito,
    aumentarCantidad,
    disminuirCantidad,
    quitarProducto,
    total: carritoTotal,
    vaciarCarrito
  } = useCarrito();

  // Solo para precargar datos al iniciar
  const { usuario } = useUsuario();
  
  // Cargar métodos de pago disponibles
  useEffect(() => {
    const cargarMetodosPago = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/metodos-pago');
        if (response.ok) {
          const metodos = await response.json();
          setMetodosPago(metodos);
        }
      } catch (error) {
        console.error('Error al cargar métodos de pago:', error);
      }
    };
    
    cargarMetodosPago();
  }, []);

  // CORREGIDO: Mapeo correcto de campos del usuario con los nuevos campos
  useEffect(() => {
    if (usuario) {
      if (!formData.fullName) onChange('fullName', usuario.nombre || '');
      if (!formData.email) onChange('email', usuario.email || '');
      if (!formData.phone) onChange('phone', usuario.telefono || '');
      if (!formData.address) onChange('address', usuario.direccion || '');
      if (!formData.city) onChange('city', usuario.ciudad || '');
      if (!formData.zipCode) onChange('zipCode', usuario.codigoPostal || '');
    }
  }, [usuario]);

  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
    nameOnCard: ''
  });

  // Función auxiliar para convertir precio a número
  const parsePrice = (precio) => {
    if (typeof precio === 'number') return precio;
    if (typeof precio === 'string') return parseFloat(precio) || 0;
    return 0;
  };

  // Totales - usando el total del contexto
  const subtotal = carritoTotal;
  const shippingCost = formData.deliveryType === 'pickup' ? 0 : 9.99;
  const taxes = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + shippingCost + taxes).toFixed(2);

  // Función para crear el pedido
  const crearPedido = async () => {
  setLoading(true);
  setError('');

  try {
    // Validaciones básicas
    if (!carrito || carrito.length === 0) {
      throw new Error('El carrito está vacío');
    }

    if (!formData.fullName || !formData.email || !formData.phone) {
      throw new Error('Faltan datos requeridos del usuario');
    }

    // ✅ ESTRUCTURA ADAPTADA AL BACKEND
    const pedidoData = {
      usuarioId: usuario?.id || null, // Si no hay usuario, puede ser null
      direccionEnvio: formData.deliveryType === 'delivery' 
        ? `${formData.address}, ${formData.city} ${formData.zipCode}`
        : formData.selectedStore,
      metodoPagoId: parseInt(paymentMethod) || (paymentMethod === 'card' ? 2 : 1),
      
      // ✅ CAMBIO IMPORTANTE: "productos" → "detalles"
      detalles: carrito.map(item => ({
        productoId: parseInt(item.id),
        cantidad: parseInt(item.cantidad)
        // ❌ NO enviar precio - el backend lo calcula
      }))
    };

    console.log('📦 Enviando datos adaptados:', JSON.stringify(pedidoData, null, 2));

    const response = await fetch('http://localhost:3000/api/pedidos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(usuario?.token && { 'Authorization': `Bearer ${usuario.token}` })
      },
      body: JSON.stringify(pedidoData)
    });

    const responseText = await response.text();
    console.log('📡 Respuesta del servidor:', responseText);

    if (!response.ok) {
      let errorMessage = `Error ${response.status}: ${response.statusText}`;
      
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch (e) {
        console.error('Error al parsear respuesta:', e);
      }
      
      throw new Error(errorMessage);
    }

    // Parsear respuesta exitosa
    const result = JSON.parse(responseText);
    console.log('✅ Pedido creado:', result);

    // ✅ CREAR OBJETO COMPATIBLE CON TU UI
    const pedidoCreado = {
      id: result.pedidoId,
      montoTotal: total,
      direccionEnvio: pedidoData.direccionEnvio,
      estado: 'PENDIENTE',
      estadoPago: 'PENDIENTE',
      metodoPago: {
        id: pedidoData.metodoPagoId,
        nombre: paymentMethod === 'card' || paymentMethod === '2' ? 'Tarjeta de Crédito' : 'PayPal'
      },
      detallesPedidos: carrito.map(item => ({
        id: item.id,
        cantidad: item.cantidad,
        precio: parsePrice(item.precio),
        producto: {
          id: item.id,
          nombre: item.title || item.nombre
        }
      }))
    };

    setPedidoCreado(pedidoCreado);
    
    // Limpiar carrito
    if (vaciarCarrito) {
      vaciarCarrito();
    }
    
    setActiveStep(3);

  } catch (error) {
    console.error('💥 Error:', error);
    
    if (error.message.includes('Usuario no encontrado')) {
      setError('Debes estar registrado para realizar un pedido. Por favor inicia sesión.');
    } else if (error.message.includes('Método de pago inválido')) {
      setError('Método de pago no válido. Por favor selecciona otro.');
    } else if (error.message.includes('stock')) {
      setError('Algunos productos no tienen stock suficiente. Revisa tu carrito.');
    } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
      setError('Error de conexión. Verifica que el servidor esté funcionando.');
    } else {
      setError(error.message || 'Error al procesar el pedido');
    }
  } finally {
    setLoading(false);
  }
};

  const next = async () => {
    if (activeStep === 2) {
      // En el paso de pago, crear el pedido
      await crearPedido();
    } else {
      setActiveStep(s => Math.min(s + 1, 3));
    }
  };

  const prev = () => setActiveStep(s => Math.max(s - 1, 1));

  const onCardChange = (field, val) => {
    let value = val;
    
    // Formatear número de tarjeta con espacios
    if (field === 'number') {
      value = val.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    }
    
    // Formatear fecha de vencimiento
    if (field === 'expiry') {
      value = val.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
    }
    
    setCardInfo(ci => ({ ...ci, [field]: value }));
  };

  // Validación del formulario
  const isStep1Valid = () => {
    if (carrito.length === 0) return false;
    if (!formData.fullName || !formData.email || !formData.phone) return false;
    
    if (formData.deliveryType === 'delivery') {
      return formData.address && formData.city && formData.zipCode;
    }
    
    if (formData.deliveryType === 'pickup') {
      return formData.selectedStore;
    }
    
    return true;
  };

  const isStep2Valid = () => {
    if (paymentMethod === 'card') {
      return cardInfo.number && cardInfo.expiry && cardInfo.cvv && cardInfo.nameOnCard;
    }
    return true; // PayPal no requiere validación adicional aquí
  };

  return (
    <div className="checkout-container">
      {/* ------ HEADER ------ */}
      <header className="checkout-header">
        <div className="header-top">
          <h1>Checkout</h1>
          <div className="secure-header">
            <span className="shield-icon"></span>
            <FaShieldAlt />Compra 100% segura
          </div>
        </div>
        <div className="steps">
          {[
            { id: 1, icon: <FaTruck />, label: 'Envío' },
            { id: 2, icon: <FaCreditCard />, label: 'Pago' },
            { id: 3, icon: <FaCheck />, label: 'Confirmación' }
          ].map(s => (
            <div
              key={s.id}
              className={
                `step ` +
                (activeStep > s.id ? 'completed ' : '') +
                (activeStep === s.id ? 'active' : '')
              }
            >
              <div className="step-content">
                <span className="step-icon">{s.icon}</span>
                <span className="step-label">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* Mostrar errores */}
      {error && (
        <div className="error-message" style={{ 
          background: '#fee', 
          color: '#c33', 
          padding: '10px', 
          margin: '10px 0', 
          borderRadius: '4px',
          border: '1px solid #fcc'
        }}>
          {error}
        </div>
      )}

      {/* ------ MAIN LAYOUT ------ */}
      <div className="checkout-main">
        {/* --------- IZQUIERDA --------- */}
        <section className="left">
          {/* Pasos */}
          {activeStep === 1 && (
            <>
              {/* Resumen del Carrito */}
              <div className="section-box payment-section">
                <h2><span>1</span> Resumen de Productos</h2>

                {/* Validación si el carrito está vacío */}
                {carrito.length === 0 ? (
                  <div className="empty-cart">
                    <p>Tu carrito está vacío</p>
                  </div>
                ) : (
                  carrito.map(item => (
                    <div key={item.id} className="cart-item">
                      <img
                        src={item.imagen ? `http://localhost:3000/${item.imagen}` : '/placeholder-image.jpg'}
                        alt={item.nombre}
                        onError={(e) => {
                          e.target.src = '/placeholder-image.jpg';
                        }}
                      />

                      <div className="cart-item-info">
                        <strong>{item.title || item.nombre || 'Producto sin nombre'}</strong>
                        <small> S/.{parsePrice(item.precio).toFixed(2)} c/u</small>
                      </div>
                      <div className="cart-item-actions">
                        <button
                          onClick={() => disminuirCantidad(item.id)}
                          disabled={item.cantidad <= 1}
                        >
                          -
                        </button>
                        <span>{item.cantidad}</span>
                        <button onClick={() => aumentarCantidad(item.id)}>
                          +
                        </button>
                        <button
                          className="remove"
                          onClick={() => quitarProducto(item.id)}
                          title="Eliminar producto"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="cart-item-total">
                        S/.{(parsePrice(item.precio) * item.cantidad).toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Información de Envío */}
              <div className="section-box shipping-form-container active">
                <div className="shipping-header">
                  <div className="shipping-step-badge selected">2</div>
                  <h2 className="shipping-title">Información de Envío</h2>
                </div>
                <div className="delivery-options">
                  <button
                    className={`delivery-btn ${formData.deliveryType === 'delivery' ? 'selected' : ''}`}
                    onClick={() => onChange('deliveryType', 'delivery')}
                  >
                    <Truck className="delivery-icon" />
                    <div>
                      <div className="delivery-label">Envío a Domicilio</div>
                      <div className="delivery-sub">Recibe en tu dirección (S/.{shippingCost.toFixed(2)})</div>
                    </div>
                  </button>
                  <button
                    className={`delivery-btn ${formData.deliveryType === 'pickup' ? 'selected' : ''}`}
                    onClick={() => onChange('deliveryType', 'pickup')}
                  >
                    <Store className="delivery-icon" />
                    <div>
                      <div className="delivery-label">Recojo en Tienda</div>
                      <div className="delivery-sub">Retira en nuestro local (Gratis)</div>
                    </div>
                  </button>
                </div>
                <div className="form-grid">
                  <div className="form-group full">
                    <label className="form-label">
                      <User className="form-icon" />
                      Nombre Completo *
                    </label>
                    <input
                      className="form-input"
                      required
                      value={formData.fullName || ''}
                      onChange={e => onChange('fullName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <Mail className="form-icon" />
                      Correo Electrónico *
                    </label>
                    <input
                      className="form-input"
                      type="email"
                      required
                      value={formData.email || ''}
                      onChange={e => onChange('email', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <Phone className="form-icon" />
                      Teléfono *
                    </label>
                    <input
                      className="form-input"
                      type="tel"
                      required
                      value={formData.phone || ''}
                      onChange={e => onChange('phone', e.target.value)}
                    />
                  </div>

                  {formData.deliveryType === 'pickup' && (
                    <div className="form-group full">
                      <label className="form-label">
                        <Store className="form-icon" />
                        Seleccionar Tienda *
                      </label>
                      <select
                        className="form-select"
                        value={formData.selectedStore || ''}
                        onChange={e => onChange('selectedStore', e.target.value)}
                        required
                      >
                        <option value="">Seleccionar tienda</option>
                        <option value="Centro – Av. Principal 123">Centro – Av. Principal 123</option>
                        <option value="Norte – Calle Comercial 456">Norte – Calle Comercial 456</option>
                        <option value="Sur – Plaza Shopping 789">Sur – Plaza Shopping 789</option>
                        <option value="Este – Mall Central 101">Este – Mall Central 101</option>
                      </select>
                    </div>
                  )}

                  {formData.deliveryType === 'delivery' && (
                    <>
                      <div className="form-group full">
                        <label className="form-label">
                          <MapPin className="form-icon" />
                          Dirección *
                        </label>
                        <input
                          className="form-input"
                          required
                          value={formData.address || ''}
                          onChange={e => onChange('address', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Ciudad *</label>
                        <input
                          className="form-input"
                          required
                          value={formData.city || ''}
                          onChange={e => onChange('city', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Código Postal *</label>
                        <input
                          className="form-input"
                          required
                          value={formData.zipCode || ''}
                          onChange={e => onChange('zipCode', e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          {activeStep === 2 && (
            <div className="section-box payment-section">
              <h2>
                <span>3</span> Método de Pago
              </h2>

              <div className="payment-options">
                {/* Renderizar métodos de pago dinámicamente */}
                {metodosPago.length > 0 ? (
                  metodosPago.map(metodo => (
                    <label key={metodo.id} className={`payment-option ${paymentMethod === metodo.id.toString() ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="payment"
                        value={metodo.id.toString()}
                        checked={paymentMethod === metodo.id.toString()}
                        onChange={() => setPaymentMethod(metodo.id.toString())}
                      />
                      <div className="payment-labels">
                        <strong>{metodo.nombre}</strong>
                        <small>{metodo.descripcion}</small>
                        {metodo.comision > 0 && (
                          <small>Comisión: {metodo.comision}%</small>
                        )}
                      </div>
                    </label>
                  ))
                ) : (
                  // Fallback a opciones por defecto
                  <>
                    <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                      />
                      <div className="payment-labels">
                        <strong>Tarjeta de Crédito/Débito</strong>
                        <small>Visa, Mastercard, American Express</small>
                      </div>
                      <div className="payment-logos">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/640px-Mastercard_2019_logo.svg.png" alt="Mastercard" />
                      </div>
                    </label>

                    <label className={`payment-option ${paymentMethod === 'paypal' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={() => setPaymentMethod('paypal')}
                      />
                      <div className="payment-labels">
                        <strong>PayPal</strong>
                        <small>Paga con tu cuenta de PayPal</small>
                      </div>
                      <div className="payment-logos">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" />
                      </div>
                    </label>
                  </>
                )}
              </div>

              {(paymentMethod === 'card' || paymentMethod === '2') && (
                <div className="card-form">
                  <div className="form-row">
                    <label>Número de Tarjeta *</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardInfo.number}
                      onChange={e => onCardChange('number', e.target.value)}
                      maxLength="19"
                      required
                    />
                  </div>
                  <div className="form-row split-2">
                    <div>
                      <label>Fecha de Vencimiento *</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        value={cardInfo.expiry}
                        onChange={e => onCardChange('expiry', e.target.value)}
                        maxLength="5"
                        required
                      />
                    </div>
                    <div>
                      <label>CVV *</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cardInfo.cvv}
                        onChange={e => onCardChange('cvv', e.target.value)}
                        maxLength="4"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <label>Nombre en la Tarjeta *</label>
                    <input
                      type="text"
                      placeholder="Juan Pérez"
                      value={cardInfo.nameOnCard}
                      onChange={e => onCardChange('nameOnCard', e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              {(paymentMethod === 'paypal' || paymentMethod === '1') && (
                <div className="paypal-info">
                  <p>Serás redirigido a PayPal para completar tu pago de forma segura.</p>
                </div>
              )}
            </div>
          )}

          {activeStep === 3 && pedidoCreado && (
            <div className="section-box confirmation-section">
              <div className="confirmation-content">
                <div className="confirmation-icon">
                  <FaCheck />
                </div>
                <h2>¡Pedido Confirmado!</h2>
                <p>Gracias por tu compra. Tu pedido ha sido procesado exitosamente.</p>

                <div className="order-details">
                  <h3>Detalles del Pedido</h3>
                  <div className="detail-row">
                    <span>Número de Pedido:</span>
                    <strong>#{pedidoCreado.id}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Total Pagado:</span>
                    <strong>S/.{parseFloat(pedidoCreado.montoTotal).toFixed(2)}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Método de Pago:</span>
                    <strong>{pedidoCreado.metodoPago?.nombre || 'N/A'}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Estado del Pago:</span>
                    <strong style={{ color: pedidoCreado.estadoPago === 'completado' ? 'green' : 'orange' }}>
                      {pedidoCreado.estadoPago}
                    </strong>
                  </div>
                  <div className="detail-row">
                    <span>Estado del Pedido:</span>
                    <strong>{pedidoCreado.estado}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Dirección de Entrega:</span>
                    <strong>{pedidoCreado.direccionEnvio}</strong>
                  </div>
                </div>

                <div className="next-steps">
                  <h3>Próximos Pasos</h3>
                  <p>Recibirás un email de confirmación con los detalles de tu pedido y el seguimiento.</p>
                  <p>Tu pedido será procesado en los próximos días hábiles.</p>
                </div>

                {/* Mostrar productos del pedido */}
                {pedidoCreado.detallesPedidos && (
                  <div className="order-products">
                    <h3>Productos Pedidos</h3>
                    {pedidoCreado.detallesPedidos.map(detalle => (
                      <div key={detalle.id} className="order-product-item">
                        <span>{detalle.producto.nombre}</span>
                        <span>x{detalle.cantidad}</span>
                        <span>S/.{parseFloat(detalle.precio).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button 
                  className="btn-primary"
                  onClick={() => {
                    // Redirigir al inicio o a la página de pedidos
                    window.location.href = '/';
                  }}
                >
                  Continuar Comprando
                </button>
              </div>
            </div>
          )}

          {/* Botones */}
          <div className="actions">
            {activeStep > 1 && activeStep < 3 && (
              <button className="btn-secondary" onClick={prev} disabled={loading}>
                Atrás
              </button>
            )}
            {activeStep < 3 && (
              <button
                className="btn-primary"
                onClick={next}
                disabled={
                  loading ||
                  (activeStep === 1 && !isStep1Valid()) ||
                  (activeStep === 2 && !isStep2Valid())
                }
              >
                {loading ? 'Procesando...' : activeStep === 2 ? 'Realizar Pedido' : 'Continuar'}
              </button>
            )}
          </div>
        </section>

        {/* --------- LATERAL: Resumen del Pedido --------- */}
        <aside className="right">
          <div className="order-summary">
            <h3>Resumen del Pedido</h3>

            {/* Mostrar productos */}
            <div className="order-items">
              {carrito.map(item => (
                <div key={item.id} className="order-item">
                  <div className="item-info">
                    <span className="item-name">{item.title || item.nombre}</span>
                    <span className="item-quantity">x{item.cantidad}</span>
                  </div>
                  <span className="item-price">S/.{(parsePrice(item.precio) * item.cantidad).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <hr />

            <div className="summary-row">
              <span>Subtotal ({carrito.length} productos)</span>
              <span>S/.{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span>S/.{shippingCost.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Impuestos</span>
              <span>S/.{taxes.toFixed(2)}</span>
            </div>
            <div className="summary-total">
              <strong>Total</strong>
              <strong>S/.{total.toFixed(2)}</strong>
            </div>

            <div className="secure-box">
              <p><FaLock /> Pago 100% seguro</p>
              <p><IoReloadCircle /> Devoluciones fáciles 30 días</p>
            </div>

            {activeStep < 3 && (
              <button
                className="place-order"
                onClick={next}
                disabled={
                  loading ||
                  (activeStep === 1 && !isStep1Valid()) ||
                  (activeStep === 2 && !isStep2Valid())
                }
              >
                {loading ? 'Procesando...' : activeStep === 1 ? 'Continuar' : 'Realizar Pedido'}
              </button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}