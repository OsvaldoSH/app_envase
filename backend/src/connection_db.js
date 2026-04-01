import * as mariadb from 'mariadb'

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'osvaldo',
    password: 'osv',
    database: 'envase',
    connectionLimit: 5,
    dateStrings: true
});

try {
    const conn = await pool.getConnection();
    console.log("Conexión correcta");
    conn.release();
} catch (error) {
    console.error("Error de conexión:", error);
}

export default pool
