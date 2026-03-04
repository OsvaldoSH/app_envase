import { Router } from 'express'
import { crearEntrega, testDb } from '../controllers/entregas.controller.js'

const router = Router()

router.get('/test', testDb)

router.post('/', crearEntrega)

export default router