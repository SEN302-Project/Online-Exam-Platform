import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

const getResults = () => getDB().collection('results')

export const createResults =  async (resultData) => {
    const result = await getResults().insertOne(resultData)
    return result
}

export const findResultsByStudent = async (studentId) => {
    const result= await getResults().find({ studentId: studentId }).sort({ submittedAt: -1 }).toArray()
    return result
}

export const findResultsByExam = async (examId) => {
    const result = await getResults().find({ examId: examId }).toArray()
    return result
}

export const findResultById = async (id) => {
    const result = await getResults().findOne({_id: new ObjectId(id)})
    return result
}

export const updateResultById = async (id, updateData) => {
    const result = await getResults().updateOne({_id: new ObjectId(id)}, {$set: updateData})
    return result
}