import { Router } from 'express'
import { crearEntrega, testDb, listarEntregas } from '../controllers/entregas.controller.js'

const router = Router()

router.get('/test', testDb)

router.post('/', crearEntrega)

router.get('/', listarEntregas)

export default router