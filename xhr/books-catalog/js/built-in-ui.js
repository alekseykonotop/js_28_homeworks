/* Данный JS код */

// Регулируем видимость карточки
function toggleCardVisible () {
 document.getElementById('content').classList.toggle('hidden');
 document.getElementById('card').classList.toggle('hidden');
}

document.getElementById('close').addEventListener('click', toggleCardVisible);

document.getElementById('content').addEventListener('click', (event) => {
    let target = null;
    if (event.target.tagName === 'LI') {
        target = event.target;
    }
    if (event.target.parentNode.tagName === 'LI') {
        target = event.target.parentNode;
    }

    if (target) {
      toggleCardVisible();
      document.getElementById('card-title').innerHTML = target.dataset.title;
      document.getElementById('card-author').innerHTML = target.dataset.author;
      document.getElementById('card-info').innerHTML = target.dataset.info;
      document.getElementById('card-price').innerHTML = target.dataset.price;
    }
});

/* Написанный мною JS код */

const content = document.getElementById('content');
content.innerHTML = '';

const request = new XMLHttpRequest();
request.addEventListener('load', uploadBooks);
request.open('GET', 'https://neto-api.herokuapp.com/book/', true);
request.send();

function uploadBooks() {
    const books = JSON.parse(request.responseText);
    books.forEach( book => {
        let li = document.createElement("li");
        li.dataset.title = book.title;
        li.dataset.author = book.author.name;
        li.dataset.info = book.info;
        li.dataset.price = book.price;
        let img = document.createElement('img');
        img.setAttribute('src', `${book.cover.small}`)
        li.appendChild(img);
        content.appendChild(li);
    });
}
