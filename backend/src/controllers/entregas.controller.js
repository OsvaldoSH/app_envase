import { queryTest } from '../models/entregas.model.js'

export async function testDb(req, res) {
    try {
        const rows = await queryTest()
        res.json({ conexion: 'ok', resultado: rows })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
