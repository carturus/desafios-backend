const express = require('express');
const ejerciosRouter = express.Router();
const { fork } = require('child_process');
const numCPUs = require('os').cpus().length;
const { randomEjercicio} = require('../api/ejercicios');
const {loggerConsola,loggerWarn,loggerError}= require('../utils/loggers');


//Ruta info
ejerciosRouter.get('/info', (req, res) => {
    let info = {
      argumentos: process.argv,
      plataforma: process.platform,
      version: process.version,
      pid: process.pid,
      path: process.execPath,
      memoria: process.memoryUsage(),
      carpeta: process.cwd(),
      CPUS: numCPUs
    }
  
    res.json(info)
  })
  
  //ruta random
  ejerciosRouter.get('/random', (req, res) => {
   console.log(randomEjercicio(req.query.cant))
    res.json(randomEjercicio(req.query.cant))
  
  })
  
  module.exports = ejerciosRouter;