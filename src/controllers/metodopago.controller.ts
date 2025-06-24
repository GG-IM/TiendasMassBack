import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { MetodoPago } from "../entities/MetodoPago.entity";

export const obtenerMetodosPago = async (req: Request, res: Response): Promise<Response> => {
    try {
        const metodoPagoRepo = AppDataSource.getRepository(MetodoPago);
        const metodosPago = await metodoPagoRepo.find();
        return res.json(metodosPago);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al obtener métodos de pago" });
    }
};
