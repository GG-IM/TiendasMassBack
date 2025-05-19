const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); // Nueva ruta para categorías

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/productos', productRoutes);
app.use('/api/usuarios', authRoutes);
app.use('/api/pedidos', orderRoutes);
app.use('/api/categorias', categoryRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
 