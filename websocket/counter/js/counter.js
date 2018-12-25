'use strict';

function init() {
    const counterHtml = document.querySelector('.counter');
    const outputErrors = document.querySelector('.errors');
    const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');
    connection.addEventListener('message', event => {
        const data = JSON.parse(event.data);
        counterHtml.innerHTML = `${data.connections}`;
        outputErrors.innerHTML = `${data.errors}`;
    });

    window.addEventListener('beforeunload', () => {
        connection.close(1000);
    });

}


document.addEventListener('DOMContentLoaded', init);
