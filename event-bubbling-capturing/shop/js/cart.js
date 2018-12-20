'use strict';

list.addEventListener('click', ( event ) => {
    if (event.target.tagName !== 'A') {
        return;
    }
    const item = {
        title: event.target.dataset.title,
        price: event.target.dataset.price
    }
    addToCart(item);

})
