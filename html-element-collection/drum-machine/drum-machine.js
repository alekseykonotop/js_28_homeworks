'use strict'

const drumKit = document.querySelector('.drum-kit');

function playSound(event) {
    const currentPlayer = drumKit.querySelector('.playNow');
    const clickBtn = event.target.closest('.drum-kit__drum');
    
    if (currentPlayer) {
        currentPlayer.querySelector('audio').pause();
        currentPlayer.querySelector('audio').currentTime = 0;
        currentPlayer.classList.remove('playNow');
    }

    clickBtn.querySelector('audio').play();
    clickBtn.classList.add('playNow');
}

Array.from(drumKit.children).forEach(btn => {
    btn.addEventListener('click', playSound);
});
