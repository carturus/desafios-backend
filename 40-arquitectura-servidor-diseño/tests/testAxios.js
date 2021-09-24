const {listarProductosAxios,buscarProductosAxios,agregarProductoAxios,actualizarProductosAxios,borrarProductoAxios}=require('../axios/productosAxios')
//Test axios
//listarProductosAxios();
buscarProductosAxios('614a669a99a3fd6a1bd091c1');
agregarProductoAxios({title:"axios",price:500,thumbnail:"https://axios.img"})
actualizarProductosAxios('614a669a99a3fd6a1bd091c1',{title:"cambio",price:500,thumbnail:"https://cambio.img"})
borrarProductoAxios('614aa5b520a38669d493c408')
