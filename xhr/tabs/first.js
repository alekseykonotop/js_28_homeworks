'use strict'

function initFirst() {
    const activeLink = document.querySelector('a.active');
    const preloader = document.getElementById('preloader');
    let content = document.getElementById('content');

    const request = new XMLHttpRequest();
    
    request.addEventListener("loadstart", onLoadStart);
    request.addEventListener("loadend", onLoadEnd);
    request.open('GET', `${activeLink.href}`, true);
    request.send();

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

    request.addEventListener('load', onLoad);
}

document.addEventListener('DOMContentLoaded', initFirst);