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
// Obtener usuario por ID
export const getUsuarioById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const usuario = await usuarioRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['estado'],
    });

    if (!usuario) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    res.json({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      direccion: usuario.direccion,
      telefono: usuario.telefono,
      ciudad: usuario.ciudad,
      codigoPostal: usuario.codigoPostal,
      estado: usuario.estado.nombre,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Registrar nuevo usuario
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, email, password, direccion, estadoId, telefono, ciudad, codigoPostal } = req.body;


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
      telefono,
      ciudad,
      codigoPostal,
    });


    const usuarioGuardado = await usuarioRepository.save(nuevoUsuario);

    res.status(201).json({
      id: usuarioGuardado.id,
      nombre: usuarioGuardado.nombre,
      email: usuarioGuardado.email,
      direccion: usuarioGuardado.direccion,
      telefono: usuarioGuardado.telefono,
      ciudad: usuarioGuardado.ciudad,
      codigoPostal: usuarioGuardado.codigoPostal,
      estado: usuarioGuardado.estado.nombre,
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
      direccion: usuario.direccion,
      telefono: usuario.telefono,
      ciudad: usuario.ciudad,
      codigoPostal: usuario.codigoPostal,
      estado: usuario.estado.nombre,
    });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
// Actualizar 
export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { nombre, direccion, telefono, ciudad, codigoPostal, estadoId } = req.body;

    const usuario = await usuarioRepository.findOne({
      where: { id: parseInt(id, 10) },
      relations: ['estado'],
    });

    if (!usuario) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    if (estadoId !== undefined) {
      const estado = await estadoRepository.findOneBy({ id: estadoId });
      if (!estado) {
        res.status(400).json({ message: 'Estado no válido' });
        return;
      }
      usuario.estado = estado;
    }

    if (nombre !== undefined) usuario.nombre = nombre;
    if (direccion !== undefined) usuario.direccion = direccion;
    if (telefono !== undefined) usuario.telefono = telefono;
    if (ciudad !== undefined) usuario.ciudad = ciudad;
    if (codigoPostal !== undefined) usuario.codigoPostal = codigoPostal;

    const usuarioActualizado = await usuarioRepository.save(usuario);

    res.json({
      message: 'Perfil actualizado correctamente',
      usuario: {
        id: usuarioActualizado.id,
        nombre: usuarioActualizado.nombre,
        email: usuarioActualizado.email,
        direccion: usuarioActualizado.direccion,
        telefono: usuarioActualizado.telefono,
        ciudad: usuarioActualizado.ciudad,
        codigoPostal: usuarioActualizado.codigoPostal,
        estado: usuarioActualizado.estado.nombre,
      }
    });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
