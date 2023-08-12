const formLogin = document.getElementById("loginForm");

formLogin.addEventListener('submit', async e => {
    e.preventDefault()

    const datos = {
        email: formLogin[0].value,
        password: formLogin[1].value,
    }

    const respuesta = await fetch('/api/sessions/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

    const json = await respuesta.json();

    if (json.status === 'success') {
        window.location.replace('/products');
    } else {
        alert(json.error);
    }
})