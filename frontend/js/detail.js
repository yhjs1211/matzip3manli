document.addEventListener('DOMContentLoaded', async () => {
  const auth = window.localStorage.getItem('Authorization');
  if (auth) {
    showButton(true);
  } else {
    showButton(false);
  }

  const id = new URL(location.href).searchParams.get('id');
  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const post = await fetch(`http://localhost:3030/posts/${id}`, option).then(
    (d) => d.json()
  );
});

async function moveDetail(tag) {
  const id = new URL(location.href).searchParams.get('id');
  location.href = `detail.html?id=${id}`;
}

// 상세 게시글 조회
const callPostInfo = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const postList = await fetch(
    `http://localhost:3030/posts/${id}`,
    options
  ).then((res) => res.json());

  const { restaurantName, nickname, content, menu, zone, foodImgURL } =
    postList.data;

  document.getElementById('restaurantName').textContent = restaurantName;
  document.getElementById('nickname').textContent = nickname;
  document.getElementById('content').textContent = content;
  document.getElementById('menu').textContent = menu;
  document.getElementById('zone').textContent = zone;

  const foodImg = document.getElementById('foodImg');
  foodImg.src = foodImgURL;
};
callPostInfo();

// 게시글 수정
async function postUpdate() {
  const obj = {};
  const id = new URL(location.href).searchParams.get('id');
  const updateContent = prompt('수정할 내용을 입력하세요');
  obj.content = updateContent;

  console.log(obj);
  const option = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('Authorization'),
    },
    body: JSON.stringify(obj),
  };
  try {
    const fetchedData = await fetch(
      `http://localhost:3030/posts/${id}`,
      option
    ).then((d) => {
      return d.json();
    });
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
        Authorization: localStorage.getItem('Authorization'),
      },
    };
    const deletePost = await fetch(
      `http://localhost:3030/posts/${id}`,
      option
    ).then((d) => d.json());
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
      Authorization: localStorage.getItem('Authorization'),
    },
    body: JSON.stringify(obj),
  };
  try {
    const fetchedData = await fetch(
      `http://localhost:3030/comments/${id}`,
      option
    ).then((d) => {
      return d.json();
    });
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
    },
  };
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const commentsList = await fetch(
    `http://localhost:3030/comments/${id}`,
    options
  ).then((res) => res.json());

  const commentsListElement = document.querySelector('#comment-list');
  commentsList.forEach((data) => {
    commentsListElement.innerHTML += `<div class="d-flex text-muted pt-3">
                                          <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                                          <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                                            <div class="d-flex justify-content-between">
                                              <strong class="text-dark">${data.nickname}</strong>
                                            </div>
                                            <span class="d-block">${data.comment}</span>
                                            <a href="#" onclick="commentUpdate(${data.id})">수정</a>
                                            <a href="#" onclick="commentDelete(${data.id})">삭제</a>
                                          </div>
                                      </div>`;
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
      Authorization: localStorage.getItem('Authorization'),
    },
    body: JSON.stringify(obj),
  };
  try {
    const fetchedData = await fetch(
      `http://localhost:3030/comments/${id}`,
      option
    ).then((d) => {
      return d.json();
    });
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
        Authorization: localStorage.getItem('Authorization'),
      },
    };
    const deleteComment = await fetch(
      `http://localhost:3030/comments/${id}`,
      option
    ).then((d) => d.json());
    window.location.reload();
  }
}

// 버튼 노출 선택
function showButton(boolean) {
  if (boolean == true) {
    // 로그인 로그아웃 버튼 전환
    document.getElementById('loginBtn').setAttribute('style', 'display:none;');
    if (document.getElementById('logoutBtn').hasAttribute('style'))
      document.getElementById('logoutBtn').removeAttribute('style');
    // 회원가입 프로필 버튼 전환
    document.getElementById('signupBtn').setAttribute('style', 'display:none;');
    if (document.getElementById('profileBtn').hasAttribute('style'))
      document.getElementById('profileBtn').removeAttribute('style');
  } else {
    // 로그인 로그아웃 버튼 전환
    if (document.getElementById('loginBtn').hasAttribute('style'))
      document.getElementById('loginBtn').removeAttribute('style');
    document.getElementById('logoutBtn').setAttribute('style', 'display:none;');
    // 회원가입 프로필 버튼 전환
    if (document.getElementById('signupBtn').hasAttribute('style'))
      document.getElementById('signupBtn').removeAttribute('style');
    document
      .getElementById('profileBtn')
      .setAttribute('style', 'display:none;');
  }
}