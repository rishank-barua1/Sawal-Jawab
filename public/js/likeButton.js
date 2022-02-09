const button = document.getElementById("like-button");

const likeCount = document.getElementById('like-count');

button.addEventListener('click',()=>{
    likeCount.textContent++;
});