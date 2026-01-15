create database ProyectoECommerce;
use ProyectoECommerce;

create table Cliente (
id_Cliente int auto_increment primary key,
nombre_Cliente varchar (50) not null,
apellido_Cliente varchar (50) not null,
contrasena_Cliente varchar (50)not null,
tel_Cliente numeric not null,
correo_Cliente varchar (50) not null,
direccion_Cliente varchar (50) not null,
ciudad_Cliente varchar (50) not null
);

create table Pedidos (
id_Pedido int auto_increment primary key,
valor_Pedido decimal not null,
fecha_Pedido date not null,
id_FK_Cliente_Pedido int,
foreign key (id_FK_Cliente_Pedido) references Cliente (id_Cliente),
transportadora_Pedido varchar (50),
No_Guia_Pedido varchar(20)
);

create table Producto(
id_Producto int auto_increment primary key,
nombre_Producto varchar (50) not null,
precio_Producto decimal not null,
descripcion_Producto text not null,
categoria_Producto varchar (30) not null,
stock_Producto int not null
);

create table DetallePedido(
id_DetallePedido int auto_increment primary key,
id_Producto_DTPedido int,
foreign key (id_Producto_DTPedido) references Producto(id_Producto),
id_Pedido_DTPedido int,
foreign key (id_Pedido_DTPedido) references Pedidos (id_Pedido),
cantidad_DTPedido int not null,
subTotal_DTPedido decimal not null
);