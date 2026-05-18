import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

export const getExams = () => getDB().collection('exams')

export const createExam = async (exam) => {
    const result = await getExams().insertOne(exam)
    return result
}

export const findExamById = async (id) => {
    const result = await getExams().findOne({_id: new ObjectId(id)})
    return result
}

export const findAllExams = async () => {
    const result = await getExams().find({}).toArray()
    return result
}

export const updateExamById = async (id, updateData) => {
    const result = await getExams().updateOne({_id: new ObjectId(id)}, {$set: updateData})
    return result
}

export const deleteExamById = async(id) => {
    const result = await getExams().deleteOne({_id: new ObjectId(id)})
    return result
}