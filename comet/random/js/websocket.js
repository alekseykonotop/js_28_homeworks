'use strict';

function initWs() {
    const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
    const websocket = document.querySelector('.websocket');
    let isFirst = true;
    
    ws.addEventListener('message', event => {
        if (isFirst) {
            updateWs(websocket.children[Number(event.data)]);
            isFirst = false;
        } else {
            updateWs(websocket.querySelector('.flip-it'));
            updateWs(websocket.children[Number(event.data)]);
        }
    });

    function updateWs(node) {
        node.classList.toggle('flip-it');
    }
}

document.addEventListener('DOMContentLoaded', initWs);