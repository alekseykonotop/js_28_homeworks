'use strict'

const request = new XMLHttpRequest();
request.open('GET', 'https://neto-api.herokuapp.com/weather', true);
request.send();

function onLoad() {
  if (request.status === 200) {
    const response = JSON.parse(request.responseText);
    setData(response);
  }
}

request.addEventListener('load', onLoad);
