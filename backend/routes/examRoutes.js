import express from 'express'
import { getAllExams, getExamById,
    createExam, updateExam, startExam, submitExam,
    autoSave, deleteExam
 } from '../controllers/examController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import roleMiddleware from '../middleware/roleMiddleware.js'

const examRouter = express.Router()

examRouter.get('/exams', authMiddleware, getAllExams)
examRouter.get('/exams/:id', authMiddleware, getExamById)
examRouter.post('/exams',authMiddleware,roleMiddleware('instructor'), createExam)
examRouter.put('/exams/:id',authMiddleware,roleMiddleware('instructor'), updateExam)
examRouter.post('/exams/:id/start', authMiddleware, startExam)
examRouter.post('/exams/:id/submit',authMiddleware, submitExam)
examRouter.post('/exams/:id/autosave', authMiddleware, autoSave)
examRouter.delete('/exams/:id', authMiddleware, roleMiddleware('instructor'), deleteExam)

export default examRouter


