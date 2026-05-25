import express from 'express'
import {
    getMyResults, getExamResults, getResultDetail, gradeResult
} from '../controllers/resultController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import roleMiddleware from '../middleware/roleMiddleware.js'


const resultRouter = express.Router()

resultRouter.get('/results/me', authMiddleware, getMyResults)
resultRouter.get('/results/exams/:examId', authMiddleware, roleMiddleware('instructor'), getExamResults)
resultRouter.get('/results/:id', authMiddleware, getResultDetail)
resultRouter.put('/results/:id/grade', authMiddleware, roleMiddleware('instructor'), gradeResult)

export default resultRouter

