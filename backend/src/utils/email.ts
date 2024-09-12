import { createTransport } from 'nodemailer'
import fs from 'fs'
import path from 'path'
import { envConfig } from '~/constants/config'

const verifyEmailTemplate = fs.readFileSync(path.resolve('src/templates/verify.html'), 'utf8')

export const sendEmail = ({
  email,
  subject,
  title,
  otp
}: {
  email: string
  subject: string
  title: string
  otp: string
}) => {
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: envConfig.dbEmailUser,
      pass: envConfig.dbPasswordUser
    }
  })

  const fillVerifyEmailTemplate = verifyEmailTemplate.replace('{{title}}', title).replace('{{otp}}', otp)

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: fillVerifyEmailTemplate
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}
