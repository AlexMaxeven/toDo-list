// находим элементы на странице
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

// Добавление задачи
form.addEventListener('submit', addTask);

// Удаление задачи
tasksList.addEventListener('click', deleteTask);

// Отмечаем задачу завершенной
tasksList.addEventListener('click', donetask);


// Функции
function addTask (event) {
    // отменяем отправку формы
    event.preventDefault();

    // достаем текст задачи из поля ввода
    const taskText = taskInput.value

    // формируем разметку для новой задачи
    const taskHTML = `
    <li class="list-group__item">                           
        <h2 class="task__title">${taskText}</h2>
        <div class="task-item__buttons">
            <button class="button btn-action active" data-action="done" >Yes</button>
            <button class="button btn-action pass" data-action="delete" >No</button>
        </div>
    </li>`;

    // добавляем задачу на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);

    // очищаем поле ввода и возвращаем фокус на него
    taskInput.value = "";
    taskInput.focus();

    // скриваем блок 'Список пуск' при добавлении новой задачи (более 1 элемента)
    if(tasksList.children.length > 1) {
        emptyList.classList.add('none');
    };
};
function deleteTask(event) {
    // Проверяем если клик был не по кнопке "Удалить задачу"
    if (event.target.dataset.action !== 'delete') return;
    // Проверяем что клик был по кнопке "Удалить задачу"
    const parentNode = event.target.closest('.list-group__item');
    parentNode.remove();
    
    if (tasksList.children.length === 1) {
        emptyList.classList.remove('none');
    };
};
function donetask(event) {
    // Проверяем если клик был не по задаче выполнено
    if(event.target.dataset.action !== "done") return;
    // Проверяем что клик был по задаче выполнено    
    const parentNode = event.target.closest('.list-group__item');
    const taskTitle = parentNode.querySelector('.task__title');
    taskTitle.classList.toggle('task__title--done');
};
