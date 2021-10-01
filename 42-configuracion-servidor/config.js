
const dotenv = require('dotenv')
const path = require('path');
dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
  });

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST || '127.0.0.1',  
    PERSISTENCIA: process.env.PERSISTENCIA,     
    MONGO:process.env.MONGO,
    MODO:process.env.MODO,
    TRASNPORTER: process.env.TRASNPORTER,
    GMAIL_USER:process.env.GMAIL_USER,
    GMAIL_PASS:process.env.GMAIL_PASS,
    MAIL:process.env.MAIL,
    ACCOUNT_SID:process.env.ACCOUNT_SID,
    AUTH_TOKEN:process.env.AUTH_TOKEN,
    MOVIL:process.env.MOVIL,
    FACEBOOK_CLIENT_ID:process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET:process.env.FACEBOOK_CLIENT_SECRET,
      
}
