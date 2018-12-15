'use strict'

const contentForm = document.getElementsByClassName('contentform')[0];
const forms = document.getElementsByClassName('form-group');
const textArea = contentForm.getElementsByTagName('textarea')[0];
const outputForm = document.getElementById('output');
const fields = contentForm.getElementsByTagName('input');
const buttons = document.getElementsByClassName('button-contact');

function getNumberOfFilledFields() {
    return document.getElementsByClassName('filled').length;
}

function setValue(event) {
    const outputField = document.getElementById(`${event.target.name}`);
    if (outputField) {
        outputField.value = event.target.value;
    }

    if (event.target.value !== '') {
        this.classList.add('filled');
    } else {
        this.classList.remove('filled');
    }
    
    if (getNumberOfFilledFields() == forms.length) {
        buttons[0].disabled = false;
    } else {
        buttons[0].disabled = true;
    }
}

function checkZipCode(event) {
    if (event.ctrlKey || event.altKey || event.metaKey || 
        event.code == 'ArrowLeft' || event.code == 'ArrowUp' || 
        event.code == 'ArrowDown' || event.code == 'ArrowRight' ||
        event.code == 'Backspace' || event.code == 'Enter') {
        return;
    }

    if (event.keyCode < 48 || event.keyCode > 57) {
        this.value = this.value.substring(0, this.value.length - 1);
    }
}

Array.from(fields).concat(textArea).forEach( field => {
    field.addEventListener('change', setValue);
    if (field.name == 'zip') {
        field.addEventListener('keyup', checkZipCode);
    }
});

function showPage(event) {
    event.preventDefault();
    contentForm.classList.toggle('hidden');
    outputForm.classList.toggle('hidden');
}

Array.from(buttons).forEach(button => {
    button.addEventListener('click', showPage);
});