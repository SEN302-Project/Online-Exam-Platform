const roleMiddleware = (...roles) => {
    return (req, res, next) => {
        if(roles.includes(req.user.role)) {
            next()
        } else {
            return res.status(403).json({message: 'Unauthorized'})
        }
    }
}

export default roleMiddleware