import PDFDocument from 'pdfkit'

export const generateResultPDF = (result, res) => {
    const doc = new PDFDocument()
    
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename=result-${result._id}.pdf`)
    
    doc.pipe(res)
    
    doc.fontSize(20).text('Exam Result', { align: 'center' })
    doc.moveDown()
    doc.fontSize(12).text(`Student ID: ${result.studentId}`)
    doc.text(`Exam ID: ${result.examId}`)
    doc.text(`Total Score: ${result.totalScore} / ${result.maxScore}`)
    doc.text(`Status: ${result.status}`)
    doc.text(`Passed: ${result.passed ? 'Yes' : 'No'}`)
    doc.text(`Submitted At: ${new Date(result.submittedAt).toLocaleString()}`)
    doc.text(`Graded At: ${new Date(result.gradedAt).toLocaleString()}`)
    doc.moveDown()
    doc.fontSize(14).text('Answers:', { underline: true })
    doc.moveDown()
    
    result.answers.forEach((answer, index) => {
        doc.fontSize(11).text(`Q${index + 1}. Question ID: ${answer.questionId}`)
        doc.text(`Response: ${answer.response}`)
        doc.text(`Correct: ${answer.isCorrect === null ? 'Pending' : answer.isCorrect ? 'Yes' : 'No'}`)
        doc.text(`Points: ${answer.pointsAwarded ?? 'Pending'}`)
        doc.moveDown()
    })
    
    doc.end()
}