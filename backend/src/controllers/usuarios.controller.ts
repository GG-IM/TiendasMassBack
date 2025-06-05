import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../config/data-source';
import { Usuario } from '../entities/Usuario.entity';
import { Estado } from '../entities/Estado.entity';

const usuarioRepository = AppDataSource.getRepository(Usuario);
const estadoRepository = AppDataSource.getRepository(Estado);

// Obtener todos los usuarios
export const getAllUsuarios = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarios = await usuarioRepository.find({
      relations: ['estado'], // Incluye el estado en la respuesta
    });
    res.json(usuarios);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Registrar nuevo usuario
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, email, password, direccion, estadoId } = req.body;

    const usuarioExistente = await usuarioRepository.findOneBy({ email });
    if (usuarioExistente) {
      res.status(400).json({ message: 'El usuario ya existe' });
      return;
    }

    const estado = await estadoRepository.findOneBy({ id: estadoId });
    if (!estado) {
      res.status(400).json({ message: 'Estado no válido' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = usuarioRepository.create({
      nombre,
      email,
      password: hashedPassword,
      direccion,
      estado,
    });

    const usuarioGuardado = await usuarioRepository.save(nuevoUsuario);

    res.status(201).json({
      id: usuarioGuardado.id,
      nombre: usuarioGuardado.nombre,
      email: usuarioGuardado.email,
      estado: usuarioGuardado.estado.nombre, // Ajusta esto según el campo real de Estado
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Iniciar sesión
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const usuario = await usuarioRepository.findOne({
      where: { email },
      relations: ['estado'],
    });

    if (!usuario) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      res.status(401).json({ message: 'Contraseña incorrecta' });
      return;
    }

    res.json({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      estado: usuario.estado.nombre,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
