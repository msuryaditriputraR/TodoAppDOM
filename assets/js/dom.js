const addToDo = () => {
    const title = document.getElementById('title').value;
    const timeStamp = document.getElementById('date').value;

    console.log(`${title} harus selesai sebelum ${timeStamp}`);
};

export { addToDo };
