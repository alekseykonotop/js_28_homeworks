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
    next.classList.toggle('disabled', !activeElement.nextElementSibling);
    last.classList.toggle('disabled', !activeElement.nextElementSibling);
    prev.classList.toggle('disabled', !activeElement.previousElementSibling);
    first.classList.toggle('disabled', !activeElement.previousElementSibling);
}

updateControls();