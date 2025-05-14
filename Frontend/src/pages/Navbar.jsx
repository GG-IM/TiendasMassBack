import React, { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="container-fluid navbar-principal">
        <div className="container">
          <div className="row d-flex align-items-center px-3">
            <div className="col-10 col-lg-2">
              <a href="https://www.tiendasmass.com.pe/" rel="home" itemProp="url">
                <img
                  src="https://www.tiendasmass.com.pe/wp-content/themes/mass/img/mass_logo.webp"
                  alt="Tiendas Mass"
                  className="img-fluid"
                  style={{ maxWidth: 150 }}
                />
              </a>
            </div>
            <div className="col-10 d-none d-lg-block">
              <div className="menu-principal-container">
                <ul id="menu-principal" className="menu">
                  <li className="menu-item">
                    <a href="https://www.tiendasmass.com.pe/conoceme/">Conóceme</a>
                  </li>
                  <li className="menu-item">
                    <a href="https://www.tiendasmass.com.pe/precios-mass/">Precios Mass</a>
                  </li>
                  <li className="menu-item">
                    <a href="https://www.tiendasmass.com.pe/ubicame/">Ubícame</a>
                  </li>
                  <li className="menu-item">
                    <a href="https://www.tiendasmass.com.pe/productos/">Productos</a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="https://linktr.ee/MassTrabajaConmigo?utm_source=qr_code"
                      target="_blank"
                    >
                      Trabaja conmigo
                    </a>
                  </li>
                  <li className="btn-alquila">
                    <a
                      href="https://ofrecetulocal.tiendasmass.com.pe/local/registro/1"
                      target="_blank"
                    >
                      ALQUILA TU LOCAL
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-2 d-lg-none ps-md-5">
              <div id="nav-icon" onClick={toggleMobileMenu}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menú en versión móvil */}
      <div className={`nav-mobile ${isMobileMenuVisible ? 'd-block' : 'd-none'}`}>
        <div className="menu-principal-container">
          <ul id="menu-principal-1" className="menu">
            <li className="menu-item">
              <a href="https://www.tiendasmass.com.pe/conoceme/">Conóceme</a>
            </li>
            <li className="menu-item">
              <a href="https://www.tiendasmass.com.pe/precios-mass/">Precios Mass</a>
            </li>
            <li className="menu-item">
              <a href="https://www.tiendasmass.com.pe/ubicame/">Ubícame</a>
            </li>
            <li className="menu-item">
              <a href="https://www.tiendasmass.com.pe/productos/">Productos</a>
            </li>
            <li className="menu-item">
              <a
                href="https://linktr.ee/MassTrabajaConmigo?utm_source=qr_code"
                target="_blank"
              >
                Trabaja conmigo
              </a>
            </li>
            <li className="btn-alquila">
              <a
                href="https://ofrecetulocal.tiendasmass.com.pe/local/registro/1"
                target="_blank"
              >
                ALQUILA TU LOCAL
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
