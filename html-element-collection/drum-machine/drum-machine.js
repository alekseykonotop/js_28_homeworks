'use strict'

const soundBtns = document.getElementsByClassName("drum-kit__drum");

for (let soundBtn of soundBtns) {
        soundBtn.onclick = function() {
            const player = soundBtn.getElementsByTagName('audio')[0];
            player.play();
        }
}