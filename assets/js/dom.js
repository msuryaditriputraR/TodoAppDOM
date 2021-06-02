const UNCOMPLETED_LIST_TODO_ID = 'todos';

const addToDo = () => {
    const uncompletedListTodo = document.getElementById(
        UNCOMPLETED_LIST_TODO_ID
    );

    const title = document.getElementById('title').value;
    const timeStamp = document.getElementById('date').value;

    const todo = makeToDo(title, timeStamp);
    uncompletedListTodo.append(todo);
};

const makeToDo = (title, timeStamp) => {
    const textTitle = document.createElement('h2');
    textTitle.innerText = title;
    const textTimeStamp = document.createElement('p');
    textTimeStamp.innerText = timeStamp;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textTimeStamp);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);

    return container;
};

export { addToDo };
