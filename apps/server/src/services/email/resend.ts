import { Resend } from 'resend'

const resend = new Resend(Bun.env.RESEND_API_KEY)

export async function sendEmail(to: string, subject: string, html: string) {
  await resend.emails.send({
    from: `Scrumlens <no-reply@${Bun.env.EMAIL_DOMAIN || 'scrumlens.com'}>`,
    to,
    subject,
    html,
  })
}
