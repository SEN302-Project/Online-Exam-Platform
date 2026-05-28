import express from 'express'
import {connectDB} from './config/db.js'
import {config} from 'dotenv'
import cors from 'cors'
import authRouter from './routes/authRoutes.js'
import examRouter from './routes/examRoutes.js'
import questionRouter from './routes/questionRoutes.js'
import resultRouter from './routes/resultRoutes.js'
import proctoringRouter from './routes/proctoringRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import rateLimit from 'express-rate-limit'

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 20, 
    message: { message: 'Too many requests, please try again later.' }
})

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { message: 'Too many requests, please try again later.' }
})

config()
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL
}))
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api', examRouter)
app.use('/api', questionRouter)
app.use('/api', resultRouter)
app.use('/api', proctoringRouter)
app.use('/api', adminRouter)
app.use('/api/auth', authLimiter)
app.use('/api', generalLimiter)

const startServer = async () => {
    try{
       await connectDB()
       app.listen(process.env.PORT, ()=> {
        console.log("Server running on port: ", process.env.PORT)
        }) 
    }
    catch(err) {
        console.log(err)
    }
}

startServer()

