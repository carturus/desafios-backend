const fs = require('fs');

const write = (archivo,contenido) =>{
    
    try {
     fs.writeFileSync(archivo,JSON.stringify(contenido)) 
    } catch (e) {
        console.error("The Promise is rejected!", e)
    }
}

module.exports = write;
