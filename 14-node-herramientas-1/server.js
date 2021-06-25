'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// protejo el servidor ante cualquier excepcion no atrapada
app.use(function (err, req, res, next) {
    console.error(err.message);
    return res.status(500).send('Algo se rompio!');
});

app.get('/', function (req, res) {

    res.send('<h1 style="color:blue;"> Bienvenido al servidor de Express con  Babel</h1>');
});

var PORT = process.env.PORT || 8080;

var server = http.listen(PORT, function () {
    console.log('servidor escuchando en http://localhost:' + PORT);
});
