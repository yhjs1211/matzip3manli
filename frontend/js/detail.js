const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
};

// 상세 게시글 조회
const callPostInfo = async () => {
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

let modalPost = document.getElementById('#testBtn');
const testModal = function click(e) {
  addEventListener('click', click);
};
// 게시글의 댓글 입력
// async function commentWrite(event) {
//   event.preventDefault(); // 기본 동작인 폼 제출 방지

//   const commentInput = document.getElementById('comment-input');
//   const comment = commentInput.value;

//   const obj = {
//     comment: comment,
//   };
//   const postOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(obj),
//   };
//   try {
//     const fetchedData = await fetch(
//       'http://localhost:3030/comments/6',
//       postOptions
//     );
//     const responseData = await fetchedData.json();
//     console.log(responseData);
//     // 댓글 입력 후 새로운 댓글 목록을 불러오는 함수 호출
//     callComments();

//     // 입력 필드 초기화
//     commentInput.value = '';
//   } catch (e) {
//     console.error(e);
//   }
// }
// 게시글의 댓글 조회
const callComments = async () => {
  const id = urlParams.get('id');
  const commentsList = await fetch(
    `http://localhost:3030/comments/${id}`,
    options
  ).then((res) => res.json());
  console.log(commentsList);

  const commentsListElement = document.querySelector('#comment-list');
  commentsListElement.innerHTML += commentsList
    .map(
      (
        comment
      ) => `<div class="d-flex text-body-secondary pt-3" id="comment-list">
    <svg
      class="bd-placeholder-img flex-shrink-0 me-2 rounded"
      width="32"
      height="32"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Placeholder: 32x32"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
    >
      <title>Placeholder</title>
      <rect width="100%" height="100%" fill="#007bff"></rect>
      <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
    </svg>
    <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
      <div class="d-flex justify-content-between">
        <strong class="sext-gray-dark">${comment.nickname}</strong>
      </div>
      <span class="d-block">${comment.comment}</span>
    </div>
  </div>`
    )
    .join(''); // 배열로 오기때문에 문자열로 결합해 콤마를 제거
};
