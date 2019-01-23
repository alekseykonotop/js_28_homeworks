'use strict';

const canvas = document.querySelector('#wall');
const sizes = getComputedStyle(canvas);
canvas.setAttribute('width', sizes.width);
canvas.setAttribute('height', sizes.height);
const ctx = canvas.getContext('2d');

let objects = [];

function nextPoint1(x, y, time) {
    return {
      x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
      y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
    };
  }

  function nextPoint2(x, y, time) {
    return {
      x: x + Math.sin((x + (time / 10)) / 100) * 5,
      y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
    }
  }

function drawObjects() {
    objects.forEach(obj => {
        ctx.beginPath();
        let coordinates;
        (obj.type == 1) ? coordinates = nextPoint1(obj.x0, obj.y0, Date.now()): coordinates = nextPoint2(obj.x0, obj.y0, Date.now());

        if (obj.r) {
            ctx.arc(coordinates.x, coordinates.y, obj.r, 0, Math.PI*2);
        } else {
        ctx.moveTo(coordinates.x - (obj.side / 2), coordinates.y);
        ctx.lineTo(coordinates.x + (obj.side / 2), coordinates.y);
        ctx.moveTo(coordinates.x, coordinates.y - (obj.side / 2));
        ctx.lineTo(coordinates.x, coordinates.y + (obj.side / 2));
        ctx.rotate(obj.angle * Math.PI/180 + getRandomArbitary(0, 0,4) - 0.2);

        }
        ctx.strokeStyle = "white";
        ctx.lineWidth = obj.strokeThickness;
        ctx.stroke();
    });
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

function getRandomArbitary(from, to) {
    return Math.random() * (to - from) + from;
}

class Circle {
    constructor(x0, y0, size, type) {
        this.x0 = x0;
        this.y0 = y0;
        this.size = size;
        this.strokeThickness = 5 * size;
        this.r = 12 * size;
        this.type = type;
    }
}

class Cross {
    constructor(x0, y0, size, angle, type) {
        this.x0 = x0;
        this.y0 = y0;
        this.size = size;
        this.side = 20 * size;
        this.angle = angle;
        this.strokeThickness = 5 * size;
        this.type = type;
    }
}

function updateDrawing() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawObjects();
}

function initCreateObjects(from, to) {
    const tmp = randomFromTo(from, to);
    let total;
    (tmp % 2 == 0) ? total = tmp: total = tmp + 1;

    for (let i = 0; i < (total); i ++) {
        const x0 = randomFromTo(0, canvas.width);
        const y0 = randomFromTo(0, canvas.height);
        const size = getRandomArbitary(0.1, 0.6);
        const typeFunc = randomFromTo(1, 2);
        if (i % 2 == 0) {
            const alfa = randomFromTo(0, 360);
            objects.push(new Cross(x0, y0, size, alfa, typeFunc));

        } else {
            objects.push(new Circle(x0, y0, size, typeFunc));
        }
    }

    drawObjects();
    setInterval(updateDrawing, 1000/20);
}

document.addEventListener('DOMContentLoaded', e => {
    initCreateObjects(50, 200);
});
