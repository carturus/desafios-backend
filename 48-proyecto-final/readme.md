# Proyecto Final Backend CoderHouse

Se realizo un store con Mongo, Express y Node Js. Para froten se utlizó el motor de plantillas handlebars.

## Autenticación y autorización
La autenticación se realizo con passport(estrategia local), mientras que la autorización se implEmento con JWT, el cual es guardado en una cookie "AUTH".

## Endpoints

http://localhost:8089/productos/listar
http://localhost:8089/productos/buscar/:id_producto
http://localhost:8089/productos/guardar/
http://localhost:8089/productos/actualizar/:id_producto
http://localhost:8089/productos/borrar/:id_producto

http://localhost:8089/carrito/listar
http://localhost:8089/carrito/buscar/:correo_usuario
http://localhost:8089/carrito/guardar/:correo_usuario
http://localhost:8089/carrito/actualizar/:correo_usuario
http://localhost:8089/carrito/borrar/:correo_usuario

http://localhost:8089/ordenes/listar
http://localhost:8089/ordenes/buscar/:id_orden
http://localhost:8089/ordenes/guardar/:correo_usuario
http://localhost:8089/ordenes/actualizar/:id_orden
http://localhost:8089/ordenes/borrar/:id_orden

## Flujo de trabajo

Los usuarios  hacen login en la ruta http://localhost:8089/auth/login, si son correctas las credenciales se genera jwt y almacena en cookie auth(tambien se pueden enviar el toke por headers) para la autorización de ingreso a los demás rutas.
Los usuarios pueden ver  y agregar en su carrito todos los productos.Los carritos estan ligados por el correo eletrónico del usuario y se eliminan una vez confirma la orden de compra.
Los usuarios pueden hacer checkout del carrito, lo cual genera una orden que al confirmarla se envia lo datos de esta al correo configurado.

## Variables de entorno
Se tiene 2 archivos; developmenet.env y production.env. Que guardan confirguraciones para el despliegue d ela aplicacion:
    "dev": "cross-env NODE_ENV=development node server.js --port=8088"
    "prod": "cross-env NODE_ENV=production node server.js --port=8089"
npm run dev->para development
npm run prod ->produccion    