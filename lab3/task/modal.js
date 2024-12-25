const openDialogBtn = document.getElementById('openDialogBtn');
const closeDialogBtn = document.getElementById('closeDialogBtn');
const taskDialog = document.getElementById('taskDialog');
const addTaskForm = document.getElementById('addTaskForm');

if (!openDialogBtn || !taskDialog || !closeDialogBtn || !addTaskForm) {
    console.error('Не удалось найти элементы на странице');
}

openDialogBtn.addEventListener('click', () => {
    taskDialog.showModal();
});

closeDialogBtn.addEventListener('click', () => {
    taskDialog.close();
});

taskDialog.addEventListener("click", (event) => {
    if (event.target ===taskDialog) {
        taskDialog.close();
    }
});

addTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskText = document.getElementById('taskText').value;

    if (taskText) {
        const newTaskElement = document.createElement('div');
        newTaskElement.textContent = taskText;
        document.getElementById('newTasks').appendChild(newTaskElement);
        console.log('Задача добавлена:', taskText);
    }

    taskDialog.close(); 
});
