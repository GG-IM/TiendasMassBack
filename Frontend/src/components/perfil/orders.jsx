import React from 'react';
import './styleperfil.css';

const Orders = ({ orders }) => {
  return (
    <div className="orders-section">
      <div className="section-header">
        <div className="header-content">
          <h2>Mis Pedidos</h2>
          <p>Historial de todas tus compras</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">12</div>
          <div className="stat-label">Total Pedidos</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">€291.49</div>
          <div className="stat-label">Gastado Total</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">1</div>
          <div className="stat-label">En Proceso</div>
        </div>
      </div>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-main">
              <div className="order-info">
                <div className="order-id">{order.id}</div>
                <div className="order-date">{order.date}</div>
                <div className="order-items">{order.items} productos</div>
              </div>
              <div className="order-status-section">
                <span
                  className={`order-status status-${order.status
                    .toLowerCase()
                    .replace(/\s/g, '-')}`}
                >
                  {order.status}
                </span>
                <div className="order-total">{order.total}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
