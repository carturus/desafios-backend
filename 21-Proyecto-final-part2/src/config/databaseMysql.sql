CREATE DATABASE ecommerce;
 
 USE ecommerce;
 
CREATE TABLE carrito (
  id INT  AUTO_INCREMENT,
  timestamp_carrito VARCHAR(100) NOT NULL,
  producto VARCHAR(1000) NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE productos (
  id INT  AUTO_INCREMENT,
  timestamp_producto VARCHAR(100) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  descripcion VARCHAR(100) NOT NULL,
  foto VARCHAR(100) NOT NULL,
  precio INT NOT NULL,
  stock INT NOT NULL,
   PRIMARY KEY(id)
);
