const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const upload=require('../middleware/upload')
const {loggerWarn}= require('../utils/logers')

//Sign UP
authRouter.get('/signup',(req,res)=>{ 
  res.render('signup')
}) 
authRouter.post('/signup',upload.single('foto') ,passport.authenticate('signup', { failureRedirect: '/auth/signupfailed' }),(req,res)=>{
  res.redirect('/auth/login')  
});
authRouter.get('/signupfailed',(req,res)=>{
res.render('signupfailed')
})

//Login
authRouter.get('/', (req, res) => {
    res.render('login')
  })
  authRouter.get('/login', (req, res) => {
    res.render('login')
  })
  authRouter.post('/login',  passport.authenticate('login', { failureRedirect: '/auth/loginfailed' }), (req,res)=>{
    res.redirect('/home')
  });

  authRouter.get('/loginfailed', (req, res) => {
    res.render('loginfailed')
  })
//Logout
authRouter.get('/logout', (req, res) => {
    req.logout()
    res.render('login')
  })
  
  authRouter.get('/inicio', (req, res) => {
    if (req.isAuthenticated()) {
      res.sendFile(__dirname + '/public/index.html');
    }
    else {
      loggerWarn.warn('user NO logueado');
      res.render('login');
    }
  })

  module.exports = authRouter;