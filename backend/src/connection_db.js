import * as mariadb from 'mariadb'

const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'osvaldo',
    password: 'osv',
    database: 'envase',
    connectionLimit: 5,
})

export default pool