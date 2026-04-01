import express from 'express'
import cors from 'cors'
import entregasRoutes from './routes/entregas.routes.js'
import reportesRoutes from './routes/reportes.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/entregas', entregasRoutes)
app.use('/api/reportes',reportesRoutes);

app.get('/api/health', (req, res) => {
    res.json({ ok: true })
})

export default app