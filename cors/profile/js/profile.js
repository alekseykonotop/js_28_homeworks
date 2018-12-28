'use strict';

const techField = document.querySelector('[data-technologies]');

function loadData(url) {
    const functionName = 'cb' + Math.random().toString(36).substr(2);
    return new Promise((done, fail) => {
        window[functionName] = done;

        const script = document.createElement('script');
        script.src = `${url}?callback=${functionName}`;
        document.body.appendChild(script);
    });
}

function upgradeProfile(data) {
    return new Promise((done, fail) => {
        document.querySelector('[data-name]').innerHTML = data.name;
        document.querySelector('[data-description]').innerHTML = data.description;
        document.querySelector('[data-pic]').src = data.pic;
        document.querySelector('[data-position]').innerHTML = data.position;
        techField.dataset.link = 'https://neto-api.herokuapp.com/profile/:id/technologies'.replace(':id', `${data.id}`);
        done(techField.dataset.link);
    })
}

function addTechnologies(technologies) {
    return new Promise((done, fail) => {
        for (let tech of technologies) {
            const newSpan = document.createElement('span');
            newSpan.classList.add('devicons', `devicons-${tech}`);
            techField.appendChild(newSpan);
        }
    });
}

function initialContent() {
    document.querySelector('.content').style.display = 'initial';
}

loadData('https://neto-api.herokuapp.com/profile/me')
    .then(data => upgradeProfile(data))
    .then(loadData)
    .then(technologies => addTechnologies(technologies))
    .then(initialContent())
    .catch(error => console.log('Ошибка'))


