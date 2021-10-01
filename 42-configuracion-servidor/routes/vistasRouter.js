const express = require('express');
const vistaRouter = express.Router();
const {getProfileFacebook}=require('../utils/profileFacebook')
const items = require('../api/productos');

vistaRouter.get('/inicio',(req, res) => {
      res.sendFile(process.cwd()+ '/public/index.html');
  })
  
  vistaRouter.get('/profile',(req, res) => {
      res.json(getProfileFacebook())
  })
  vistaRouter.get('/vista',async (req, res) => {
    res.render('vista', { productos: await items.vista() })
  })

  module.exports = vistaRouter;