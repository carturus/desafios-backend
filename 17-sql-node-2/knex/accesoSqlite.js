const options = require('../config/database');
const knexSqlite = require('knex')(options.sqlite3);


const persistenciaMensajes =(messages)=>{
//Persistencia en SQL3
knexSqlite.from('messages').select('*')
.then(rows => {
    //verifico tabla
    console.log(rows)
    for (row of rows) {
        console.log(`${row['id']} ${row['author']}  ${row['date']} ${row['text']}`);
    }
}).catch(error => {
    
// Se crea tabla si no esta
knexSqlite.schema.createTable('messages', table => {
        table.increments('id');
        table.string('author');
        table.date('date')
        table.string('text');
    }).catch(error => {
        console.log('error:', error);
        throw error;
    })

}).finally(() => {
//Inserto datos

knexSqlite('messages').insert(messages[messages.length-1])
    .then(() => {
        console.log('Se agregaron mensajes a la tabla');
    }).catch(error => {
        console.log('error:', error);
    })
});
}


exports.persistenciaMensajes = persistenciaMensajes;