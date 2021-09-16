const passport= require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const dotenv = require('dotenv');
dotenv.config();

let clientID = process.argv[2]
let clientSecret = process.argv[3]
const setFacebook = (pClienteID, pClientSecret) => {
  pClienteID ? clientID = pClienteID : clientID = process.env.FACEBOOK_CLIENT_ID
  pClientSecret ? clientSecret = pClientSecret : clientSecret = process.env.FACEBOOK_CLIENT_SECRET
}
setFacebook(clientID, clientSecret)
const {setProfileFacebook,getProfileFacebook}=require('./utils/profileFacebook')
module.exports = function (){


passport.use(new FacebookStrategy({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'name', 'displayName', 'picture.type(large)', 'emails'],
  scope: ['email']
}, function (accessToken, refreshToken, profile, done) {
  
     sendMail('login',setProfileFacebook(profile))
  return done(null, profile);
}));

}
