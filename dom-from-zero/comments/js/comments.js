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

function createComment(data) {
    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.style.backgroundImage = data.author.pic;
    
    const photo = document.createElement("div");
    photo.className = "photo";
    photo.setAttribute("title", data.author.name);
    photo.appendChild(avatar);

    const complain = document.createElement("li");
    complain.className = 'complain';
    complain.innerText = 'Пожаловаться';

    const reply = document.createElement("li");
    reply.className = 'reply';
    reply.innerText = 'Ответить';

    const commentActions = document.createElement("ul");
    commentActions.className = 'comment-actions';
    commentActions.appendChild(complain);
    commentActions.appendChild(reply);

    const commentDate = document.createElement("div");
    commentDate.className = 'comment-date';
    const date = new Date(data.date).toLocaleString('ru-Ru');
    commentDate.innerText = `${date}`;

    const bottomComment = document.createElement("div");
    bottomComment.className = 'bottom-comment';
    bottomComment.appendChild(commentDate);
    bottomComment.appendChild(commentActions);

    const commentText = document.createElement("p");
    commentText.className = 'comment-text';
    commentText.textContent = data.text;

    const commentBlock = document.createElement("div");
    commentBlock.className = 'comment-block';
    commentBlock.appendChild(commentText);
    commentBlock.appendChild(bottomComment);

    const commentWrap = document.createElement("div");
    commentWrap.className = "comment-wrap";
    commentWrap.appendChild(photo);
    commentWrap.appendChild(commentBlock);

    return commentWrap;
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
