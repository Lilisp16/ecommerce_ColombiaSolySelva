use ProyectoECommerce;

INSERT INTO Cliente
(nombre_Cliente, apellido_Cliente, contrasena_Cliente, tel_Cliente, correo_Cliente, direccion_Cliente, ciudad_Cliente)
VALUES
('María', 'Gómez', 'maria123', 3001234567, 'maria.gomez@gmail.com', 'Cra 10 #15-20', 'Bogotá'),
('Juan', 'Pérez', 'juan456', 3109876543, 'juan.perez@hotmail.com', 'Cl 45 #20-30', 'Medellín'),
('Ana', 'Martínez', 'ana789', 3154567890, 'ana.martinez@yahoo.com', 'Av 5 #8-12', 'Cali'),
('Carlos', 'Rodríguez', 'carlos321', 3126549870, 'carlos.rod@gmail.com', 'Cl 30 #10-50', 'Barranquilla'),
('Laura', 'Torres', 'laura654', 3187412589, 'laura.torres@gmail.com', 'Cra 7 #22-18', 'Bucaramanga');


INSERT INTO Producto
(nombre_Producto, precio_Producto, descripcion_Producto, categoria_Producto, stock_Producto)
VALUES
('Mochila Wayuu', 180000, 'Mochila tejida a mano por artesanos Wayuu', 'Textiles', 25),
('Sombrero Vueltiao', 120000, 'Sombrero tradicional colombiano de caña flecha', 'Accesorios', 40),
('Collar de Chaquira', 45000, 'Collar artesanal elaborado con chaquiras', 'Joyería', 60),
('Hamaca Artesanal', 350000, 'Hamaca tejida a mano en algodón', 'Hogar', 15),
('Canasto de Palma', 80000, 'Canasto artesanal hecho con palma natural', 'Decoración', 30);

INSERT INTO Pedidos
(valor_Pedido, fecha_Pedido, id_FK_Cliente_Pedido, transportadora_Pedido, No_Guia_Pedido)
VALUES
(270000, '2025-01-02', 1, 'Servientrega', 'SG10001'),
(120000, '2025-01-03', 2, 'Interrapidísimo', 'IR20002'),
(395000, '2025-01-04', 3, 'Coordinadora', 'CO30003'),
(180000, '2025-01-05', 4, 'Servientrega', 'SG40004'),
(160000, '2025-01-06', 5, 'Envía', 'EN50005');

INSERT INTO DetallePedido
(id_Producto_DTPedido, id_Pedido_DTPedido, cantidad_DTPedido, subTotal_DTPedido)
VALUES
(1, 1, 1, 180000),
(3, 1, 2, 90000),
(2, 2, 1, 120000),
(4, 3, 1, 350000),
(3, 3, 1, 45000),
(1, 4, 1, 180000),
(5, 5, 2, 160000);

select * from DetallePedido;

