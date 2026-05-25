import express from 'express'
import {connectDB} from './config/db.js'
import {config} from 'dotenv'
import cors from 'cors'
import authRouter from './routes/authRoutes.js'
import examRouter from './routes/examRoutes.js'
import questionRouter from './routes/questionRoutes.js'
import resultRouter from './routes/resultRoutes.js'
import proctoringRouter from './routes/proctoringRoutes.js'

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

