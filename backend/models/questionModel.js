import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

const getQuestions = () => getDB().collection('questions')

export const createQuestion = async (question) => {
    const result = await getQuestions().insertOne(question)
    return result
}

export const findQuestions = async (filter = {}) => {
    const result = await getQuestions().find(filter).toArray()
    return result
}

export const findQuestionById = async (id) => {
    const result = await getQuestions().findOne({_id: new ObjectId(id)})
    return result
}

export const deleteQuestionById = async (id) => {
    const result = await getQuestions().deleteOne({_id: new ObjectId(id)})
    return result
}

export const updateQuestion = async (id, updateData) => {
    const result = await getQuestions().updateOne({_id: new ObjectId(id)}, {$set: updateData})
    return result
}

