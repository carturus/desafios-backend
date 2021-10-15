// books.js
const Router = require('koa-router');
const productos = require('./api/productos');

// Prefix all routes with /books
const router = new Router({
	prefix: '/productos'
});


/* ---------------------- Routes ----------------------- */
/* API REST Get All */
router.get('/',async (ctx, next) => {
	ctx.body = {
		status: 'success',
		message: await productos.listar()
	};
	next();
});

/* API REST Get x ID */
router.get('/:id', async(ctx, next) => {

	let id = ctx.params.id;
	try{
    let getCurrentProduct=await productos.buscarPorId(id);
	if (getCurrentProduct) {
		ctx.body = getCurrentProduct;
	} else {
		ctx.response.status = 404;
		ctx.body = {
			status: 'error!',
			message: 'Book Not Found with that id!'
		};
	}
	next();
	}
	catch{
		ctx.response.status = 404;
		ctx.body = {
			status: 'error!',
			message: 'Book Not Found with that id!'
		};
		next();
	}

});

/* API REST Post */
router.post('/new',async (ctx, next) => {
	// Check if any of the data field not empty
	if (
		!ctx.request.body.title||
		!ctx.request.body.thumbnail ||
		!ctx.request.body.price
	) {
		ctx.response.status = 400;
		ctx.body = {
			status: 'error',
			message: 'Please enter the data'
        }
	} else {

		let producto = ctx.request.body;
		await productos.guardar(producto)

		ctx.response.status = 201;
		ctx.body = {
			status: 'success',
			message: `New product name: ${
				ctx.request.body.title
			}`
		};
	}
	next();
});

/* API REST Put */
router.put('/update/:id',async (ctx, next) => {
	// Check if any of the data field not empty
	if (
		!ctx.request.body.title||
		!ctx.request.body.thumbnail ||
		!ctx.request.body.price
	) {
		ctx.response.status = 400;
		ctx.body = {
			status: 'error',
			message: 'Please enter the data'
        }
	} else {
       
		let id  = ctx.params.id
		let producto = ctx.request.body
		await productos.actualizar(id, producto);
		ctx.response.status = 201;
		ctx.body = {
			status: 'success',
			message: `New product updated with title: ${
				ctx.request.body.title
			}`
		};
	}
	next();
});

/* API REST Delete */
router.delete('/delete/:id', async(ctx, next) => {
    let id = ctx.params.id
    await productos.borrar(id);
    ctx.response.status = 200;
    ctx.body = {
        status: 'success',
        message: `Book deleted with id: ${id}`
    };
	next();
});

module.exports = router;