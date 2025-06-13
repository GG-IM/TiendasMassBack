import React, { useState, useEffect } from 'react';
import { Edit3 } from 'lucide-react';
import './styleperfil.css';

const Profile = ({ userData, setUserData }) => {
  const [isEditing, setIsEditing] = useState(false);

  // Inicializamos formData con los atributos de Usuario
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    ciudad: '',
    direccion: '',
    codigoPostal: '',
  });

  // Cuando cambia userData, actualizamos formData para mostrar datos
  useEffect(() => {
    if (userData) {
      setFormData({
        nombre: userData.nombre || '',
        telefono: userData.telefono || '',
        ciudad: userData.ciudad || '',
        direccion: userData.direccion || '',
        codigoPostal: userData.codigoPostal || '',
      });
    }
  }, [userData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/update/${userData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Error al guardar los datos');

      const result = await response.json();

      setUserData(result.usuario); // Actualiza el estado padre con datos nuevos

      setIsEditing(false);
      alert('Perfil actualizado correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al guardar el perfil');
    }
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      handleSave();
    } else {
      // Recarga datos para evitar inconsistencias si se canceló edición
      setFormData({
        nombre: userData.nombre || '',
        telefono: userData.telefono || '',
        ciudad: userData.ciudad || '',
        direccion: userData.direccion || '',
        codigoPostal: userData.codigoPostal || '',
      });
      setIsEditing(true);
    }
  };

  return (
    <div className="profile-section">
      <div className="section-header">
        <div className="header-content">
          <h2>Mi Perfil</h2>
          <p>Gestiona tu información personal</p>
        </div>
        <button className="edit-btn" onClick={handleToggleEdit}>
          <Edit3 size={16} />
          {isEditing ? 'Guardar' : 'Editar'}
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-form">
          <div className="form-row">
            <div className="form-group">
              <label>Nombre completo</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                />
              ) : (
                <div className="field-display">{userData.nombre}</div>
              )}
            </div>
            <div className="form-group">
              <label>Email</label>
              <div className="field-display">{userData.email}</div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Teléfono</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                />
              ) : (
                <div className="field-display">{userData.telefono}</div>
              )}
            </div>

            <div className="form-group">
              <label>Ciudad</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.ciudad}
                  onChange={(e) => handleInputChange('ciudad', e.target.value)}
                />
              ) : (
                <div className="field-display">{userData.ciudad}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Dirección</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.direccion}
                  onChange={(e) => handleInputChange('direccion', e.target.value)}
                />
              ) : (
                <div className="field-display">{userData.direccion}</div>
              )}
            </div>

            <div className="form-group">
              <label>Código Postal</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.codigoPostal}
                  onChange={(e) => handleInputChange('codigoPostal', e.target.value)}
                />
              ) : (
                <div className="field-display">{userData.codigoPostal}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
