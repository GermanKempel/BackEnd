const formLogin = document.getElementById("formLogin");
const loginButton = document.getElementById("loginButton");
const githubLoginButton = document.getElementById('githubLoginButton')

loginButton.addEventListener('click', async e => {
    e.preventDefault();

    const email = formLogin[0].value;
    const password = formLogin[1].value;

    const datos = {
        email: email,
        password: password,
    };

    console.log(datos);

    const response = await fetch('/api/sessions/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

    console.log(response);

    const json = await response.json();

    console.log(json);

    if (json.status === 'success') {
        window.location.replace('/products');
    } else {
        alert(json.error);
    }

    githubLoginButton.addEventListener('click', async e => {
        e.preventDefault();
        window.location.href = '/api/sessions/github';
    })
})