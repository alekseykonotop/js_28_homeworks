'use strict'

const songs = {
    'LA Chill Tour.mp3': 'http://d.zaix.ru/9Hec.mp3',
    'LA Fusion Jam.mp3': 'http://d.zaix.ru/9Hed.mp3',
    'This is it band.mp3': 'http://d.zaix.ru/9Hee.mp3'
};

const songTitles = Object.keys(songs);
const mediaplayer = document.getElementsByClassName('mediaplayer')[0];
const player = document.getElementsByTagName('audio')[0];
player.src = songs[songTitles[0]];
const btnState = document.getElementsByClassName('playstate')[0];
const songTitle = document.getElementsByClassName('title')[0];

let songIndex = 0;

function setActualIndex(isIncrease) {
    if (isIncrease) {
        songIndex = (songIndex + 1 + songTitles.length) % songTitles.length;
        return;
    }
    songIndex = (songIndex - 1 + songTitles.length) % songTitles.length;
}

function showCurrentTitle() {
    songTitle.title = songTitles[songIndex];
}

function play() {
    player.src = songs[songTitles[songIndex]];
    mediaplayer.classList.contains('play') ? player.pause(): player.play();
    mediaplayer.classList.toggle('play');
    showCurrentTitle();
}

function stop() {
    player.pause();
    player.currentTime = 0;
    btnPlay.classList.remove('is-playing');
    mediaplayer.classList.remove('play');
}

function next() {
    setActualIndex(true);
    if (!mediaplayer.classList.contains('play')) {
        showCurrentTitle();
        return;
    }
    mediaplayer.classList.remove('play');
    play();
}

function back() {
    setActualIndex(false);
    if (!mediaplayer.classList.contains('play')) {
        showCurrentTitle();
        return;
    }
    mediaplayer.classList.remove('play');
    play();
}

const btnPlay = document.getElementsByClassName('playstate')[0];
const btnStop = document.getElementsByClassName('stop')[0];
const btnBack = document.getElementsByClassName('back')[0];
const btnNext = document.getElementsByClassName('next')[0];

btnPlay.onclick = play;
btnStop.onclick = stop;
btnBack.onclick = back;
btnNext.onclick = next;





