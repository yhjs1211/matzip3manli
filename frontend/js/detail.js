document.addEventListener("DOMContentLoaded",async ()=>{
  const id = new URL(location.href).searchParams.get('id');
  console.log('id =>',id);
  const option = {
    method:"GET",
    headers:{
        "Content-Type":"application/json"
    },
}
const post = await fetch(`http://localhost:3030/posts/${id}`,option).then(d=>d.json());
console.log(post.data);
});