
process.on('message', cant=> {
    aleatorios=[]
    for(let i=0;i<cant;i++){
     aleatorios.push(Math.floor(Math.random() * 1000) + 1)
    } 

    function countDuplicate(numeros){
        let counts = {}
        for(let i =0; i < numeros.length; i++){ 
            if (counts[numeros[i]]){
            counts[numeros[i]] += 1
            } else {
            counts[numeros[i]] = 1
            }
           }  
         return counts;
       }
    process.send( countDuplicate(aleatorios));
});