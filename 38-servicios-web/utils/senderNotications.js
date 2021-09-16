const dotenv = require('dotenv');
dotenv.config();

//NODE MAILER
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
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});


const sendMail=(operation,profileFacebook)=>{
 let fecha= new Date().toLocaleString('en-US')
  let mailOptions = {
    from: 'Servidor Node.js',
    to: process.env.MAIL,
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
  
transporterEtheral.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err)
    return err
  }
  //console.log(info)
  console.log(profile)
});

transporterGmail.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err)
    return err
  }
  console.log(info)
});

}
//SMS TWILIO
// const accountSid = process.env.ACCOUNT_SID;
// const authToken = process.env.AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken); 
 
const sendSMS=(mensaje)=>{
// client.messages 
//       .create({ 
//          body: `Usuario: ${mensaje.author.name} Fecha:${mensaje.date} Texto:${mensaje.text}`,  
//          messagingServiceSid: 'MG9baeec677239b2550463dc58c9804181',      
//          to: process.env.MOVIL
//        }) 
//       .then(message => console.log(message.sid)) 
//       .done();
console.log(mensaje.author.name)
      }

      module.exports={sendMail,sendSMS}