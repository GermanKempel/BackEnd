import { transporter } from '../utils.js'

export const sendMail = async (email) => {
  await transporter.sendMail({
    from: 'eCommerce GK',
    to: email.to,
    subject: email.subject,
    html: email.html
  })
}