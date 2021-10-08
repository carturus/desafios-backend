//Seccion mensajes
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const items = require('../api/productos');
const {normalize,schemaMensaje} =require('../utils/normalizr')
const { Mensaje } = require('../models/models');
const {sendSMS}=require('../utils/senderNotications')
const socketMensajes=()=>{ io.on('connection', socket => {
    socket.emit('mi mensaje', 'este es mi mensaje desde el servidor');
    try {
      //Productos socket
      socket.on('update', async function () {
        try {
          let productos = await items.vista()
          io.sockets.emit('productos', productos);
        }
        catch (e) {
          console.log("Error socket servidor", e)
        }
      })
      /* Envio los mensajes al cliente que se conectó */
      socket.on('new-message', async function (message) {
        try {
          //send SMS
          message.text.toUpperCase().includes("ADMINISTRADOR")&&sendSMS(message)
          await Mensaje.create(message)
          const arrayData = await Mensaje.find({})
          const dataMensajes = { id: 1000, nombre: 'Centro de mensajes', posts: arrayData }
          const normalizedMensajes = normalize(JSON.parse(JSON.stringify(dataMensajes, null, 3)), schemaMensaje)
          io.sockets.emit('messages', normalizedMensajes);
        }
        catch {
          console.log("no se pudieron guardar mensajes")
        }
      });
    } catch {
      console.log("no se pudieron guardar mensajes")
    }
  });
}

module.exports={socketMensajes}