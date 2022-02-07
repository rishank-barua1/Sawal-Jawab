const likeButton = (questionId)=>{
    const button = document.getElementById("like-button");
    const likeCount = document.getElementById("like-count");
    
    if(button.style.color==="black")
    {
        const URL = 'https://localhost:5000/student/questions'+questionId+'/likeInc';
        fetch(URL,{
            method:"GET",
            headers:{
                'Content-type':'application/json; charset=UTF-8'
            }
        })
        .then(response=>response.json())
        .then((response)=>{
            console.log(response);
            button.style.color = "black";
            likeCount.innerText=response.likes;
        });

    }else{
        const URL1 = 'https://localhost:5000/student/questions'+questionId+'/likeDec';
        fetch(URL1,{
            method:"GET",
            headers:{
                'Content-type':'application/json; charset=UTF-8'
            }
        })
        .then(response=>response.json())
        .then((response)=>{
            console.log(response);
            button.style.color = "black";
            likeCount.innerText=response.likes;
        });
    }
}