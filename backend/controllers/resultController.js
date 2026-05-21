import { createResults,
    findResultsByStudent, findResultById, findResultsByExam,
    updateResultById
 } from "../models/resultModel.js"

export const getMyResults = async(req, res) => {
    try{
        const id = req.user.userID
        if(!id) {
            return res.status(404).json({message: 'Student ID not found'})
        }
        const result = await findResultsByStudent(id)
        return res.status(200).json(result)
    
    } catch (err) {
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

export const getExamResults = async (req, res) => {
    try{
        const examID = req.params.examId
        if(!examID || examID === null) {
            return res.status(404).json({message: 'Exam not found'})
        }
        const result = await findResultsByExam(examID)
        return res.status(200).json(result)
    } catch(err) {
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

export const getResultDetail = async(req, res) => {
    try{
        const ID = req.params.id
         if(!ID) {
            return res.status(404).json({message: 'Result not found'})
        }
        const result = await findResultById(ID)
        return res.status(200).json(result)
    } catch(err) {
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

export const gradeResult = async(req,res) => {
    try{
        const id = req.params.id
        const updateData = req.body
        const result = await updateResultById(id, updateData)
        return res.status(200).json({message: "Result successfully updated."})
    }
    catch (err) {
        res.status(500).json({message:"Internal Server Error"})
    }
}