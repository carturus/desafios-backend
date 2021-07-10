const mysql = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'prueba',
        database: 'prueba'
    },
    pool: { min: 0, max: 7 }
}

const sqlite3 = {
    client: 'sqlite3',
    connection: {
        filename: './db/messages.sqlite'
    },
    useNullAsDefault: true
}

exports.sqlite3 = sqlite3;

exports.mysql = mysql;