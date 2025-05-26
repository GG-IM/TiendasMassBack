import React, { useState } from 'react';
import { User, Package, MapPin, CreditCard, LogOut, Menu, X, Bell } from 'lucide-react';

import Profile from '../components/perfil/profile';
import Orders from '../components/perfil/orders';
import Addresses from '../components/perfil/direccion';
import Payments from '../components/perfil/metodopago';
import Footer from '../components/footer/footer';

import '../styles/perfil.css';

const menuItems = [
  { id: 'profile', label: 'Mi Perfil', icon: User },
  { id: 'orders', label: 'Mis Pedidos', icon: Package },
  { id: 'addresses', label: 'Direcciones', icon: MapPin },
  { id: 'payments', label: 'Métodos de Pago', icon: CreditCard },
];

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [userData, setUserData] = useState({
    name: 'YOU González',
    email: 'YOU.gonzalez@email.com',
    phone: '+34 123 456 789',
    birthDate: '15/03/1990',

  });

  const addresses = [
    {
      id: 1,
      type: 'Casa',
      street: 'Calle Mayor 123',
      city: 'Madrid',
      zipCode: '28001',
      country: 'España',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Trabajo',
      street: 'Av. de la Castellana 456',
      city: 'Madrid',
      zipCode: '28046',
      country: 'España',
      isDefault: false,
    },
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'Visa',
      last4: '1234',
      expiry: '12/26',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '5678',
      expiry: '08/27',
      isDefault: false,
    },
  ];

  const orders = [
    {
      id: '#12345',
      date: '20 May, 2024',
      status: 'Entregado',
      total: '€89.99',
      items: 3,
    },
    {
      id: '#12344',
      date: '15 May, 2024',
      status: 'En camino',
      total: '€156.50',
      items: 2,
    },
    {
      id: '#12343',
      date: '8 May, 2024',
      status: 'Procesando',
      total: '€45.00',
      items: 1,
    },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <Profile userData={userData} setUserData={setUserData} />;
      case 'orders':
        return <Orders orders={orders} />;
      case 'addresses':
        return <Addresses addresses={addresses} />;
      case 'payments':
        return <Payments paymentMethods={paymentMethods} />;
      default:
        return <Profile userData={userData} setUserData={setUserData} />;
    }
  };

  const handleMenuItemClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  return (

    <div className="user-profile">
      <header className="header-navbar">
        <div className="logo">
          <img src="Frontend/src/assets/logo.png" alt="Logo Mercadona" />
        </div>
        <div className="user-info-header">
          <span>{userData.name}</span>
        </div>
      </header>

      <button
        className="mobile-menu-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="profile-container">
        <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="user-info">
            <div className="user-details">
              <div className="user-name">{userData.name}</div>
              <div className="user-email">{userData.email}</div>
            </div>
          </div>

          <nav className="navigation">
            <ul className="menu-list">
              {menuItems.map(({ id, label, icon: Icon }) => (
                <li key={id} className="menu-item">
                  <button
                    className={`menu-link ${activeSection === id ? 'active' : ''}`}
                    onClick={() => handleMenuItemClick(id)}
                  >
                    <Icon size={20} className="menu-icon" />
                    <span>{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sidebar-footer">
            <button className="logout-link" type="button">
              <LogOut size={20} className="menu-icon" />
              <span>Cerrar Sesión</span>
            </button>
            <button
              className="logout-link"
              type="button"
              onClick={() => window.location.href = '/'} // Redirige a la página de inicio
            >
              {/* Puedes usar otro icono, por ejemplo Settings o una casa (house) si tienes */}
              <User size={20} className="menu-icon" />
              <span>Inicio</span>
            </button>
          </div>
        </aside>

        {mobileMenuOpen && <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)}></div>}

        <main className="main-content">
          <div className="container-content">
            {renderSection()}
          </div>
        </main>
      </div>
      <Footer />
    </div>

  );
};

export default UserProfile;
