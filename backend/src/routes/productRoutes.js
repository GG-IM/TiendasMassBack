const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController'); // Nuevo controlador para categorías

// Rutas para productos
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

// Nueva ruta para obtener todas las categorías
router.get('/categorias', categoryController.getAllCategories);

module.exports = router;
