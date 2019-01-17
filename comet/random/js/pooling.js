'use strict';

const pooling = document.querySelector('.pooling');
let isFirst = true;

function initPooling() {
    let timerId = setTimeout(function tick() {
        const request = new XMLHttpRequest();
        request.addEventListener('load', updateCard);
        request.open('GET', 'https://neto-api.herokuapp.com/comet/pooling', true);
        request.send();

        function updateCard() {
            if (request.status === 200) {
                if (isFirst) {
                    updatePooling(pooling.children[Number(request.responseText)]);
                    isFirst = false;
                } else {
                    updatePooling(pooling.querySelector('.flip-it'));
                    updatePooling(pooling.children[Number(request.responseText)]);
                }
            }
        }

        timerId = setTimeout(tick, 7000);
    }, 7000);

    function updatePooling(node) {
        node.classList.toggle('flip-it');
    }
}

document.addEventListener('DOMContentLoaded', initPooling);
