import { Router } from 'express'
import { crearEntrega, testDb, listarEntregas, cambiarEstado } from '../controllers/entregas.controller.js'

const router = Router()

router.get('/test', testDb)

router.post('/', crearEntrega)

router.get('/', listarEntregas)

router.patch('/:id/estado', cambiarEstado)

export default router