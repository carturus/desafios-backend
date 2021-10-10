'use strict'


/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


const Producto= use('App/Models/Producto')
Route
    .get('listar', async ({response}) => {
	   const productos = (await Producto.all()).toJSON()
       return response.status(200).json(productos)
	})
Route
    .get('buscar/:id', async ({request,response}) => {
		const producto= (await Producto.find( parseInt(request.params.id) ))
        if(producto === null){
            return response.status(200).send('Producto no encontrado')       
        }
        else{
            return response.status(200).json(producto) 
        }

	})
Route
    .post('guardar', async ({request,response}) => {
        let data = request.all();
        const producto= await Producto.create(data);
        return response.status(200).json(producto)
	})
Route
    .put('actualizar/:id', async ({ params, request, response }) => {
        const data = request.only(['title', 'thumbnail', 'price'])
        const producto= await Producto.find(params.id)
        if(producto === null){
            return response.status(404).send('Producto no encontrado')       
        }
        else{
        producto.title = data.title
        producto.thumbnail= data.thumbnail
        producto.price= data.price 
        await producto.save()
        return response.status(200).json(producto)
        }
      })
Route
    .delete('borrar/:id', async ({ params, response }) => {
        const producto= await Producto.find(params.id)
        if(producto === null){
            return response.status(404).send('Producto no encontrado')       
        }
        const productoBorrado=producto
        await producto.delete()
        return response.status(204).json(productoBorrado)
      })
