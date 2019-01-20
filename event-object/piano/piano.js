'use strict'

const mainFolder = 'sounds';
const songs = ['first.mp3', 'second.mp3', 'third.mp3', 'fourth.mp3', 'fifth.mp3'];

const piano = document.getElementsByTagName('ul')[0];
const buttons = piano.getElementsByTagName('li');

let soundsTone = 'middle';

function setPathsOfSounds() {
    for (let i = 0; i < buttons.length; i++) {
        const player = buttons[i].getElementsByTagName('audio')[0];
        player.src = `${mainFolder}\/${soundsTone}\/${songs[i]}`;
    }
}

Array.from(buttons).forEach(button => {
    const player = button.getElementsByTagName('audio')[0];
    button.addEventListener('click', () => {
        setPathsOfSounds();
        player.play();
    });
});

document.addEventListener('keydown', (event) => {
    if (event.shiftKey) {
        soundsTone = 'lower';
    }

    if (event.altKey) {
        soundsTone = 'higher';
    }
}, false);

document.addEventListener('keyup', (event) => {
    soundsTone = 'middle';
}, false);




















