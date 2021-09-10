const mysql = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'prueba',
        database: 'ecommerce'
    },
    pool: { min: 0, max: 7 }
}

exports.mysql = mysql;