const express = require('express');
const app = express();
const categoryController = require('../controllers/categoryController'); 


router.get('/categorias', categoryController.getAllCategories);
module.exports = router;