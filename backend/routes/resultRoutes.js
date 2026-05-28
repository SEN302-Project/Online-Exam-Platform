import express from 'express'
import {
    getMyResults, getExamResults, getResultDetail,
     gradeResult, exportResultPDF
} from '../controllers/resultController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import roleMiddleware from '../middleware/roleMiddleware.js'


const resultRouter = express.Router()

resultRouter.get('/results/me', authMiddleware, getMyResults)
resultRouter.get('/results/exams/:examId', authMiddleware, roleMiddleware('instructor'), getExamResults)
resultRouter.get('/results/:id', authMiddleware, getResultDetail)
resultRouter.put('/results/:id/grade', authMiddleware, roleMiddleware('instructor'), gradeResult)
resultRouter.get('/results/:id/pdf', authMiddleware, exportResultPDF)

export default resultRouter

