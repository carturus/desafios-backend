"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var http = require('http').Server(app);
app.get('/', function (req, res, next) {
    res.send("<h1 style=\"color:red;\"> Bienvenido al servidor de Express con typscript</h1>");
});
var PORT = process.env.PORT || 8080;
var server = http.listen(PORT, function () {
    console.log("servidor escuchando en http://localhost:" + PORT);
});
