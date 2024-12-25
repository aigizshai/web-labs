
const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

const newTasksContainer = document.getElementById('newTasks');
const inProgressTasksContainer = document.getElementById('inProgressTasks');
const completedTasksContainer = document.getElementById('completedTasks');

function renderTasks() {
    newTasksContainer.innerHTML = '';
    inProgressTasksContainer.innerHTML = '';
    completedTasksContainer.innerHTML = '';

    tasks.forEach((task, index) => {const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        const newTasksContainer = document.getElementById('newTasks');
        const inProgressTasksContainer = document.getElementById('inProgressTasks');
        const completedTasksContainer = document.getElementById('completedTasks');
        
        function renderTasks() {
            newTasksContainer.innerHTML = '';
            inProgressTasksContainer.innerHTML = '';
            completedTasksContainer.innerHTML = '';
        
            tasks.forEach((task, index) => {
                const taskElement = document.createElement('div');
                taskElement.className = 'task';
        
                const taskText = document.createElement('div');
                taskText.textContent = task.text;
        
                // Добавляем обработчик для редактирования задачи по двойному клику
                taskText.ondblclick = () => editTask(index, taskText);
        
                const buttonContainer = document.createElement('div');
                buttonContainer.className = 'button-container';
        
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Удалить';
                deleteButton.classList.add('delete');
                deleteButton.onclick = () => deleteTask(index);
        
                if (task.status === 'new') {
                    const rightButton = document.createElement('button');
                    rightButton.textContent = '>';
                    rightButton.onclick = () => moveRight(index);
        
                    buttonContainer.classList.add('centered');
                    buttonContainer.appendChild(deleteButton);
                    buttonContainer.appendChild(rightButton);
        
                    taskElement.appendChild(taskText);
                    taskElement.appendChild(buttonContainer);
                    newTasksContainer.appendChild(taskElement);
        
                } else if (task.status === 'inProgress') {
                    const leftButton = document.createElement('button');
                    leftButton.textContent = '<';
                    leftButton.onclick = () => moveLeft(index);
        
                    const rightButton = document.createElement('button');
                    rightButton.textContent = '>';
                    rightButton.onclick = () => moveRight(index);
        
                    buttonContainer.classList.remove('centered');
                    buttonContainer.appendChild(leftButton);
                    buttonContainer.appendChild(deleteButton);
                    buttonContainer.appendChild(rightButton);
        
                    taskElement.appendChild(taskText);
                    taskElement.appendChild(buttonContainer);
                    inProgressTasksContainer.appendChild(taskElement);
        
                } else if (task.status === 'completed') {
                    const leftButton = document.createElement('button');
                    leftButton.textContent = '<';
                    leftButton.onclick = () => moveLeft(index);
        
                    buttonContainer.classList.add('centered');
                    buttonContainer.appendChild(leftButton);
                    buttonContainer.appendChild(deleteButton);
        
                    taskElement.appendChild(taskText);
                    taskElement.appendChild(buttonContainer);
                    completedTasksContainer.appendChild(taskElement);
                }
            });
        
            saveTasks();
        }
        
        function moveLeft(index) {
            if (tasks[index].status === 'inProgress') {
                tasks[index].status = 'new';
            } else if (tasks[index].status === 'completed') {
                tasks[index].status = 'inProgress';
            }
            renderTasks();
        }
        
        function moveRight(index) {
            if (tasks[index].status === 'new') {
                tasks[index].status = 'inProgress';
            } else if (tasks[index].status === 'inProgress') {
                tasks[index].status = 'completed';
            }
            renderTasks();
        }
        
        function deleteTask(index) {
            tasks.splice(index, 1);
            renderTasks();
        }
        
        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        
        function addTask(taskText) {
            if (!taskText.trim()) {
                alert('Задача не может быть пустой!');
                return;
            }
            tasks.push({ text: taskText.trim(), status: 'new' });
            renderTasks();
        }
        
        function editTask(index, taskTextElement) {
            const task = tasks[index];
        
            // Создаем поле ввода для редактирования
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = task.text;
        
            // Заменяем текст на поле для ввода
            taskTextElement.innerHTML = '';
            taskTextElement.appendChild(inputField);
        
            // Фокус на поле ввода
            inputField.focus();
        
            // Когда поле ввода теряет фокус, сохраняем изменения
            inputField.onblur = () => saveEdit(index, inputField, taskTextElement);
        
            // Или сохраняем изменения по нажатию Enter
            inputField.onkeydown = (e) => {
                if (e.key === 'Enter') {
                    saveEdit(index, inputField, taskTextElement);
                }
            };
        }
        
        function saveEdit(index, inputField, taskTextElement) {
            const newText = inputField.value.trim();
            if (newText) {
                tasks[index].text = newText;
                renderTasks();
            } else {
                // Если текст пустой, восстанавливаем старое значение
                taskTextElement.textContent = tasks[index].text;
            }
        }
        
        renderTasks();
        
        const taskElement = document.createElement('div');
        taskElement.className = 'task';

        const taskText = document.createElement('div');
        taskText.className = 'task-text';
        taskText.textContent = task.text;

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.classList.add('delete');
        deleteButton.onclick = () => deleteTask(index);

        buttonContainer.classList.add('centered');
        buttonContainer.appendChild(deleteButton);

        if (task.status === 'new') {
            const rightButton = document.createElement('button');
            rightButton.textContent = '>';
            rightButton.onclick = () => moveRight(index);

            buttonContainer.appendChild(rightButton);

            taskElement.appendChild(taskText);
            taskElement.appendChild(buttonContainer);
            newTasksContainer.appendChild(taskElement);

        } else if (task.status === 'inProgress') {
            const leftButton = document.createElement('button');
            leftButton.textContent = '<';
            leftButton.onclick = () => moveLeft(index);

            const rightButton = document.createElement('button');
            rightButton.textContent = '>';
            rightButton.onclick = () => moveRight(index);

            buttonContainer.appendChild(leftButton);
            buttonContainer.appendChild(rightButton);

            taskElement.appendChild(taskText);
            taskElement.appendChild(buttonContainer);
            inProgressTasksContainer.appendChild(taskElement);

        } else if (task.status === 'completed') {
            const leftButton = document.createElement('button');
            leftButton.textContent = '<';
            leftButton.onclick = () => moveLeft(index);

            buttonContainer.classList.add('centered');
            buttonContainer.appendChild(leftButton);

            taskElement.appendChild(taskText);
            taskElement.appendChild(buttonContainer);
            completedTasksContainer.appendChild(taskElement);
        }

        // Обработчик для двойного клика по задаче (редактирование)
        taskText.ondblclick = () => editTask(index, taskText);
    });

    saveTasks();
}

