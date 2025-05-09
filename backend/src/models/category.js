const db = require('../config/db');

class Category {
  // Obtener todas las categorías
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM categorias');
    return rows;
  }

  // Obtener una categoría por ID (usado para validación)
  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM categorias WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = Category;
