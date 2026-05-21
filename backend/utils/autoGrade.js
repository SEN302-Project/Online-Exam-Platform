import {findQuestions} from '../models/questionModel.js'

const autoGrade = async (exam, submissionData) => {
    const allQuestions = await findQuestions({examId: exam._id})
    const gradedAnswers = await Promise.all(
        submissionData.answers.map(async(answer)=>{
            const question = allQuestions.find(q => q._id.toString() === answer.questionId)
        if (question.type === 'mcq' || question.type === 'true_false'){
            return {
                ...answer,
                isCorrect: answer.response === question.correctAnswer,
                pointsAwarded: answer.response === question.correctAnswer ?
                exam.pointsPerQuestion : 0
            }
        } else {
            return {
                ...answer,
                isCorrect: null,
                pointsAwarded: null
            }
        }

        } 
    )
)
const totalScore = gradedAnswers.reduce((total, a) => total + (a.pointsAwarded || 0), 0)
const maxScore = allQuestions.length * exam.pointsPerQuestion
const status = gradedAnswers.some(a=> a.pointsAwarded === null) ? "pending_review" : "graded"
const passed = totalScore >= exam.passingThreshold

const result = {
    studentId: submissionData.studentId,
    examId: submissionData.examId,
    answers: gradedAnswers,
    totalScore,
    maxScore,
    status,
    passed,
    submittedAt: submissionData.startTime,
    gradedAt: new Date()

}

return result

}

export default autoGrade