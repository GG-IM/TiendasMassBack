import { Router } from "express";
import { obtenerMetodosPago } from "../controllers/metodopago.controller";

const router = Router();

router.get("/", obtenerMetodosPago);

export default router;
