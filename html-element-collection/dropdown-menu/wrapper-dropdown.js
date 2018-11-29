'use strict'

const dropdown = document.getElementsByClassName("wrapper-dropdown")[0];

function getDropdownMenu() {
    this.classList.toggle('active');
}

dropdown.onclick = getDropdownMenu;
