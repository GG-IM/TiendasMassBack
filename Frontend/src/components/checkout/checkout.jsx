import React, { useState } from 'react';
import { FaTruck ,FaCreditCard,FaCheck ,FaShieldAlt ,FaLock    } from "react-icons/fa";
import { IoReloadCircle } from "react-icons/io5";
import {MapPin,User,Mail,Phone,Truck,Store} from 'lucide-react';
import './checkout.css';


const initialItems = [
  {
    id: 1,
    title: 'Auriculares Bluetooth Premium',
    price: 129.99,
    qty: 1,
    img: 'https://via.placeholder.com/80?text=Img'
  },
  {
    id: 2,
    title: 'Funda Protectora para Laptop',
    price: 39.99,
    qty: 2,
    img: 'https://via.placeholder.com/80?text=Img'
  },
  {
    id: 3,
    title: 'Cargador Inalámbrico',
    price: 24.99,
    qty: 1,
    img: 'https://via.placeholder.com/80?text=Img'
  }
];

export default function Checkout({activeStep,setActiveStep,formData,setFormData}) 
{
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [items, setItems] = useState(initialItems);
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
    nameOnCard: ''
  });

  // Totales
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shippingCost = 9.99;
  const taxes = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + shippingCost + taxes).toFixed(2);

  const next = () => setActiveStep(s => Math.min(s + 1, 3));
  const prev = () => setActiveStep(s => Math.max(s - 1, 1));

  const updateQty = (id, delta) =>
    setItems(items.map(i =>
      i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
    ));
  const removeItem = id =>
    setItems(items.filter(i => i.id !== id));

  const onChange = (field, val) =>
    setFormData(fd => ({ ...fd, [field]: val }));

  const onCardChange = (field, val) =>
    setCardInfo(ci => ({ ...ci, [field]: val }));

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
            { id: 3, icon: <FaCheck />,  label: 'Confirmación' }
          ].map(s => (
            <div
              key={s.id}
              className={
                `step ` +
                (activeStep > s.id ? 'completed ' : '') +
                (activeStep === s.id ? 'active' : '')
              }
            ><div className="step-content">
                <span className="step-icon">{s.icon}</span>
                <span className="step-label">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* ------ MAIN LAYOUT ------ */}
      <div className="checkout-main">
        {/* --------- IZQUIERDA --------- */}
        <section className="left">
          {/* Pasos */}
          {activeStep === 1 && (
            <>
              {/* Imagen 1: Resumen del Carrito */}
              <div className="section-box payment-section">
                      <h2><span>1</span> Resumen de Productos</h2>
                {items.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.img} alt={item.title} />
                    <div className="cart-item-info">
                      <strong>{item.title}</strong>
                      <small>${item.price.toFixed(2)} c/u</small>
                    </div>
                    <div className="cart-item-actions">
                      <button onClick={() => updateQty(item.id, -1)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, +1)}>+</button>
                      <button className="remove" onClick={() => removeItem(item.id)}>✕</button>
                    </div>
                    <div className="cart-item-total">
                      ${(item.price * item.qty).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Imagen 1 (cont.): Información de Envío */}
              <div className="section-box shipping-form-container active">
                <div className="shipping-header">
                  <div className="shipping-step-badge selected">2</div>
                  <h2 className="shipping-title">Información de Envío</h2>
                </div>
                <div className="delivery-options">
                  <button
                    className={`delivery-btn ${
                      formData.deliveryType === 'delivery' ? 'selected' : ''
                    }`}
                    onClick={() => onChange('deliveryType', 'delivery')}
                  >
                    <Truck className="delivery-icon" />
                    <div>
                      <div className="delivery-label">Envío a Domicilio</div>
                      <div className="delivery-sub">Recibe en tu dirección</div>
                    </div>
                  </button>
                  <button
                    className={`delivery-btn ${
                      formData.deliveryType === 'pickup' ? 'selected' : ''
                    }`}
                    onClick={() => onChange('deliveryType', 'pickup')}
                  >
                    <Store className="delivery-icon" />
                    <div>
                      <div className="delivery-label">Recojo en Tienda</div>
                      <div className="delivery-sub">Retira en nuestro local</div>
                    </div>
                  </button>
                </div>
                <div className="form-grid">
                  <div className="form-group full">
                    <label className="form-label">
                      <User className="form-icon" />
                      Nombre Completo
                    </label>
                    <input
                      className="form-input"
                      placeholder="Juan Pérez"
                      value={formData.fullName}
                      onChange={e => onChange('fullName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <Mail className="form-icon" />
                      Correo Electrónico
                    </label>
                    <input
                      className="form-input"
                      placeholder="juan@ejemplo.com"
                      value={formData.email}
                      onChange={e => onChange('email', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <Phone className="form-icon" />
                      Teléfono
                    </label>
                    <input
                      className="form-input"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={e => onChange('phone', e.target.value)}
                    />
                  </div>
                  {formData.deliveryType === 'pickup' && (
                    <div className="form-group full">
                      <label className="form-label">
                        <Store className="form-icon" />
                        Seleccionar Tienda
                      </label>
                      <select
                        className="form-select"
                        value={formData.selectedStore}
                        onChange={e => onChange('selectedStore', e.target.value)}
                      >
                        <option value="">Seleccionar tienda</option>
                        <option value="store-1">Centro – Av. Principal 123</option>
                        <option value="store-2">Norte – Calle Comercial 456</option>
                        <option value="store-3">Sur – Plaza Shopping 789</option>
                        <option value="store-4">Este – Mall Central 101</option>
                      </select>
                    </div>
                  )}
                  {formData.deliveryType === 'delivery' && (
                    <>
                      <div className="form-group full">
                        <label className="form-label">
                          <MapPin className="form-icon" />
                          Dirección
                        </label>
                        <input
                          className="form-input"
                          placeholder="Calle Principal 123"
                          value={formData.address}
                          onChange={e => onChange('address', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Ciudad</label>
                        <input
                          className="form-input"
                          placeholder="Madrid"
                          value={formData.city}
                          onChange={e => onChange('city', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Código Postal</label>
                        <input
                          className="form-input"
                          placeholder="28001"
                          value={formData.zipCode}
                          onChange={e => onChange('zipCode', e.target.value)}
                        />
                      </div>
                      <div className="form-group full">
                        <label className="form-label">País</label>
                        <select
                          className="form-select"
                          value={formData.country}
                          onChange={e => onChange('country', e.target.value)}
                        >
                          <option value="">Seleccionar país</option>
                          <option value="ES">España</option>
                          <option value="MX">México</option>
                          <option value="AR">Argentina</option>
                          <option value="CO">Colombia</option>
                          <option value="US">Estados Unidos</option>
                        </select>
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
      {/* Opción Tarjeta */}
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
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/640px-Mastercard_2019_logo.svg.png" alt="CM" />
        </div>
      </label>

      {/* Opción PayPal */}
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
    </div>

    {paymentMethod === 'card' && (
      <div className="card-form">
        <div className="form-row">
          <label>Número de Tarjeta</label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardInfo.number}
            onChange={e => onCardChange('number', e.target.value)}
          />
        </div>
        <div className="form-row split-2">
          <div>
            <label>Fecha de Vencimiento</label>
            <input
              type="text"
              placeholder="MM/AA"
              value={cardInfo.expiry}
              onChange={e => onCardChange('expiry', e.target.value)}
            />
          </div>
          <div>
            <label>CVV</label>
            <input
              type="text"
              placeholder="123"
              value={cardInfo.cvv}
              onChange={e => onCardChange('cvv', e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <label>Nombre en la Tarjeta</label>
          <input
            type="text"
            placeholder="Juan Pérez"
            value={cardInfo.nameOnCard}
            onChange={e => onCardChange('nameOnCard', e.target.value)}
          />
        </div>
      </div>
    )}
  </div>
)}

          {activeStep === 3 && (
            <div className="section-box confirmation-section">
              <h2>Confirmación</h2>
              <p>¡Gracias por tu compra! Tu pedido ha sido procesado.</p>
            </div>
          )}

          {/* Botones */}
          <div className="actions">
            {activeStep > 1 && (
              <button className="btn-secondary" onClick={prev}>Atrás</button>
            )}
            {activeStep < 3 && (
              <button className="btn-primary" onClick={next}>Continuar</button>
            )}
          </div>
        </section>

        {/* --------- LATERAL: Resumen del Pedido (Imagen 3) --------- */}
        <aside className="right">
          <div className="order-summary">
            <h3>Resumen del Pedido</h3>
            <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="summary-row"><span>Envío</span><span>${shippingCost.toFixed(2)}</span></div>
            <div className="summary-row"><span>Impuestos</span><span>${taxes.toFixed(2)}</span></div>
            <div className="summary-total"><strong>Total</strong><strong>${total}</strong></div>
            <div className="secure-box">
              <p><FaLock /> Pago 100% seguro</p>
              <p><IoReloadCircle /> Devoluciones fáciles 30 días</p>
            </div>
            <div className="discount">
            </div>
            <button className="place-order">Realizar Pedido</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
