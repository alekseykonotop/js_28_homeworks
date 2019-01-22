'use strict'

const mainFolder = 'sounds';
const songs = ['first.mp3', 'second.mp3', 'third.mp3', 'fourth.mp3', 'fifth.mp3'];

const piano = document.getElementsByTagName('ul')[0];
const buttons = piano.getElementsByTagName('li');

let currentTone = 'middle';
const tones = ['lower', 'middle', 'higher'];

function setPathsOfSounds() {
    for (let i = 0; i < buttons.length; i++) {
        const player = buttons[i].getElementsByTagName('audio')[0];
        player.src = `${mainFolder}\/${currentTone}\/${songs[i]}`;
    }
}

function setPianoClass() {
    tones.forEach(tone => {
        if (piano.classList.contains(tone)) {
            piano.classList.remove(tone)
        }
    });
    piano.classList.add(currentTone);
}

document.addEventListener('keydown', (event) => {
    if (event.shiftKey) {
        currentTone = 'lower';
    }

    if (event.altKey) {
        currentTone = 'higher';
    }
    setPianoClass();
}, false);

document.addEventListener('keyup', (event) => {
    currentTone = 'middle';
    setPianoClass();
}, false);

Array.from(buttons).forEach(button => {
    const player = button.getElementsByTagName('audio')[0];
    button.addEventListener('click', () => {
        setPathsOfSounds();
        player.play();
    });
});

setPianoClass();




















