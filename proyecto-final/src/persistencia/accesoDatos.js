const fs = require('fs');

module.exports= {
read:function (archivo) {
    
    try {
        const raw = fs.readFileSync(archivo, 'utf-8')
        const arrayProductos = JSON.parse(raw)
        return(arrayProductos)
    } catch (e) {
        console.error("The Promise is rejected!", e)
    }
},

write:function (archivo,contenido){
    
    try {
     fs.writeFileSync(archivo,JSON.stringify(contenido)) 
    } catch (e) {
        console.error("The Promise is rejected!", e)
    }
}
}