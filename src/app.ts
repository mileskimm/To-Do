import { Task, TaskStatus } from "./task"
import { TasksList } from "./tasksList"


document.addEventListener("DOMContentLoaded",async function (){
    const input = <HTMLInputElement>document.querySelector('#task-input')
    const list = <HTMLUListElement>document.querySelector('.task-box')
    const button = <HTMLButtonElement>document.querySelector('#btn')
    const buttonCompleted=<HTMLButtonElement>document.querySelector("#completed")
    const form = <HTMLFormElement>document.querySelector(".task-form")

    let taskManager = new TasksList("DevXWay");
    let shownTasks = [];
    // taskManager.addListItem(new Task('working',1))
    let startTime:any, endTime:any, timeDiff:any


    button.addEventListener('click', function clickEvent(event) {
        if(input.value === ""){
            alert("Please enter a task")
        }
        event.preventDefault();
        const newTask = new Task(input.value, TaskStatus.TODO)
        taskManager.addListItem(newTask);
        const item = document.createElement("li")
        const label = document.createElement("label")
        label.innerText = newTask.title;
        const checkbox = document.createElement("input")
        checkbox.setAttribute('class', 'checkboxes')

        let completeTask = document.createElement("button")
        completeTask.innerHTML ="Complete"
        completeTask.setAttribute("class", "btn-complete")
        completeTask.type = 'button'

        let deleteTask = document.createElement("button")
        deleteTask.innerHTML = "Delete"
        deleteTask.setAttribute("class", "btn-delete")
        deleteTask.type = 'button'
        checkbox.type = "checkbox"
    


        checkbox.addEventListener('change', function changeEvent(event:any) {
            var checkedbox:any = event.path[0];
            let parent = event.path[2];
            if(checkedbox.checked){
                startTime = new Date();
                console.log( newTask.title + " Ckecked At: " + startTime)
            const theList = document.getElementById('in-progress')
            const lastListItem = theList?.children[theList?.children.length - 1];
            theList?.insertBefore(parent, lastListItem!)
                
            }else{
                console.log("unchecked")
               let toDoList = document.getElementsByClassName('task-box')[0];
               const lastListItem = toDoList?.children[toDoList?.children.length - 1];
               toDoList?.insertBefore(parent, lastListItem!)
            }
        })

        deleteTask.addEventListener('click', function removeTask(event:any){
            event.stopPropagation()
            event.path[1].remove();
        })

        completeTask.addEventListener('click', function completedTask(event:any){
            event.stopPropagation()
            let parent = event.path[1]
            let completeList = document.getElementById('completed-tasks')
            let lastCompleteItem= completeList?.children[completeList?.children.length - 1];
            completeList?.insertBefore(parent,lastCompleteItem!)
            endTime = new Date();
            timeDiff = endTime - startTime;
            timeDiff /= 1000;
            let time = Math.round(timeDiff)
            console.log( newTask.title + " Completed At: " + endTime)
            console.log("Task Completed for " + time + " Seconds")

            
        })

        
        console.log(newTask)

        item.append(label)
        label.append(checkbox, this.title)
        list.append(item)
        item.append(completeTask)
        item.append(deleteTask)
        input.value = "";
    });

});
