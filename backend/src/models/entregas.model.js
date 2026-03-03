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