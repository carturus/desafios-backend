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


module.exports = read;
