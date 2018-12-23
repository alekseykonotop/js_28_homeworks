'use strict';

const counter = document.querySelector('.wrap');
const currentCounter = counter.querySelector('#counter');
const buttons = counter.querySelector('.wrap-btns')

function heandler(event) {
    switch (event.target.id) {
        case 'increment':
            localStorage.currentValue = Number(localStorage.currentValue) + 1;
            currentCounter.innerHTML = localStorage.currentValue;

            break;

        case 'decrement':
            if (Number(localStorage.currentValue) > 0) {
                localStorage.currentValue = Number(localStorage.currentValue) - 1;
                currentCounter.innerHTML = localStorage.currentValue;
            }
            break;

        case 'reset':
            localStorage.currentValue = 0;
            currentCounter.innerHTML = localStorage.currentValue;
            break;

    }
}

if (!localStorage.currentValue) {
    localStorage.currentValue = 0;
}
currentCounter.innerHTML = localStorage.currentValue;
buttons.addEventListener('click', heandler);
