
const regexUsername = /^[a-zA-Z]{2,}$/; 
const regexPassword = /^[a-zA-Z0-9-_#@]{2,20}$/; 


const errUsername = document.getElementById('err1');
const errPassword = document.getElementById('err2');


function formSubmit(event) {
    event.preventDefault();

    // Get input values
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
        errPassword.innerText = 'Invalid password. It should be 8-20 characters long.';
        errPassword.style.color = 'red';
        valid = false;
    }


    if (valid && username === 'admin' && password === '12345') {
        
        alert('Username and password validated successfully.');
        redirectToMainPage();
    } else {
       
        if (username !== 'admin') {
            errUsername.innerText = 'Invalid username. Must be "admin".';
            errUsername.style.color = 'red';
        }
        if (password !== '12345') {
            errPassword.innerText = 'Invalid password. Must be "12345".';
            errPassword.style.color = 'red';
        }
    }
}


function redirectToMainPage() {
    window.location.href = 'homepage.html'; 
}

document.getElementById('loginForm').addEventListener('submit', formSubmit);


document.addEventListener('DOMContentLoaded', function() {
    
    if (window.location.pathname.includes('homepage.html')) {
     
        fetchTodos();
       
        document.getElementById('logout').addEventListener('click', function() {
            window.location.href = 'index.html'; 
        });
    }
});

async function fetchTodos() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const todos = await response.json();
        
        const todoList = document.getElementById('todoList');
        let completedCount = 0;
        
        todos.forEach(todo => {
            const listItem = document.createElement('li');
            const listItemContent = document.createElement('div');
            listItemContent.className = 'input-group mb-3';
            listItemContent.innerHTML = `
                <div class="input-group-text">
                    <input class="form-check-input mt-0" type="checkbox" ${todo.completed ? 'checked' : ''} aria-label="Checkbox for task" data-id="${todo.id}">
                </div>
                <input type="text" class="form-control" value="${todo.title}" aria-label="Task input" readonly>
            `;
            listItem.appendChild(listItemContent);
            
            if (todo.completed) {
                completedCount++;
            }
            
            todoList.appendChild(listItem);
        });
        
       
        if (completedCount >= 5) {
            alert('Congrats. 5 Tasks have been Successfully Completed');
        }
      
        document.querySelectorAll('.form-check-input').forEach(checkbox => {
            checkbox.addEventListener('change', handleCheckboxChange);
        });
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

function handleCheckboxChange(event) {
    const checkbox = event.target;
    if (checkbox.checked) {
        checkCompletedTasks();
    }
}

async function checkCompletedTasks() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const todos = await response.json();
        
        const completedCount = todos.filter(todo => todo.completed).length;
        
       
        if (completedCount >= 5) {
            alert('Congrats. 5 Tasks have been Successfully Completed');
        }
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}
