'use strict'

const songTitles = [
    'LA Chill Tour.mp3',
    'LA Fusion Jam.mp3',
    'This is it band.mp3'
];

const songs = {
    'LA Chill Tour.mp3': 'http://d.zaix.ru/9Hec.mp3',
    'LA Fusion Jam.mp3': 'http://d.zaix.ru/9Hed.mp3',
    'This is it band.mp3': 'http://d.zaix.ru/9Hee.mp3'
};

let songIndex = 1;
const player = document.getElementsByTagName('audio')[0];
player.src = songs[songTitles[0]];
const btnState = document.getElementsByClassName('playstate')[0];
const songTitle = document.getElementsByTagName('span')[0];

function playAndPause() {
    player.paused ? player.play() : player.pause();
}

function stop() {
    player.pause();
    player.currentTime = 0;
    btnPlay.classList.remove('is-playing');
}

function playCurrentTrack(ind) {
    const currentIndex = (ind + songTitles.length) % songTitles.length;
    player.src = songs[songTitles[currentIndex]];
    songIndex = currentIndex;
    player.play();
    songTitle.title =  songTitles[songIndex];
}

function back() {
    playCurrentTrack(songIndex - 1);
}

function next() {
    playCurrentTrack(songIndex + 1);
}


const btnPlay = document.getElementsByClassName('fa-play')[0];
const btnStop = document.getElementsByClassName('fa-stop')[0];
const btnBack = document.getElementsByClassName('fa-backward')[0];
const btnNext = document.getElementsByClassName('fa-forward')[0];


btnPlay.onclick = playAndPause;
btnStop.onclick = stop;
btnBack.onclick = back;
btnNext.onclick = next;





