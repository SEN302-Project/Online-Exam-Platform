import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";
import { getSubmissions } from "./submissionModel.js";

export const getProctoring = () => getDB().collection('proctoring')
export const getFrames = () => getDB().collection('frames')

export const createIncident = async (incident) => {
    const result = await getProctoring().insertOne(incident)
    return result
} 

export const findIncidentsByExam = async (examId) => {
    const result = await getProctoring().find({examId: examId}).toArray()
    return result
}

export const findIncidentsByStudent = async (studentId) => {
    const result = await getProctoring().find({studentId: studentId}).toArray()
    return result
}

export const createFrame = async (frame) => {
    const result = await getFrames().insertOne(frame)
    return result
}

export const findLiveSessions = async () => {
    const result = await getSubmissions().find({status: 'in_progress'}).toArray()
    return result
}