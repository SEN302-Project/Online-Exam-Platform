import { getDB } from "../config/db.js"
import { ObjectId } from "mongodb"

export const getUsers = () => getDB().collection('users')
export const getAuditLogs = () => getDB().collection('audit_logs')

export const findAllUsers = async (filter = {}) => {
    const result = await getUsers().find(filter, { projection: { password: 0, verificationToken: 0 } }).toArray()
    return result
}

export const findUserById = async (id) => {
    const result = await getUsers().findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } })
    return result
}

export const updateUserById = async (id, updateData) => {
    const result = await getUsers().updateOne({ _id: new ObjectId(id) }, { $set: updateData })
    return result
}

export const deleteUserById = async (id) => {
    const result = await getUsers().deleteOne({ _id: new ObjectId(id) })
    return result
}

export const createAuditLog = async (log) => {
    const result = await getAuditLogs().insertOne(log)
    return result
}

export const findAllAuditLogs = async () => {
    const result = await getAuditLogs().find({}).sort({ timestamp: -1 }).toArray()
    return result
}