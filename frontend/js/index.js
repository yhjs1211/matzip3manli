async function moveDetail(tag) {
  const id = tag.getAttribute('alt');
  location.href = `detail.html?id=${id}`;
}

async function moveProfile() {
  location.href = 'profile.html';
}

async function readyPage(descType = undefined) {
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ descType: descType }),
  };

  const posts = (
    await fetch('http://localhost:3030/posts/list', option).then((d) =>
      d.json()
    )
  ).data;

  const container = document.getElementsByClassName('card-container')[0];
  container.innerHTML = '';
  posts.forEach((data) => {
    container.innerHTML += `
            <div class="card" style="width: 12rem">
              <div class="card-img-container">
                <img src="${data.foodImgURL}" onclick="moveDetail(this)" class="card-img-top" alt="${data.id}" />
              </div>
              <div class="card-body">
              <h4 class="card-title">${data.restaurantName}</h4>
              <p class="card-text">${data.content}</p>
              </div>
              <div class="card-footer">
              <p>
                  작성자 : ${data.nickname}<br> 좋아요 : ${data.like}
              </p>
              </div>
            </div>
            `;
    // }
  });
}
//포스트 생성
async function newPosts() {
  const obj = {};
  obj.restaurantName = $('#restaurantName').val();
  obj.content = $('#restaurantComment').val();
  obj.zone = $('#restaurantLocation').val();
  obj.menu = $('#restaurantMenu').val();
  obj.foodImgURL = $('#restaurantImageURL').val();

  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('Authorization'),
    },

    body: JSON.stringify(obj),
  };
  try {
    const fetchedData = await fetch('http://localhost:3030/posts', option).then(
      (d) => {
        return d.json();
      }
    );
    console.log(fetchedData);
    location.reload();
  } catch (e) {
    console.error(e);
  }
}
// 카드 지역별 클릭 함수
async function zoneClick(zone) {
  if (zone === '전체보기') {
    readyPage();
    return;
  }
  const option = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };
  const postByZone = await fetch(
    `http://localhost:3030/posts/zone?zone=${zone}`,
    option
  ).then((res) => res.json());

  const container = document.getElementsByClassName('card-container')[0];
  container.innerHTML = '';

  postByZone.forEach((data) => {
    container.innerHTML += `
            <div class="card" style="width: 12rem">
              <div class=card-img-container">
                <img src="${data.foodImgURL}" onclick="moveDetail(this)" class="card-img-top" alt="${data.id}" />
              </div>
              <div class="card-body">
                <h4 class="card-title">${data.restaurantName}</h4>
                <p class="card-text">${data.content}</p>
                </div>
                <div class="card-footer">
                <p>
                    작성자 : ${data.nickname}<br> 좋아요 : ${data.like}
                </p>
              </div>
            </div>
            `;
  });
}
// 카드 타이틀 검색 함수
function filterCards() {
  const searchInput = document.getElementById('searchInput');
  const searchValue = searchInput.value.trim().toLowerCase();
  const cards = document.querySelectorAll('#cardContainer .card-container');

  cards.forEach((card) => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    if (title.includes(searchValue)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

readyPage();

document.getElementById('profileBtn').addEventListener('click', () => {
  location.href = 'profile.html';
});

// function  ------------------------------------------------------------------------------------------------------------

// 회원가입
async function signup() {
  if (!document.getElementById('verifyEmailBtn').disabled) {
    return alert('E-mail 인증 먼저 진행해주세요.');
  }
  const obj = {};
  obj.nickname = $('#signupId').val();
  obj.password = $('#signupPw').val();
  obj.confirm = $('#signupConfirm').val();
  obj.email = $('#signupEmail').val();
  obj.phone = $('#signupPhone').val();
  obj.imageURL = $('#signupImgURL').val();
  obj.name = $('#signupName').val();
  obj.introduce = $('#signupIntroduce').val();
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  };

  try {
    const fetchedData = await fetch(
      'http://localhost:3030/users/signup',
      option
    ).then((d) => {
      return d.json();
    });
    window.location.reload();
  } catch (e) {
    console.error(e);
  }
}

// 로그인
async function login() {
  const obj = {};
  obj.email = $('#loginEmail').val(); // Uniqe
  obj.password = $('#loginPw').val();
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  };

  try {
    const fetchedData = await fetch(
      'http://localhost:3030/users/login',
      option
    ).then((d) => {
      return d.json();
    });
    if(fetchedData.errorMessage){
      alert(`${fetchedData.errorMessage}`);
    }else{
      window.localStorage.setItem('Authorization', 'Bearer ' + fetchedData.token);
      window.location.reload();
    }
  } catch (e) {
    console.error(e);
  }
}

// 로그아웃
async function logout() {
  window.localStorage.removeItem('Authorization');
  window.location.reload();
}

// 이메일 인증
async function verifyEmail() {
  const email = $('#signupEmail').val();

  if (!email) return alert('이메일이 입력되지 않았습니다.');

  const obj = {
    email: email,
  };

  const fetchedData = await fetch('http://localhost:3030/users/mail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  }).then((d) => {
    return d.json();
  });

  const verifyNum = fetchedData.verifyNum;

  while (true) {
    const inputVerifyNum = window.prompt('메일로 받은 인증번호를 입력해주세요');
    if (inputVerifyNum == null) {
      break;
    } else {
      if (verifyNum == inputVerifyNum) {
        alert('인증되었습니다.');
        document.getElementById('verifyEmailBtn').disabled = true;
        document.getElementById('signupEmail').disabled = true;
        break;
      } else {
        alert('인증번호가 틀립니다.');
      }
    }
  }
}
