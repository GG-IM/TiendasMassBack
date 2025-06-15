import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsuario } from '../../context/userContext';
import './AuthStyles.css';
import Swal from 'sweetalert2';

function LoginForm({ switchToRegister }) {
  const navigate = useNavigate();
  const { login } = useUsuario();
  const [formData, setFormData] = useState({
    email: '',
    contraseña: '', 
    remember: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.contraseña 
        })
      });

      const data = await response.json();
      console.log('response', data);

      if (response.ok && data.email) {
        login(data);

        if (formData.remember) {
          localStorage.setItem('usuario', JSON.stringify(data));
        }

        navigate('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Error al iniciar sesión'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error de red',
        text: 'Error de red al iniciar sesión'
      });
      console.error(error);
    }
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
            name="contraseña" // ✅ Debe coincidir con el backend
            value={formData.contraseña}
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
