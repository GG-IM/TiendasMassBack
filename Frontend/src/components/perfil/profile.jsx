import React, { useState } from 'react';
import { Edit3, Settings } from 'lucide-react';
import './styleperfil.css';

const Profile = ({ userData, setUserData }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="profile-section">
      <div className="section-header">
        <div className="header-content">
          <h2>Mi Perfil</h2>
          <p>Gestiona tu información personal</p>
        </div>
        <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
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
                  value={userData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              ) : (
                <div className="field-display">{userData.name}</div>
              )}
            </div>
            <div className="form-group">
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              ) : (
                <div className="field-display">{userData.email}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Teléfono</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              ) : (
                <div className="field-display">{userData.phone}</div>
              )}
            </div>
            <div className="form-group">
              <label>Fecha de nacimiento</label>
              {isEditing ? (
                <input
                  type="text"
                  value={userData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                />
              ) : (
                <div className="field-display">{userData.birthDate}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
