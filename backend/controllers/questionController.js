import {createQuestion as createQuestionInDB, 
    findQuestionById, findQuestions,
    deleteQuestionById, updateQuestion as updateQuestionInDB
} from '../models/questionModel.js'

export const getAllQuestions = async (req, res) => {
    try{
        const {examId} = req.query
        const filter = {}
        if(examId) {
            filter.examId = examId
        }
        const result = await findQuestions(filter)
        return res.status(200).json(result)
    }
    catch(err) {
        res.status(500).json({message: 'Internal Server Error'})
    }
}

export const createQuestion = async (req,res) => {
    try{
        const question = req.body
        const result = await createQuestionInDB(question)
        return res.status(201).json({message: 'Question created'})
    } catch(err) {
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

export const getQuestionById = async (req, res) => {
    try{
        const {id} = req.params
        if(!id) {
            return res.status(404).json({message: 'No question found'})
        }
        const result = await findQuestionById(id)
        return res.status(200).json(result)

    }catch(err) {
        return res.status(500).json({message:'Internal Server Error'})
    }
}

export const deleteQuestion = async (req, res) => {
    try{
        const {id} = req.params
        if(!id) {
            return res.status(404).json({message: 'No question found'})
        }
        const result = await deleteQuestionById(id)
        return res.status(200).json({message: 'Question deleted'})

    } catch(err) {
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

export const updateQuestion = async (req, res) => {
   try {
        const {id} = req.params
        const updateData = req.body
        const result = await updateQuestionInDB(id, updateData)
        return res.status(200).json({message: 'Question updated'})
   } catch (err) {
    return res.status(500).json({message:'Internal Server Error'})
   }
}