import { resetPasswordNotification } from "../../utils/custom-html.js";
import { sendMail } from "../../services/mail.services.js";

const form = document.getElementById('resetPassForm');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => obj[key] = value);
  const response = await fetch('/api/sessions/reset-password', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const result = await response.json();
  console.log(result);

  if (result.status === 'success') {
    await sendMail({
      to: result.email,
      subject: 'Reset Password',
      html: resetPasswordNotification(result.name, result.token)
    });
    window.location.replace('/login');
  }
}
);