const db = require('../config/db');

class Product {
  static async findAll() {
    const [rows] = await db.query(
      `SELECT productos.*, categorias.nombre AS categoria
      FROM productos
      LEFT JOIN categorias ON productos.categoria_id = categorias.id`)
       ;
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query(
      `SELECT p.*, c.nombre AS categoria 
       FROM productos p 
       LEFT JOIN categorias c ON p.categoria_id = c.id 
       WHERE p.id = ?`, [id]
      );
    return rows[0];
  }

  static async create(productData) {
    const { nombre, precio, descripcion, imagen, stock, estado, categoria_id } = productData;
    const [result] = await db.query(
      'INSERT INTO productos (nombre, precio, descripcion, imagen, stock, estado, categoria_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, precio, descripcion, imagen, stock, estado, categoria_id]
    );
    return result.insertId;
  }

 static async update(id, productData) {
    const { nombre, precio, descripcion, imagen, stock, estado, categoria_id } = productData;
    const [result] = await db.query(
      'UPDATE productos SET nombre = ?, precio = ?, descripcion = ?, imagen = ?, stock = ?, estado = ?, categoria_id = ? WHERE id = ?',
      [nombre, precio, descripcion, imagen, stock, estado, categoria_id, id]
    );
    return result.affectedRows > 0;
  }

   static async delete(id) {
    const [result] = await db.query('DELETE FROM productos WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Product;