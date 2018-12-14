'use strict'

function init() {
    const preloader = document.getElementById('loader');
    const converter = document.getElementById('content');
    const currentNumber = document.getElementById('source');
    const selectFrom = document.getElementById('from');
    const selectTo = document.getElementById('to');
    const output = document.getElementById('result');
    
    const request = new XMLHttpRequest();
    request.addEventListener("loadstart", onLoadStart);
    request.addEventListener("loadend", onLoadEnd);
    request.addEventListener("loadend", calculateValue);
    request.addEventListener('load', uploadCurrency);
    request.open('GET', 'https://neto-api.herokuapp.com/currency', true);
    request.send();

    function addCurrency(node, currency, currencyName='RUB') {
        const newCurrency = new Option(currency.code, currency.value);
        if (currency.code == currencyName) {
            newCurrency.selected = true;
        }
        node.appendChild(newCurrency);
    }
    
    function uploadCurrency() {
        if (request.status == 200) {
            const currencies = JSON.parse(request.responseText);
            Array.from(currencies).forEach( currency => {
                addCurrency(selectFrom, currency);
                addCurrency(selectTo, currency, 'USD');
            });
          }
    }

    function onLoadStart() {
      preloader.classList.remove('hidden');
    }

    function onLoadEnd() {
      preloader.classList.add('hidden');
      converter.classList.remove('hidden');
    }

    function calculateValue() {
        // UC - Universal Settlement Currency
        const UC = currentNumber.value * selectFrom.options[selectFrom.selectedIndex].value;
        const result = UC / selectTo.options[selectTo.selectedIndex].value;
        output.value = result.toFixed(2);

    }

    [selectFrom, selectTo].forEach(form => {
        form.addEventListener('change', calculateValue);
    });
    currentNumber.addEventListener('input', calculateValue);
}

document.addEventListener('DOMContentLoaded', init);

