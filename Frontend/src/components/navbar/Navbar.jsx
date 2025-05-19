import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUsuario} from '../../context/userContext';
import { useCarrito } from '../../context/carContext';
import Carrito from '../car/Carrito';

import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const navigate = useNavigate();

  const { usuario, logout } = useUsuario();
  const { carrito } = useCarrito();

  const isLoggedIn = Boolean(usuario);
  const nombreUsuario = usuario?.nombre || 'Usuario';

  // Total de items en el carrito
  const totalItems = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const toggleCarrito = () => setMostrarCarrito(!mostrarCarrito);

  return (
    <div className={`navbar-floating-wrapper${menuOpen ? ' menu-open' : ''}`}>
      {menuOpen && (
        <div className="navbar-overlay" onClick={() => setMenuOpen(false)}></div>
      )}
      <nav className="navbar-mass">
        <div className="navbar-row">
          <div className="navbar-logo">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <img src="frontend/src/assets/logo.png" alt="logo" />
            </Link>
          </div>

          <form
            className="navbar-search"
            onSubmit={(e) => e.preventDefault()}
            role="search"
          >
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

          <button
            className="navbar-burger"
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span className="burger-bar"></span>
            <span className="burger-bar"></span>
            <span className="burger-bar"></span>
          </button>
        </div>

        <div className={`navbar-center${menuOpen ? ' open' : ''}`}>
          <ul className="navbar-links">
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/ofertas" onClick={() => setMenuOpen(false)}>
                Ofertas
              </Link>
            </li>
            <li>
              <Link to="/categorias" onClick={() => setMenuOpen(false)}>
                Categorías
              </Link>
            </li>
            <li>
              <Link to="/contacto" onClick={() => setMenuOpen(false)}>
                Contacto
              </Link>
            </li>
          </ul>

          <div className="navbar-mobile-actions">
            {/* Botón carrito móvil */}
            <button
              className="icon-btn"
              aria-label="Carrito"
              onClick={() => {
                toggleCarrito();
                setMenuOpen(false);
              }}
              style={{ position: 'relative' }}
            >
              <i className="bi bi-basket3-fill" style={{ fontSize: '22px', color: '#0033a0' }}></i>
              {totalItems > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    background: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '2px 6px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    lineHeight: 1,
                  }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {!isLoggedIn ? (
              <button className="login-btn" onClick={handleLoginClick}>
                <i className="bi bi-person-fill" style={{ marginRight: '6px' }}></i>
                Iniciar sesión
              </button>
            ) : (
              <div className="dropdown">
                <button
                  className="btn btn-primary dropdown-toggle login-btn"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {nombreUsuario}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <Link className="dropdown-item" to="/perfil" onClick={() => setMenuOpen(false)}>
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="navbar-right" style={{ position: 'relative' }}>
          {/* Botón carrito desktop */}
          <button
            className="icon-btn"
            aria-label="Carrito"
            onClick={() => {
              toggleCarrito();
              setMenuOpen(false);
            }}
            style={{ position: 'relative' }}
          >
            <i className="bi bi-basket3-fill" style={{ fontSize: '22px', color: '#0033a0' }}></i>
            {totalItems > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  background: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  lineHeight: 1,
                }}
              >
                {totalItems}
              </span>
            )}
          </button>

          {mostrarCarrito && (
            <div
              style={{
                position: 'absolute',
                top: '40px',
                right: '0',
                zIndex: 20,
              }}
            >
              <Carrito />
            </div>
          )}

          {!isLoggedIn ? (
            <button className="login-btn" onClick={handleLoginClick}>
              <i className="bi bi-person-fill" style={{ marginRight: '6px' }}></i>
              Iniciar sesión
            </button>
          ) : (
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle login-btn"
                type="button"
                id="dropdownMenuButtonDesktop"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                !Hola¡, {nombreUsuario}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonDesktop">
                <li>
                  <Link className="dropdown-item" to="/perfil">
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
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
