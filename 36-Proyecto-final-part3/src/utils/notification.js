const {loggerConsola,loggerError}= require('../utils/logers')
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken); 
const transporterGmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:process.env.GMAIL_USER,
    pass:  process.env.GMAIL_PASS
  }
});

const sendNotificationCompra=(items,user)=>{
 
 let fecha= new Date().toLocaleString('en-US')
 let listahtml= items.reduce(function(a, b) {
  return a + '<tr><td>' + b.producto.nombre + '</td><td>' + b.producto.descripcion + '</td><td>' + b.producto.precio + '</td></tr>';
}, '');
let lista= items.reduce(function(a, b) {
  return a+"*"+ b.producto.nombre+" "+b.producto.descripcion+" "+ b.producto.precio+"\n" ;
}, '');
  let mailOptions = {
    from: 'Servidor Node.js',
    to: user.correo,
    subject: "Compra realizada en CarturuStore "+fecha,
    html: `<div><h1>${user.nombre} tu pedio esta listo</h1> <p>${listahtml}</p></div>`,
    attachments: [
      {   // filename and content type is derived from path
        path: './public/avatar.png'
      }
    ]
  }
  
transporterGmail.sendMail(mailOptions, (err, info) => {
  if (err) {
    loggerError.error(err)
    return err
  }
  loggerConsola.info(info)
});

//SMS TWILIO
client.messages 
.create({ 
   body: `Hola ${user.nombre} Tu pedido esta listo \n ${lista}`,
   from: 'whatsapp:+14155238886',       
   to: `whatsapp:+${user.telefono}` 
 }) 
.then(message => loggerConsola.info(message.sid)).catch(error=>loggerError.error(error))  
.done();
}

const sendNotificationRegistro=(user)=>{
  let fecha= new Date().toLocaleString('en-US')

   let mailOptions = {
     from: 'Servidor Node.js',
     to: user.correo,
     subject: `Cuenta creada ${user.nombre} alas ${fecha}`,
     html: `<div><h1>Registro ${user.nombre}</h1>
     <p>Correo ${user.correo}</p>
     <p>Telefono ${user.telefono}</p>
     <p>Edad ${user.edad}</p>
     <p>Direccion ${user.direccion}</p>`,
     attachments: [
       {   // filename and content type is derived from path
         path: './public/avatar.png'
       }
     ]
   }
   
 transporterGmail.sendMail(mailOptions, (err, info) => {
   if (err) {
    loggerError.error(err)
     return err
   }
   loggerConsola.info(info)
 });
 }

module.exports = {sendNotificationCompra,sendNotificationRegistro}

