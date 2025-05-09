const Product = require('../models/product');
const Category = require('../models/category');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { nombre, precio, descripcion, imagen = '', stock = 0, estado = true, categoria_id } = req.body;

    // Validar si la categoría existe
    const category = await Category.findById(categoria_id);
    if (!category) {
      return res.status(400).json({ message: 'Categoría no válida' });
    }

    // Crear el producto
    const productId = await Product.create({ nombre, precio, descripcion, imagen, stock, estado, categoria_id });
    res.status(201).json({ id: productId, nombre, precio, descripcion, imagen, stock, estado, categoria_id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { nombre, precio, descripcion, imagen = '', stock = 0, estado = true, categoria_id } = req.body;

    // Validar si la categoría existe
    const category = await Category.findById(categoria_id);
    if (!category) {
      return res.status(400).json({ message: 'Categoría no válida' });
    }

    // Actualizar el producto
    const success = await Product.update(req.params.id, { nombre, precio, descripcion, imagen, stock, estado, categoria_id });
    if (!success) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ id: req.params.id, nombre, precio, descripcion, imagen, stock, estado, categoria_id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const success = await Product.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
