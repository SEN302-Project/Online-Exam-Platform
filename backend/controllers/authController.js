import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { findUserByEmail, createUsers, updateUserByEmail
    ,findUserByVerificationToken
 } from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { sendVerificationEmail } from '../utils/sendEmail.js'


export const registerUser = async (req, res) => {
   const {name,email, password, confirmPassword,
        role, institution
    } = req.body

    const hashPassword = async(password) => await bcrypt.hash(password, 10)

    if (password !== confirmPassword) {
        return res.status(400).json({message: "Passwords don't match!"})
    } else if(await findUserByEmail(email)){
         return res.status(400).json({message: "User already exists. Please log in"})
    }

    const user = {
        name: name,
        email: email,
        password: await hashPassword(password),
        role:role,
        institution:institution,
        createdAt: new Date()
    }

    await createUsers(user)
    const verificationToken = crypto.randomBytes(32).toString('hex')
    await updateUserByEmail(email, {verificationToken, verified:false})
    await sendVerificationEmail(email, verificationToken)
    return res.status(201).json({message: "User successfully created."})

}

export const loginUser =  async (req, res) => {
    const {email, password} = req.body
    const user = await findUserByEmail(email)

    if (!user) {
        return res.status(400).json({message: "User not found."})
    } 
    const isMatch = await bcrypt.compare(password, user.password)
    
    if (!isMatch) {
        return res.status(400).json({message: "Password is incorrect. Try again."})
    }


    const token = jwt.sign({userID: user._id,
        role: user.role,
        email: user.email
    }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

    return res.status(200).json({token: token})

}

export const verifyEmail = async(req, res) => {
    try{
        const token = req.query.token
        const verifyUser = await findUserByVerificationToken(token)
        if(!verifyUser) {
            return res.status(404).json({message: 'User not found'})
        }
        else {
            await updateUserByEmail(verifyUser.email, {verified:true, verificationToken:null})
            return res.status(200).json({message: 'User verified Successfully'})
        }
    } catch (err) {
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

export const getMe = async(req, res) => {
    try {
        const user = await findUserByEmail(req.user.email)
        const { password, verificationToken, ...safeUser } = user
        return res.status(200).json(safeUser)
    } catch(err) {
        return res.status(500).json({message: 'Internal Server Error'})
    }
}