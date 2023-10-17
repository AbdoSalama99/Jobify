import rateLimiter from 'express-rate-limit'
import { Router } from 'express'
import { login, logout, register } from '../controllers/authController.js'
const router = Router()
import { validateLoginInput } from '../middlewares/validationMiddleware.js'

import { validateRegisterInput } from '../middlewares/validationMiddleware.js'

const apiLimiter = rateLimiter({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 5,
  message: { msg: 'IP rate limit exceeded, retry in 15 minutes.' },
})
router.post('/register', apiLimiter, validateRegisterInput, register)
router.post('/login', apiLimiter, validateLoginInput, login)
router.get('/logout', logout)

export default router
