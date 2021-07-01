-- Creo la base
CREATE DATABASE prueba;

-- utilizo la base
use prueba;

-- creo una tabla en la base
CREATE TABLE items (
  id INT  AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  stock INT UNSIGNED,
   PRIMARY KEY(id)
);

-- Inserto datos
INSERT INTO items (nombre, categoria, stock) VALUES ("Fideos", "Harina",20);
INSERT INTO items (nombre, categoria, stock) VALUES ("Leche", "Lacteos",30);
INSERT INTO items (nombre, categoria, stock) VALUES ("Crema", "Harina",15);

-- Selcciona datos de tabla
SELECT * FROM items;

-- Borro dato item con id = 1
DELETE FROM items WHERE id=1;

-- Actualizo registro  con id = 2 a id=45
UPDATE items SET id=45 WHERE id=2;

-- Listar nuevos registros
SELECT * FROM items;










