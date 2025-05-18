import React, { useState } from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import './Navbar.css'; // Importa el archivo CSS para estilos

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/');
  };

  return (
    <div className={`navbar-floating-wrapper${menuOpen ? ' menu-open' : ''}`}>
      {menuOpen && <div className="navbar-overlay" onClick={() => setMenuOpen(false)}></div>}
      <nav className="navbar-mass">
        <div className="navbar-row">
          <div className="navbar-logo">
            <img src="frontend/src/assets/logo.png" alt="logo" />
          </div>
          <form className="navbar-search" onSubmit={e => e.preventDefault()}>
            <input type="text" placeholder="Buscar productos…" className="navbar-search-input" />
            <button type="submit" aria-label="Buscar" className="navbar-search-btn">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="7" stroke="#0033a0" strokeWidth="2" />
                <line x1="14.4142" y1="14" x2="18" y2="17.5858" stroke="#0033a0" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </form>
          <button className="navbar-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
            <span className="burger-bar"></span>
            <span className="burger-bar"></span>
            <span className="burger-bar"></span>
          </button>
        </div>
        <div className={`navbar-center${menuOpen ? ' open' : ''}`}>
          <form className="navbar-search" onSubmit={e => e.preventDefault()}>
            <input type="text" placeholder="Buscar productos…" className="navbar-search-input" />
            <button type="submit" aria-label="Buscar" className="navbar-search-btn">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="7" stroke="#0033a0" strokeWidth="2" />
                <line x1="14.4142" y1="14" x2="18" y2="17.5858" stroke="#0033a0" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </form>
          <ul className="navbar-links">
             {/* Usamos Link para navegación interna */}
            <li><Link to="/">Inicio</Link></li> {/* Esto redirige correctamente a la página de inicio */}
            <li><Link to="/categorias">Productos</Link></li> {/* Usar Link de React Router en lugar de href */}
            <li><Link to="#ofertas">Ofertas</Link></li> {/* Usar Link de React Router */}
            <li><Link to="/categorias">Categorías</Link></li> {/* Esto redirige correctamente a /categorias */}
            <li><Link to="#contacto">Contacto</Link></li> 
          </ul>
          <div className="navbar-mobile-actions">
            <button className="icon-btn" aria-label="Carrito">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 20c.828 0 1.5.672 1.5 1.5S7.828 23 7 23s-1.5-.672-1.5-1.5S6.172 20 7 20zm10 0c.828 0 1.5.672 1.5 1.5S17.828 23 17 23s-1.5-.672-1.5-1.5S16.172 20 17 20zM7.16 17h9.69c.75 0 1.41-.41 1.75-1.03l3.24-5.88a1 1 0 0 0-.87-1.47H6.21l-.94-2H1v2h2l3.6 7.59c.16.28.45.41.76.41zM6.16 15l-1.1-2h12.45l-2.76 5H7.16z" fill="#0033a0"/>
              </svg>
            </button>
            <button className="login-btn" onClick={handleLoginClick}>Iniciar sesión</button>
          </div>
        </div>
        <div className="navbar-right">
          <button className="icon-btn" aria-label="Carrito">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 20c.828 0 1.5.672 1.5 1.5S7.828 23 7 23s-1.5-.672-1.5-1.5S6.172 20 7 20zm10 0c.828 0 1.5.672 1.5 1.5S17.828 23 17 23s-1.5-.672-1.5-1.5S16.172 20 17 20zM7.16 17h9.69c.75 0 1.41-.41 1.75-1.03l3.24-5.88a1 1 0 0 0-.87-1.47H6.21l-.94-2H1v2h2l3.6 7.59c.16.28.45.41.76.41zM6.16 15l-1.1-2h12.45l-2.76 5H7.16z" fill="#0033a0"/>
            </svg>
          </button>
          <button className="login-btn" onClick={handleLoginClick}>Iniciar sesión</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar; 