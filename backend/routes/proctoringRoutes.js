import express from 'express'
import {
    verifyIdentity, reportIncident, getStudentIncidents,
    uploadFrame, getLiveSessions, getExamIncidents
} from '../controllers/proctoringController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import roleMiddleware from '../middleware/roleMiddleware.js'

const proctoringRouter = express.Router()

proctoringRouter.post('/proctoring/verify', authMiddleware, verifyIdentity)
proctoringRouter.post('/proctoring/incidents', authMiddleware, reportIncident)
proctoringRouter.post('/proctoring/frames', authMiddleware, uploadFrame)
proctoringRouter.get('/proctoring/live', authMiddleware, roleMiddleware('proctor','instructor'), getLiveSessions)
proctoringRouter.get('/proctoring/incidents/exam/:examId', authMiddleware, roleMiddleware('proctor', 'instructor'), getExamIncidents)
proctoringRouter.get('/proctoring/incidents/student/:studentId', authMiddleware, roleMiddleware('proctor', 'instructor'), getStudentIncidents)

export default proctoringRouter