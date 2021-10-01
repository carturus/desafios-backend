//normalizr
const { normalize, schema } = require('normalizr');
const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'mail' });
const schemaPost = new schema.Entity('posts', {
  author: schemaAuthor
}, { idAttribute: '_id' })
const schemaMensaje = new schema.Entity('mensajes', {
  posts: [schemaPost]
})

module.exports={normalize,schemaMensaje}