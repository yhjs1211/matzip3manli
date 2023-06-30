// document.addEventListener("DOMContentLoaded",()=>{
//     const auth = window.localStorage.getItem('Authorization');
//     if(auth){
//         document.getElementById('loginBtn').setAttribute('style','display:none;');
//         document.getElementById('logoutBtn').removeAttribute('style');
//     }else{
//         document.getElementById('loginBtn').removeAttribute('style');
//         document.getElementById('logoutBtn').setAttribute('style','display:none;');
//     }
// })

async function readyPage(){
    const option={
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    };

    const posts = (await fetch('http://localhost:3030/posts',option).then(d=>d.json())).data;
    console.log(posts);
};

readyPage();

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

async function logout(){
    window.localStorage.removeItem('Authorization');
    window.location.reload();
}

async function verifyEmail(){
    const email = $('#signupEmail').val();
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
}