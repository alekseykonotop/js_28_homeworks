'use strict'
 
const mainFolder = 'sounds';
const songs = ['first.mp3', 'second.mp3', 'third.mp3', 'fourth.mp3', 'fifth.mp3'];

const piano = document.getElementsByTagName('ul')[0];
const buttons = piano.getElementsByTagName('li');

function setPathsOfSounds(tone) {
    for (let i = 0; i < buttons.length; i++) {
        const player = buttons[i].getElementsByTagName('audio')[0];
        player.src = `${mainFolder}\/${tone}\/${songs[i]}`;
    }
}

for (const button of buttons) {
    const player = button.getElementsByTagName('audio')[0];
    button.addEventListener('click', () => {
        player.play();
    })
}

document.addEventListener('keydown', (event) => {

    if (event.shiftKey) {
        setPathsOfSounds('lower');
    }

    if (event.altKey) {
        setPathsOfSounds('higher');
    }
}, false);

document.addEventListener('keyup', (event) => {
    setPathsOfSounds('middle');
}, false);




















