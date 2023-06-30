const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
};
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// 버튼 눌러서 fetch 가져오는 함수..
const call = async () => {
  const postsList = await fetch(`http://localhost:3030/posts/2`, options).then(
    (res) => {
      return res.json();
    }
  );
  console.log(postsList);
};

const callPostInfo = async () => {
  const postList = await fetch('http://localhost:3030/posts/6', options).then(
    (res) => res.json()
  );

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
