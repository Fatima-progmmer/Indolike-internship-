let taskList = document.getElementById('task-list');
let addTaskButton = document.getElementById('add-task');
let taskInput = document.getElementById('task');

loadTasks();

addTaskButton.addEventListener('click', addTask);

function addTask() {
    let task = taskInput.value.trim();
    if (task) {
        let taskElement = document.createElement('li');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <span class="task-text">${task}</span>
            <button class="edit-task">✍️</button>
            <button class="delete-task">🗑️</button>
        `;
        taskList.appendChild(taskElement);
        taskInput.value = '';
        deleteTask(taskElement);
        editTask(taskElement);
        saveTasks(); 
    }
}

function deleteTask(taskElement) {
    let deleteButton = taskElement.querySelector('.delete-task');
    deleteButton.addEventListener('click', () => {
        taskElement.remove();
        saveTasks(); 
    });
}

function editTask(taskElement) {
    let editButton = taskElement.querySelector('.edit-task');
    let taskText = taskElement.querySelector('.task-text');
    editButton.addEventListener('click', () => {
        if (editButton.textContent === '✍️') {
            let inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = taskText.textContent;
            taskElement.replaceChild(inputField, taskText);
            editButton.textContent = '☑️';
            inputField.focus();
            inputField.addEventListener('blur', () => {
                taskText = document.createElement('span');
                taskText.classList.add('task-text');
                taskText.textContent = inputField.value;
                taskElement.replaceChild(taskText, inputField);
                editButton.textContent = '✍️';
                saveTasks(); 
            });
        } else {
            taskText = document.createElement('span');
            taskText.classList.add('task-text');
            taskText.textContent = inputField.value;
            taskElement.replaceChild(taskText, inputField);
            editButton.textContent = '✍️';
            saveTasks(); 
        }
    });
}

function editTask(taskElement) {
    let editButton = taskElement.querySelector('.edit-task');
    let taskText = taskElement.querySelector('.task-text');
    let inputField = null;
    editButton.addEventListener('click', () => {
        if (editButton.textContent === '✍️') {
            inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = taskText.textContent;
            inputField.style.width = '40%';
            inputField.style.height = '25px'
            inputField.style.padding = '10px';
            inputField.style.fontSize = '16px';
            taskElement.replaceChild(inputField, taskText);
            editButton.textContent = '☑️';
            editButton.style.background = 'white';
            editButton.style.color = 'black';
            inputField.focus();
        } else {
            taskText = document.createElement('span');
            taskText.classList.add('task-text');
            taskText.textContent = inputField.value;
            taskElement.replaceChild(taskText, inputField);
            editButton.textContent = '✍️';
            editButton.style.background = 'white';
            editButton.style.color = 'black';
            saveTasks(); 
        }
    });
}


function saveTasks() {
    let tasks = [];
    let taskElements = taskList.children;
    for (let i = 0; i < taskElements.length; i++) {
        let taskText = taskElements[i].querySelector('.task-text').textContent;
        tasks.push(taskText);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    for (let i = 0; i < tasks.length; i++) {
        let taskElement = document.createElement('li');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <span class="task-text">${tasks[i]}</span>
            <button class="edit-task">✍️</button>
            <button class="delete-task">🗑️</button>
        `;
        taskList.appendChild(taskElement);
        deleteTask(taskElement);
        editTask(taskElement);
    }
}