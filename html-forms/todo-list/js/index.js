'use strict'

function init() {
    const listBlock = document.getElementsByClassName('list-block')[0];
    const tasksBtn = listBlock.querySelectorAll('li');
    const output = document.querySelector('h3 > output');
    output.value = `0 из ${tasksBtn.length}`;
    
    const tasks = listBlock.getElementsByTagName('input');
    Array.from(tasks).forEach(task => {
        task.checked = false;
    });

    function areAllTasksDone() {
        const checkedTasks = Array.from(tasks).filter(task => task.checked);
        output.value = `${checkedTasks.length} из ${tasksBtn.length}`;

        if (checkedTasks.length == tasksBtn.length) {
            listBlock.classList.add('complete');
            return;
        }

        if (listBlock.classList.contains('complete')) {
            listBlock.classList.remove('complete');
        }
    }

    Array.from(tasks).forEach(task => {
        task.addEventListener('change', areAllTasksDone);
    });
}

document.addEventListener('DOMContentLoaded', init);