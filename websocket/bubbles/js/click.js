'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');
connection.addEventListener('open', () => showBubbles(connection));

function sendWs(event) {
    connection.send(JSON.stringify({
        x: event.x,
        y: event.y
    }));
    
    connection.addEventListener('error', error => console.log(`Ошибка: ${error.data}`)
    );
}

document.addEventListener('click', sendWs);