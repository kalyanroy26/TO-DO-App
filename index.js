var textInput = document.getElementById("textInput")
var submit = document.getElementById("submit")
var taskList = document.getElementById("task-list")

function addTask(){
    if (textInput.value.trim() == ''){
        alert("task cannot be empty");
    }
    else{
        var item = document.createElement("li");
        var itemRemove = document.createElement("img");
        var edit = document.createElement("img");

        edit.setAttribute("src", "./images/pen.png");
        edit.classList.add("edit-icon");
        document.getElementById("task-list").appendChild(edit);

        itemRemove.setAttribute("src", "./images/bin.png");
        itemRemove.classList.add('delete-icon');
        document.getElementById("task-list").appendChild(itemRemove);
    
        item.textContent = textInput.value; 
        document.getElementById("task-list").appendChild(item);
        textInput.value = '';
        saveTask();
    }
}


textInput.addEventListener("keydown", function (event){
    if (event.key === "Enter"){
        addTask();
        saveTask();
    }
})


taskList.addEventListener("click",function (event){
    var clickedElement = event.target;
    if (clickedElement.tagName === 'LI') {
        clickedElement.classList.toggle('checked');
        saveTask();
        
    }
    else if(event.target.classList.contains("edit-icon")){
        var editEvent = event.target.nextElementSibling.nextElementSibling;
        editTask(editEvent);
    }
    else if (event.target.tagName === 'IMG'){
        removeTask(event);
    }
    

});

function removeTask(event){
    var clickedElement = event.target;  
    if (clickedElement.classList.contains('delete-icon')){
        if(event.target.tagName === 'IMG'){
            var listItem = clickedElement.nextElementSibling;
            var editIcon = clickedElement.previousElementSibling;
            listItem.remove();
            editIcon.remove();
            clickedElement.remove();
            saveTask();
        }
    }
}


function editTask(edit) {
    var listItem = edit.closest('li');

    if (!listItem) {
        console.log("Unable to find <li> element for editing.");
        return;
    }

    var oldText = listItem.textContent;
    var newText = prompt("Edit task:", oldText);

    if (newText !== null && newText.trim() !== "") {
        console.log("Before:", oldText);
        listItem.textContent = newText;
        console.log("After:", listItem.textContent);
        saveTask();
    }

}


function saveTask(){
    localStorage.setItem("task",taskList.innerHTML);
    console.log("data is stored");
}

function showTask(){
    taskList.innerHTML = localStorage.getItem("task");
}

showTask();

// localStorage.clear();

submit.addEventListener("click", addTask);
