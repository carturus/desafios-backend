const fs = require('fs');

const read = (archivo) =>{
    
    try {
        const raw = fs.readFileSync(archivo, 'utf-8')
        const arrayProductos = JSON.parse(raw)
        return(arrayProductos)
    } catch (e) {
        console.error("The Promise is rejected!", e)
    }
}

// const write= async (archivo)=>{
//     try {
//         const raw = fs.readFileSync(archivo,'utf-8')
//         const arrayProductos = JSON.parse(raw)
//         const cantidadProdcutos =arrayProductos.length;
//         console.log(arrayProductos)

//         return(arrayProductos)
//     } catch (e) {
//         console.error("The Promise is rejected!", e)
//     }
// }
//console.log(read('./productos.txt'));
module.exports = read;
 //module.exports = write;