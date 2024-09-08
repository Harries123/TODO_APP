



document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('homepage.html')) {
        fetchTodos();

        
        document.getElementById('logout').addEventListener('click', function() {
            window.location.href = 'index.html';
        });

        // document.querySelector('.btn-success').addEventListener('click', addNewTask);
    }
});

// evdede add new task fn? poaylert vannalum mathyda evde ond peten choicha njn panic avum. the thing is alert varanol ee code il error free ayrnkanam athana njn fix akkan nokane oooooo oke whatever

let userCompletedCount = 0; 

async function fetchTodos() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const todos = await response.json();

        const todoList = document.getElementById('todoList');
        todoList.innerHTML = ''; 

        todos.forEach(todo => {
            const listItem = document.createElement('li');
            const listItemContent = document.createElement('div');
            listItemContent.className = 'input-group mb-3';

            listItemContent.innerHTML = `
                <div class="input-group-text">
                    <input class="form-check-input mt-0" type="checkbox" ${todo.completed ? 'checked' : ''} aria-label="Checkbox for task" data-id="${todo.id}" ${todo.completed ? 'disabled' : ''}>
                </div>
                <input type="text" class="form-control" value="${todo.title}" aria-label="Task input" readonly>
            `;
            
            listItem.appendChild(listItemContent);
            todoList.appendChild(listItem);
            
            if (todo.completed) {
                userCompletedCount++; 
            }
        });

        
        document.querySelectorAll('.form-check-input:not([disabled])').forEach(checkbox => {
            console.log("ran this");
            checkbox.addEventListener('change', handleCheckboxChange);
        });

        checkCompletedTasks();
        
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

console.log("hi");

var initialCount = 0;

function handleCheckboxChange(event) {
    const checkbox = event.target;

    if (checkbox.checked) {
        initialCount++;
        userCompletedCount++;
    } else {
        initialCount--;
        userCompletedCount--;
    }
    

    console.log('User Completed Count:', userCompletedCount);  
    checkCompletedTasks();
}

function checkCompletedTasks() {
    if (initialCount === 5) {
        showCompletionModal();
        console.log("worked")
    } else {

        console.log(`Tasks completed: ${userCompletedCount}`);
    }
}

function showCompletionModal() {
 
    const modalHtml = `
        <div class="modal fade" id="taskCompletedModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Congratulations!</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Congrats. 5 Tasks have been Successfully Completed.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
                    </div>
                </div>
            </div>
        </div>
    `;

 
    if (!document.getElementById('taskCompletedModal')) {
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

   
    const taskCompletedModal = new bootstrap.Modal(document.getElementById('taskCompletedModal'));
    taskCompletedModal.show();
}

document.getElementById('todoListLink').addEventListener('click', function() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(todos => {
            const contentDiv = document.getElementById('content');
            contentDiv.innerHTML = '<h2>Todo List</h2>';
            const list = document.createElement('ul');
            let completedCount = 0;
            
            todos.forEach(todo => {
                const listItem = document.createElement('li');

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = false; 
                checkbox.id = `task-${todo.id}`;

                const label = document.createElement('label');
                label.htmlFor = checkbox.id;
                label.textContent = todo.title;

                listItem.appendChild(checkbox);
                listItem.appendChild(label);

                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        completedCount++;
                    } else {
                        completedCount--;
                    }

                   
                    if (completedCount === 5) {
                        showCompletionModal();
                    }
                });

                list.appendChild(listItem);
            });

            contentDiv.appendChild(list);
        });
});
