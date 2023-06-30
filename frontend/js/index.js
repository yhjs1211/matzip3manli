document.addEventListener("DOMContentLoaded",()=>{
    const auth = window.localStorage.getItem('Authorization');
    if(auth){
        showButton(true);
    }else{
        showButton(false);   
    }
});

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
        // if(data.foodImgURL){
        //     container.innerHTML+=
        //     `
        //     <div class="card-container">
        //     <div class="card" style="width: 12rem">
        //         <a href="./detail.html">
        //         <img src="${data.foodImgURL}" class="card-img-top" alt="..." />
        //         </a>
        //         <div class="card-body">
        //         <h4 class="card-title">${data.restaurantName}</h4>
        //         <p class="card-text">${data.content}</p>
        //         </div>
        //         <div class="card-footer">
        //         <p>
        //             작성자 : ${data.nickname}, 좋아요 : ${data.like}
        //         </p>
        //         </div>
        //     </div>
        //     </div>
        //     `
        // }else{
            container.innerHTML+=
            `
            <div class="card-container">
            <div class="card" style="width: 12rem">
                <a href="./detail.html">
                <img src="./img/No_image.jpeg" class="card-img-top" alt="..." />
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
        // }
    });
};

readyPage();

document.getElementById('profileBtn').addEventListener('click',()=>{
    location.href='profile.html';
})

// function  ------------------------------------------------------------------------------------------------------------

// 회원가입
async function signup(){
    if(!document.getElementById('verifyEmailBtn').disabled){
        return alert('E-mail 인증 먼저 진행해주세요.');
    }
    const obj={};
    obj.nickname = $('#signupId').val();
    obj.password = $('#signupPw').val();
    obj.confirm = $('#signupConfirm').val();
    obj.email = $('#signupEmail').val();
    obj.phone = $('#signupPhone').val();
    obj.imageURL = $('#signupImgURL').val();
    obj.name = $('#signupName').val();
    obj.introduce = $('#signupIntroduce').val();
    const option = {
        method:"POST",
        headers: {
            'Content-Type':"application/json"
        },
        body: JSON.stringify(obj)
    };
    
    try {
        const fetchedData = await fetch('http://localhost:3030/users/signup',option)
        .then(d=>{return d.json()});

        console.log(fetchedData);
    } catch (e) {
        console.error(e);
    };
};


// 로그인
async function login(){
    const obj={};
    obj.email = $('#loginEmail').val(); // Uniqe
    obj.password = $('#loginPw').val();
    const option={
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    };

    try {
        const fetchedData = await fetch('http://localhost:3030/users/login',option)
            .then(d=>{return d.json()});
        
        window.localStorage.setItem('Authorization','Bearer '+fetchedData.token);
        window.location.reload();
    } catch (e) {
        console.error(e);
    }
};

// 로그아웃
async function logout(){
    window.localStorage.removeItem('Authorization');
    window.location.reload();
}

// 이메일 인증
async function verifyEmail(){
    const email = $('#signupEmail').val();

    if(!email)return alert('이메일이 입력되지 않았습니다.');

    const obj={
        email:email
    };

    const fetchedData = await fetch('http://localhost:3030/users/mail',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    })
    .then(d=>{return d.json()});

    const verifyNum = fetchedData.verifyNum;

    while(true){
        const inputVerifyNum = window.prompt('메일로 받은 인증번호를 입력해주세요');
        if(inputVerifyNum==null){
            break;
        }else{
            if(verifyNum==inputVerifyNum){
                alert('인증되었습니다.');
                document.getElementById('verifyEmailBtn').disabled=true;
                document.getElementById('signupEmail').disabled=true;
                break;
            }else{
                alert('인증번호가 틀립니다.');   
            };
        };
    }
};

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