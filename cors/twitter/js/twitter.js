'use strict';

function loadData(url) {
    const functionName = 'cb' + Math.random().toString(36).substr(2);
    return new Promise((done, fail) => {
        window[functionName] = done;

        // const script = document.scripts[0].cloneNode();
        const script = document.createElement('script');
        script.src = `${url}?callback=${functionName}`;
        document.body.appendChild(script);
    });
}

function upgradeProfileForm(data) {
    document.querySelector('[data-username]').innerHTML = data.username;
    document.querySelector('[data-description]').innerHTML = data.description;
    document.querySelector('[data-tweets]').innerHTML = data.tweets;
    document.querySelector('[data-followers]').innerHTML = data.followers;
    document.querySelector('[data-following]').innerHTML = data.following;
    document.querySelector('[data-following]').innerHTML = data.following;
    document.querySelector('[data-wallpaper]').src = data.wallpaper;
    document.querySelector('[data-pic]').src = data.pic;
}

loadData('https://neto-api.herokuapp.com/twitter/jsonp')
    .then(data => upgradeProfileForm(data))


