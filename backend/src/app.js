import express from 'express'
import cors from 'cors'
import entregasRoutes from './routes/entregasRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/entregas', entregasRoutes)

app.get(/api/healt, (req, res) => {
    res.json({ok: true})
})

export default app