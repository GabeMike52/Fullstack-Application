const doLogin = async (userData) => {
    try {
        const userLogged = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then(res => res.json());
        return userLogged;
    } catch (error) {
        console.error(error);
    }
};

const nameInput = document.getElementById('login-username');
const passwordInput = document.getElementById('login-password');
const loginButton = document.getElementById('login-button');
console.log(loginButton.textContent);
const loginSuccessAlert = document.getElementById('login-success');

loginButton.addEventListener('click', async () => {
    const name = nameInput.value;
    const password = passwordInput.value;

    if(!name || !password) {
        return alert('Enter all the information!');
    }

    const userData = { name, password };
    const user = await doLogin(userData);

    if (user) {
        loginSuccessAlert.className += 'flex';
        setTimeout(() => {
            window.location.href = 'http://127.0.0.1:5500/src/frontend/events/index.html'
        }, 1000);
    }
});