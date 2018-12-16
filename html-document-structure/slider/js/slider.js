'use strict'

const slider = document.querySelector('.slider');
const slides = slider.querySelector('.slides');

// Сделали первыю картинку по умолчанию
slides.children[0].classList.add('slide-current');