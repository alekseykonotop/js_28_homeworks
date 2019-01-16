'use strict';

function showComments(list) {
    const commentsContainer = document.querySelector('.comments');
    const comments = list.map(createComment);
    const fragment = comments.reduce((fragment, currentValue) => {
        fragment.appendChild(currentValue);
        return fragment;
    }, document.createDocumentFragment());

    commentsContainer.appendChild(fragment);
    commentsContainer.style.whiteSpace = 'pre-line';
}

function createComment(comment) {
    const newComment = document.createElement('div');
    newComment.innerHTML = `<div class="comment-wrap">
    <div class="photo" title="${comment.author.name}">
        <div class="avatar" style="background-image: url('${comment.author.pic}')"></div>
    </div>
    <div class="comment-block">
        <p class="comment-text"></p>
        <div class="bottom-comment">
          <div class="comment-date">${new Date(comment.date).toLocaleString('ru-Ru')}</div>
            <ul class="comment-actions">
              <li class="complain">Пожаловаться</li>
              <li class="reply">Ответить</li>
            </ul>
          </div>
          </div>
    </div>`;
    newComment.querySelector('.comment-text').textContent = comment.text;

    return newComment;
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
