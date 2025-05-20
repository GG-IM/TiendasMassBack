import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUsuario } from '../../context/userContext';
import { useCarrito } from '../../context/carContext';
import Carrito from '../car/Carrito';

import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { usuario, logout } = useUsuario();
  const { carrito } = useCarrito();

  const isLoggedIn = Boolean(usuario);
  const nombreUsuario = usuario?.nombre || 'Usuario';
  const totalItems = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);

  // Efecto para detectar el scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLoginClick = () => navigate('/login');
  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleCarrito = () => setMostrarCarrito(!mostrarCarrito);
  const closeMenu = () => setMenuOpen(false);

  // Componente de búsqueda reutilizable
  const SearchBar = () => (
    <form className="navbar-search" onSubmit={(e) => e.preventDefault()} role="search">
      <input
        type="search"
        placeholder="Buscar productos…"
        className="navbar-search-input"
        aria-label="Buscar productos"
      />
      <button type="submit" aria-label="Buscar" className="navbar-search-btn">
        <i className="bi bi-search" style={{ fontSize: '18px', color: '#0033a0' }}></i>
      </button>
    </form>
  );

  // Componente de contador de carrito reutilizable
  const CartCounter = () => (
    totalItems > 0 && (
      <span className="cart-counter">
        {totalItems}
      </span>
    )
  );

  // Componente de botón de carrito reutilizable
  const CartButton = ({ onClick, className = "" }) => (
    <button
      className={`icon-btn ${className}`}
      aria-label="Carrito"
      onClick={onClick}
    >
      <i className="bi bi-basket3-fill" style={{ fontSize: '22px', color: '#0033a0' }}></i>
      <CartCounter />
    </button>
  );

  // Componente de botón de usuario reutilizable
  const UserButton = ({ isMobile = false }) => (
    !isLoggedIn ? (
      <button className="login-btn" onClick={handleLoginClick}>
        <i className="bi bi-person-fill" style={{ marginRight: '6px' }}></i>
        Iniciar sesión
      </button>
    ) : (
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle login-btn"
          type="button"
          id={isMobile ? "dropdownMenuButton" : "dropdownMenuButtonDesktop"}
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {isMobile ? nombreUsuario : `¡Hola!, ${nombreUsuario}`}
        </button>
        <ul className="dropdown-menu" aria-labelledby={isMobile ? "dropdownMenuButton" : "dropdownMenuButtonDesktop"}>
          <li>
            <Link
              className="dropdown-item"
              to="/perfil"
              onClick={isMobile ? closeMenu : undefined}
            >
              Perfil
            </Link>
          </li>
          <li>
            <button className="dropdown-item" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    )
  );

  return (
    <div className={`navbar-container${menuOpen ? ' menu-open' : ''}${scrolled ? ' scrolled' : ''}`}>
      {menuOpen && <div className="navbar-overlay" onClick={closeMenu}></div>}

      <nav className="navbar">
        <div className="navbar-main">
          {/* Logo */}
          <div className="navbar-logo">
            <Link to="/" onClick={closeMenu}>
              <img src="frontend/src/assets/logo.png" alt="logo" />
            </Link>
          </div>

          {/* Búsqueda escritorio/tablet */}
          <div className="navbar-search-desktop">
            <SearchBar />
          </div>

          {/* Botón hamburguesa */}
          <button
            className="navbar-burger"
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span className="burger-bar"></span>
            <span className="burger-bar"></span>
            <span className="burger-bar"></span>
          </button>

          {/* Contenido central (links) */}
          <div className={`navbar-content${menuOpen ? ' open' : ''}`}>
            {/* Búsqueda móvil - Ahora solo aparece en el menú desplegable */}
            <div className="navbar-search-mobile">
              <SearchBar />
            </div>

            {/* Links */}
            <ul className="navbar-links">
              <li><Link to="/" onClick={closeMenu}>Inicio</Link></li>
              <li><Link to="/ofertas" onClick={closeMenu}>Ofertas</Link></li>
              <li><Link to="/categorias" onClick={closeMenu}>Categorías</Link></li>
              <li><Link to="/contacto" onClick={closeMenu}>Contacto</Link></li>
            </ul>

            {/* Acciones móviles */}
            <div className="navbar-mobile-actions">
              <CartButton onClick={toggleCarrito} />
              <UserButton isMobile={true} />
              {mostrarCarrito && (
                <div className="carrito-dropdown">
                  <Carrito />
                </div>
              )}
            </div>
          </div>

          {/* Acciones escritorio */}
          <div className="navbar-actions">
            <div className="cart-container">
              <CartButton onClick={toggleCarrito} />

              {mostrarCarrito && (
                <div className="carrito-dropdown">
                  <Carrito />
                </div>
              )}
            </div>

            <UserButton />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;