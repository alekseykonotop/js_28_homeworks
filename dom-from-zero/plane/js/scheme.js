'use strict'

const acSelect = document.querySelector('#acSelect');
const seatMapTitle = document.querySelector('#seatMapTitle');
const seatMapDiv = document.querySelector('#seatMapDiv');
const btnSeatMap = document.querySelector('#btnSeatMap');
const btnSetFull = document.querySelector('#btnSetFull');
btnSetFull.disabled = true;

btnSetFull.addEventListener('click', (event) => {
    event.preventDefault();
    const allSeats = seatMapDiv.querySelectorAll('.seat');
    Array.from(allSeats).forEach(seat => {
        if (!seat.classList.contains('adult')) {
            seat.classList.add('adult');
        }
    });
    upgradeStatus();
});

const btnSetEmpty = document.querySelector('#btnSetEmpty');
btnSetEmpty.disabled = true;

btnSetEmpty.addEventListener('click', (event) => {
    event.preventDefault();
    const allAdultSeats = Array.from(seatMapDiv.querySelectorAll('.adult'))
        .concat(Array.from(seatMapDiv.querySelectorAll('.half')));

    Array.from(allAdultSeats).forEach(seat => {
        if (seat.classList.contains('adult')) {
            seat.classList.remove('adult');
        } else {
            seat.classList.remove('half');
        }
    });
    upgradeStatus();
});

btnSeatMap.addEventListener('click', (event) => {
    event.preventDefault();
    loadScheme();
});

function loadScheme(event) {
    fetch(`https://neto-api.herokuapp.com/plane/${acSelect.value}`)
        .then(res => res.json())
        .then((res) => {
            showPlaneSchema(res);
            btnUnlock();
            upgradeStatus();
        })

    function btnUnlock() {
        btnSetFull.disabled = false;
        btnSetEmpty.disabled = false;
    }

    function showPlaneSchema(data) {
        const title = `${data.title} (${data.passengers} пассажиров)`;
        seatMapTitle.innerText = title;

        const seatRows = data.scheme.map(function(seats, i) {
            return createSeatRow(i + 1, seats, data.letters4, data.letters6);
        })
        const fragment = seatRows.reduce((fragment, row) => {
            fragment.appendChild(row);
            return fragment;
        }, document.createDocumentFragment());

        seatMapDiv.innerText = '';
        seatMapDiv.appendChild(fragment);
    }

    function createSeatRow(rowNum, seats, letters4, letters6) {

        if (seats === 0) {
            return getSeatFragment(rowNum, []);
        } else if (seats === 4) {
            return getSeatFragment(rowNum, letters4);
        } else if (seats === 6) {
            return getSeatFragment(rowNum, letters6);
        }
    }

    function getSeatFragment(rowNum, seatsCode) {
        const row = document.createElement('div');
        row.classList.add('row', 'seating-row', 'text-center');

        const rowNumber = document.createElement('div');
        rowNumber.classList.add('col-xs-1', 'row-number');
        const num = document.createElement('h2');
        num.innerText = rowNum;
        rowNumber.appendChild(num);
        row.appendChild(rowNumber);

        for (let i = 0; i < 2; i++) {
            const side = document.createElement('div');
            side.classList.add('col-xs-5');
            let firstSeat;
            let secondSeat;
            let thirdSeat;

            if (seatsCode.length === 4) {
                if (i === 0) {
                    firstSeat = createSeat(true, '');
                    secondSeat = createSeat(false, seatsCode[i * 2 + 0]);
                    thirdSeat = createSeat(false, seatsCode[i * 2 + 1]);
                } else {
                    firstSeat = createSeat(false, seatsCode[i * 2 + 0]);
                    secondSeat = createSeat(false, seatsCode[i * 2 + 1]);
                    thirdSeat = createSeat(true, '');
                }
            } else {
                firstSeat = (seatsCode.length === 6)? createSeat(false, seatsCode[i * 3 + 0]): createSeat(true, '');
                secondSeat = (seatsCode.length === 6)? createSeat(false, seatsCode[i * 3 + 1]): createSeat(true, '');
                thirdSeat = (seatsCode.length === 6)? createSeat(false, seatsCode[i * 3 + 2]): createSeat(true, '');
            }

            side.appendChild(firstSeat);
            side.appendChild(secondSeat);
            side.appendChild(thirdSeat);

            row.appendChild(side);
        }
        return row;
    }

    function createSeat(isEmpty, letter) {
        const seat = document.createElement('div');
        (isEmpty) ? seat.classList.add('col-xs-4', 'no-seat'): seat.classList.add('col-xs-4', 'seat');
        
        if (!isEmpty) {
            const codeSeat = document.createElement('span');
            codeSeat.classList.add('seat-label');
            codeSeat.innerText = letter;
            seat.appendChild(codeSeat);
        }

        return seat;
    }
}

seatMapDiv.addEventListener('click', (event) => {
    const seat = event.target.closest('.seat');
    if (event.altKey && !seat.classList.contains('adult')) {
        seat.classList.toggle('half');
    }
    if (!event.altKey && !seat.classList.contains('half')) {
        seat.classList.toggle('adult');
    }
    upgradeStatus();
});

function upgradeStatus() {
    const adultCount = (seatMapDiv.querySelectorAll('.adult')) ? seatMapDiv.querySelectorAll('.adult').length: 0;
    const halfCount = (seatMapDiv.querySelectorAll('.half'))? seatMapDiv.querySelectorAll('.half').length: 0;
    const totalCount = adultCount + halfCount;
    const totalPax = document.querySelector('#totalPax');
    const totalAdult = document.querySelector('#totalAdult');
    const totalHalf = document.querySelector('#totalHalf');
    totalPax.innerText = totalCount;
    totalAdult.innerText = adultCount;
    totalHalf.innerText = halfCount;
}

document.addEventListener('DOMContentLoaded', upgradeStatus);
















