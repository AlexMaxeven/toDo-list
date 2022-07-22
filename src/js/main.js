// находим элементы на странице
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => renderTask(task));
};

checkEmptyList();

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

    // Описываем задачу ввиде обьекта
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    // Добавляем задачу в массив с задачами
    tasks.push(newTask);

    // Добавляем задачу в хранилище local storage
    saveToLocalStorage();

    // рендерим задачу на страницу
    renderTask(newTask);

    // очищаем поле ввода и возвращаем фокус на него
    taskInput.value = "";
    taskInput.focus();
    checkEmptyList();    

};
function deleteTask(event) {
    // Проверяем если клик был не по кнопке "Удалить задачу"
    if (event.target.dataset.action !== 'delete') return;
    
    // Проверяем что клик был по кнопке "Удалить задачу"
    const parentNode = event.target.closest('.list-group__item');
    
    // определяем id задачи
    const id = Number(parentNode.id);

    // Удаляем задачу через фильтрацию массива
    tasks = tasks.filter((task) => task.id !== id);

    // Добавляем задачу в хранилище local storage
    saveToLocalStorage();
    // Удаляем задачу из разметки
    parentNode.remove();

    checkEmptyList();
    
};
function donetask(event) {
    // Проверяем если клик был не по задаче выполнено
    if(event.target.dataset.action !== "done") return;
    // Проверяем что клик был по задаче выполнено    
    const parentNode = event.target.closest('.list-group__item');
    
    // Определяем id задачи
    const id = Number(parentNode.id);
    
    const task = tasks.find ((task) => task.id === id); 
    task.done = !task.done;


    saveToLocalStorage();

    const taskTitle = parentNode.querySelector('.task__title');
    taskTitle.classList.toggle('task__title--done');
};
function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `
        <li id="emptyList" class="list-group__item list-group__item-main ">                           
            <img src="img/loading.png" alt="" class="list-group__img">
            <p class="list-group__text">Список дел пуст</p>
        </li>
        `;
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    };

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    };
};
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function renderTask(task) {
    // Формируем css класс
    const cssClass = task.done ? "task__title task__title--done" : "task__title";

    // формируем разметку для новой задачи
    const taskHTML = `
    <li id="${task.id}" class="list-group__item">                           
        <h2 class="${cssClass}">${task.text}</h2>
        <div class="task-item__buttons">
            <button class="button btn-action active" data-action="done" >Yes</button>
            <button class="button btn-action pass" data-action="delete" >No</button>
        </div>
    </li>`;

    // добавляем задачу на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);

}