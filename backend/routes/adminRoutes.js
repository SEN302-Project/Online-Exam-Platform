import express from 'express'
import {
    getAllUsers, updateUserRole, updateUserStatus,
    deleteUser, getAuditLogs, getUserById
} from '../controllers/adminController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import roleMiddleware from '../middleware/roleMiddleware.js'

const adminRouter = express.Router()

adminRouter.get('/admin/users', authMiddleware, roleMiddleware('admin'), getAllUsers)
adminRouter.put('/admin/users/:id/role', authMiddleware, roleMiddleware('admin'), updateUserRole)
adminRouter.put('/admin/users/:id/status', authMiddleware, roleMiddleware('admin'), updateUserStatus)
adminRouter.delete('/admin/users/:id', authMiddleware, roleMiddleware('admin'), deleteUser)
adminRouter.get('/admin/users/:id', authMiddleware, roleMiddleware('admin'), getUserById)
adminRouter.get('/admin/audit-logs', authMiddleware, roleMiddleware('admin'), getAuditLogs)

export default adminRouter