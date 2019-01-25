'use strict';

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext("2d");
let curves = [];
let drawing = false;
let needsRepaint = false;
let isColorToneIncreases = true; // увеличить цветовой тон true/false
let isBrashRadiusIncreases = false; //увеличить размера пера true/false
let colorTone = 0;
let currRadius = 100;

function setCanvasLinearDimentions() {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
}

// CURVES AND FIGURES
function circle(data) {
    ctx.beginPath();
    ctx.arc(...data.point, data.radius / 2, 0, 2 * Math.PI);
    ctx.fillStyle = data.color;
    ctx.fill();
    ctx.closePath();

}

function smoothCurveBetween (p1, p2) {
    ctx.beginPath();
    const gradient = ctx.createLinearGradient(...p1.point, ...p2.point);
    gradient.addColorStop(0, p1.color);
    gradient.addColorStop(0, p2.color);
    const cp = p1.point.map((coord, idx) => (coord + p2.point[idx]) / 2);
    ctx.quadraticCurveTo(...p1.point, ...cp);
    ctx.lineWidth = p2.radius;
    
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

    for (let i = 1; i < curve.length - 1; i++) {
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

// rendering
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

// events
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
        const point = [evt.offsetX, evt.offsetY];
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






















// 'use strict';

// const canvas = document.querySelector('#draw');

// setCanvasLinearDimentions();

// function setCanvasLinearDimentions() {
//     canvas.width = document.documentElement.clientWidth;
//     canvas.height = document.documentElement.clientHeight;
// }


// const ctx = canvas.getContext("2d");
// let curves = [];
// let drawing = false;
// // let сountdown = false; // обратное изменение цвета при зажатом shift
// let needsRepaint = false;
// let isColorToneIncreases = true; // увеличить цветовой тон true/false
// let isBrashRadiusIncreases = false; //увеличить размера пера true/false
// let colorTone = 0;
// let currentBrashRadius = 100;

// function getColor() {
//     return `hsl(${colorTone},100%,50%)`;
// }
// // CURVES AND FIGURES
// function circle(point) {
//     console.log('point', point);
//     // ctx.beginPath();
//     ctx.arc(...point, currentBrashRadius / 2, 0, 2 * Math.PI);
    
//     // Добавить задание цвета
//     // ctx.fillStyle = getColor();
//     // ctx.fill();
//     // ctx.closePath();
// }

// function smoothCurveBetween (p1, p2) {
//     // Bezier control point
//     // ctx.beginPath();
//     const cp = p1.map((coord, idx) => (coord + p2[idx]) / 2);
//     ctx.quadraticCurveTo(...p1, ...cp);
//     // ctx.fillStyle = getColor();
//     // ctx.fill();
//     // ctx.closePath();
// }

// function smoothCurve(points) {
//     ctx.beginPath();
//     ctx.fillStyle = getColor();
//     ctx.strokeStyle = getColor();

//     ctx.lineWidth = currentBrashRadius;

//     ctx.lineJoin = 'round';
//     ctx.lineCap = 'round';

//     ctx.moveTo(...points[0]);

//     for(let i = 1; i < points.length - 1; i++) {
//         smoothCurveBetween(points[i], points[i + 1]);
//     }

//     ctx.stroke();
//     ctx.closePath();
// }


// function updateColor() {
//     if (isColorToneIncreases) {
//         (colorTone >= 0 && colorTone < 359) ? colorTone++: colorTone = 0;
//         return;
//     }

//     (colorTone <= 359 && colorTone > 0) ? colorTone-- : colorTone = 359;
// }

// function updateBrashRadius() {
//     if (isBrashRadiusIncreases) {
//         if (currentBrashRadius < 100) {
//             currentBrashRadius++;
//         } else {
//             currentBrashRadius--;
//             isBrashRadiusIncreases = false;
//         }
//         return;
//     }
    
//     if (currentBrashRadius > 5) {
//         currentBrashRadius--;
//     } else {
//         currentBrashRadius++;
//         isBrashRadiusIncreases = true;
//     }
// }

// // rendering
// function repaint () {
//     // clear before repainting
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     curves.forEach((curve) => {
//         // console.log('curve', curve);
//         // first...
//         circle(curve[0]);

//         // the body is compraised of lines
//         smoothCurve(curve);

//         // updateColor();
//         // updateBrashRadius();
//     });
// }

// function tick () {
//     if(needsRepaint) {
//         repaint();
//         needsRepaint = false;
//         updateColor();
//         updateBrashRadius();
//     }
    
//     window.requestAnimationFrame(tick);
// }

// tick();

// // events
// canvas.addEventListener("mousedown", (evt) => {
//     drawing = true;
//     (evt.shiftKey) ? isColorToneIncreases = false : isColorToneIncreases = true;

//     const curve = []; // create a new curve
//     curve.push([evt.offsetX, evt.offsetY]); // add a new point
//     curves.push(curve); // add the curve to the array of curves
//     needsRepaint = true;
// });

// canvas.addEventListener("mouseup", (evt) => {
//   drawing = false;
// });

// canvas.addEventListener("mouseleave", (evt) => {
//   drawing = false;
// });

// canvas.addEventListener("mousemove", (evt) => {
//     if (drawing) {
//         // add a point
//         const point = [evt.offsetX, evt.offsetY];
//         curves[curves.length - 1].push(point);
        
//         needsRepaint = true;
//     }
// });

// document.addEventListener('keydown', (evt) => {
//     if (evt.shiftKey) {
//         isColorToneIncreases = false;
//     }
// });

// document.addEventListener('keyup', (evt) => {
//     if (evt.shiftKey) {
//         isColorToneIncreases = true;
//     }
// });

// window.addEventListener('resize', (evt) => {
//     setCanvasLinearDimentions();
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     curves = [];
//     repaint();
//     needsRepaint = false;
// });

// canvas.addEventListener('dblclick', (event) => {
//     console.log('event', event);
//     // очищаем полотно
//     curves = [];
//     repaint();
//     needsRepaint = false;
// });