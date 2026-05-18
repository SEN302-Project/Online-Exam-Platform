import {
    createExam as createExamInDB, findExamById,
    findAllExams, updateExamById, deleteExamById
} from '../models/examModel.js'
import { findSubmissionByExamAndStudent,
    findSubmissionById, getSubmissions,
    createSubmission,
    updateSubmission as updateSubmissionInDB
 } from '../models/submissionModel.js'

export const getAllExams =  async (req,res) => {
    try{
        const result = await findAllExams()
        return res.status(200).json(result)
    }
    catch(err) {
        res.status(500).json({message: "Server Error"})
    }
}

export const getExamById = async (req,res) => {
    try{
        const {id} = req.params
        const result = await findExamById(id)
        return res.status(200).json(result)
    }
    catch(err) {
        res.status(500).json({message:"Server Error"})
    }
}

export const createExam = async (req,res) => {
    try{
        const examData = req.body
        const exam = {
            ...examData,
            createdBy: req.user.userID,
            status: "draft",
            createdAt: new Date()
        }
        const result = await createExamInDB(exam)
        return res.status(201).json({message: "Exam successfully created"})
    }
    catch(err) {
        res.status(500).json({message:"Server Error"})
    }
}

export const updateExam = async (req,res) => {
    try{
        const {id} = req.params
        const updateData = req.body
        const result = await updateExamById(id, updateData)
        return res.status(200).json({message: "Exam successfully updated."})
    }
    catch (err) {
        res.status(500).json({message:"Server Error"})
    }
}

export const startExam = async (req,res) => {
    try{const {id} = req.params
    const studentId = req.user.userID
    const examStatus = await findSubmissionByExamAndStudent(id, studentId)
    if(examStatus) {
       return res.status(400).json({message: "Exam already started"})
    }
    const submission = {
        examId: id,
        studentId: studentId,
        startTime: new Date(),
        answers: [], 
        status: "in_progress",

    }

    const result = await createSubmission(submission)
    return res.status(201).json(submission)}
    catch(err){
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const submitExam = async (req,res) => {
    try{
        const {id} = req.params
        const studentId = req.user.userID
        const {answers} = req.body
        const submissionData = await findSubmissionByExamAndStudent(id, studentId)
        const submissionUpdate = {
            answers: answers,
            status: "submitted",
            submittedAt: new Date()
        }
        
        if(!submissionData) {
            return res.status(404).json({message: 'Submission not found'})
        } 

        const findExam = await findExamById(id)
        if(!findExam) {
            return res.status(404),json({message: 'Exam not found'})
        }else
        if (findExam.status === 'closed') {
            return res.status(403).json({message: 'Exam is closed'})
        }
        else if (submissionData.status === "submitted"){
            return res.status(400).json({message: 'Exam already submitted'})
        }

        const updateSubmission = await updateSubmissionInDB(submissionData._id, submissionUpdate)
        return res.status(200).json({message:'Exam submitted successfully'})

    }catch(err) {
        return res.status(500).json({message:'Internal Server Error' })
    }
}

export const autoSave = async (req,res) => {
   try{ const {id} = req.params
    const studentId = req.user.userID
    const {answers} = req.body
    const submissionData = await findSubmissionByExamAndStudent(id, studentId)
    if(submissionData){
        const result =  await updateSubmissionInDB(submissionData._id, {answers})
        return res.status(200).json({message: "Progress saved"})
    }
    else{
        return res.status(404).json({message: "Submission not found"})
    }}
    catch(err){
        console.log(err)
         return res.status(500).json({message: "Internal Server Error"})
    }
}

export const deleteExam = async(req, res) => {
    try{
        const {id} = req.params
        const result = await deleteExamById(id)
        return res.status(200).json({message:'Exam successfully deleted'})
    } catch (err) {
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

