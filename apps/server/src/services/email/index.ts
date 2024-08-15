import { sendEmail as nodemailerSendEmail } from './nodemailer'
import { sendEmail as resendSendEmail } from './resend'
import { generateInviteToken, generateVerifyToken } from '@/utils'
import type { SendEmailOptions } from '@/types'

interface InviteEmailOptions {
  email: string
  userId: string
  boardId: string
  boardName: string
}

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

export async function sendInviteEmail(option: InviteEmailOptions) {
  const { email, userId, boardId, boardName } = option
  const verifyToken = generateInviteToken(userId, boardId)
  const verifyLink = `${Bun.env.CLIENT_URL}/boards/${boardId}/invite?token=${verifyToken}`

  await sendEmail({
    to: email,
    subject: `Invite to Scrumlens`,
    html: `
<h2>You have been invited to board "${boardName}"</h2>
<p>To accept the invitation, please click the link below</p>
<p><a href="${verifyLink}">Invite Link</a></p>`,
  })
}
