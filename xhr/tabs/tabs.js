'use strict'

function showWindow(event) {
    event.preventDefault();
    const preloader = document.getElementById('preloader');
    const activelinks = document.getElementsByClassName('active');
    Array.from(activelinks).forEach(link =>
        link.classList.remove('active')
    );

    this.classList.add('active');

    const request = new XMLHttpRequest();
    request.addEventListener('load', onLoad);
    request.addEventListener("loadstart", onLoadStart);
    request.addEventListener("loadend", onLoadEnd);
    request.open('GET', `${this.getAttribute('href')}`, true);
    request.send();
    
    let content = document.getElementById('content');

    function onLoad() {
        if (request.status == 200) {
          content.innerHTML = '';
          content.innerHTML = request.responseText;
          }
    }

    function onLoadStart() {
      preloader.classList.remove('hidden');
    }

    function onLoadEnd() {
      preloader.classList.add('hidden');
    }

    
}

function init() {
    const links = document.getElementsByTagName('a');
    Array.from(links).forEach( link => {
        link.addEventListener( 'click', showWindow);
    });
}



document.addEventListener('DOMContentLoaded', init);