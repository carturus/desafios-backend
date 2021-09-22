const axios = require('axios');

const URL = 'http://localhost:8081'

const listarProductosAxios=async()=>
 {
    try {
        let response = await axios.get(URL+'/productos/listar');
        console.log("Liste productos",response.data)
    } catch (error) {
        console.error(error.response);
    }
};


const buscarProductosAxios= async(id)=> {
    try {
        let response = await axios.get(URL + `/productos/listar/${id}`);
        console.log("Encontre producto",response.data)
    } catch (error) {
        console.error(error.response);
    }
};
const agregarProductoAxios=async(producto)=>{
axios.post(URL + '/productos/guardar',producto)
    .then(response => {
        console.log("Agregue producto",response.data);
    })
    .catch(console.log);
}
const actualizarProductosAxios=async(id,producto )=>{
axios.put(URL +'/productos/actualizar/'+id,
    {
      title: producto.title,
      price: producto.price,
      thumbnail:producto.thumbnail,
    }
  ).then(response=>{console.log("Actucalice producto",response.data)
})
.catch(console.log);
}

const borrarProductoAxios =async(id)=>{
    axios.delete(URL +'/productos/borrar/'+id).then(response=>{console.log("Borre producto",response.data)
    })
    .catch(console.log);
}

module.exports={listarProductosAxios,buscarProductosAxios,agregarProductoAxios,actualizarProductosAxios,borrarProductoAxios}