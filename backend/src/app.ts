import express from 'express';
import cors from 'cors';
import path from 'path';
import usuariosRoutes from './routes/usuarios.routes';
import productRoutes from './routes/productos.routes';
import categoriRoutes from './routes/categoria.routes';
import { AppDataSource } from './config/data-source';
import pedidoRoutes from './routes/pedidos.routes';
import  MetodoPagoRoutes  from './routes/metodopago.routes';  
import metodoEnvioRoutes from './routes/metodoenvio.routes'; // Asegúrate de que esta ruta esté definida correctamente


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categorias', categoriRoutes);
app.use("/api/pedidos", pedidoRoutes); 
app.use('/api/metodos-pago', MetodoPagoRoutes);
app.use('/api/metodos-envio', metodoEnvioRoutes); 

// Conexión a la base de datos
AppDataSource.initialize()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });