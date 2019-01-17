'use strict';

const longPooling = document.querySelector('.long-pooling');

let isLongFirst = true;

function initLongPooling() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
    
        if (this.status == 202) {
            if (isLongFirst) {
                    changeStatus(longPooling.children[Number(this.responseText)]);
                    isLongFirst = false;
                } else {
                    changeStatus(longPooling.querySelector('.flip-it'));
                    changeStatus(longPooling.children[Number(this.responseText)]);
                }
            }

        initLongPooling();
    }

    xhr.open('GET', 'https://neto-api.herokuapp.com/comet/long-pooling', true);
    xhr.send();

    function changeStatus(node) {
        node.classList.toggle('flip-it');
    }

}

window.addEventListener('load', initLongPooling, false);
