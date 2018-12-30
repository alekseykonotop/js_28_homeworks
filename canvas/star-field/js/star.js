'use strict';

const canvas = document.querySelector('canvas');
canvas.style.backgroundColor = 'black';
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
const colors = ["#ffffff", '#ffe9c4', '#d4fbff'];

let stars = [];

function drawStars() {
    stars.forEach(star => {
        ctx.globalAlpha = star.bright;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI*2);
        ctx.fillStyle = star.color;
        ctx.fill();
        ctx.stroke(); 

    })
}

class Star {
    constructor(x, y, radius, bright, color) {
        this.x = x;
        this.y = y;
        this.r = radius;
        this.bright = bright;
        this.color = color;
    }
}

function randomFromTo(from, to, fraction=false) {
    let res;
    if (fraction) {
        res = from + Math.random() * (to - from);
    } else {
        res = Math.floor(Math.random() * (to - from + 1) + from);
    }
    return res;
}

function createNewStars() {
    const numberOfStars = randomFromTo(200, 401);

    for (let i = 0; i < numberOfStars; i++) {
        const coordinateX = randomFromTo(0, canvas.width);
        const coordinateY = randomFromTo(0, canvas.height);
        const radius = randomFromTo(0, 1.1, true);
        const bright = randomFromTo(0.8, 1.1, true);
        const color = colors[randomFromTo(0, colors.length - 1)];
        
        const newStar = new Star(coordinateX, 
                                 coordinateY, 
                                 radius, 
                                 bright, 
                                 color);
        stars.push(newStar);
    }
    // console.log('stars', stars);

    drawStars();
}


document.addEventListener('DOMContentLoaded', createNewStars);
canvas.addEventListener("click", (evt) => {
    stars = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    createNewStars();
});
