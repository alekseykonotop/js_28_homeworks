'use strict';

function loadData(url) {
    const functionName = 'cb' + Math.random().toString(36).substr(2);
    return new Promise((done, fail) => {
        window[functionName] = done;

        const script = document.createElement('script');
        script.src = `${url}?callback=${functionName}`;
        document.body.appendChild(script);
    });
}

function addData(data) {
    if (data.id) {
        document.querySelector('[data-title]').innerHTML = data.title;
        document.querySelector('[data-ingredients]').innerHTML = data.ingredients.join(', ');
        document.querySelector('[data-pic]').style.backgroundImage = `url(${data.pic})`;
    }
    if (data.rating >= 0) {
        document.querySelector('[data-rating]').innerHTML = data.rating.toFixed(2);
        document.querySelector('[data-star]').style.width = `${Math.round(data.rating * 10)}%`;
        document.querySelector('[data-votes]').innerHTML = `(${data.votes} оценок)`;

    }
    if (data.consumers) {
        const consumersField = document.querySelector('[data-consumers]');
        data.consumers.forEach(consumer => {
            const img = document.createElement('img');
            img.src = consumer.pic;
            img.title = consumer.name;
            consumersField.appendChild(img);
        });

        const span = document.createElement('span');
        span.innerHTML = `+${data.total - data.consumers.length}`;
        consumersField.appendChild(span);
    }
}

const linksList = ['https://neto-api.herokuapp.com/food/42', 
                  'https://neto-api.herokuapp.com/food/42/rating', 
                  'https://neto-api.herokuapp.com/food/42/consumers'];

linksList.forEach(link => {
    loadData(link)
        .then(data => addData(data))
});