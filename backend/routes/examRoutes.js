import express from 'express'
import { getAllExams, getExamById,
    createExam, updateExam, startExam, submitExam,
    autoSave
 } from '../controllers/examController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const examRouter = express.Router()

examRouter.get('/exams', authMiddleware, getAllExams)
examRouter.get('/exams/:id', authMiddleware, getExamById)
examRouter.post('/exams',authMiddleware, createExam)
examRouter.put('/exams/:id',authMiddleware, updateExam)
examRouter.post('/exams/:id/start', authMiddleware, startExam)
examRouter.post('/exams/:id/submit',authMiddleware, submitExam)
examRouter.post('/exams/:id', authMiddleware, autoSave)


