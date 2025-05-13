// models/DetallePedido.js
const db = require('../config/db');

class OrderDetails {
  static async agregarDetalle(pedidoId, productoId, cantidad, precio) {
    try {
      await db.query(
        `INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_unitario)
         VALUES (?, ?, ?, ?)`,
        [pedidoId, productoId, cantidad, precio]
      );
    } catch (error) {
      console.error('Error al agregar detalle del pedido:', error);
      throw new Error('Error al agregar detalle del pedido');
    }
  }
}

module.exports = OrderDetails;
