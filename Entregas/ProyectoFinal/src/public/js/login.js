const form = document.getElementById('loginForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            window.location.replace('/');
        }
    })
})

// const formLogin = document.getElementById("formLogin");
// formLogin.addEventListener('submit', async e => {

//     e.preventDefault()

//     const datos = {
//         email: formLogin[0].value,
//         password: formLogin[1].value,
//     }

//     const respuesta = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(datos)
//     });

//     if (respuesta.status === 200) {
//         console.log(document.cookie);
//     } else {
//         location.href = '/login'
//     }
// })