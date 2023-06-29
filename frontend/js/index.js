document.addEventListener("DOMContentLoaded",()=>{
    const auth = window.localStorage.getItem('Authorization');
    if(auth){
        document.getElementById('loginBtn').setAttribute('style','display:none;');
        document.getElementById('logoutBtn').removeAttribute('style');
    }else{
        document.getElementById('loginBtn').removeAttribute('style');
        document.getElementById('logoutBtn').setAttribute('style','display:none;');
    }
})

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