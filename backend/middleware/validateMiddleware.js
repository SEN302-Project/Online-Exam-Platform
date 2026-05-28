import { body, validationResult } from 'express-validator'

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

export const validateRegister = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').isIn(['student', 'instructor', 'proctor', 'admin']).withMessage('Invalid role'),
    handleValidationErrors
]

export const validateLogin = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    handleValidationErrors
]

export const validateExam = [
    body('title').notEmpty().withMessage('Title is required'),
    body('course').notEmpty().withMessage('Course is required'),
    body('duration').isNumeric().withMessage('Duration must be a number'),
    body('passingThreshold').isNumeric().withMessage('Passing threshold must be a number'),
    handleValidationErrors
]

export const validateQuestion = [
    body('prompt').notEmpty().withMessage('Question prompt is required'),
    body('type').isIn(['mcq', 'true_false', 'essay', 'coding', 'short_answer']).withMessage('Invalid question type'),
    body('difficulty').isIn(['easy', 'medium', 'hard']).withMessage('Invalid difficulty'),
    body('examId').notEmpty().withMessage('Exam ID is required'),
    handleValidationErrors
]