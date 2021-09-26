const request = require('supertest')('http://localhost:8081')
const expect = require('chai').expect
const productos=require('../api/productos')

describe('test api rest full', () => {
    describe('listar-productos', () => {
        it('Deberian listar un array de productos', async () => {
            let response = await request.get('/productos/listar')                       
            expect(response.body[0]).to.include.keys('title','price','thumbnail')        
        })
    })
    describe('agregar-productos', () => {
        it('debería agregar un producto', async () => {
           
            let item={title:"mocha",price:500,thumbnail:"https://mocha.img"} 
            let response = await request.post('/productos/guardar').send(item)
            const producto = response.body
            expect(producto).to.include.keys('title','price','thumbnail')
            expect(item.title).to.eql(producto.title)
            expect(item.price).to.eql(producto.price)
        })
    })

    describe('actualizar-producto', () => {
        it('debería actulizar el primer producto', async () => {
            let items= await request.get('/productos/listar')
            let id=items.body[0]._id;
            let item={title:"mocha",price:500,thumbnail:"https://mocha.img"} 
            let response = await request.put(`/productos/actualizar/${id}`).send(item)                   
            expect({"n": 1,"nModified": 1,"ok": 1}).to.eql(response.body)
    })
})

    describe('borrar-producto', () => {
        it('debería borrar el primer producto', async () => {
            let items= await request.get('/productos/listar')
            let id=items.body[0]._id;    
            let response = await request.delete(`/productos/borrar/${id}`)                   
            expect({ n: 1, ok: 1, deletedCount: 1 }).to.eql(response.body)
            
        })
    })


})
