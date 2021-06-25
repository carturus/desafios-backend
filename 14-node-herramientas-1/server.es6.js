const express = require('express');
const app = express();
const http = require('http').Server(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





// protejo el servidor ante cualquier excepcion no atrapada
app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Algo se rompio!');
});



app.get('/',(req,res)=>{

    res.send(`<h1 style="color:blue;"> Bienvenido al servidor de Express con  Babel</h1>`)
})

const PORT = process.env.PORT || 8080;


const server = http.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});
