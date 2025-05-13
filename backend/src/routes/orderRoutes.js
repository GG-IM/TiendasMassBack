const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Ruta para crear un pedido
router.post('/', orderController.crearPedido);

// Ruta para obtener los pedidos
router.get('/', orderController.obtenerPedidos);

module.exports = router;
