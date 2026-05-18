import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

export const getSubmissions = () => getDB().collection('submissions')

export const createSubmission = async (submission) => {
    const result = await getSubmissions().insertOne(submission)
    return result
}

export const findSubmissionById = async(id) => {
    const result = await getSubmissions().findOne({_id: new ObjectId(id)})
    return result
}

export const findSubmissionByExamAndStudent = async (examId, studentId) => {
   const result = await getSubmissions().findOne({examId: examId, studentId:studentId})
   return result
}

export const updateSubmission = async (id, updateSubmissionData) => {
    const result = await getSubmissions().updateOne({_id: new ObjectId(id)}, {$set: updateSubmissionData})
    return result
}