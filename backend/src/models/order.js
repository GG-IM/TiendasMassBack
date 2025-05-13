// models/Pedido.js
const db = require('../config/db');

class Order {
  static async crearPedido(usuarioId, total, estado = 'pendiente') {
    try {
      // Verificar que el usuario exista en la base de datos
      const [usuario] = await db.query('SELECT * FROM usuarios WHERE id = ?', [usuarioId]);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      const [result] = await db.query(
        'INSERT INTO pedidos (usuario_id, total, estado) VALUES (?, ?, ?)',
        [usuarioId, total, estado]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      throw new Error('Error al crear el pedido');
    }
  }

  // Método para obtener los pedidos
  static async obtenerPedidos(usuarioId) {
    let query = 'SELECT * FROM pedidos';
    let params = [];

    if (usuarioId) {
      query += ' WHERE usuario_id = ?';
      params.push(usuarioId);
    }

    try {
      const [rows] = await db.query(query, params);
      return rows;
    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
      throw new Error('Error al obtener los pedidos');
    }
  }
}


module.exports = Order;
