'use strict'

const slider = document.querySelector('.slider');
const slides = slider.querySelector('.slides');
slides.firstElementChild.classList.add('slide-current');
let activeElement = slider.querySelector('.slide-current')

const navigateButtons = slider.querySelector('.slider-nav');
const prev = navigateButtons.children[0];
const next = navigateButtons.children[1];
const first = navigateButtons.children[2];
const last = navigateButtons.children[3];

navigateButtons.addEventListener('click', event => {
    activeElement.classList.remove('slide-current');
    switch (event.target) {
        case prev:
            if (activeElement.previousElementSibling) {
                activeElement = activeElement.previousElementSibling;
            }
            break;

        case first:
            activeElement = activeElement.parentElement.firstElementChild;
            break;

        case next:
            if (activeElement.nextElementSibling) {
                activeElement = activeElement.nextElementSibling;
            }
            break;

        case last:
            activeElement = activeElement.parentElement.lastElementChild;
            break;
    }
    activeElement.classList.add('slide-current');
    updateControls();
  });

function updateControls() {
    prev.disabled = activeElement.previousElementSibling ? false : true;
    first.disabled = activeElement.previousElementSibling ? false : true;
    next.disabled = activeElement.nextElementSibling ? false : true;
    last.disabled = activeElement.nextElementSibling ? false : true;
    
    if (!activeElement.nextElementSibling) {
        if (!next.classList.contains('disabled')) {
            next.classList.add('disabled');
            last.classList.add('disabled');
        }
    } else {
        if (next.classList.contains('disabled')) {
            next.classList.remove('disabled');
            last.classList.remove('disabled');
        }
    }

    if (!activeElement.previousElementSibling) {
        if (!prev.classList.contains('disabled')) {
            prev.classList.add('disabled');
            first.classList.add('disabled');
        }
    } else {
        if (prev.classList.contains('disabled')) {
            prev.classList.remove('disabled');
            first.classList.remove('disabled');
        }
    }
}

updateControls();