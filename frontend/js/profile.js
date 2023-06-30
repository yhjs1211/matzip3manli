document.addEventListener("DOMContentLoaded",()=>{
    const auth = window.localStorage.getItem('Authorization');
    if(auth){
        showButton(true);
    }else{
        showButton(false);   
    }
});

// 버튼 노출 선택
function showButton(boolean){
    if(boolean==true){
        // 로그인 로그아웃 버튼 전환
        document.getElementById('loginBtn').setAttribute('style','display:none;');
        if(document.getElementById('logoutBtn').hasAttribute('style'))document.getElementById('logoutBtn').removeAttribute('style');
        // 회원가입 프로필 버튼 전환
        document.getElementById('signupBtn').setAttribute('style','display:none;');
        if(document.getElementById('profileBtn').hasAttribute('style'))document.getElementById('profileBtn').removeAttribute('style');
    }else{
        // 로그인 로그아웃 버튼 전환
        if(document.getElementById('loginBtn').hasAttribute('style'))document.getElementById('loginBtn').removeAttribute('style');
        document.getElementById('logoutBtn').setAttribute('style','display:none;');
        // 회원가입 프로필 버튼 전환
        if(document.getElementById('signupBtn').hasAttribute('style'))document.getElementById('signupBtn').removeAttribute('style');
        document.getElementById('profileBtn').setAttribute('style','display:none;');
    }
};

async function readyPage(descType=undefined){
    const option={
        method:"GET", // POST 로 변경 예정
        headers:{
            "Content-Type":"application/json"
        },
        // body:JSON.stringify({"descType":descType})
    };

    const posts = (await fetch('http://localhost:3030/posts',option).then(d=>d.json())).data;

    const container = document.getElementsByClassName('card-container')[0];
    
    posts.forEach(data=>{
            container.innerHTML+=
            `
            <div class="card-container">
            <div class="card" style="width: 12rem">
                <a href="./detail.html">
                <img src="../frontend/css/food.jpg" class="card-img-top" alt="..." />
                </a>
                <div class="card-body">
                <h4 class="card-title">${data.restaurantName}</h4>
                <p class="card-text">${data.content}</p>
                </div>
                <div class="card-footer">
                <p>
                    작성자 : ${data.nickname}, 좋아요 : ${data.like}
                </p>
                </div>
            </div>
            </div>
            `
    });
};

readyPage();