'use strict';

const imagesURL = ['https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-jump.png', 'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-on-foot.png', 'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-playground.png', 'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-top-view.png', 'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax.png'];

const img = document.getElementById('slider');
img.src = imagesURL[0];
let step = 1;
setInterval(() => {
  img.src = imagesURL[step % imagesURL.length];
  step += 1;
}, 5000);