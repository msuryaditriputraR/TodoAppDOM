import { addToDo, refreshDataFromTodos } from './dom.js';
import { isStorageExist, loadDataFromStorage } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');

    form.addEventListener('submit', event => {
        event.preventDefault();
        addToDo();
    });

    if (isStorageExist()) loadDataFromStorage();
});

document.addEventListener('ondatasaved', () => alert('Data Berhasil Disimpan'));

document.addEventListener('ondataloaded', () => refreshDataFromTodos());
