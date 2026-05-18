import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    if (!token || token === null) {
        return res.status(401).json({message: "Not authorized"})
    }
    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verifiedToken
        next()
    }
    catch(err){
        console.log(err)
        return res.status(401).json({message: "Not authorized"})
    }
    
    

}

export default authMiddleware
