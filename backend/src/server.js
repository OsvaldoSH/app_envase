import express from 'express'
import cors from 'cors'
import pool from './connection_db.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/test', async (req, res) => {
    try {
        const conn = await pool.getConnection()
        const rows = await conn.query('SELECT 1 AS ok')
        conn.release()

        res.json({ conexion: 'ok', resultado: rows })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})