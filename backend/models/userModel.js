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

export const updateUserByEmail = async(email, updateData) => {
    const result = await getUsers().updateOne({email:email}, {$set: updateData})
    return result
}

export const findUserByVerificationToken = async(token) => {
    const result = await getUsers().findOne({ verificationToken: token })
    return result

}