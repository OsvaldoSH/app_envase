import { insertEntrega, getEntregas, queryTest } from '../models/entregas.model.js'
import { updateEstadoEntrega } from '../models/entregas.model.js'

export async function testDb(req, res) {
    try {
        const rows = await queryTest()
        res.json({ conexion: 'ok', resultado: rows })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export async function crearEntrega(req, res) {
    try {
        const { ruta, quien_entrega, dinero, cartones,tipo, comentario } = req.body

        if (!ruta || !quien_entrega || dinero === undefined || cartones === undefined || !tipo) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' })
        }

        const dineroNum = Number(dinero)
        const cartonesNum = Number(cartones)

        if (!Number.isFinite(dineroNum) || dineroNum < 0) {
            return res.status(400).json({ error: 'Dinero invalido' })
        }

        if (!Number.isInteger(cartonesNum) || cartonesNum <= 0) {
            return res.status(400).json({ error: 'Cartones invalido' })
        }

        const id = await insertEntrega({
            ruta: String(ruta),
            quien_entrega: String(quien_entrega),
            dinero: dineroNum,
            cartones: cartonesNum,
            tipo: String(tipo),
            comentario: comentario ? String(comentario) : null,
        })
        res.json({ ok: true, id })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export async function listarEntregas(req, res) {
    try {
        const rows = await getEntregas()

        const data = rows.map(r => ({
            ...r,
            dinero: Number(r.dinero),
            cantidad_por_carton: r.cartones ? Number(r.dinero) / r.cartones : 0
        }))
        res.json(data)

    } catch (err) {
        res.status(500).json({ error: err.message})
    }
}

export async function cambiarEstado(req, res) {
    try {
        const { id } = req.params
        const {estado} = req.body

        await updateEstadoEntrega(id, estado)

        res.json({ ok: true })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
    
