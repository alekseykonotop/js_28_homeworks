'use strict';

const longPooling = document.querySelector('.long-pooling');

let isLongFirst = true;

function initLongPooling() {
    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
    
        if (this.status == 202) {
            if (isLongFirst) {
                updateLongPooling(longPooling.children[Number(this.responseText)]);
                isLongFirst = false;
            } else {
                updateLongPooling(longPooling.querySelector('.flip-it'));
                updateLongPooling(longPooling.children[Number(this.responseText)]);
            }
            initLongPooling();
        }

        // initLongPooling();
    }

    xhr.open('GET', 'https://neto-api.herokuapp.com/comet/long-pooling', true);
    xhr.send();

    function updateLongPooling(node) {
        node.classList.toggle('flip-it');
    }

}

document.addEventListener('DOMContentLoaded', initLongPooling);
