const STORAGE_KEY = 'TODO_APPS';

let todos = [];

const isStorageExist = () => {
    /* boolean */
    if (typeof Storage == 'undefined') {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
};

const saveData = () => {
    const parsed = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event('ondatasaved'));
};

const loadDataFromStorage = () => {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null) todos = data;

    document.dispatchEvent(new Event('ondataloaded'));
};

const updateDataToStorage = () => {
    if (isStorageExist()) saveData();
};

const composeTodoObject = (task, timestamp, isCompleted) => {
    return {
        id: +new Date(),
        task,
        timestamp,
        isCompleted
    };
};

const findTodo = todoId => {
    for (let todo of todos) {
        if (todo.id === todoId) return todo;
    }
    return null;
};

const findTodoIndex = todoId => {
    let index = 0;
    for (let todo of todos) {
        if (todo.id === todoId) return index;

        index++;
    }

    return -1;
};

export {
    loadDataFromStorage,
    composeTodoObject,
    updateDataToStorage,
    findTodo,
    findTodoIndex
};
