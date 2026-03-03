import { Router } from 'express'
import { testDb } from '../controllers/entregas.controller.js'

const router = Router()

router.get('/test', testDb)

export default router