import { getDB } from "../config/db.js";

export const getUsers = () => getDB().collection('users')

export const createUsers = async (user) => {
    const result = await getUsers().insertOne(user)
    return result
    
}

export const findUserByEmail = async (email) => {
    const result = await getUsers().findOne({email})
    return result
}