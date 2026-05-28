import {
    findAllUsers, findUserById, updateUserById,
    deleteUserById, createAuditLog, findAllAuditLogs
} from '../models/adminModel.js'

export const getAllUsers = async (req, res) => {
    try {
        const { role, search } = req.query
        const filter = {}
        if (role) filter.role = role
        if (search) filter.$or = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ]
        const users = await findAllUsers(filter)
        return res.status(200).json(users)
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params
        const { role } = req.body
        await updateUserById(id, { role })
        await createAuditLog({
            actor: req.user.email,
            action: 'User role changed',
            target: id,
            ip: req.ip,
            timestamp: new Date()
        })
        return res.status(200).json({ message: 'Role updated' })
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body
        await updateUserById(id, { status })
        await createAuditLog({
            actor: req.user.email,
            action: `User account ${status}`,
            target: id,
            ip: req.ip,
            timestamp: new Date()
        })
        return res.status(200).json({ message: 'Status updated' })
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        await deleteUserById(id)
        await createAuditLog({
            actor: req.user.email,
            action: 'User deleted',
            target: id,
            ip: req.ip,
            timestamp: new Date()
        })
        return res.status(200).json({ message: 'User deleted' })
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const getAuditLogs = async (req, res) => {
    try {
        const logs = await findAllAuditLogs()
        return res.status(200).json(logs)
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}