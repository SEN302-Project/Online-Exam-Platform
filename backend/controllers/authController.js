import bcrypt from 'bcrypt'
import { findUserByEmail, createUsers  } from '../models/userModel.js'
import jwt from 'jsonwebtoken'


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

export const verifyEmail = (req, res) => {
    res.json({message: "route name works"})
}

export const getMe = (req, res) => {
    return res.status(200).json(req.user)
}