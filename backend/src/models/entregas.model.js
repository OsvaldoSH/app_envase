import pool from '../connection_db.js'

export async function queryTest(){
    const conn = await pool.getConnection()
    try {
        const rows = await conn.query('SELECT 1 AS ok')
        return rows
    } finally {
        conn.release()        
    }
}

export async function insertEntrega({ ruta, quien_entrega, dinero, cartones, tipo, comentario }) {
    try {
        const conn = await conn.query(
            `INSERT INTO entregas (ruta, quien_entrega, dinero, cartones, tipo,
            VALUES (?,?,?,?,?,?))`,
            [ruta, quien_entrega, dinero, cartones, tipo, comentario]
        )
        return result.insertId
    } finally {
        conn.release()
    }
}