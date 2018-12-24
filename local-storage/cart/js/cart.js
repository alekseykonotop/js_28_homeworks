'use strict';

// получение списка доступных размеров 
const sizeNode = document.querySelector('#sizeSwatch');
const sizeReq = new XMLHttpRequest();
sizeReq.addEventListener('load', addSizes);
sizeReq.open('GET', 'https://neto-api.herokuapp.com/cart/sizes');
sizeReq.send();

function addSizes() {
    const sizes = JSON.parse(sizeReq.responseText);
    Array.from(sizes).forEach(size => {
        const availabilityStatus = size.isAvailable ? 'available' : 'soldout';
        const inputStatus = size.isAvailable ? '' : 'disabled';
        sizeNode.innerHTML = sizeNode.innerHTML + `<div data-value="${size.type}" class="swatch-element plain ${size.type} ${availabilityStatus}">
        <input id="swatch-0-${size.type}" type="radio" name="size" value="${size.type}" ${inputStatus}>
        <label for="swatch-0-${size.type}">
          ${size.title}
          <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
        </label>
        </div>`;
        // const lastChildForm = sizeNode.lastChild;
        // console.log('lastChildForm Before', lastChildForm);
        // if (lastChildForm.classList.contains('available')) {
        //     console.log('lastChildForm After', lastChildForm.firstElementChild);
        //     lastChildForm.firstElementChild.addEventListener('click', event => console.log('event', event));
        // }
    });
    // Временно задали значение размера по умолчанию
    sizeNode.children[2].children[0].checked = true; 
}

// получение списка доступных цветов
const colorNode = document.querySelector('#colorSwatch');
const colorReq = new XMLHttpRequest();
colorReq.addEventListener('load', addColors);
colorReq.open('GET', 'https://neto-api.herokuapp.com/cart/colors');
colorReq.send();

function addColors() {
    const colors = JSON.parse(colorReq.responseText);
    Array.from(colors).forEach(color => {
        const availabilityStatus = color.isAvailable ? 'available' : 'soldout';
        colorNode.innerHTML = colorNode.innerHTML + `<div data-value="${color.type}" class="swatch-element color ${color.type} ${availabilityStatus}">
        <div class="tooltip">${color.title}</div>
        <input quickbeam="color" id="swatch-1-${color.type}" type="radio" name="color" value="${color.type}">
        <label for="swatch-1-${color.type}" style="border-color: ${color.code};">
          <span style="background-color: ${color.code};"></span>
          <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
        </label>
      </div>`;
    });
    colorNode.children[1].children[1].checked = true; 
}


// получение текущего состояния корзины
// const cart = document.querySelector('#quick-cart');
// console.log('cart', cart);
// const cartReq = new XMLHttpRequest();
// cartReq.addEventListener('load', cartReqParse);
// cartReq.open('GET', 'https://neto-api.herokuapp.com/cart');
// cartReq.send();

// function cartReqParse() {
//     const products = JSON.parse(cartReq.responseText);
//     console.log('products:', products);
// }

// const cartForm = document.querySelector('#AddToCartForm');
// cartForm.addEventListener('click', (event) => {
//     // console.log('event.target:', event.target);
//     // event.stopPropagation();
// });



document.querySelector('#AddToCart').addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Собираем данные формы');
    let sizeForm = '';
    for (let node of Array.from(sizeNode.querySelectorAll('div.swatch-element.plain input[name=size]'))) {
        if (node.checked) {
            sizeForm = node;
        }
    }
    let colorForm = '';
    for (let node of Array.from(colorNode.querySelectorAll('div.swatch-element.color input[name=color]'))) {
        if (node.checked) {
            colorForm = node;
        }
    }
    console.log('sizeForm', sizeForm);
    console.log('colorForm', colorForm);

    const cartForm = document.querySelector('#AddToCartForm');
    console.log('cartForm.product.id:', cartForm.dataset.productId);
    const data = {};
    data.size = sizeForm.parentElement.dataset.value;
    data.color = colorForm.parentElement.dataset.value;
    data.productId = cartForm.dataset.productId;
    console.log('data:', data);
    const dataRequest = new FormData(data);
    console.log('dataRequest:', dataRequest.keys);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLoad);
    xhr.open('POST', 'https://neto-api.herokuapp.com/cart');
    xhr.send(data);

    function onLoad() {
        console.log('Данные подгружены');
        console.log('xhr.responseText', xhr.responseText); // приходит ответ - ОШибка в формате данных. 
    }

});
