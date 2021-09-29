const express = require('express');
const authRouter = express.Router();
const {sendMail}=require('../utils/senderNotications')
const {getProfileFacebook}=require('../utils/profileFacebook')
const passport= require('passport');

//Login
authRouter.get('/', (req, res) => {
    res.render('login')
  })
  authRouter.get('/login', (req, res) => {
    res.render('login')
  })
  authRouter.get('/loginfailed', (req, res) => {
    res.render('loginfailed')
  })
  
  authRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
  
  authRouter.get('/facebook/callback', passport.authenticate('facebook',
    {
      successRedirect: '/inicio',
      failureRedirect: '/auth/loginfailed'
    }
  ));
  //Logout
  authRouter.get('/logout', (req, res) => {
    sendMail('logout',getProfileFacebook())
    req.logout()
    res.render('login')
  })
  
module.exports = authRouter;