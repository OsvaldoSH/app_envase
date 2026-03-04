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
    const conn = await pool.getConnection()
    try {
        const result = await conn.query(
            `INSERT INTO entregas (ruta, quien_entrega, dinero, cartones, tipo, comentario)
            VALUES (?,?,?,?,?,?)`,
            [ruta, quien_entrega, dinero, cartones, tipo, comentario]
        )
        return Number(result.insertId)
    } finally {
        conn.release()
    }
}

export async function getEntregas() {
    const conn = await pool.getConnection()

    try {
        const rows = await conn.query(
            `SELECT
                id,
                ruta,
                quien_entrega,
                dinero,
                cartones,
                tipo,
                comentario,
                creado
            FROM entregas
            ORDER BY creado DESC`
        )
        return rows
    } finally {
        conn.release()
    }
}