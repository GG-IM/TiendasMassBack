import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthStyles.css';

function LoginForm({ switchToRegister }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación con un backend
    console.log('Login con:', formData);
    alert('Inicio de sesión exitoso (simulado)');
    navigate('/'); // Redirige a la página principal después del login
  };
  
  return (
    <div className="form-container">
      <h2 className="form-title">Iniciar Sesión</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login-email">Correo electrónico</label>
          <input
            id="login-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="ejemplo@correo.com"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="login-password">Contraseña</label>
          <input
            id="login-password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="********"
            required
          />
        </div>
        
        <div className="form-options">
          <div className="remember-me">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              checked={formData.remember}
              onChange={handleInputChange}
            />
            <label htmlFor="remember">Recordarme</label>
          </div>
          <div className="forgot-password">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
        </div>
        
        <button type="submit" className="submit-button">
          Iniciar Sesión
        </button>
        
        <div className="form-footer">
          <p>
            ¿No tienes cuenta?
            <button
              type="button"
              onClick={switchToRegister}
              className="switch-form-button"
            >
              Regístrate
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;