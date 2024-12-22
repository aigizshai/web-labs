// Получаем элементы
const openDialogBtn = document.getElementById('openDialogBtn');
const closeDialogBtn = document.getElementById('closeDialogBtn');
const taskDialog = document.getElementById('taskDialog');
const addTaskForm = document.getElementById('addTaskForm');

// Проверка, что элементы существуют
if (!openDialogBtn || !taskDialog || !closeDialogBtn || !addTaskForm) {
    console.error('Не удалось найти элементы на странице');
}

// Открытие модального окна
openDialogBtn.addEventListener('click', () => {
    console.log('Открытие модального окна');
    taskDialog.showModal();
});

// Закрытие модального окна при клике на кнопку "Закрыть"
closeDialogBtn.addEventListener('click', () => {
    console.log('Закрытие модального окна');
    taskDialog.close();
});

// Закрытие модального окна при отправке формы
addTaskForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    const taskText = document.getElementById('taskText').value;

    if (taskText) {
        // Добавляем задачу (можно добавить в список задач)
        const newTaskElement = document.createElement('div');
        newTaskElement.textContent = taskText;
        document.getElementById('newTasks').appendChild(newTaskElement);
        console.log('Задача добавлена:', taskText);
    }

    taskDialog.close(); // Закрываем модальное окно
});
