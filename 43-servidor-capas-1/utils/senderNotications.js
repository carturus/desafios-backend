
const config = require('../config');
const nodemailer = require('nodemailer');

const transporterEtheral = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'selmer.zulauf75@ethereal.email',
    pass: 'y6ujad7EnbPQumZNAU'
  }
});

const transporterGmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.GMAIL_USER,
    pass: config.GMAIL_PASS
  }
});


const sendMail=(operation,profileFacebook,transporter)=>{
 let fecha= new Date().toLocaleString('en-US')
  let mailOptions = {
    from: 'Servidor Node.js',
    to: config.MAIL,
    subject: profileFacebook.name+" "+operation+"a las"+fecha,
    html: `<h1 style="color: blue;">${operation} sesion facebook <span style="color: green;"> 
    <br>correo: ${profileFacebook.mail}
    <br>usuario: ${profileFacebook.name} a las ${fecha}
    </span></h1>`,
    attachments: [
      {   // filename and content type is derived from path
        path: 'imagenProfile.jpeg'
      }
    ]
  }
 if(transporter=='ETHEREAL') {
transporterEtheral.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err)
    return err
  }
  console.log(info)
});
 }
 else{
transporterGmail.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err)
    return err
  }
  console.log(info)
});
 }
}
//SMS TWILIO
const accountSid = config.ACCOUNT_SID;
const authToken = config.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken); 
 
const sendSMS=(mensaje)=>{
  console.log("soy el token",authToken)
client.messages 
      .create({ 
         body: `Usuario: ${mensaje.author.name} Fecha:${mensaje.date} Texto:${mensaje.text}`,  
         messagingServiceSid: 'MG9baeec677239b2550463dc58c9804181',      
         to: config.MOVIL
       }) 
      .then(message => console.log(message.sid)) 
      .done();
      
      }

      module.exports={sendMail,sendSMS}