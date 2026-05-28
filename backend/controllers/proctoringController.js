import {
    createIncident, findIncidentsByExam, findIncidentsByStudent,
    createFrame, findLiveSessions
} from '../models/proctoringModel.js'

export const verifyIdentity = async (req, res) => {
    return res.json({
        verified: true,
        imageUrl: req.file ? req.file.path : null
    })
}

export const reportIncident = async (req, res) => {
    try{
        const {examId, ...incidentDetails} = req.body
        const studentId = req.user.userID
        const incident = {
            examId,
            studentId,
            ...incidentDetails,
            timestamp: new Date()
        }

        await createIncident(incident)
        return res.status(201).json({message: 'Incident Created'})
    } catch (err) {
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

export const uploadFrame = async(req, res) => {
    try{
        const {examId} = req.body
        const studentId = req.user.userID
        const frame = {
            examId:examId,
            studentId:studentId,
            frameUrl: req.file ? req.file.path : null,
            capturedAt: new Date()
        }

        await createFrame(frame)
        return res.status(201).json({message: 'Frame uploaded'})

    }catch(err) {
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

export const getLiveSessions = async (req, res) => {
    try{
        const result = await findLiveSessions()
        return res.status(200).json(result)
    } catch(err) {
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

export const getExamIncidents = async (req, res) => {
    try{
        const {examId} = req.params
        const result = await findIncidentsByExam(examId)
        return res.status(200).json(result)
    }catch (err) {
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

export const getStudentIncidents = async(req,res) => {
    try{
        const studentId = req.params.studentId
        const result = await findIncidentsByStudent(studentId)
        return res.status(200).json(result)
    }catch(err) {
        return res.status(500).json({message: 'Internal Server Error'})
    }
}