const deleteButton = document.getElementById('deleteButton');
const deleteBox = document.getElementById('delete-box');
const cancel = document.getElementById('cancel');
deleteButton.onclick = ()=>{
    deleteBox.innerHTML = `<div id="delete-box" class="deleteBox">
    <span class="card-text">Are you sure you want to delete the question? All data related to it will be erased</span>
    <a href="/student/questions/delete/<%=question.id%>" class="btn btn-primary">Confirm Delete</a>
    <button class="btn btn-success" id="cancel">Cancel</button>
  </div>    `;
}

cancel.onclick = ()=>{
    deleteBox.innerHTML = none;
}



