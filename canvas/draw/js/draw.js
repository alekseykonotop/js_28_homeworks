'use strict';

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext("2d");
let curves = [];
let drawing = false;
let needsRepaint = false;
let isColorToneIncreases = true;
let isBrashRadiusIncreases = false;
let colorTone = 0;
let currRadius = 100;

function setCanvasLinearDimentions() {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
}

function circle(data) {
    ctx.beginPath();
    ctx.arc(...data.point, data.radius / 2, 0, 2 * Math.PI);
    ctx.fillStyle = data.color;
    ctx.fill();
    ctx.closePath();

}

function smoothCurveBetween(p1, p2) {
    ctx.beginPath();
    const gradient = ctx.createLinearGradient(...p1.point, ...p2.point);
    gradient.addColorStop(0, p1.color);
    gradient.addColorStop(1, p2.color);
    ctx.moveTo(...p1.point);
    const xc = (p1.point[0] + p2.point[0]) / 2;
    const yc = (p1.point[1] + p2.point[1]) / 2;

    ctx.quadraticCurveTo(xc, yc, ...p2.point);
    ctx.lineWidth = (p1.radius + p2.radius) / 2;
    
    ctx.fillStyle = gradient;
    ctx.strokeStyle = gradient;

    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function smoothCurve(curve) {
    ctx.beginPath();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.moveTo(...curve[0].point);

    for (let i = 1; i < curve.length - 2; i++) {
        smoothCurveBetween(curve[i], curve[i + 1]);
    }

    ctx.stroke();
    ctx.closePath();
}

function updateColor() {
    if (isColorToneIncreases) {
        (colorTone >= 0 && colorTone < 359) ? colorTone++: colorTone = 0;
        return;
    }

    (colorTone <= 359 && colorTone > 0) ? colorTone-- : colorTone = 359;
}

function updateRadius() {
    if (isBrashRadiusIncreases) {
        if (currRadius < 100) {
            currRadius++;
        } else {
            currRadius--;
            isBrashRadiusIncreases = false;
        }
        return;
    }
    
    if (currRadius > 5) {
        currRadius--;
    } else {
        currRadius++;
        isBrashRadiusIncreases = true;
    }
}

function repaint () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    curves.forEach((curve) => {
        circle(curve[0]);
        smoothCurve(curve);
    });
}

function tick () {
    if(needsRepaint) {
        repaint();
        needsRepaint = false;
        updateColor();
        updateRadius();

    }
    
    window.requestAnimationFrame(tick);
}

setCanvasLinearDimentions();
tick();

function getColor() {
    return `hsl(${colorTone},100%,50%)`;
}

function getPoint(e) {
    return {
        color: getColor(),
        radius: currRadius,
        point: [e.offsetX, e.offsetY]
    }
}

canvas.addEventListener("mousedown", (evt) => {
    drawing = true;
    (evt.shiftKey) ? isColorToneIncreases = false : isColorToneIncreases = true;
    curves.push([getPoint(evt)]);
    needsRepaint = true;
});

canvas.addEventListener("mouseup", (evt) => {
  drawing = false;
});

canvas.addEventListener("mouseleave", (evt) => {
  drawing = false;
});

canvas.addEventListener("mousemove", (evt) => {
    if (drawing) {
        curves[curves.length - 1].push(getPoint(evt));
        needsRepaint = true;
    }
});

document.addEventListener('keydown', (evt) => {
    if (evt.shiftKey) {
        isColorToneIncreases = false;
    }
});

document.addEventListener('keyup', (evt) => {
    if (evt.shiftKey) {
        isColorToneIncreases = true;
    }
});

window.addEventListener('resize', (evt) => {
    setCanvasLinearDimentions();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    curves = [];
    repaint();
    needsRepaint = false;
});

canvas.addEventListener('dblclick', (event) => {
    curves = [];
    repaint();
    needsRepaint = false;
});