import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
} from 'nodemailer'

const testEmailAccount = await createTestAccount()

const transporter = createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: testEmailAccount.user,
    pass: testEmailAccount.pass,
  },
})

export async function sendEmail(to: string, subject: string, html: string) {
  const res = await transporter.sendMail({
    from: testEmailAccount.user,
    to,
    subject,
    html,
  })
  // eslint-disable-next-line no-console
  console.log('Preview email: %s', getTestMessageUrl(res))
}
