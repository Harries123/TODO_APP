let regex1 = /^([a-zA-Z]{2,})$/;
let regex2 = /^([a-zA-Z0-9\-_#@]{8,20})$/;

let err1 = document.getElementById('err1');
let err2 = document.getElementById('err2');

function formSubmit() {
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let valid = true; 


    if (regex1.test(username.value)) {
        err1.innerText = 'Valid username';
        err1.style.color = 'green';
    } else {
        err1.innerText = 'Invalid username';
        err1.style.color = 'red';
        valid = false;
    }

  
    if (regex2.test(password.value)) {
        err2.innerText = 'Valid password';
        err2.style.color = 'green';
    } else {
        err2.innerText = 'Please enter at least 8 character valid password';
        err2.style.color = 'red';
        valid = false;
    }

   
    if (valid) {
        alert('Username and password validated');
        return true; 
    } else {
        return false; 
    }
}

