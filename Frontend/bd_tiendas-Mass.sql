create database ecommerce
use ecommerce
 
CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT
);

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  descripcion TEXT,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  imagen VARCHAR(255),
  categoria_id INT,  -- Cambio de 'categoria' a 'categoria_id' para hacer referencia a 'categorias'
  stock INT DEFAULT 0,
  estado BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)  -- Relación con la tabla 'categorias'
    ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  contraseña VARCHAR(255) NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  total DECIMAL(10,2),
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  estado VARCHAR(20) DEFAULT 'pendiente',
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE detalle_pedido (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT,
  producto_id INT,
  cantidad INT,
  precio_unitario DECIMAL(10,2),
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);

INSERT INTO categorias (nombre, descripcion) VALUES
('Abarrotes', 'Productos de abarrotes variados'),
('Bebidas', 'Bebidas alcohólicas y no alcohólicas'),
('Lácteos', 'Productos lácteos como leche, quesos y yogures'),
('Confitería', 'Dulces, chocolates y golosinas'),
('Panadería', 'Pan y productos de panadería'),
('Piqueos', 'Snacks y aperitivos'),
('Limpieza', 'Productos para limpieza del hogar'),
('Cuidado Personal', 'Productos de higiene y cuidado personal');


INSERT INTO productos (nombre, precio, descripcion, imagen, categoria_id, stock, estado) VALUES
-- Abarrotes (id=1)
('Arroz Blanco 1kg', 3.50, 'Arroz de calidad premium, paquete de 1 kilogramo', NULL, 1, 100, TRUE),
('Aceite Vegetal 1L', 7.20, 'Aceite vegetal para cocina, botella de 1 litro', NULL, 1, 75, TRUE),

-- Bebidas (id=2)
('Gaseosa Cola 2L', 5.00, 'Bebida gaseosa sabor cola, botella de 2 litros', NULL, 2, 50, TRUE),
('Jugo de Naranja 1L', 4.50, 'Jugo natural de naranja, botella de 1 litro', NULL, 2, 60, TRUE),

-- Lácteos (id=3)
('Leche Entera 1L', 4.20, 'Leche entera pasteurizada, botella de 1 litro', NULL, 3, 80, TRUE),
('Yogurt Natural 500g', 3.80, 'Yogurt natural sin azúcar, envase de 500 gramos', NULL, 3, 90, TRUE),

-- Confitería (id=4)
('Chocolate Negro 70%', 7.00, 'Chocolate amargo con 70% de cacao', NULL, 4, 40, TRUE),
('Caramelos Menta 200g', 2.50, 'Caramelos sabor menta, paquete de 200 gramos', NULL, 4, 70, TRUE),

-- Panadería (id=5)
('Pan Francés', 1.00, 'Pan fresco francés, unidad', NULL, 5, 200, TRUE),
('Torta de Chocolate', 15.00, 'Torta casera de chocolate, 1 kg aprox.', NULL, 5, 30, TRUE),

-- Piqueos (id=6)
('Papas Fritas Bolsa 150g', 3.00, 'Snack de papas fritas en bolsa de 150 gramos', NULL, 6, 60, TRUE),
('Maní Salado 100g', 2.20, 'Maní tostado y salado, paquete de 100 gramos', NULL, 6, 80, TRUE),

-- Limpieza (id=7)
('Detergente Líquido 1L', 6.50, 'Detergente líquido para ropa, botella de 1 litro', NULL, 7, 30, TRUE),
('Limpiador Multiusos 500ml', 4.00, 'Limpiador multiusos para superficies, spray de 500 ml', NULL, 7, 50, TRUE),

-- Cuidado Personal (id=8)
('Champú Suave 400ml', 8.00, 'Champú para todo tipo de cabello, botella de 400 ml', NULL, 8, 45, TRUE),
('Pasta Dental 100ml', 3.50, 'Pasta dental con flúor, tubo de 100 ml', NULL, 8, 90, TRUE);


SELECT * FROM usuarios;
select * from categorias
select * from pedidos
select * from productos

SELECT * FROM productos WHERE id = 1;



