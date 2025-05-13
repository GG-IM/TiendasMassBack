const Pedido = require('../models/order');
const DetallePedido = require('../models/orderdetails');
const Producto = require('../models/product');

// Crear un nuevo pedido
exports.crearPedido = async (req, res) => {
  const { usuarioId, items, total } = req.body;

  console.log('Recibiendo solicitud para crear pedido');

  // Validación básica
  if (!usuarioId || !Array.isArray(items) || items.length === 0 || !total) {
    console.error('Datos incompletos para crear el pedido');
    return res.status(400).json({ error: 'Datos incompletos para crear el pedido' });
  }

  // Validación de datos de cada item
  for (const item of items) {
    if (!item.id || !item.cantidad || !item.precio) {
      console.error('Los datos del item son incompletos', item);
      return res.status(400).json({ error: 'Los datos del item son incompletos' });
    }
  }

  try {
    console.log('Intentando crear el pedido');

    // Crear el pedido y establecer el estado a 'pendiente'
    const pedidoId = await Pedido.crearPedido(usuarioId, total, 'pendiente');
    console.log('Pedido creado con ID:', pedidoId);

    // Actualizar el stock de cada producto
    for (const item of items) {
      const productoId = item.id;
      const cantidadSolicitada = item.cantidad;

      console.log(`Verificando stock del producto ${productoId} para cantidad ${cantidadSolicitada}`);

      // Verificar si hay suficiente stock
      const producto = await Producto.findById(productoId);
      if (!producto) {
        console.error('Producto no encontrado:', productoId);
        return res.status(400).json({ error: 'Producto no encontrado' });
      }

      console.log(`Stock actual de ${producto.nombre}: ${producto.stock}`);

      if (producto.stock < cantidadSolicitada) {
        console.error(`No hay suficiente stock para el producto ${producto.nombre}`);
        return res.status(400).json({ error: `No hay suficiente stock para el producto ${producto.nombre}` });
      }

      // Calcular el nuevo stock
      const nuevoStock = producto.stock - cantidadSolicitada;
      console.log(`Actualizando stock del producto ${producto.nombre} a ${nuevoStock}`);

      // Descontar el stock
      await Producto.actualizarStock(productoId, nuevoStock);

      // Agregar el detalle del pedido
      await DetallePedido.agregarDetalle(pedidoId, productoId, cantidadSolicitada, item.precio);
      console.log(`Detalle de pedido agregado para el producto ${producto.nombre}`);
    }

    res.status(201).json({ mensaje: 'Pedido creado exitosamente', pedidoId });
  } catch (error) {
    console.error('Error al crear el pedido:', error); // Mostrar el error completo
    res.status(500).json({ error: 'Error al procesar el pedido' });
  }
};
// Obtener pedidos, opcionalmente filtrados por usuario
exports.obtenerPedidos = async (req, res) => {
  const { usuarioId } = req.query;

  try {
    const pedidos = await Pedido.obtenerPedidos(usuarioId);

    if (!Array.isArray(pedidos) || pedidos.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron pedidos' });
    }

    res.status(200).json(pedidos);
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
};
