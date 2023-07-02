// 전역 변수
const token = window.localStorage.getItem('Authorization');
//


// 상세 게시글 조회
const callPostInfo = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: token
    },
  };
  
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const postList = await fetch(`http://localhost:3030/posts/${id}`, options).then((res) => res.json());
  const sameResult = postList.same;

  const {userId, restaurantName, nickname, content, menu, zone, foodImgURL, like } = postList.data;

  document.getElementById('restaurantName').textContent = restaurantName;
  document.getElementById('nickname').textContent = nickname;
  document.getElementById('content').textContent = content;
  document.getElementById('menu').textContent = menu;
  document.getElementById('zone').textContent = zone;
  document.getElementById('like').textContent = like;

  const foodImg = document.getElementById('foodImg');
  foodImg.src = foodImgURL;

  const updateBtn = document.getElementById('updateBtn');
  const deleteBtn = document.getElementById('deleteBtn');

  if(sameResult){
    updateBtn.removeAttribute('style');
    deleteBtn.removeAttribute('style');
  }else{
    updateBtn.setAttribute('style','display:none;');
    deleteBtn.setAttribute('style','display:none;');
  }
};
callPostInfo();

// 게시글 수정
async function postUpdate() {
  const obj = {};
  const id = new URL(location.href).searchParams.get('id');
  const updateContent = prompt('수정할 내용을 입력하세요');
  obj.content = updateContent;

  const option = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(obj),
  };
  try {
    const fetchedData = await fetch(`http://localhost:3030/posts/${id}`, option).then((d) => {
      return d.json();
    });
    if(fetchedData.errorMessage){
      alert(`${fetchedData.errorMessage}`);
    }else{
      alert(`${fetchedData.message}`);
    }
    window.location.reload();
  } catch (e) {
    console.error(e);
  }
}
// 게시글 삭제
async function postDelete() {
  const confirmed = confirm('게시글을 삭제하시겠습니까?');
  if (confirmed) {
    const id = new URL(location.href).searchParams.get('id');
    const option = {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        Authorization: token,
      },
    };
    const deletePost = await fetch(`http://localhost:3030/posts/${id}`, option).then((d) => d.json());
    if(fetchedData.errorMessage){
      alert(`${fetchedData.errorMessage}`);
    }else{
      alert(`${fetchedData.message}`);
    }
    window.location.href = 'index.html';
  }
}

// 게시글의 댓글 입력
async function commentInput() {
  const obj = {};
  obj.comment = $('#comment-input').val();
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(obj),
  };
  try {
    const fetchedData = await fetch(`http://localhost:3030/comments/${id}`, option).then((d) => {
      return d.json();
    });
    location.reload();
  } catch (e) {
    console.error(e);
  }
}

// 게시글의 댓글 조회
const callComments = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: token
    },
  };
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const commentsList = await fetch(`http://localhost:3030/comments/${id}`, options).then((res) => res.json());
  const currentUser = commentsList.user;
  
  const commentsListElement = document.querySelector('#comment-list');
  commentsList.comments.forEach((data) => {
    if(currentUser==null){
      commentsListElement.innerHTML += `<div class="d-flex text-muted pt-3 comment-container" style="width: 550px;">
                                      <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false">
                                        <title>Placeholder</title>
                                        <rect width="100%" height="100%" fill="#007bff"></rect>
                                        <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
                                      </svg>
                                      <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                                        <div class="d-flex justify-content-between">
                                          <strong class="text-success">${data.nickname}</strong>
                                        </div>
                                        <span class="d-block text-dark">${data.comment}</span>
                                        <div class="button-container">
                                          <div class="update-button-container">
                                          <a href="#" class="update-button" style="display: none;" onclick="commentUpdate(${data.id}); return false;">수정</a>
                                        </div>
                                          <a href="#" class="x-button" style="text-decoration: none; display: none;" onclick="commentDelete(${data.id}); return false;">X</a>
                                          
                                        </div>
                                      </div>
                                    </div>`;
    }else{
      if(data.userId == currentUser.id){
        commentsListElement.innerHTML += `<div class="d-flex text-muted pt-3 comment-container" style="width: 550px;">
                                        <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false">
                                          <title>Placeholder</title>
                                          <rect width="100%" height="100%" fill="#007bff"></rect>
                                          <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
                                        </svg>
                                        <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                                          <div class="d-flex justify-content-between">
                                            <strong class="text-success">${data.nickname}</strong>
                                          </div>
                                          <span class="d-block text-dark">${data.comment}</span>
                                          <div class="button-container">
                                            <div class="update-button-container">
                                            <a href="#" class="update-button" onclick="commentUpdate(${data.id}); return false;">수정</a>
                                          </div>
                                            <a href="#" class="x-button" style="text-decoration: none;" onclick="commentDelete(${data.id}); return false;">X</a>
                                            
                                          </div>
                                        </div>
                                      </div>`;
      }else{
        commentsListElement.innerHTML += `<div class="d-flex text-muted pt-3 comment-container" style="width: 550px;">
                                        <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false">
                                          <title>Placeholder</title>
                                          <rect width="100%" height="100%" fill="#007bff"></rect>
                                          <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
                                        </svg>
                                        <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                                          <div class="d-flex justify-content-between">
                                            <strong class="text-success">${data.nickname}</strong>
                                          </div>
                                          <span class="d-block text-dark">${data.comment}</span>
                                          <div class="button-container">
                                            <div class="update-button-container">
                                            <a href="#" class="update-button" style="display: none;" onclick="commentUpdate(${data.id}); return false;">수정</a>
                                          </div>
                                            <a href="#" class="x-button" style="text-decoration: none; display: none;" onclick="commentDelete(${data.id}); return false;">X</a>
                                            
                                          </div>
                                        </div>
                                      </div>`;
      }
    }
  });
};

callComments();

// 게시글의 댓글 수정
async function commentUpdate(id) {
  const obj = {};
  const updateComment = prompt('수정할 내용을 입력하세요');
  obj.comment = updateComment;
  const option = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(obj),
  };
  try {
    const fetchedData = await fetch(`http://localhost:3030/comments/${id}`, option).then((d) => {
      return d.json();
    });
    if(fetchedData.errorMessage){
      alert(`${fetchedData.errorMessage}`);
    }else{
      alert(`${fetchedData.message}`);
    }
    window.location.reload();
  } catch (e) {
    console.error(e);
  }
}

// 게시글의 댓글 삭제
async function commentDelete(id) {
  const confirmed = confirm('댓글을 삭제하시겠습니까?');
  if (confirmed) {
    const option = {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        Authorization: token,
      },
    };
    const deleteComment = await fetch(`http://localhost:3030/comments/${id}`, option).then((d) => d.json());
    
    if(deleteComment.errorMessage){
      alert(`${deleteComment.errorMessage}`);
    }else{
      alert(`${deleteComment.message}`);
    }
    window.location.reload();
  }
}

async function moveProfile() {
  location.href = 'profile.html';
}

async function postLike(){
  const option = {
    method:"PUT",
    headers:{
      "Content-Type":"application/json",
      Authorization:token
    },
  };

  const postId = new URL(location.href).searchParams.get('id');

  const message = await fetch(`http://localhost:3030/posts/like?id=${postId}`,option).then(d=>{return d.json()});
  window.location.reload();
}

