const createUser = async (userData) => {
    try {
        const createdUser = await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then(res => res.json());
        return createdUser;
    } catch (error) {
        console.error(error);
    }
};

const nameInput = document.getElementById('signin-username');
const emailInput = document.getElementById('signin-email');
const passwordInput = document.getElementById('signin-password');
const signinButton = document.getElementById('signin-btn');
console.log(signinButton.textContent);
const signinSuccessAlert = document.getElementById('signin-success');

signinButton.addEventListener('click', async () => {
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    if(!name || !email || !password) {
        return alert('Enter all the information!');
    }

    const userData = { name, email, password };
    const user = await createUser(userData);

    if (user) {
        signinSuccessAlert.className += 'flex';
        setTimeout(() => {
            window.location.href = 'http://127.0.0.1:5500/src/frontend/login/index.html'
        }, 2000);
    }
})