import express from 'express'
import { registerUser, 
    loginUser, getMe,
    verifyEmail
 } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import { validateRegister, validateLogin } from '../middleware/validateMiddleware.js'

const authRouter = express.Router()

authRouter.post('/register', validateRegister, registerUser)
authRouter.post('/login', validateLogin, loginUser)
authRouter.get('/verify', verifyEmail)
authRouter.get('/me', authMiddleware, getMe)

export default authRouter