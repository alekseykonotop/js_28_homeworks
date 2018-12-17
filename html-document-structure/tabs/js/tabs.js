'use strict'

const tabs = document.querySelector('#tabs');
const tabsNav = tabs.querySelector('.tabs-nav');
const tabSample = tabsNav.firstElementChild.cloneNode(true);
tabsNav.removeChild(tabsNav.firstElementChild);

const tabsContent = tabs.querySelector('.tabs-content');
const articles = tabsContent.children;

Array.from(articles).forEach( article => {
    const newTab = tabSample.cloneNode(true);
    newTab.firstElementChild.innerHTML = article.getAttribute('data-tab-title');
    newTab.firstElementChild.classList.add(article.getAttribute('data-tab-icon'));
    tabsNav.appendChild(newTab);
    
    newTab.addEventListener('click', event => {
        
        Array.from(tabsNav.children).forEach(tab => {
            tab.classList.remove('ui-tabs-active');

        });
        newTab.classList.add('ui-tabs-active');

        Array.from(articles).forEach( article => {
            article.classList.add('hidden');
        });
        article.classList.remove('hidden');
    });

});

tabsNav.firstElementChild.classList.add('ui-tabs-active');
Array.from(articles).forEach( article => {
    article.classList.add('hidden');
});
articles[0].classList.remove('hidden');
