import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (to, token) => {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to,
        subject: '✅ Verify your OEP account',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <h2 style="color: #333;">Welcome to the Online Exam Platform 🎓</h2>
            <p style="color: #555;">Thanks for registering! Please verify your email address to get started.</p>
            <a href="http://localhost:5000/api/auth/verify?token=${token}" 
               style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">
               Verify My Email
            </a>
            <p style="color: #999; font-size: 12px;">If you didn't create an account, ignore this email.</p>
            <p style="color: #999; font-size: 12px;">This link expires in 24 hours.</p>
        </div>
        `
    })
}