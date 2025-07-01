import express from 'express';
import cors from 'cors';
import path from 'path';
import usuariosRoutes from './routes/usuarios.routes';
import productRoutes from './routes/productos.routes';
import categoriRoutes from './routes/categoria.routes';
import { AppDataSource } from './config/data-source';
import pedidoRoutes from './routes/pedidos.routes';
import  MetodoPagoRoutes  from './routes/metodopago.routes';  
import metodoEnvioRoutes from './routes/metodoenvio.routes'; 
import rolesRoutes from './routes/rol.routes';
import estadoRoutes from './routes/estado.routes';
import dashboardRoutes from './routes/dashboard.routes';
import direccionRoutes from './routes/direccion.routes';
import tarjetaUsuarioRoutes from './routes/tarjeta-usuario.routes';
import authRoutes from './routes/auth.routes';
import setupRoutes from './routes/setup.routes';

const app = express();
const PORT = process.env.PORT || 443;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Rutas
app.use('/api/setup', setupRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categorias', categoriRoutes);
app.use("/api/pedidos", pedidoRoutes); 
app.use('/api/metodos-pago', MetodoPagoRoutes);
app.use('/api/metodos-envio', metodoEnvioRoutes); 
app.use('/api/roles', rolesRoutes);
app.use('/api/estados', estadoRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/direcciones', direccionRoutes);
app.use('/api/tarjetas-usuario', tarjetaUsuarioRoutes);

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