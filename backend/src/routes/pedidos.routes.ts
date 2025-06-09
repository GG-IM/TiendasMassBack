import { Router } from "express";
import { crearPedido,obtenerPedidos,obtenerPedidoPorId,actualizarEstadoPedido,eliminarPedido } from "../controllers/pedido.controller";
import { pagarPedido } from "../controllers/pagarpedio.controller";
const router = Router();

router.post("/", crearPedido);
router.get("/", obtenerPedidos);
router.get("/:id", obtenerPedidoPorId);
router.put("/:id", actualizarEstadoPedido);
router.delete("/:id", eliminarPedido);

router.post("/pagar", pagarPedido);


export default router;
