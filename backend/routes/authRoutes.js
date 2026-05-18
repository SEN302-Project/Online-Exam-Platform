import express from 'express'
import { registerUser, 
    loginUser, getMe,
    verifyEmail
 } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const authRouter = express.Router()

authRouter.post('/login', loginUser)
authRouter.post('/register', registerUser)
authRouter.post('/verify', verifyEmail)
authRouter.get('/me', authMiddleware, getMe)

export default authRouter