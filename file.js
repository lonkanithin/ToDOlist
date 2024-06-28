let todoItemsContainer=document.getElementById("todoItemsContainer");
let addTodoButton=document.getElementById("addTodoButton")
let saveTodoButton=document.getElementById("saveTodoButton")


saveTodoButton.onclick=function(){
    localStorage.setItem("todoList",JSON.stringify(todoList));
}
function getTodoListFromLocalStorage(){
    let stringifiedTodoList=localStorage.getItem("todoList")
    let parsedTodoList=JSON.parse(stringifiedTodoList)
    if (parsedTodoList===null){
        return [];
    }
    else{
        return parsedTodoList;
    }
}
let todoList=getTodoListFromLocalStorage()


let todoCount=todoList.length;

function onToDoStatusChanged(checkboxId,labelId,todoId){
    let checkboxElement=document.getElementById(checkboxId);
    let labelElement=document.getElementById(labelId)
    labelElement.classList.toggle("checked")

    let todoItemIndex=todoList.findIndex(function(eachTodo){
        let eachTodoId="todo"+eachTodo.uniqueNo;
        if (eachTodoId===todoId){
            return true
        }
        else{
            return false
        }
    })
        
        let todoObject=todoList[todoItemIndex];

        if (todoObject.isChecked===true){
            todoObject.isChecked=false
        }
        else{
            todoObject.isChecked=true
        }
    

}
function onDeleteTodo(todoId){
    let todoElement=document.getElementById(todoId)
    todoItemsContainer.removeChild(todoElement);
    let deletedTodoItemIndex=todoList.findIndex(function(eachTodo){
        let eachTodoId="todo"+eachTodo.uniqueNo;
        if (eachTodoId===todoId){
            return true
        }
        else{
            return false
        }
    });
    todoList.splice(deletedTodoItemIndex,1);
}

function  createAndAppendTodo(todo){
let checkboxId="checkbox"+todo.uniqueNo
let labelId="label"+todo.uniqueNo
let todoId="todo"+todo.uniqueNo


let todoElement=document.createElement("li");
todoElement.classList.add("todo-items-container","d-flex","flex-row");
todoElement.id=todoId;
todoItemsContainer.appendChild(todoElement);
 
let inputElement=document.createElement("input");
inputElement.type="checkbox";
inputElement.id=checkboxId
inputElement.checked=todo.isChecked

inputElement.classList.add("checkbox-input");
todoElement.appendChild(inputElement);


inputElement.onclick=function(){
    onToDoStatusChanged(checkboxId,labelId,todoId);
}


let labelContainer=document.createElement("div");
labelContainer.classList.add("label-container","d-flex","flex-row");
todoElement.appendChild(labelContainer);

let labelElement=document.createElement("label");
labelElement.setAttribute("for",checkboxId);
labelElement.classList.add("checkbox-label");
labelElement.textContent=todo.text
labelElement.id=labelId 
if (todo.isChecked==true){
    labelElement.classList.add("checked");
}
labelContainer.appendChild(labelElement);

let deleteContainer=document.createElement('div');
deleteContainer.classList.add("delete-container-container");
labelContainer.appendChild(deleteContainer);

let deleteIcon=document.createElement("i");
deleteIcon.classList.add("far","fa-trash-alt","delete-icon");

deleteIcon.onclick=function(){
    onDeleteTodo(todoId);
}

deleteContainer.appendChild(deleteIcon);
}
for(let todo of todoList){
createAndAppendTodo(todo)
}

function onAddTodo(){
    let userInputElement=document.getElementById("todoUserInput")
    let userInputValue=userInputElement.value 
    if (userInputValue===""){
        alert("Please enter a valid input")
        return;
    }
    todoCount=todoCount+1
    let newTodo={
        text:userInputValue,
        uniqueNo:todoCount,
        isChecked:false
    }
    todoList.push(newTodo)
    createAndAppendTodo(newTodo);
    userInputElement.value=""
}



addTodoButton.onclick=function(){
    onAddTodo();
}
