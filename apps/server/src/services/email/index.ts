import { sendEmail as nodemailerSendEmail } from './nodemailer'
import { sendEmail as resendSendEmail } from './resend'
import { generateVerifyToken } from '@/utils'
import type { SendEmailOptions } from '@/types'

const isDev = Bun.env.NODE_ENV === 'development'

async function sendEmail(payload: SendEmailOptions) {
  const { to, subject, html } = payload

  if (isDev) {
    await nodemailerSendEmail(to, subject, html)
  }
  else {
    await resendSendEmail(to, subject, html)
  }
}

export async function sendVerifyEmail(email: string, userId: string) {
  const verifyToken = generateVerifyToken(userId)
  const verifyLink = `${Bun.env.CLIENT_URL}/auth/verify?token=${verifyToken}`

  await sendEmail({
    to: email,
    subject: 'Verify your email address',
    html: `
<h2>Welcome to Scrumlens!</h2>
<p>To continue setting up your account, please verify your email address</p>
<p><a href="${verifyLink}">Verify Link</a></p>`,
  })
}
