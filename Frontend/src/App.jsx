import React from 'react';
import { CarritoProvider } from './context/carContext'; // Importa el contexto del carrit
import ListaProductos from './components/listaProductos'; // Importa el componente de lista de productos

function App() {
  return (
    <CarritoProvider>
      <div className="App">
        <ListaProductos />
      </div>
    </CarritoProvider>
  );
}

export default App;
