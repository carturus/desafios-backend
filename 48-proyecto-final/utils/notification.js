const {loggerConsola,loggerError}= require('./loggers')
const nodemailer = require('nodemailer');
const config = require('../config');

const transporterEtheral= nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'kelley.adams@ethereal.email',
      pass: 'kqu6DkknPmpCSQwf3R'
  }
});

const transporterGmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.GMAIL_USER,
    pass: config.GMAIL_PASS
  }
});

const sendNotificationCompra=(items,user)=>{
 let fecha= new Date().toLocaleString('en-US')
 let listahtml= items.reduce(function(a, b) {
  return a + '<tr><td>' + b.title+ '</td><td>' + b.price+ '</td></tr>';
}, '');
  let mailOptions = {
    from: 'Servidor Node.js',
    to: config.MAIL,
    subject: "Compra realizada en CarturuStore "+fecha,
    html: `<div><h1>${user} tu pedio esta listo</h1> <p>${listahtml}</p></div>`,
  }
  
transporterEtheral.sendMail(mailOptions, (err, info) => {
  if (err) {
    loggerError.error(err)
    return err
  }
  loggerConsola.info(info)
});
transporterGmail.sendMail(mailOptions, (err, info) => {
  if (err) {
   loggerError.error(err)
    return err
  }
  loggerConsola.info(info)
});
 

}

const sendNotificationRegistro=(user)=>{
  let fecha= new Date().toLocaleString('en-US')

   let mailOptions = {
     from: 'Servidor Node.js',
     to: config.MAIL,
     subject: `Cuenta creada ${user.nombre} alas ${fecha}`,
     html: `<div><h1>Registro ${user.nombre}</h1>
     <p>Correo ${user.mail}</p>
     <p>Direccion ${user.direccion}</p>`,

   }
   
 transporterEtheral.sendMail(mailOptions, (err, info) => {
   if (err) {
    loggerError.error(err)
     return err
   }
   loggerConsola.info(info)
 });

 transporterGmail.sendMail(mailOptions, (err, info) => {
  if (err) {
   loggerError.error(err)
    return err
  }
  loggerConsola.info(info)
});
 

 }

module.exports = {sendNotificationCompra,sendNotificationRegistro}

