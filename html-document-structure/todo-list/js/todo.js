'use strict'

const todoList = document.querySelector('.todo-list');
const done = todoList.querySelector('.done');
const undone = todoList.querySelector('.undone');
const tasks = todoList.querySelectorAll('input');


function upgradeStatus() {
    this.checked = this.checked ? false : true;
    
    const checkedField = this.parentNode;
    this.checked ? undone.appendChild(checkedField) : done.appendChild(checkedField);
    
    const inputField = checkedField.querySelector('input');
    inputField.checked = this.checked ? false : true;
}

 Array.from(tasks).forEach(task => {
    task.addEventListener('click', upgradeStatus);
})