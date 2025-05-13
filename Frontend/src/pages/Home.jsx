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
}

const styles = {
  boton: {
    padding: '10px 15px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default Home;
