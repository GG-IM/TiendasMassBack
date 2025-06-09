import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source'; // Ajusta la ruta según tu estructura
import { Producto } from '../entities/Producto.entity';
import { Categoria } from '../entities/Categoria.entity';
import { Estado } from '../entities/Estado.entity';

// Interfaces para tipado
interface ProductCreateRequest {
  nombre: string;
  marca?: string;
  precio: number;
  descripcion?: string;
  stock?: number;
  estado?: boolean;
  categoria_id: number;
}

interface ProductUpdateRequest {
  nombre?: string;
  marca?: string;
  precio?: number;
  descripcion?: string;
  imagen?: string;
  stock?: number;
  estado?: boolean;
  categoria_id?: number;
}

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export class ProductController {
  private productRepository: Repository<Producto>;
  private categoryRepository: Repository<Categoria>;
  private estadoRepository: Repository<Estado>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Producto);
    this.categoryRepository = AppDataSource.getRepository(Categoria);
    this.estadoRepository = AppDataSource.getRepository(Estado);
  }

  // Función auxiliar para normalizar productos
  private normalizeProduct = (product: Producto) => {
    return {
      ...product,
      precio: Number(product.precio), // Asegurar que sea número
      stock: Number(product.stock),   // Asegurar que sea número
      categoria_id: product.categoria?.id,
      estado_nombre: product.estado?.nombre
    };
  };

  public getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const categoriaId = req.query.categoriaId as string;
      let products: Producto[];

      if (categoriaId) {
        products = await this.productRepository.find({
          where: { categoria: { id: parseInt(categoriaId) } },
          relations: ['categoria', 'estado']
        });
      } else {
        products = await this.productRepository.find({
          relations: ['categoria', 'estado']
        });
      }

      // Normalizar productos antes de enviar
      const normalizedProducts = products.map(this.normalizeProduct);
      res.json(normalizedProducts);
    } catch (error) {
      console.error('Error en getAllProducts:', error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Error interno del servidor' 
      });
    }
  };

  public getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID de producto inválido' });
        return;
      }

      const product = await this.productRepository.findOne({
        where: { id },
        relations: ['categoria', 'estado']
      });

      if (!product) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
      }

      // Normalizar producto antes de enviar
      const normalizedProduct = this.normalizeProduct(product);
      res.json(normalizedProduct);
    } catch (error) {
      res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Error interno del servidor' 
      });
    }
  };

  public createProduct = async (req: MulterRequest, res: Response): Promise<void> => {
    try {
      const { 
        nombre, 
        marca, 
        precio, 
        descripcion, 
        stock = 0, 
        estado = true, 
        categoria_id 
      }: ProductCreateRequest = req.body;

      // Validaciones básicas
      if (!nombre || !precio || !categoria_id) {
        res.status(400).json({ 
          message: 'Los campos nombre, precio y categoria_id son requeridos' 
        });
        return;
      }

      // Validar si la categoría existe
      const category = await this.categoryRepository.findOne({
        where: { id: categoria_id }
      });
      
      if (!category) {
        res.status(400).json({ message: 'Categoría no válida' });
        return;
      }

      // Buscar estado activo (asumiendo que existe un estado "activo")
      let estadoEntity = await this.estadoRepository.findOne({
        where: { nombre: estado ? 'activo' : 'inactivo' }
      });

      // Si no existe el estado, crear uno por defecto o usar el primero disponible
      if (!estadoEntity) {
        estadoEntity = await this.estadoRepository.findOne({});
        if (!estadoEntity) {
          res.status(500).json({ message: 'No se encontraron estados disponibles' });
          return;
        }
      }

      // Si hay imagen cargada, construir ruta; si no, dejar vacío
      const imagen = req.file ? `uploads/productos/${req.file.filename}` : '';

      // Crear el producto
      const newProduct = this.productRepository.create({
        nombre,
        marca,
        precio: parseFloat(precio.toString()),
        descripcion,
        imagen,
        stock: parseInt(stock.toString()),
        categoria: category,
        estado: estadoEntity
      });

      const savedProduct = await this.productRepository.save(newProduct);

      // Respuesta con tipos correctos
      res.status(201).json({
        id: savedProduct.id,
        nombre: savedProduct.nombre,
        marca: savedProduct.marca,
        precio: Number(savedProduct.precio), // Forzar como número
        descripcion: savedProduct.descripcion,
        imagen: savedProduct.imagen,
        stock: Number(savedProduct.stock),   // Forzar como número
        categoria_id: category.id,
        categoria: category,
        estado: estadoEntity,
        estado_nombre: estadoEntity.nombre
      });
    } catch (error) {
      console.error('Error en createProduct:', error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Error interno del servidor' 
      });
    }
  };

  public updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID de producto inválido' });
        return;
      }

      const { 
        nombre, 
        marca,
        precio, 
        descripcion, 
        imagen = '', 
        stock = 0, 
        estado = true, 
        categoria_id 
      }: ProductUpdateRequest = req.body;

      // Buscar el producto existente
      const existingProduct = await this.productRepository.findOne({
        where: { id },
        relations: ['categoria', 'estado']
      });

      if (!existingProduct) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
      }

      // Validar si la categoría existe (si se proporciona)
      let category = existingProduct.categoria;
      if (categoria_id && categoria_id !== existingProduct.categoria.id) {
        const newCategory = await this.categoryRepository.findOne({
          where: { id: categoria_id }
        });
        
        if (!newCategory) {
          res.status(400).json({ message: 'Categoría no válida' });
          return;
        }
        category = newCategory;
      }

      // Actualizar los campos proporcionados
      if (nombre !== undefined) existingProduct.nombre = nombre;
      if (marca !== undefined) existingProduct.marca = marca;
      if (precio !== undefined) existingProduct.precio = parseFloat(precio.toString());
      if (descripcion !== undefined) existingProduct.descripcion = descripcion;
      if (imagen !== undefined) existingProduct.imagen = imagen;
      if (stock !== undefined) existingProduct.stock = parseInt(stock.toString());
      if (categoria_id !== undefined) existingProduct.categoria = category;

      // Actualizar estado si es necesario
      if (estado !== undefined) {
        const estadoEntity = await this.estadoRepository.findOne({
          where: { nombre: estado ? 'activo' : 'inactivo' }
        });
        if (estadoEntity) {
          existingProduct.estado = estadoEntity;
        }
      }

      const updatedProduct = await this.productRepository.save(existingProduct);

      // Respuesta con tipos correctos
      res.json({
        id: updatedProduct.id,
        nombre: updatedProduct.nombre,
        marca: updatedProduct.marca,
        precio: Number(updatedProduct.precio), // Forzar como número
        descripcion: updatedProduct.descripcion,
        imagen: updatedProduct.imagen,
        stock: Number(updatedProduct.stock),   // Forzar como número
        categoria_id: updatedProduct.categoria.id,
        categoria: updatedProduct.categoria,
        estado: updatedProduct.estado,
        estado_nombre: updatedProduct.estado.nombre
      });
    } catch (error) {
      console.error('Error en updateProduct:', error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Error interno del servidor' 
      });
    }
  };

  public deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID de producto inválido' });
        return;
      }

      const result = await this.productRepository.delete(id);
      
      if (result.affected === 0) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error('Error en deleteProduct:', error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Error interno del servidor' 
      });
    }
  };
}

// Crear instancia del controlador
const productController = new ProductController();

// Exportar métodos para usar en las rutas
export const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = productController;