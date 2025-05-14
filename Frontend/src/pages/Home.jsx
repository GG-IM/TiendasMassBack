// src/pages/HomePage.jsx
import React from 'react';
import { useUsuario } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import ListaProductos from '../components/listaProductos';

function Home() {
  const { usuario, logout } = useUsuario();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Tienda Mass</h1>
        <div>
          {usuario ? (
            <>
              <span style={{ marginRight: '1rem' }}>Bienvenido, {usuario.nombre}</span>
              <button onClick={logout} style={styles.boton}>Cerrar sesión</button>
            </>
          ) : (
            <button onClick={() => navigate('/login')} style={styles.boton}>Iniciar sesión</button>
          )}
        </div>
      </header>

      {/* Mostrar productos siempre */}
      <ListaProductos />
    </div>
  );
};

export default Home;
