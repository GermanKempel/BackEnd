const form = document.getElementById('resetPassForm');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const obj = {
    email: form[0].value
  };
  const response = await fetch('/api/sessions/reset-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  });
  const json = await response.json();

  if (json.status === 'success') {
    window.location.replace('/login');
  }
  else {
    alert(json.error);
  }
}
);