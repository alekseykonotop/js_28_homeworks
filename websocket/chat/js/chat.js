'use strict';

const chat = document.querySelector('.chat');
// console.log(`chat: ${chat}`);
const msgForm = chat.querySelector('.message-box'); // Форма отправки нового сообщения
const msgInput = msgForm.querySelector('.message-input'); // Поле ввода сообщения
const msgSubmit = msgForm.querySelector('.message-submit'); // Кнопка «Отправить сообщение» 
const messagesContent = chat.querySelector('.messages-content'); // для отображения новых сообщений 
const chatStatus = chat.querySelector('.chat-status'); // для вывода состояния чата.

const msgStatus = chat.querySelector('.message-status'); // вывод разных уведомлений
const msgText = msgStatus.querySelector('.message-text'); // для вывода текста уведомления

const loadingStatus = chat.querySelector('.loading'); // собеседник сейчас печатает сообщение

const messages = chat.querySelectorAll('.message');
const interlocutorNode = Array.from(messages).find((element, index, array) => element.classList.length == 1);

const personalMessage = chat.querySelector('.message-personal');

function init() {
    const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');
    connection.addEventListener('open', () => {
        chatStatus.innerHTML = chatStatus.dataset.online;
        msgSubmit.disabled = false;
        msgText.value = 'Пользователь появился в сети';
    });

    connection.addEventListener('message', event => {
        if (event.data === '...') {
            msgText.innerHTML = 'Собеседник печатает сообщение';
        } else {
            const newMsg = interlocutorNode.cloneNode(true)
            newMsg.querySelector('.message-text').innerHTML = `${event.data}`;
            const now = new Date();
            newMsg.querySelector('.timestamp').innerHTML = `${now.getHours()}:${now.getMinutes()}`;
            messagesContent.appendChild(newMsg);
            msgText.innerHTML = '';
        }
    });
    

    function sendMessage() {
        event.preventDefault();
        connection.send(msgInput.value);
        const newMsg = personalMessage.cloneNode(true);
        newMsg.querySelector('.message-text').innerHTML = `${msgInput.value}`;
        const now = new Date();
        newMsg.querySelector('.timestamp').innerHTML = `${now.getHours()}:${now.getMinutes()}`;
        
        messagesContent.appendChild(newMsg);
        // event.stopPropagation(true);
        msgInput.value = '';
    }

    function heandlerMessage(event) {
        msgSubmit.removeEventListener('click', sendMessage);
        sendMessage(event);
    }

    function addEventOnMsgSubmit() {
        msgSubmit.addEventListener('click', sendMessage);
    }

    msgSubmit.addEventListener('click', sendMessage);
    msgInput.addEventListener('change', removeEventOnMsgSubmitAndSend);
    msgInput.addEventListener('input', addEventOnMsgSubmit);
    

    function deactivateChat(event) {
        if (event.wasClean) {
            chatStatus.innerHTML = chatStatus.dataset.offline;
            msgSubmit.disabled = true;
            msgText.value = 'Пользователь не в сети';
        }
    }
    connection.addEventListener('close', deactivateChat);

}


document.addEventListener('DOMContentLoaded', init);