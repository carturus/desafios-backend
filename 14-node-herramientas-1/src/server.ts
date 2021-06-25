import express,{Application,Request,Response,NextFunction,ErrorRequestHandler} from 'express';

const app: Application =express();
const http = require('http').Server(app);


app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send(`<h1 style="color:red;"> Bienvenido al servidor de Express con typscript</h1>`);
})


const PORT = process.env.PORT || 8080;


const server = http.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});