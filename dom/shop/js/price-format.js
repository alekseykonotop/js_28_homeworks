function getPriceFormatted(value) {
  return  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function init() {
  const cart = document.getElementsByClassName('cart')[0];
  let [counter, totalPayment] = cart.querySelectorAll('div.head span');
  totalPayment.setAttribute('total-price', '0');

  const addButtons = document.getElementsByClassName('add');
  Array.from(addButtons).forEach(addButton => 
    addButton.addEventListener('click', () => {
      const price = addButton.getAttribute('data-price');
      counter.innerHTML++;
      totalPayment.setAttribute('total-price', `${+totalPayment.getAttribute('total-price') + +price}`);
      totalPayment.innerHTML = getPriceFormatted(totalPayment.getAttribute('total-price'));
    }));

}

document.addEventListener('DOMContentLoaded', init);