
const { buildSchema } = require('graphql');
const productos = require('../api/productos');

const schema = buildSchema(`
    type Query {
        buscarProducto(_id: String!): Producto,
        listarProductos: [Producto]
    },
    type Mutation {
        guardarProducto(title: String!, price: Int!, thumbnail: String!): Producto
    },
    type Producto {
        _id: String
        title: String
        price: String
        thumbnail: String
    }    
`);

const root = {
  listarProductos: productos.listar,
  buscarProducto: productos.buscarPorId,
  guardarProducto: productos.guardar

};

module.exports={root,schema}