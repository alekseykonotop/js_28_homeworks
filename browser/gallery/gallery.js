'use strict'

const imagesURL = [
    'https://netology-code.github.io/hj-homeworks/browser/gallery/i/breuer-building.jpg',
    'https://netology-code.github.io/hj-homeworks/browser/gallery/i/guggenheim-museum.jpg',
    'https://netology-code.github.io/hj-homeworks/browser/gallery/i/headquarters.jpg',
    'https://netology-code.github.io/hj-homeworks/browser/gallery/i/IAC.jpg',
    'https://netology-code.github.io/hj-homeworks/browser/gallery/i/new-museum.jpg'
];
let imgIndex = 1;

function nextImage() {
    showPhoto(imgIndex + 1);
}

function prevImage() {
    showPhoto(imgIndex - 1);
}

function showPhoto(ind) {
    currentPhoto.src = imagesURL[(ind + imagesURL.length) % imagesURL.length];
    imgIndex = ind
}

const currentPhoto = document.getElementById('currentPhoto');
currentPhoto.src = imagesURL[0];

const next = document.getElementById('nextPhoto');
const prev = document.getElementById('prevPhoto');

next.onclick = nextImage;
prev.onclick = prevImage;





