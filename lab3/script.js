document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.getElementById('burger-menu');
    const sidebar = document.getElementById('sidebar');
    
    
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('hamburger-menu--active')
        if (sidebar.style.left === '0px') {
            sidebar.style.left = '-250px';
        } else {
            sidebar.style.left = '0px';
        }
    });
});





// Инициализация задач из localStorage
const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

const newTasksContainer = document.getElementById('newTasks');
const inProgressTasksContainer = document.getElementById('inProgressTasks');
const completedTasksContainer = document.getElementById('completedTasks');

// Функция отображения задач
function renderTasks() {
    newTasksContainer.innerHTML = '';
    inProgressTasksContainer.innerHTML = '';
    completedTasksContainer.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';

        // Текст задачи
        const taskText = document.createElement('div');
        taskText.textContent = task.text;

        // Контейнер кнопок
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

// Функция перемещения задачи влево
function moveLeft(index) {
    if (tasks[index].status === 'inProgress') {
        tasks[index].status = 'new';
    } else if (tasks[index].status === 'completed') {
        tasks[index].status = 'inProgress';
    }
    renderTasks();
}

// Функция перемещения задачи вправо
function moveRight(index) {
    if (tasks[index].status === 'new') {
        tasks[index].status = 'inProgress';
    } else if (tasks[index].status === 'inProgress') {
        tasks[index].status = 'completed';
    }
    renderTasks();
}

// Функция удаления задачи
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Функция сохранения задач в localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция добавления новой задачи
function addTask(taskText) {
    if (!taskText.trim()) {
        alert('Задача не может быть пустой!');
        return;
    }
    tasks.push({ text: taskText.trim(), status: 'new' });
    renderTasks();
}

// Инициализация отображения задач
renderTasks();
