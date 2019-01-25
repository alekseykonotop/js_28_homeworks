'use strict';

const eye = document.querySelector('.big-book__eye');
const pupil = document.querySelector('.big-book__pupil');


function getDistance(x0, y0, x, y) {
    /* Возращает длину между двумя точками
    в декартовой системе координат
    */
    return Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2));
}

function getMinDistance(x0, y0) {
    /*
    Принимает координаты центра зрачка, расчитывает растояния 
    до границ экрана. Возвращае минимальное значение.
    */
    const сoordinatesCorners = [
        [x0, 0], 
        [0, y0],
        [document.documentElement.clientWidth - x0, 0],
        [0, document.documentElement.clientHeight - y0]];

    const distances = [];
    сoordinatesCorners.forEach(([x, y]) => distances.push(getDistance(x0, y0, x, y)));

    return Math.min.apply(null, distances);
}

window.addEventListener('mousemove', event => {
    const pupilParams = pupil.getBoundingClientRect();
    const pupilR = pupilParams.width / 2;
    const x0 = pupilParams.left + pupilR;
    const y0 = pupilParams.top + pupilR;
    const x2 = event.clientX;
    const y2 = event.clientY;
    
    if ( x0 < 0 || y0 < 0) {
        return;
    }

    const minDist = getMinDistance(x0, y0);
    let progress = (getDistance(x0, y0, x2, y2)) / minDist;
    (progress > 1.0) ? progress = 1.0: progress = progress;
    const newR = 30 * progress;
    const alfa = Math.abs(Math.atan((y2-y0)/(x2-x0)));
    const newX = newR * Math.cos(alfa);
    const newY = newR * Math.sin(alfa);
    document.querySelector('.big-book__pupil').style.setProperty('--pupil-x', `${(x2 < x0) ? '-': ''}${newX}px`);
    document.querySelector('.big-book__pupil').style.setProperty('--pupil-y', `${(y2 < y0) ? '-': ''}${newY}px`);
    document.querySelector('.big-book__pupil').style.setProperty('--pupil-size', 3 / (1 + 2 * progress));
});