function moveLeft(index) {
    if (tasks[index].status === 'inProgress') {
        tasks[index].status = 'new';
    } else if (tasks[index].status === 'completed') {
        tasks[index].status = 'inProgress';
    }
    renderTasks();
}

function moveRight(index) {
    if (tasks[index].status === 'new') {
        tasks[index].status = 'inProgress';
    } else if (tasks[index].status === 'inProgress') {
        tasks[index].status = 'completed';
    }
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(taskText) {
    if (!taskText.trim()) {
        alert('Задача не может быть пустой!');
        return;
    }
    tasks.push({ text: taskText.trim(), status: 'new' });
    renderTasks();
}

function editTask(index, taskTextElement) {
    const task = tasks[index];

    // Создаем поле ввода для редактирования
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = task.text;

    // Заменяем текст на поле для ввода
    taskTextElement.innerHTML = '';
    taskTextElement.appendChild(inputField);

    // Фокус на поле ввода
    inputField.focus();

    // Когда поле ввода теряет фокус, сохраняем изменения
    inputField.onblur = () => saveEdit(index, inputField, taskTextElement);

    // Или сохраняем изменения по нажатию Enter
    inputField.onkeydown = (e) => {
        if (e.key === 'Enter') {
            saveEdit(index, inputField, taskTextElement);
        }
    };
}

function saveEdit(index, inputField, taskTextElement) {
    const newText = inputField.value.trim();
    if (newText) {
        tasks[index].text = newText;
        renderTasks();
    } else {
        // Если текст пустой, восстанавливаем старое значение
        taskTextElement.textContent = tasks[index].text;
    }
}

renderTasks();
