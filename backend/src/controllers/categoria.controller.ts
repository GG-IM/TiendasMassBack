import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source'; // Ajusta la ruta según tu configuración
import { Categoria } from '../entities/Categoria.entity'; // Ajusta la ruta según tu estructura

export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryRepository = AppDataSource.getRepository(Categoria);
    const categories = await categoryRepository.find();
    res.json(categories);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    res.status(500).json({ message: errorMessage });
  }
};

// Opcional: Otros métodos CRUD que podrías necesitar
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const categoryRepository = AppDataSource.getRepository(Categoria);
    const category = await categoryRepository.findOne({ 
      where: { id: parseInt(id) },
      relations: ['productos'] // Incluye los productos relacionados si los necesitas
    });
    
    if (!category) {
      res.status(404).json({ message: 'Categoría no encontrada' });
      return;
    }
    
    res.json(category);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    res.status(500).json({ message: errorMessage });
  }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, descripcion } = req.body;
    const categoryRepository = AppDataSource.getRepository(Categoria);
    
    const newCategory = categoryRepository.create({
      nombre,
      descripcion
    });
    
    const savedCategory = await categoryRepository.save(newCategory);
    res.status(201).json(savedCategory);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    res.status(500).json({ message: errorMessage });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const categoryRepository = AppDataSource.getRepository(Categoria);
    
    const category = await categoryRepository.findOne({ where: { id: parseInt(id) } });
    
    if (!category) {
      res.status(404).json({ message: 'Categoría no encontrada' });
      return;
    }
    
    category.nombre = nombre || category.nombre;
    category.descripcion = descripcion || category.descripcion;
    
    const updatedCategory = await categoryRepository.save(category);
    res.json(updatedCategory);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    res.status(500).json({ message: errorMessage });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const categoryRepository = AppDataSource.getRepository(Categoria);
    
    const category = await categoryRepository.findOne({ where: { id: parseInt(id) } });
    
    if (!category) {
      res.status(404).json({ message: 'Categoría no encontrada' });
      return;
    }
    
    await categoryRepository.remove(category);
    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    res.status(500).json({ message: errorMessage });
  }
};