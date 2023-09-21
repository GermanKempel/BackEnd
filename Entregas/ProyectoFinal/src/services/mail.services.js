import { transporter } from '../utils.js'

export const sendMail = async (email) => {
  try {
    await transporter.sendMail({
      from: 'eCommerce GK',
      to: email.to,
      subject: email.subject,
      html: email.html
    })
  } catch (error) {
    logger.info('Error trying to send email', error);
  }

}