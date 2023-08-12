const form = document.getElementById('registerForm');

form.addEventListener('submit', async e => {
    e.preventDefault();

    const datos = {
        first_name: form[0].value,
        last_name: form[1].value,
        email: form[2].value,
        age: form[3].value,
        password: form[4].value,
    }

    const respuesta = await fetch('/api/sessions/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

    const json = await respuesta.json();

    if (json.status === 'success') {
        window.location.replace('/login');
    } else {
        alert(json.error);
    }
})