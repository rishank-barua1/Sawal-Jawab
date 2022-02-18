var likeQ = document.getElementById('like-button');
var dislikeQ = document.getElementById('dislike-button');
const handleQuestionLike = (questionid)=>{
  if(likeQ.dataset.state ==="unliked")
  {
    if(dislikeQ.dataset.state==='clicked')
    {
      dislikeQ.dataset.state = "unclicked";
      document.getElementById('dislike-count').textContent--;
    dislikeQ.style.backgroundColor="darkorange";
      
    }
    likeQ.dataset.state = 'liked';
    document.getElementById('like-count').textContent++;
    likeQ.style.backgroundColor="blue";
  }
  else{
    likeQ.dataset.state = 'unliked';
    document.getElementById('like-count').textContent--;
    likeQ.style.backgroundColor="darkorange";
  }
  fetch('http://localhost:5000/student/question/like/'+questionid,{
    method:'POST',
    headers:{
      'Content-type':'application/json'
    }
  });
};
const handleQuestionDislike = (questionid)=>{
  if(dislikeQ.dataset.state ==="unclicked")
  {
    if(likeQ.dataset.state==='liked')
    {
      likeQ.dataset.state='unliked';
      document.getElementById('like-count').textContent--;
      likeQ.style.backgroundColor="darkorange";
    }
    dislikeQ.dataset.state = 'clicked';
    document.getElementById('dislike-count').textContent++;
    dislikeQ.style.backgroundColor="blue";
  }
  else{
    dislikeQ.dataset.state = 'unclicked';
    document.getElementById('dislike-count').textContent--;
    dislikeQ.style.backgroundColor="darkorange";
  }
  fetch('http://localhost:5000/student/question/dislike/'+questionid,{
    method:'POST',
    headers:{
      'Content-type':'application/json'
    }
  });
}