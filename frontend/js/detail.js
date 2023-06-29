const { response } = require('express');

const postURL = 'localhost:3030/posts';

function getPosts(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log('error:', error));
}

getPosts(postURL);
