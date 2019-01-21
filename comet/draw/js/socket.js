'use strict';


function init() {
    const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');

    ws.addEventListener('open', () => {
        
        editor.addEventListener('update', (event) => {
            event.canvas.toBlob(blob => ws.send(blob));

        });
    });

    ws.addEventListener('message', event => {
        console.log(`Сессия # ${event.data}`);
    })
}

document.addEventListener('DOMContentLoaded', init);
