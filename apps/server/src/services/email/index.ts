import { resolve } from 'node:path'
import ejs from 'ejs'
import { sendEmail as nodemailerSendEmail } from './nodemailer'
import { sendEmail as resendSendEmail } from './resend'
import type { EmailTemplateOptions, InviteEmailOptions } from './types'
import { generateInviteToken, generateVerifyToken } from '@/utils'
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

export async function sendVerifyEmail(options: EmailTemplateOptions) {
  const { email, userId, data } = options

  const verifyToken = generateVerifyToken(userId)
  const verifyLink = `${Bun.env.CLIENT_URL}/auth/verify?token=${verifyToken}`

  const file = Bun.file(`${resolve(__dirname)}/templates/registration.ejs`)
  const text = await file.text()

  const html = ejs.render(text, {
    ...data,
    url: verifyLink,
    year: new Date().getFullYear(),
  })

  await sendEmail({
    to: email,
    subject: 'Verify your email address',
    html,
  })
}

export async function sendInviteEmail(option: InviteEmailOptions) {
  const { email, userId, boardId, data } = option
  const verifyToken = generateInviteToken(userId, boardId)
  const verifyLink = `${Bun.env.CLIENT_URL}/boards/${boardId}/invite?token=${verifyToken}`

  const file = Bun.file(`${resolve(__dirname)}/templates/invite.ejs`)
  const text = await file.text()

  const html = ejs.render(text, {
    ...data,
    url: verifyLink,
    year: new Date().getFullYear(),
  })

  await sendEmail({
    to: email,
    subject: `Invite to Scrumlens Board "${data.boardName}"`,
    html,
  })
}
