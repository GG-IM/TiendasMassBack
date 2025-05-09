import React, { useState } from 'react';
import './AuthStyles.css';

function RegisterForm({ switchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación básica de contraseñas
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    // Aquí iría la lógica de registro con un backend
    console.log('Registro con:', formData);
    alert('Registro exitoso (simulado)');
  };
  
  return (
    <div className="form-container">
      <h2 className="form-title">Crear Cuenta</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="register-name">Nombre completo</label>
          <input
            id="register-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ingresa tu nombre"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="register-email">Correo electrónico</label>
          <input
            id="register-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="ejemplo@correo.com"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="register-password">Contraseña</label>
          <input
            id="register-password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="********"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="register-confirmPassword">Confirmar contraseña</label>
          <input
            id="register-confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="********"
            required
          />
        </div>
        
        <button type="submit" className="submit-button">
          Registrarse
        </button>
        
        <div className="form-footer">
          <p>
            ¿Ya tienes cuenta?
            <button
              type="button"
              onClick={switchToLogin}
              className="switch-form-button"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;