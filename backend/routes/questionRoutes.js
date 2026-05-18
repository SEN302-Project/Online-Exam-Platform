import express from 'express'
import { getAllQuestions,
    createQuestion, deleteQuestion, getQuestionById, updateQuestion
 } from "../controllers/questionController.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import authMiddleware from '../middleware/authMiddleware.js';

const questionRouter = express.Router()

questionRouter.get('/questions', authMiddleware, getAllQuestions)
questionRouter.get('/questions/:id', authMiddleware, getQuestionById)
questionRouter.post('/questions', authMiddleware, roleMiddleware('instructor'), createQuestion)
questionRouter.delete('/questions/:id', authMiddleware, roleMiddleware('instructor'), deleteQuestion)
questionRouter.put('/questions/:id', authMiddleware, roleMiddleware('instructor'), updateQuestion)

export default questionRouter