import express from 'express'
import fs from 'fs'

const app=express()
const pto= 8090
let visitas= { items: 0, item: 0 }



const leer = async (random) =>{
    try {
        const contenido = await fs.promises.readFile('./productos.txt', 'utf-8')
        const arrayItems = JSON.parse(contenido)
        const cantidadItems =arrayItems.length;
       if(random){
     return JSON.stringify({productos: arrayItems, cantidad: cantidadItems})
       }else{
       return JSON.stringify( {item: arrayItems[0]} )
       }

    } catch (e) {
        console.error("The Promise is rejected!", e)
    }
}


const server=app.listen(pto,()=>{
    console.log(`Servidor inicializado ${server.address().port}`)
})

app.get('/',(req,res)=>{

    res.send(`<h1 style="color:blue;"> Bienvenido al servidor de Express</h1>`)
})
app.get('/items',(req,res)=>{
    visitas.items++
    res.send(`<h1>${items}</h1>`)
})

app.get('/item-random',(req,res)=>{
    visitas.item++
    res.send(`<h1>${itemRandom}</h1>`)
})

app.get('/visitas',(req,res)=>{

    res.send(`<h1 style="color:blue;"> ${JSON.stringify(visitas)}</h1>`)
})


const itemRandom = await leer()
const items= await leer(1)
server.on('error',error=>console.log(`Error en servidor ${error}`))