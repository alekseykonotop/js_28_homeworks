'use strict';

const container = document.querySelector('.container');
const app = container.querySelector('.app');
const list = container.querySelector('.list');
const errorMsg = container.querySelector('#error-message');
const btnTakePhoto = container.querySelector('#take-photo');
const controls = container.querySelector('.controls');

const audio = document.createElement('audio');
audio.src = './audio/click.mp3';

function init() {
  window.navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true
  }).then(function (stream) {
    const video = document.createElement('video');
    app.appendChild(video);
    video.srcObject = stream;
    video.onloadedmetadata = function (e) {
      video.play();
      controls.style.display = "flex";
    };

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    app.appendChild(canvas);

    btnTakePhoto.addEventListener('click', event => {
      audio.play();
      audio.currentTime = 0;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      const photo = canvas.toDataURL();
      addPhotoToList(photo);
    });
  }).catch(() => {
    errorMsg.innerText = 'Нет доступа к камере';
  });

  function addPhotoToList(photo) {
    const firstPhoto = list.firstChild;
    const newPhoto = createPhoto(createPhotoTemplate(photo));
    list.insertBefore(newPhoto, firstPhoto);


    newPhoto.addEventListener('click', event => {
      if (event.target.textContent === 'file_download') {
        event.target.style.display = 'none';
      }
      if (event.target.textContent === 'file_upload') {
        sendPhoto(photo, event.target);
        event.target.style.display = 'none';
      }
      if (event.target.textContent === 'delete') {
        const photoDelete = event.target.closest('figure');
        list.removeChild(photoDelete);
      }
    });
  }

  function sendPhoto(img, obj) {
    const block = obj.closest('figure');
    const image = block.querySelector('img');
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    canvas.toBlob(blob => {
      const formData = new FormData();
      formData.append('image', blob);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://neto-api.herokuapp.com/photo-booth");
      xhr.addEventListener('load', event => {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
        } else {
          console.error(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        }
      });

      xhr.send(formData);
    });
  }

  function createPhotoTemplate(img) {
    return {
      tag: 'figure',
      content: [
        {
          tag: 'img',
          attrs: { src: img }
        },
        {
          tag: 'figcaption',
          content: [{
            tag: 'a',
            attrs: { href: img, download: 'snapshot.png' },
            content: {
              tag: 'i',
              attrs: { class: 'material-icons' },
              content: 'file_download'
            }
          },
          {
            tag: 'a',
            attrs: { class: 'material-icons' },
            content: {
              tag: 'i',
              attrs: { class: 'material-icons' },
              content: 'file_upload'
            }
          },
          {
            tag: 'a',
            attrs: { class: 'material-icons' },
            content: {
              tag: 'i',
              attrs: { class: 'material-icons' },
              content: 'delete'
            }
          }
          ]
        }
      ]
    }
  }

  function createPhoto(node) {
    if ((node === undefined) || (node === null) || (node === false)) {
      return document.createTextNode('');
    }
    if ((typeof node === 'string') || (typeof node === 'number') || (node === true)) {
      return document.createTextNode(node.toString());
    }
    if (Array.isArray(node)) {
      return node.reduce((fragment, element) => {
        fragment.appendChild(createPhoto(element));
        return fragment;
      }, document.createDocumentFragment());
    }

    const element = document.createElement(node.tag);

    if (node.attrs && typeof node.attrs === 'object') {
      Object.keys(node.attrs).forEach(key => element.setAttribute(key, node.attrs[key]));
    }

    if (node.content) {
      element.appendChild(createPhoto(node.content));
    }

    return element;
  }
}

document.addEventListener('DOMContentLoaded', init);