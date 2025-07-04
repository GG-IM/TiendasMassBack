import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source'; // Ajusta la ruta según tu configuración
import { Categoria } from '../entities/Categoria.entity'; // Ajusta la ruta según tu estructura
import { Estado } from '../entities/Estado.entity';

export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryRepository = AppDataSource.getRepository(Categoria);
    const categories = await categoryRepository.find({
      relations: ['estado', 'productos']
    });
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
      relations: ['productos', 'estado']
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
    const { nombre, descripcion, estado = true } = req.body;
    
    if (!nombre || !nombre.trim()) {
      res.status(400).json({ message: 'El nombre de la categoría es requerido' });
      return;
    }

    const categoryRepository = AppDataSource.getRepository(Categoria);
    const estadoRepository = AppDataSource.getRepository(Estado);

    // Buscar estado activo o inactivo según el valor recibido
    const estadoNombre = estado ? 'Activo' : 'Inactivo';
    let estadoEntity = await estadoRepository.findOne({
      where: { nombre: estadoNombre }
    });

    // Si no existe el estado específico, buscar cualquier estado disponible
    if (!estadoEntity) {
      console.log(`⚠️ Estado "${estadoNombre}" no encontrado, buscando estados disponibles...`);
      estadoEntity = await estadoRepository.findOne({});
      if (!estadoEntity) {
        res.status(500).json({ message: 'No se encontraron estados disponibles' });
        return;
      }
      console.log(`✅ Usando estado disponible: ${estadoEntity.nombre}`);
    } else {
      console.log(`✅ Estado encontrado: ${estadoEntity.nombre}`);
    }

    const newCategory = categoryRepository.create({
      nombre: nombre.trim(),
      descripcion: descripcion?.trim() || '',
      estado: estadoEntity
    });

    const savedCategory = await categoryRepository.save(newCategory);
    
    // Retornar con relaciones
    const categoryWithRelations = await categoryRepository.findOne({
      where: { id: savedCategory.id },
      relations: ['estado', 'productos']
    });
    
    res.status(201).json(categoryWithRelations);
  } catch (error) {
    console.error('Error en createCategory:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    res.status(500).json({ message: errorMessage });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, estado } = req.body;
    
    const categoryRepository = AppDataSource.getRepository(Categoria);
    const estadoRepository = AppDataSource.getRepository(Estado);
    
    const category = await categoryRepository.findOne({ 
      where: { id: parseInt(id) },
      relations: ['estado']
    });
    
    if (!category) {
      res.status(404).json({ message: 'Categoría no encontrada' });
      return;
    }
    
    // Actualizar campos básicos
    if (nombre !== undefined) category.nombre = nombre.trim();
    if (descripcion !== undefined) category.descripcion = descripcion?.trim() || '';
    
    // Actualizar estado si se proporciona
    if (estado !== undefined) {
      const estadoNombre = estado ? 'Activo' : 'Inactivo';
      const estadoEntity = await estadoRepository.findOne({
        where: { nombre: estadoNombre }
      });
      if (estadoEntity) {
        category.estado = estadoEntity;
        console.log(`✅ Estado actualizado a: ${estadoEntity.nombre}`);
      } else {
        console.log(`⚠️ Estado "${estadoNombre}" no encontrado, manteniendo estado actual`);
      }
    }
    
    const updatedCategory = await categoryRepository.save(category);
    
    // Retornar con relaciones
    const categoryWithRelations = await categoryRepository.findOne({
      where: { id: updatedCategory.id },
      relations: ['estado', 'productos']
    });
    
    res.json(categoryWithRelations);
  } catch (error) {
    console.error('Error en updateCategory:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    res.status(500).json({ message: errorMessage });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const categoryRepository = AppDataSource.getRepository(Categoria);
    
    const category = await categoryRepository.findOne({ 
      where: { id: parseInt(id) },
      relations: ['productos']
    });
    
    if (!category) {
      res.status(404).json({ message: 'Categoría no encontrada' });
      return;
    }
    
    // Verificar si tiene productos asociados
    if (category.productos && category.productos.length > 0) {
      res.status(400).json({ 
        message: 'No se puede eliminar la categoría porque tiene productos asociados' 
      });
      return;
    }
    
    await categoryRepository.remove(category);
    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    console.error('Error en deleteCategory:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    res.status(500).json({ message: errorMessage });
  }
};
