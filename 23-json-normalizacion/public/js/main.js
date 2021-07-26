const socket = io.connect();
/* si recibo productos, los muestro usando handlebars */
socket.on('productos', function (productos) {
    console.log('productos socket client')
    document.getElementById('datos').innerHTML = data2TableHBS(productos)
});

/* obtengo el formulario */
const form = document.querySelector('form');

form.addEventListener('submit', event => {
    event.preventDefault();
    const data = { title: form[0].value, price: form[1].value, thumbnail: form[2].value };

    fetch('/api/productos/guardar', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(respuesta => respuesta.json())
    .then(productos => {
        form.reset();
        socket.emit('update', 'ok');
    })
    .catch(error => {
        console.log('ERROR', error);
    });
});

function data2TableHBS(productos) {
    const plantilla = `
        <style>
            .table td,
            .table th {
                vertical-align: middle;
            }
        </style>

        {{#if productos.length}}
        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Foto</th>
                </tr>
                {{#each productos}}
                <tr>
                    <td>{{this.title}}</td>
                    <td>$ {{ this.price }}</td>
                    <td><img width="50" src={{this.thumbnail}} alt="not found"></td>
                </tr>
                {{/each}}
            </table>
        </div>
        {{/if}}
    `

    console.log(productos);
    var template = Handlebars.compile(plantilla);
    let html = template({ productos: productos, hayProductos: productos.length });
    return html;
}

// si llegan mensajes, los renderizo
socket.on('messages', data => {

    const schemaAuthor = new normalizr.schema.Entity('author',{},{idAttribute:'mail'});
    const schemaPost = new normalizr.schema.Entity('posts',{
        author:schemaAuthor
    },{idAttribute:'_id'})
    
    const schemaMensaje= new normalizr.schema.Entity('mensajes',{
        posts: [schemaPost]
    })
    const mensajes = normalizr.denormalize(data.result, schemaMensaje, data.entities); 
    render(mensajes.posts);
});

//renderiza el html con los mensajes recibidos
function render(mensajes) {
   
    var html = mensajes.map((elem, index) => {
        return (`<div id=${index}>
            <strong style="color:blue;">${elem.author.mail}</strong>
            <strong style="color:blue;">${elem.author.username}</strong>
            <em style="color:brown;">${elem.date}</em>
            <em style="color:green;font-style: italic;">${elem.text}</em>
            </div>
        `);
    }).join(" ");

    // inyecta el html en el elemento con id messages
    document.getElementById("messages").innerHTML = html;
}

// crea un mensaje y lo emite para ser enviado al servidor
function addMessage(event) {

    event.preventDefault();
    var mensaje = {
        
        author: {mail: document.getElementById('mail').value,
                 username:document.getElementById('username').value,
                 name:document.getElementById('name').value,
                 age:document.getElementById('age').value,
              },
        date: new Date().toLocaleString('en-US'),
        text: document.getElementById('texto').value
    };

    socket.emit('new-message', mensaje);
    document.getElementById('texto').value = '';
    document.getElementById('texto').focus();
}