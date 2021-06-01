import { addToDo } from './dom.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');

    form.addEventListener('submit', event => {
        event.preventDefault();
        addToDo();
    });
});
