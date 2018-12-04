'use strict'

const fullPhoto = document.getElementsByClassName('gallery-view')[0];

function showFullPhoto(event) {
    event.preventDefault();
    if (this.classList.contains('gallery-current')) {
        return;
    }
    
    const currentPhotos = document.getElementsByClassName('gallery-current');
    Array.from(currentPhotos).forEach(photo =>
        photo.classList.remove('gallery-current'));

    this.classList.add('gallery-current');
    fullPhoto.src = this.href;

}


const miniatures = document.getElementsByTagName('a');
for (const miniature of miniatures) {
    miniature.addEventListener('click', showFullPhoto);
}









