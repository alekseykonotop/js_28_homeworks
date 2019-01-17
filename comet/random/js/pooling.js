'use strict';

const pooling = document.querySelector('.pooling');
let isFirst = true;

function initPooling() {
    var timerId = setTimeout(function tick() {
        const request = new XMLHttpRequest();
        request.addEventListener('load', updateCard);
        request.open('GET', 'https://neto-api.herokuapp.com/comet/pooling', true);
        request.send();

        function updateCard() {
            if (request.status === 200) {
                if (isFirst) {
                    changeStatus(pooling.children[Number(request.responseText)]);
                    isFirst = false;
                } else {
                    changeStatus(pooling.querySelector('.flip-it'));
                    changeStatus(pooling.children[Number(request.responseText)]);
                }
            }
        }

        timerId = setTimeout(tick, 5000);
    }, 5000);
}

function changeStatus(node) {
    node.classList.toggle('flip-it');
}

window.addEventListener('load', initPooling, false);
