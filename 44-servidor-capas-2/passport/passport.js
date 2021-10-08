const config = require('../config.js');
const {sendMail} = require('../utils/senderNotications');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const {setProfileFacebook}=require('../utils/profileFacebook')
//FACEBOOK
let clientID=config.FACEBOOK_CLIENT_ID;
let clientSecret=config.FACEBOOK_CLIENT_SECRET;
let transporter=config.TRASNPORTER;

passport.use(new FacebookStrategy({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'name', 'displayName', 'picture.type(large)', 'emails'],
  scope: ['email']
}, function (accessToken, refreshToken, profile, done) {
  
     sendMail('login',setProfileFacebook(profile),transporter)
  return done(null, profile);
}));

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
