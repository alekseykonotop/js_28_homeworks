'use strict'

const navigate = document.getElementsByTagName('nav')[0];

function showMenu(event) {
    if (!event.repeat) {
        if (event.ctrlKey &&
            event.altKey &&
            event.code === 'KeyT') {
            // navigate.classList.add('visible');
            navigate.classList.toggle('visible');
        }
    }
}

document.addEventListener('keydown', showMenu);

const checkValues = ['KeyY', 'KeyT', 'KeyN', 'KeyJ', 'KeyK', 'KeyJ', 'KeyU', 'KeyB', 'KeyZ'];
let  keydownLetters = [];
let counter = 0;

function checkKeydownLetters(event) {
    if (event.code == checkValues[counter]) {
        keydownLetters.push(event.code);
        if (keydownLetters.join('') === checkValues.join('')) {
            document.getElementsByClassName('secret')[0].classList.add('visible');
        }
        counter++;
        
    } else {
        counter = 0;
        keydownLetters = [];
    }
    
}

document.addEventListener('keydown', checkKeydownLetters);


