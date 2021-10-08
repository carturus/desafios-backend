

const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const productosController=require('../controllers/productosController')

const schema = buildSchema(`
type Query {
    buscarProducto(_id: String!): Producto,
    listarProductos: [Producto]
},
type Mutation { 
    borrarProducto(_id: String!,): Producto,                                   
    guardarProducto(title: String!, price: Int!, thumbnail: String!): Producto,
    actualizarProducto(_id: String!, title: String!, price: Int!, thumbnail: String!): Producto,
},
type Producto {
    _id: String
    title: String
    price: String
    thumbnail: String
}    
`);

const root = {
listarProductos: productosController.listar,
buscarProducto: productosController.buscar,
guardarProducto: productosController.guardar,
actualizarProduco:productosController.actualizar,
borrarProducto:productosController.borrar,

};

module.exports={root,schema}