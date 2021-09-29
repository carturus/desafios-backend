const {loggerConsola,loggerWarn,loggerError}= require('../utils/loggers');
const { fork } = require('child_process');

const randomEjercicio=(cant)=>{
    let number=0;
    //let numbersObjeto={}
    try {

    if (cant == undefined) {
      number= 100000000
    } else {
      if (isNaN(cant)) {
        throw new Error('Cantidad no es un numero')
      } 
      else{
        number=cant      
      }
    }
    number > 1000 ? loggerWarn.warn("La cantidad es muy grande") : loggerConsola.info("Se hara calculo")
    const computo = fork('./api/computo.js');
    computo.send(number);
    computo.on('message', numbers => {

     numbersObjeto=numbers;

    }
    );
    return numbersObjeto;
  }
  catch (error) {
    loggerError.error('No se puede realizar calculo', error)
    return 'No se puede hacer calculo, Cantidad no es un numero'
    //res.send('No se puede hacer calculo, Cantidad no es un numero')
  }
}

module.exports={randomEjercicio}