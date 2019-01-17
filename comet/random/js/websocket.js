'use strict';

function initWs() {
    const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
    const websocket = document.querySelector('.websocket');
    let isFirst = true;
    
    ws.addEventListener('message', event => {
        if (isFirst) {
            changeStatus(websocket.children[Number(event.data)]);
            isFirst = false;
        } else {
            changeStatus(websocket.querySelector('.flip-it'));
            changeStatus(websocket.children[Number(event.data)]);
        }
    });

    function changeStatus(node) {
        node.classList.toggle('flip-it');
    }
}

window.addEventListener('load', initWs, false);