

const options = {
    method:"GET",
    headers:{
        accept: "application/json"
    }
};

const call = async ()=>{
    const main = await fetch("http://localhost:3030",options)
        .then(res=>{return res.json()});
    console.log(main);
}

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
}

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
        console.log(fetchedData);
    } catch (e) {
        console.error(e);
    }
}