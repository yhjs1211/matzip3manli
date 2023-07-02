let userId;
readyPage();

async function updateUser(){
    const obj = {};
    obj.imageURL = $('#updateImgURL').val();
    obj.phone =$('#updatePhone').val();
    obj.introduce =$('#updateIntroduce').val();

    const option = {
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization:window.localStorage.getItem('Authorization')
        },
        body:JSON.stringify(obj)
    };
    const updated = await fetch(`http://localhost:3030/users/${userId}`,option).then(d=>{return d.json()});
    window.location.reload();
}

async function readyPage(){
    const option = {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:window.localStorage.getItem('Authorization')
        }
    };

    const user = await fetch('http://localhost:3030/users/getUser',option).then(d=>{return d.json()});

    document.querySelector('#userImgURL').innerHTML = `<div class="profileImgContainer" style="width:15rem; height:15rem;"><img style="width:100%; height:100%;" src="${user.imageURL}" /></div>`;
    document.querySelector('#userEmail').innerHTML = user.email;
    document.querySelector('#userId').innerHTML = user.nickname;
    document.querySelector('#userName').innerHTML = user.name;
    document.querySelector('#userPhone').innerHTML = user.phone;
    document.querySelector('#userIntroduce').innerHTML = user.introduce;
    userId = user.id;
};
