import {
    composeTodoObject,
    findTodo,
    findTodoIndex,
    todos,
    updateDataToStorage
} from './data.js';

const UNCOMPLETED_LIST_TODO_ID = 'todos';
const COMPLETED_LIST_TODO_ID = 'completed-todos';
const TODO_ITEMID = 'itemId';

const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);

const addToDo = () => {
    const title = document.getElementById('title').value;
    const timeStamp = document.getElementById('date').value;

    const todo = makeToDo(title, timeStamp, false);
    const todoObject = composeTodoObject(title, timeStamp, false);

    todo[TODO_ITEMID] = todoObject.id;
    todos.push(todoObject);
    listUncompleted.append(todo);
    updateDataToStorage();
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
    const taskTitle = taskElement.querySelector('.inner > h2').innerText;
    const taskTimeStamp = taskElement.querySelector('.inner > p').innerText;
    console.log(taskTitle);
    const newTodo = makeToDo(taskTitle, taskTimeStamp, true);

    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = true;
    newTodo[TODO_ITEMID] = todo.id;

    listCompleted.append(newTodo);
    taskElement.remove();

    updateDataToStorage();
};

const createCheckButton = () => {
    return createButton('check-button', event => {
        addTaskToCompleted(event.target.parentElement);
    });
};

const removeTaskFromCompleted = taskElement => {
    const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]);
    todos.splice(todoPosition, 1);

    taskElement.remove();
    updateDataToStorage();
};

const createTrashButton = () => {
    return createButton('trash-button', event => {
        removeTaskFromCompleted(event.target.parentElement);
    });
};

const undoTaskFromCompleted = taskElement => {
    const taskTitle = taskElement.querySelector('.inner > h2').innerText;
    const taskTimeStamp = taskElement.querySelector('.inner > p').innerText;

    const newTodo = makeToDo(taskTitle, taskTimeStamp, false);

    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = false;
    newTodo[TODO_ITEMID] = todo.id;

    listUncompleted.append(newTodo);
    taskElement.remove();

    updateDataToStorage();
};

const createUndoButton = () => {
    return createButton('undo-button', event => {
        undoTaskFromCompleted(event.target.parentElement);
    });
};

const refreshDataFromTodos = () => {
    for (let todo of todos) {
        const newTodo = makeToDo(todo.task, todo.timestamp, todo.isCompleted);
        newTodo[TODO_ITEMID] = todo.id;

        if (todo.isCompleted) listCompleted.append(newTodo);
        else listUncompleted.append(newTodo);
    }
};

export { addToDo, refreshDataFromTodos };
