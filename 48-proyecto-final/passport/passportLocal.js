//  PASSPORT
const passport = require('passport');
const bCrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('../models/models');
const sender= require('../utils/notification')
const {loggerConsola,loggerWarn,loggerError}= require('../utils/loggers')



passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) { 
    // check in mongo if a user with username exists or not
    User.findOne({ 'username' :  username }, 
      function(err, user) {
        if (err){ 
          loggerError.error('Error in Login: '+err);
          return done(err); }
          
        if (!user){
          loggerWarn.warn('User Not Found with username '+username)
          return done(null, false,                 
            console.log('message', 'User Not found.'));                 
          }
        if (!isValidPassword(user, password)){
          loggerWarn.warn('Invalid Password')
          return done(null, false,console.log('message', 'Invalid Password'));
          }
        return done(null, user);
      }
    );
  })
);

var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
  }

  passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {

    findOrCreateUser = function(){
      User.findOne({'username':username},function(err, user) {
        // En caso de error
        if (err){
          loggerError.error('Error in SignUP: '+err); 
          return done(err);
        }
        // Si exite el usuaio
        if (user) {
          loggerConsola.info('El usuario existe');
          return done(null, false,console.log('message','User Already Exists'));
        } else {
          // Si no existe,cre usuario
          var newUser = new User();
          // Seteo nuevas credenciales
          newUser.username = username;
          newUser.password = createHash(password);
          newUser.mail= req.body.mail;
          newUser.nombre = req.body.nombre;
          newUser.direccion =req.body.direccion;
          // Guardo nuevo usuario
          newUser.save(function(err) {
            if (err){
              loggerError.error('Error in Saving user: '+err);  
              throw err;  
            }
            sender.sendNotificationRegistro(newUser)
            loggerConsola.info('User Registration succesful',newUser);   
            return done(null, newUser);
          });
        }
      });
    }
    process.nextTick(findOrCreateUser);
  })
)
  // Generates hash using bCrypt
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
   
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
