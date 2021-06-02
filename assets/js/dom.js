const UNCOMPLETED_LIST_TODO_ID = 'todos';
const COMPLETED_LIST_TODO_ID = 'completed-todos';

const addToDo = () => {
    const uncompletedListTodo = document.getElementById(
        UNCOMPLETED_LIST_TODO_ID
    );

    const title = document.getElementById('title').value;
    const timeStamp = document.getElementById('date').value;

    const todo = makeToDo(title, timeStamp);
    uncompletedListTodo.append(todo);
};

const makeToDo = (title, timeStamp, isCompleted) => {
    const textTitle = document.createElement('h2');
    textTitle.innerText = title;
    const textTimeStamp = document.createElement('p');
    textTimeStamp.innerText = timeStamp;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textTimeStamp);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');

    isCompleted
        ? container.append(
              textContainer,
              createUndoButton(),
              createTrashButton()
          )
        : container.append(textContainer, createCheckButton());

    return container;
};

const createButton = (buttonTypeClass, evenListener) => {
    const button = document.createElement('button');
    button.classList.add(buttonTypeClass);
    button.addEventListener('click', event => {
        evenListener(event);
    });

    return button;
};

const addTaskToCompleted = taskElement => {
    const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);

    const taskTitle = taskElement.querySelector('.inner > h2').innerText;
    const taskTimeStamp = taskElement.querySelector('.inner > p').innerText;
    console.log(taskTitle);
    const newTodo = makeToDo(taskTitle, taskTimeStamp, true);
    listCompleted.append(newTodo);
    taskElement.remove();
};

const createCheckButton = () => {
    return createButton('check-button', event => {
        addTaskToCompleted(event.target.parentElement);
    });
};

const removeTaskFromCompleted = taskElement => {
    taskElement.remove();
};

const createTrashButton = () => {
    return createButton('trash-button', event => {
        removeTaskFromCompleted(event.target.parentElement);
    });
};

const undoTaskFromCompleted = taskElement => {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);

    const taskTitle = taskElement.querySelector('.inner > h2').innerText;
    const taskTimeStamp = taskElement.querySelector('.inner > p').innerText;

    const newTodo = makeToDo(taskTitle, taskTimeStamp, false);
    listUncompleted.append(newTodo);
    taskElement.remove();
};

const createUndoButton = () => {
    return createButton('undo-button', event => {
        undoTaskFromCompleted(event.target.parentElement);
    });
};

export { addToDo };
