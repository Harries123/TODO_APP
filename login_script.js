const regexUsername = /^[a-zA-Z]{2,}$/;
const regexPassword = /^[a-zA-Z0-9-_#@]{2,20}$/;

const errUsername = document.getElementById('err1');
const errPassword = document.getElementById('err2');

function formSubmit(event, callback) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    let valid = true;

    // Validate username
    if (regexUsername.test(username)) {
        errUsername.innerText = '';
        errUsername.style.color = '';
    } else {
        errUsername.innerText = 'Invalid username. It should be at least 2 letters.';
        errUsername.style.color = 'red';
        valid = false;
    }

    // Validate password
    if (regexPassword.test(password)) {
        errPassword.innerText = '';
        errPassword.style.color = '';
    } else {
        errPassword.innerText = 'Invalid password. It should be 2-20 characters long.';
        errPassword.style.color = 'red';
        valid = false;
    }

    if (valid && username === 'admin' && password === '12345') {
        alert('Username and password validated successfully.');
        callback();
    } else {
        if (username !== 'admin') {
            errUsername.innerText = 'Invalid username';
            errUsername.style.color = 'red';
        }
        if (password !== '12345') {
            errPassword.innerText = 'Invalid password';
            errPassword.style.color = 'red';
        }
    }
}

function redirectToMainPage() {
    window.location.href = 'homepage.html';
}


document.getElementById('loginForm').addEventListener('submit', function(event) {
    formSubmit(event, redirectToMainPage);
});