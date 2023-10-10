import { Router } from 'express'
import { login, logout, register } from '../controllers/authController.js'
const router = Router()
import { validateLoginInput } from '../middlewares/validationMiddleware.js'

import { validateRegisterInput } from '../middlewares/validationMiddleware.js'
router.post('/register', validateRegisterInput, register)
router.post('/login', validateLoginInput, login)
router.get('/logout', logout)

export default router
