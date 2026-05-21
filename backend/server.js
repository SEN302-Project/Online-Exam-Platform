import express from 'express'
import {connectDB} from './config/db.js'
import {config} from 'dotenv'
import cors from 'cors'
import authRouter from './routes/authRoutes.js'
import examRouter from './routes/examRoutes.js'
import questionRouter from './routes/questionRoutes.js'
import resultRouter from './routes/resultRoutes.js'

config()
const app = express();

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api', examRouter)
app.use('/api', questionRouter)
app.use('/api', resultRouter)

const startServer = async () => {
    try{
       await connectDB()
       app.listen(5000, ()=> {
        console.log("Server running on port 5000")
        }) 
    }
    catch(err) {
        console.log(err)
    }
}

startServer()

