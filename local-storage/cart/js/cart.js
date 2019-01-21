'use strict';

function createSizeTemplate(data) {
    const availabilityStatus = data.isAvailable ? 'available' : 'soldout';
    const inputStatus = data.isAvailable ? '' : 'disabled';
    return `<div data-value="${data.type}" class="swatch-element plain ${data.type} ${availabilityStatus}">
    <input id="swatch-0-${data.type}" type="radio" name="size" value="${data.type}" ${inputStatus}>
    <label for="swatch-0-${data.type}">
      ${data.title}
      <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
    </label>
    </div>`;
}

const sizeNode = document.querySelector('#sizeSwatch');
function addSizes(sizes) {
    
    Array.from(sizes).forEach(size => {
        sizeNode.innerHTML = sizeNode.innerHTML + createSizeTemplate(size);
    });
}

function createColorTemplate(data) {
    const availabilityStatus = data.isAvailable ? 'available' : 'soldout';
    return `<div data-value="${data.type}" class="swatch-element color ${data.type} ${availabilityStatus}">
    <div class="tooltip">${data.title}</div>
    <input quickbeam="color" id="swatch-1-${data.type}" type="radio" name="color" value="${data.type}">
    <label for="swatch-1-${data.type}" style="border-color: ${data.code};">
      <span style="background-color: ${data.code};"></span>
      <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
    </label>
  </div>`;
}

function addColors(colors) {
    const colorNode = document.querySelector('#colorSwatch'); 
    Array.from(colors).forEach(color => {
        colorNode.innerHTML = colorNode.innerHTML + createColorTemplate(color);
    });
}

function createItemTemplate(item) {
    return `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${item.id}" style="opacity: 1;">
                <div class="quick-cart-product-wrap">
                    <img src="${item.pic}" title="${item.title}">
                    <span class="s1" style="background-color: #000; opacity: .5">$${item.price.toFixed(2)}</span>
                    <span class="s2"></span>
                </div>
                <span class="count hide fadeUp" id="quick-cart-product-count-${item.id}">${item.quantity}</span>
                <span class="quick-cart-product-remove remove" data-id="${item.id}"></span>
            </div>`;
}

const quickCart = document.querySelector('#quick-cart');

function addItemToCart(item) {
    if (quickCart.querySelector(`#quick-cart-product-${item.id}`)) {
        quickCart.querySelector(`#quick-cart-product-count-${item.id}`).innerHTML = `${item.quantity}`;
        return;
    }

    quickCart.innerHTML = createItemTemplate(item) + quickCart.innerHTML;
}

function createCartWidgetTemplate(totalSum, totalCount) {
    return `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${(totalCount > 0) ? 'open' : ''}">
                <span>
                    <strong class="quick-cart-text">Оформить заказ<br></strong>
                    <span id="quick-cart-price">$${totalSum.toFixed(2)}</span>
                </span>
            </a>`;
}

function addCartWidget(totalSum, totalCount) {
    if (quickCart.querySelector('#quick-cart-price')) {
        quickCart.querySelector('#quick-cart-price').innerHTML = `${totalSum.toFixed(2)}`;
        return;
    }
    quickCart.innerHTML += createCartWidgetTemplate(totalSum, totalCount);
}

function removeItem(event) {
    const itemId = event.target.dataset.id;
    const formData = new FormData();
    formData.append('productId', itemId);
    loadDataPost(url.removeCart, formData);
}

function addRemoveHandler() {
    const removeBtns = quickCart.querySelectorAll('.quick-cart-product-remove');
    Array.from(removeBtns).forEach(btn => {
        btn.addEventListener('click', removeItem);
    })
}

function updateCart(items) {
    quickCart.innerHTML = '';
    let totalSum = 0,
        totalCount = 0;
    
    if ( items.length === 0 ) {
        localStorage.clear();
        addCartWidget(totalSum, totalCount);
        return;
    }
    
    items.forEach(item => {
        addItemToCart(item);
        totalSum += item.price * item.quantity;
        totalCount += item.quantity;

        localStorage[item.id] = JSON.stringify(item);
    });

    addCartWidget(totalSum, totalCount);
    addRemoveHandler();
}

function loadDataPost(url, data) {
    return fetch(url, {
        method: 'POST',
        body: data
    })
        .then(res => res.json())
        .then(res => updateCart(res))
        .catch(error => console.log(error));
}

function getCheckedValue(nodes) {
    for (let node of nodes) {
        if (node.checked) {
            return node.value;
        }
    }
}

function getData(form) {
    const id = form.dataset.productId;
    const sizeChecked = getCheckedValue(form.querySelectorAll('.swatch-element.plain input[name=size]'));
    const colorChecked = getCheckedValue(form.querySelectorAll('.swatch-element.color input[name=color]'));
    const formData = new FormData(form);
    formData.append('productId', id);
    formData.append('size', sizeChecked);
    formData.append('color', colorChecked);
    return formData;
}

function onSubmitCart(evt) {
    evt.preventDefault();
    loadDataPost(url.cart, getData(evt.currentTarget));
}

const AddToCartForm = document.querySelector('#AddToCartForm');
AddToCartForm.addEventListener('submit', onSubmitCart);

async function loadData(url, callBack) {
    try {
        const request = await fetch(url);
        const response = await request.json();
        callBack(response)
    } catch(err) {
        console.error(error.message);
    }
}
const baseUrl = 'https://neto-api.herokuapp.com';
const getUrl = url => `${baseUrl}${url}`
const url = {
    color: getUrl('/cart/colors'),
    size: getUrl('/cart/sizes'),
    cart: getUrl('/cart'),
    removeCart: getUrl('/cart/remove')
};

Promise.all([
    loadData(url.color, addColors),
    loadData(url.size, addSizes),
])
    .catch(er => console.log(er.message));


function checkLocalStorage() {
    if (localStorage.length > 0) {
        const items = [];
        const keys = Object.keys(localStorage);
        
        keys.forEach(key => {
            items.push(JSON.parse(localStorage[key]));
        });
        
        updateCart(items);
    }
}

document.addEventListener('DOMContentLoaded', checkLocalStorage);